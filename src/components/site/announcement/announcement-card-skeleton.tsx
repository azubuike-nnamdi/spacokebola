import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AnnouncementCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm rounded-lg">
      <div className="aspect-[16/9] bg-muted flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-t-lg" />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-2/3 mb-3" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-px w-full my-4" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
} 