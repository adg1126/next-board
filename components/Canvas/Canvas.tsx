'use client';
import React, { useCallback, useState } from 'react';

import { CanvasProps } from '@/types';
import { CanvasMode, CanvasState, LayerType, Point } from '@/types/canvas';
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
  useStorage,
} from '@liveblocks/react/suspense';

import { pointerEventToCanvasPoint } from '@/lib/utils';

import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';
import { CursorsPresence } from './CursorsPresence';
import { LayerPreview } from './LayerPreview';

import { nanoid } from 'nanoid';
import { LiveObject } from '@liveblocks/client';

const MAX_LAYERS = 100;

export default function Canvas({ boardId }: CanvasProps) {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
      mode: CanvasMode.None,
    }),
    [camera, setCamera] = useState({ x: 0, y: 0 }),
    [lastUsedColor, setLastUsedColor] = useState({
      r: 0,
      g: 0,
      b: 0,
    });

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

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get('layers');

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get('layerIds');
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );

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
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor='#000'
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
}
