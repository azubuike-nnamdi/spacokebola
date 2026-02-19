import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { bibleImage } from "@/config/images";

export default function AboutBelieve() {
  return (
    <div>
      <section className="section bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl mb-6">What We Believe</h2>
              <p className="text-muted-foreground mb-4">
                At Grace Church, we affirm the historic Christian faith as revealed in Scripture. Our beliefs are centered on the gospel—the good news that God saves sinners through the life, death, and resurrection of Jesus Christ.
              </p>
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">The Bible</h4>
                  <p className="text-muted-foreground text-sm">We believe the Bible is God&apos;s Word, divinely inspired and without error, the final authority for all matters of faith and conduct.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">God</h4>
                  <p className="text-muted-foreground text-sm">We believe in one God who exists eternally in three persons: Father, Son, and Holy Spirit.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Salvation</h4>
                  <p className="text-muted-foreground text-sm">We believe salvation is by grace alone, through faith alone, in Christ alone.</p>
                </div>
              </div>
              <Button variant="outline" className="rounded-full">Read Our Full Statement of Faith</Button>
            </div>
            <div className="aspect-video lg:aspect-square bg-muted rounded-lg overflow-hidden order-1 lg:order-2">
              <Image
                src={bibleImage}
                alt="Open Bible"
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