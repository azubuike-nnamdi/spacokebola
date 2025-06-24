'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { User } from "@/lib/type-declaration";
import { Plus } from "lucide-react";
import { DataTable, type Column } from "../data-table";
import { UserForm } from "../user-form";

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
  },
]

const columns: Column<User>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: (row) => (
      <span className="capitalize">{row.role}</span>
    ),
  },
]
export function CreateUserCard() {

  // const [users, setUsers] = useState<User[]>([
  //   // Sample data - replace with actual data from your database
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     email: "john@example.com",
  //     role: "admin",
  //   },
  //   {
  //     id: "2",
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     role: "editor",
  //   },
  // ])

  const handleEdit = (user: User) => {
    // TODO: Implement edit functionality
    console.log("Edit user:", user)
  }

  const handleDelete = (user: User) => {
    // TODO: Implement delete functionality
    console.log("Delete user:", user)
  }
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your user accounts</CardDescription>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create User</SheetTitle>
                  <SheetDescription>
                    Add a new user to the system. Fill in the details below.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 px-6">
                  <UserForm />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={users}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  )

}