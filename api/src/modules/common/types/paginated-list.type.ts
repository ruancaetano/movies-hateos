export interface PaginatedList<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  filter?: string;
}
