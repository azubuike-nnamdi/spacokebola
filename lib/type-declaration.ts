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

type AboutStoryProps = {
  title: string;
  desc1: string;
  desc2: string;
  img: string
}


interface Branch {
  slug: string;
  name: string;
  tagline: string;
  story: {
    title: string;
    desc1: string;
    desc2: string;
    img: string;
  };
}

export type { AboutStoryProps, AnimatedLinkProps, Branch, User };

