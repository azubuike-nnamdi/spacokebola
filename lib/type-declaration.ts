interface AnimatedLinkProps {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
  className?: string;
}

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "editor"
}

type Announcement = {
  id: string
  title: string
  date: string
  author: string
  status: "published" | "draft"
}

export type { AnimatedLinkProps, Announcement, User };
