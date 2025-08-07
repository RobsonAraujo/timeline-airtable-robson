export interface TimelineItem {
  id: number;
  start: string; // YYYY-MM-DD format
  end: string; // YYYY-MM-DD format
  name: string;
}

export interface TimelineLane {
  items: TimelineItem[];
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export interface TimelineItemProps {
  item: TimelineItem;
  className?: string;
}
