'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import useCreateAnnouncement from "@/hooks/mutation/useCreateAnnoucement";
import { useGetAnnouncements } from "@/hooks/query/useGetAnnouncement";
import { Announcement } from "@/lib/type-declaration";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { TableSkeleton } from "../ui/table-skeleton";
import { Textarea } from "../ui/textarea";
import { DataTable } from "./data-table";

const ANNOUNCEMENT_CATEGORIES = [
  "Worship",
  "Outreach",
  "Youth",
  "Children",
  "Groups",
  "Administration",
];

const announcementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Image must be a valid URL"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

export function CreateAnnouncement() {

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { handleCreateAnnouncement, isPending, isError, isSuccess } = useCreateAnnouncement();
  const { data: announcements, isPending: isLoadingAnnouncements, error: announcementsError } = useGetAnnouncements();

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      date: "",
      category: ANNOUNCEMENT_CATEGORIES[0],
      image: "",
      excerpt: "",
      content: "",
    },
  });

  // Only close/reset modal on success
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      form.reset();
      setEditingId(null);
    }
  }, [isSuccess, form]);

  const handleEdit = (announcement: Announcement) => {
    form.reset({
      title: announcement.title,
      date: announcement.date,
      category: announcement.category,
      image: announcement.image,
      excerpt: announcement.excerpt,
      content: announcement.content,
    });
    setEditingId(announcement.id);
    setOpen(true);
  };
  const handleDelete = (announcement: Announcement) => {
    console.log('announcement', announcement);
    if (window.confirm("Delete this announcement?")) {
      // deleteMutation.mutate(announcement.id);
    }
  };
  // Convert uploaded image to base64 and set in form
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        form.setValue("image", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = (values: AnnouncementFormValues) => {
    handleCreateAnnouncement(values);
  };
  return (
    <div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Announcements Table</CardTitle>
                <CardDescription>Create, edit and delete announcements</CardDescription>
              </div>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button className="cursor-pointer" onClick={() => { form.reset(); setEditingId(null); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Announcement
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col h-full p-0">
                  <SheetHeader className="px-6 pt-6">
                    <SheetTitle>{editingId ? "Edit" : "Create"} Announcement</SheetTitle>
                    <SheetDescription>
                      {editingId ? "Edit" : "Add a new"} announcement. Fill in the details below.
                    </SheetDescription>
                  </SheetHeader>
                  <form id="announcement-form" className="flex-1 overflow-y-auto px-6 flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="title">Title</label>
                      <Input id="title" {...form.register("title")} required placeholder="Title" className="rounded-lg border focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="date">Date</label>
                      <Input id="date" {...form.register("date")} required type="date" className="rounded-lg border focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="category">Category</label>
                      <Select value={form.watch("category")} onValueChange={val => form.setValue("category", val)}>
                        <SelectTrigger className="rounded-lg border focus:ring-2 focus:ring-primary"><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>
                          {ANNOUNCEMENT_CATEGORIES.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="image">Image</label>
                      {!form.watch("image") && (
                        <input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="rounded-lg border bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90 transition" />
                      )}
                      {form.watch("image") && (
                        <div className="relative w-full flex justify-center">
                          <Image src={form.watch("image") || ''} alt="Preview" className="max-h-40 rounded-lg border object-contain mt-2 shadow" width={100} height={100} />
                          <button type="button" onClick={() => form.setValue("image", "")} className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 border border-gray-300 shadow">
                            <X className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="excerpt">Excerpt</label>
                      <Input id="excerpt" {...form.register("excerpt")} required placeholder="Excerpt" className="rounded-lg border focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="content">Content</label>
                      <Textarea id="content" {...form.register("content")} required placeholder="Announcement content" className="rounded-lg border focus:ring-2 focus:ring-primary min-h-[120px]" />
                    </div>
                    {isError && (
                      <div className="text-red-500 text-sm mt-2 text-center bg-red-50 border border-red-200 rounded-lg p-2">An error occurred while creating the announcement.</div>
                    )}
                  </form>
                  <div className="absolute bottom-0 left-0 w-full px-6 pb-6 bg-gradient-to-t from-white via-white/90 to-transparent flex justify-center z-10">
                    <Button type="submit" form="announcement-form" disabled={isPending} className="w-full py-3 rounded-lg text-base font-semibold shadow bg-primary hover:bg-primary/90 transition max-w-lg"
                      isLoading={isPending}
                      loadingText={editingId ? "Updating..." : "Creating..."}>
                      {editingId ? "Update" : "Create"}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingAnnouncements ? (
              <TableSkeleton columns={5} />
            ) : (
              <>
                {announcementsError && (
                  <div className="text-center py-8 text-red-500">Error loading announcements: {announcementsError.message}</div>
                )}
                {!isLoadingAnnouncements && !announcementsError && (
                  <DataTable
                    data={announcements ?? []}
                    columns={[
                      { header: "Title", accessorKey: "title" },
                      { header: "Date", accessorKey: "date" },
                      { header: "Excerpt", accessorKey: "excerpt" },
                      // { header: "Image", accessorKey: "image" },
                      { header: "Content", accessorKey: "content" },
                      { header: "Category", accessorKey: "category" },

                    ]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}