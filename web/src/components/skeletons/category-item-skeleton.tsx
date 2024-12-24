import { FilePenLine, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export const CategoryItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-2 py-3 border-b">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="icon" disabled>
          <FilePenLine />
        </Button>
        <Button variant="outline" size="icon" disabled>
          <Trash className="text-red-600" />
        </Button>
      </div>
    </div>
  );
};
