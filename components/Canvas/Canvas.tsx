'use client';
import React from 'react';

import { CanvasProps } from '@/types';

import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';

export default function Canvas({ boardId }: CanvasProps) {
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
}
