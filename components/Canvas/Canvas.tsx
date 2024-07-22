'use client';
import React, { useState } from 'react';

import { CanvasProps } from '@/types';
import { CanvasMode, CanvasState } from '@/types/canvas';
import { useHistory, useCanUndo, useCanRedo } from '@liveblocks/react/suspense';

import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';

export default function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory(),
    canUndo = useCanUndo(),
    canRedo = useCanRedo();

  const handleUndo = () => {
    history.undo();
  };

  const handleRedo = () => {
    history.redo();
  };

  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={handleUndo}
        redo={handleRedo}
      />
    </main>
  );
}
