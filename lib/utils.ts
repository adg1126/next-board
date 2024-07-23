import { Camera, Color, Point, Side, XYWH } from '@/types/canvas';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
];

export const COLORS_FOR_COLOR_PICKER = [
  { r: 239, g: 68, b: 68 },
  { r: 249, g: 115, b: 22 },
  { r: 245, g: 158, b: 11 },
  { r: 234, g: 179, b: 8 },
  { r: 132, g: 204, b: 22 },
  { r: 34, g: 197, b: 94 },
  { r: 20, g: 184, b: 166 },
  { r: 6, g: 182, b: 212 },
  { r: 14, g: 165, b: 233 },
  { r: 59, g: 130, b: 246 },
  { r: 99, g: 102, b: 241 },
  { r: 139, g: 92, b: 246 },
  { r: 168, g: 85, b: 247 },
  { r: 217, g: 70, b: 239 },
  { r: 236, g: 72, b: 153 },
  { r: 244, g: 63, b: 94 },
  { r: 0, g: 0, b: 0 },
  { r: 178, g: 190, b: 191 },
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 253, b: 208 },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  let result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}
