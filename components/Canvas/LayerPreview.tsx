'use client';
import React, { memo } from 'react';

import { LayerPreviewProps } from '@/types';
import { LayerType } from '@/types/canvas';

import { useStorage } from '@liveblocks/react/suspense';

import Rectangle from '../LayerComponents/Rectangle';

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        return null;
    }
  }
);

LayerPreview.displayName = 'LayerPreview';
