'use client';
import React, { useCallback, useState } from 'react';

import { CanvasProps } from '@/types';
import { CanvasMode, CanvasState } from '@/types/canvas';
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
} from '@liveblocks/react/suspense';

import { pointerEventToCanvasPoint } from '@/lib/utils';

import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';
import { CursorsPresence } from './CursorsPresence';

export default function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
      mode: CanvasMode.None,
    }),
    [camera, setCamera] = useState({ x: 0, y: 0 });

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const history = useHistory(),
    canUndo = useCanUndo(),
    canRedo = useCanRedo();

  const handleUndo = () => {
    history.undo();
  };

  const handleRedo = () => {
    history.redo();
  };

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

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
      <svg
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
}
