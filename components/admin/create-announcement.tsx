'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Announcement } from "@/lib/type-declaration";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Column, DataTable } from "./data-table";

const columns: Column<Announcement>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Author",
    accessorKey: "author",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => (
      <span className="capitalize">{row.status}</span>
    ),
  },
]
export function CreateAnnouncement() {

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Special Prayer Meeting",
      date: "2025-05-20T00:00:00",
      author: "Pastor John",
      status: "published",
    },
    {
      id: "2",
      title: "Church Picnic Next Month",
      date: "2025-05-18T00:00:00",
      author: "Events Committee",
      status: "published",
    },
  ]

  // const [announcements, setAnnouncements] = useState<Announcement[]>([
  //   // Sample data - replace with actual data from your database
  //   {
  //     id: "1",
  //     title: "Special Prayer Meeting",
  //     date: "2025-05-20T00:00:00",
  //     author: "Pastor John",
  //     status: "published",
  //   },
  //   {
  //     id: "2",
  //     title: "Church Picnic Next Month",
  //     date: "2025-05-18T00:00:00",
  //     author: "Events Committee",
  //     status: "published",
  //   },
  // ])

  const handleEdit = (user: Announcement) => {
    // TODO: Implement edit functionality
    console.log("Edit user:", user)
  }

  const handleDelete = (user: Announcement) => {
    // TODO: Implement delete functionality
    console.log("Delete user:", user)
  }
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="cursor-pointer ">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Announcement
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Create Announcement</SheetTitle>
                    <SheetDescription>
                      Add a new announcement to the system. Fill in the details below.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 px-6">
                    {/* <UserForm /> */}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={announcements}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}