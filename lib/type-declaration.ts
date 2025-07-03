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

export type Announcement = {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
};

export type { AnimatedLinkProps, User };
