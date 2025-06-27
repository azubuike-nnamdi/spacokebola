
import Image from "next/image";

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
                As early as 1936 there were Igbos who worshipped with the Yoruba Congregation at St James&apos; Cathedral, Oke Bola, Ibadan. Due to an appeal made to Rev. Williams, they were allowed to worship in a Classroom at St. James Primary School as the Igbo section of the Cathedral. Church services were conducted by Volunteers.
              </p>
              <p className="text-muted-foreground mb-4">
                This arrangement lasted til 1940 when the igbo congregation moved to a new Church in Ekoledo (Emmanuel Church) to worship, where the congregation was largely Sierra Leonians led by Mr. Lumpkin (of blessed memory). Later that year (1940) the Igbo Congregation reconvened at the classroom of St. James&apos; Primary School Oke-Bola under the leadership of Messrs Ben, Ifekwuna and V.O.Onyewotu, both of them were civil In 1942, they were variously affected by transfers out of Ibadan, therefore, Messis Chinedu Ukaonu and L.O. Ogbonna succeeded them as leaders. In 1952 Mr. S.0 Okolo was posted to the Church as the first Catechist, under a special arrangement with Diocese on the Niger.
              </p>
              {/* <Link href={CONTACT_URL}>
                <Button className="rounded-full">Connect With Us</Button>
              </Link> */}
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
