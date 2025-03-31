import { Card, CardContent } from "@/components/ui/card";
import { leadershipTeam } from "@/data";

export default function AboutLeadership() {
  return (
    <div>
      {/* Leadership Team Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6">Our Leadership Team</h2>
            <p className="text-muted-foreground">
              Meet the dedicated people who serve and lead our church community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader) => (
              <Card key={leader.id} className="border border-border/50 overflow-hidden">
                <div className="aspect-square bg-muted">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl mb-1">{leader.name}</h3>
                  <p className="text-primary/80 mb-4">{leader.role}</p>
                  <p className="text-muted-foreground text-sm">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
