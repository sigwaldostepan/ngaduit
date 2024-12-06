import { FilePenLine, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const AccountDetailsSkeleton = () => (
  <div className="w-full flex flex-col items-start justify-center">
    <div className="w-full flex items-center justify-between px-2 py-3 border-b last:border-b">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-2 w-[75px]" />
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button size="icon" variant="secondary" disabled>
          <FilePenLine />
        </Button>
        <Button size="icon" variant="outline" className="text-destructive" disabled>
          <Trash />
        </Button>
      </div>
    </div>
  </div>
);
