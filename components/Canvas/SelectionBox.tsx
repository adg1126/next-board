'use client';

import React, { memo } from 'react';

import { LayerType, SelectionBoxProps, Side } from '@/types/canvas';

import { useSelf, useStorage } from '@liveblocks/react/suspense';
import { useSelectionBounds } from '@/hooks/use-selection-bounds';

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();

    if (!bounds) {
      return null;
    }

    return (
      <>
        <rect
          className='fill-transparent stroke-yellow-500 stroke-1 pointer-events-none'
          style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            {/* Top left */}
            <rect
              className='fill-white stroke-1 stroke-yellow-500'
              x={0}
              y={0}
              style={{
                cursor: 'nwse-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDTH / 2}px, 
                ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
              }}
            />
            {/* Top middle */}
            <rect
              className='fill-white stroke-1 stroke-yellow-500'
              x={0}
              y={0}
              style={{
                cursor: 'ns-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Top, bounds);
              }}
            />
            {/* Top right */}
            <rect
              className='fill-white stroke-1 stroke-yellow-500'
              x={0}
              y={0}
              style={{
                cursor: 'nesw-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
              }}
            />
            {/* Middle right */}
            <rect
              className='fill-white stroke-1 stroke-yellow-500'
              x={0}
              y={0}
              style={{
                cursor: 'ew-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Right, bounds);
              }}
            />
            {/* Bottom right */}
            <rect
              className='fill-white stroke-1 stroke-yellow-500'
              x={0}
              y={0}
              style={{
                cursor: 'nwse-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
              }}
            />
            {/* Bottom middle */}
            <rect
              className='fill-white stroke-1 stroke-yellow-500'
              x={0}
              y={0}
              style={{
                cursor: 'ns-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Bottom, bounds);
              }}
            />
            {/* Bottom left */}
            <rect
              className='fill-white stroke-1 stroke-yellow-500'
              x={0}
              y={0}
              style={{
                cursor: 'nesw-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDTH / 2}px, 
                ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
              }}
            />
            {/* Middle left */}
            <rect
              className='fill-white stroke-1 stroke-yellow-500'
              x={0}
              y={0}
              style={{
                cursor: 'ew-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDTH / 2}px, 
                ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Left, bounds);
              }}
            />
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = 'SelectionBox';
