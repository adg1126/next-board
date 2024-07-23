import { RectangleProps } from '@/types/canvas';
import React from 'react';

export default function Rectangle({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className='drop-shadow-md'
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill='#000'
      stroke='transparent'
    />
  );
}
