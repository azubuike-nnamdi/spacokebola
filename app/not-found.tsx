import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>Not Found</h1>
    </div>
  );
}
