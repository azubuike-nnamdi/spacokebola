
import { AboutStoryProps } from "@/lib/type-declaration";
import Image from "next/image";



export default function AboutStory({ title, desc1, desc2, img }: Readonly<AboutStoryProps>) {
  return (
    <div>
      {/* Our Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">{title}</h2>
              <p className="text-muted-foreground mb-4">
                {desc1}
              </p>
              <p className="text-muted-foreground mb-4">
                {desc2}
              </p>
              {/* <Link href={CONTACT_URL}>
                <Button className="rounded-full">Connect With Us</Button>
              </Link> */}
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={img}
                alt="Historic church building"
                className="w-full h-full object-cover"
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
