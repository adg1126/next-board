import { ClipboardX, SearchX, StarOff } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const EmptySearch = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <SearchX className='w-[100px] h-[100px]' />
      <h2 className='text-2xl font-semibold mt-6'>No results found!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Try searching for something else
      </p>
    </div>
  );
};

const EmptyFavorites = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <StarOff className='w-[100px] h-[100px]' />
      <h2 className='text-2xl font-semibold mt-6'>No favorite boards!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Try setting a board to favorite
      </p>
    </div>
  );
};

const EmptyBoards = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <ClipboardX className='w-[100px] h-[100px]' />
      <h2 className='text-2xl font-semibold mt-6'>
        No boards found! Create your first board!
      </h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating your first organization
      </p>
      <div className='mt-6'>
        <Button size='lg'>Create board</Button>
      </div>
    </div>
  );
};

export default function BoardList({ orgId, query }: BoardListProps) {
  const data = [];
  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return <div>{JSON.stringify(query)}</div>;
}
