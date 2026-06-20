export interface Region {
  id: string;
  name: string;
  url: string;
  colorClass: string;
  category: string;
}

export interface AppEvent {
  id: string;
  title: string;
  details?: string[];
  dateStart: string;
  dateEnd?: string;
  isRange: boolean;
}

export interface FAQ {
  q: string;
  a: string;
}
