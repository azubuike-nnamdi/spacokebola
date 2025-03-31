import { CONTACT_URL } from "@/config/routes";

import { Link } from "lucide-react";
import { Button } from "../ui/button";

export default function AboutStory() {
  return (
    <div>
      {/* Our Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Grace Church was founded in 1952 by a small group of families with a vision to create a place of worship that would serve the growing community of Faithville.
              </p>
              <p className="text-muted-foreground mb-4">
                Over the decades, we've grown from a small congregation meeting in a renovated storefront to a thriving church family with multiple ministries and outreach programs serving our community and beyond.
              </p>
              <p className="text-muted-foreground mb-6">
                While much has changed over the years, our commitment to sharing the love of Christ, building meaningful relationships, and making a positive impact in our world remains the same.
              </p>
              <Link href={CONTACT_URL}>
                <Button className="rounded-full">Connect With Us</Button>
              </Link>
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Historic church building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
