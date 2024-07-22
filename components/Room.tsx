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
      throttle={16}
      authEndpoint='/api/liveblocks-auth'
    >
      <RoomProvider
        id={roomId}
        initialPresence={{ cursor: null }}
      >
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
