import { PageTransition } from "@/components/ui/page-transition";
import { vicarImage } from "@/config/images";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hosanna Anglican Church",
  description:
    "Hosanna Anglican Church Joyce B — branch page for our community.",
};

export default function Hosanna() {
  return (
    <PageTransition>
      {/* Branch-specific details */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">
              Hosanna Anglican Church — Joyce B
            </h1>

            <p className="text-muted-foreground mb-4">
              Welcome to the Hosanna branch. We are a warm, welcoming
              congregation committed to worship, community service, and family
              ministry.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-2">Service Times</h3>
            <ul className="list-disc pl-6">
              <li>Sunday Worship — 9:00 AM & 11:00 AM</li>
              <li>Bible Study — Wednesday 7:00 PM</li>
              <li>Youth Meeting — Friday 6:30 PM</li>
            </ul>
          </div>

          <aside className="rounded-lg overflow-hidden shadow aspect-square">
            <Image
              src={vicarImage}
              alt="Vicar of Hosanna Anglican Church"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
