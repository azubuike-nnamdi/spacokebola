import { AboutStoryProps } from "@/lib/type-declaration";
import Image from "next/image";

type Props = Readonly<AboutStoryProps & { priestImage: string }>;

export default function AboutStoryWithPriest({
  title,
  desc1,
  desc2,
  img,
  priestImage,
}: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl mb-6">{title}</h2>
            <p className="text-muted-foreground mb-4">{desc1}</p>
            <p className="text-muted-foreground mb-4">{desc2}</p>
          </div>

          <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={priestImage || img}
              alt="Priest"
              className="w-full h-64 md:h-[520px] object-cover"
              width={900}
              height={900}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
