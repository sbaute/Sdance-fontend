export interface TableAction<T> {
  icon: string;
  color?: 'primary' | 'danger';
  tooltip?: string;
  action: (row: T) => void;
}
