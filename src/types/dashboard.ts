export interface DataItem {
  month: string;
  desktop: number;
  mobile?: number;
}

export interface DataByRange {
  today: DataItem[];
  month: DataItem[];
  year: DataItem[];
}
