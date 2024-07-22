'use client';

import React from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';

import { RoomProps } from '@/types';

export default function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider
      publicApiKey={`${process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY}`}
    >
      <RoomProvider
        id={roomId}
        initialPresence={{}}
      >
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
