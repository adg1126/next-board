import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

declare interface ConvexClientProviderProps {
  children: React.ReactNode;
}

declare interface OrginazationListItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

declare interface TooltipProps {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
}

declare interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

declare interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

declare interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

declare interface BoardCardFooterProps {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

declare interface CopyLinkButtonProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
  id: string;
  title: string;
}

declare interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
  header: string;
  description?: string;
}

declare interface BoardPageProps {
  params: {
    boardId: string;
  };
}

declare interface CanvasProps {
  boardId: string;
}

declare interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}
