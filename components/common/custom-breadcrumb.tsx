"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomBreadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      return { href, label };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={breadcrumb.href}
            className={cn(
              "ml-1 hover:text-foreground transition-colors",
              index === breadcrumbs.length - 1 && "text-foreground font-medium"
            )}
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
