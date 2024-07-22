'use client';

import React, { memo } from 'react';

import { useOther, useOthersConnectionIds } from '@liveblocks/react/suspense';
import { CursorProps } from '@/types';
import { MousePointer2 } from 'lucide-react';

import { connectionIdToColor } from '@/lib/utils';

const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info),
    cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || 'Teammate';

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      height={50}
      width={name.length * 10 + 24}
      className='relative drop-shadow-md'
    >
      <MousePointer2
        className='h-5 w-5'
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className='absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold'
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = 'Cursor';

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor
          key={connectionId}
          connectionId={connectionId}
        />
      ))}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      {/* TODO: Draft pencil */}
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = 'CursorsPresence';
