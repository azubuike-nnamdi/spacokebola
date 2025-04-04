import NotFoundPage from "@/components/common/not-found-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
