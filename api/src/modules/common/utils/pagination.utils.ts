import { PaginatedList } from '../types/paginated-list.type';

export const paginate = <T>(options: {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  filter?: string;
}): PaginatedList<T> => {
  const { items, totalItems, page, pageSize, filter } = options;

  return {
    items,
    totalItems,
    page: Number(page),
    pageSize: Number(pageSize),
    hasNextPage: Math.ceil(totalItems / pageSize) > page,
    hasPrevPage: page > 1,
    filter,
  };
};
