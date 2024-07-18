import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@clerk/nextjs';

import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const BoardCardFooter = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: BoardCardFooterProps) => {
  return (
    <div className='relative bg-white p-3'>
      <p className='text-[13px] truncate max-w-[calc(100%-20px)]'>{title}</p>
      <p className='opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'>
        {authorLabel}, {createdAtLabel}
      </p>
      <Button
        disabled={disabled}
        onClick={onClick}
        variant='ghost'
        className={cn(
          'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-yellow-600',
          disabled && 'cursor-not-allowed opcity-75'
        )}
      >
        <Star
          className={cn(
            'h-4 w-4',
            isFavorite && 'fill-yellow-600 text-yellow-600'
          )}
        />
      </Button>
    </div>
  );
};

export default function BoardCard({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) {
  const userId = useAuth();

  const authorLabel = userId.userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-amber-50'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-fit'
          />
          <div className='opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black' />
        </div>
        <BoardCardFooter
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
