import { Book, Heart, Home, Users } from "lucide-react";
import { Card, CardAction, CardContent } from "../ui/card";

export default function AboutValue() {
  return (
    <div>
      <section className="section bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6">Our Values</h2>
            <p className="text-muted-foreground">
              These core values guide everything we do as a church family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardAction className="border border-border/50 text-center">
              <CardContent className="pt-8 px-6 pb-6">
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Book className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-4">Biblical Teaching</h3>
                <p className="text-muted-foreground">
                  We are committed to the authority of Scripture and teaching the whole counsel of God.
                </p>
              </CardContent>
            </CardAction>

            <Card className="border border-border/50 text-center">
              <CardContent className="pt-8 px-6 pb-6">
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-4">Authentic Community</h3>
                <p className="text-muted-foreground">
                  We foster genuine relationships where people can be known, loved, and supported.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50 text-center">
              <CardContent className="pt-8 px-6 pb-6">
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-4">Compassionate Service</h3>
                <p className="text-muted-foreground">
                  We actively seek ways to demonstrate God&apos;s love through serving our community and world.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50 text-center">
              <CardContent className="pt-8 px-6 pb-6">
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-4">Welcoming Environment</h3>
                <p className="text-muted-foreground">
                  We strive to create a place where everyone feels welcome, regardless of background or life stage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}