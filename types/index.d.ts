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
