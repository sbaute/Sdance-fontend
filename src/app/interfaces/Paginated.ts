export interface PageResponseDTO<T> {
  items: T[];
  totalElements: number;
  currentPage: number;
}
