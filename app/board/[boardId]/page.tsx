import React from 'react';

import { BoardPageProps } from '@/types';

import Canvas from '@/components/Canvas/Canvas';
import Room from '@/components/Room';
import CanvasLoading from '@/components/Canvas/CanvasLoading';

export default function Board({ params }: BoardPageProps) {
  return (
    <Room
      roomId={params.boardId}
      fallback={<CanvasLoading />}
    >
      <Canvas boardId={params.boardId} />
    </Room>
  );
}
