import { PaginatedList } from '../../common/types/paginated-list.type';
import { Movie } from '../movie.entity';

export function getNextLinkConfig(movieList: PaginatedList<Movie>) {
  const { filter, page, pageSize } = movieList;
  const filterParam = filter ? `filter=${filter}` : '';
  const pageParam = `page=${page + 1}`;
  const pageSizeParam = `page_size=${pageSize}`;

  return movieList.hasNextPage
    ? {
        next: {
          href: `/movies?${pageParam}&${pageSizeParam}&${filterParam}`,
          title: 'Next page',
        },
      }
    : {};
}

export function getPrevLinkConfig(movieList: PaginatedList<Movie>) {
  const { filter, page, pageSize } = movieList;
  const filterParam = filter ? `filter=${filter}` : '';
  const pageParam = `page=${page - 1}`;
  const pageSizeParam = `page_size=${pageSize}`;

  return movieList.hasPrevPage
    ? {
        prev: {
          href: `/movies?${pageParam}&${pageSizeParam}&${filterParam}`,
          title: 'Previous page',
        },
      }
    : {};
}

export function getCuriesLinksConfig() {
  return [
    {
      name: 'docs',
      href: '/docs/#/{controllerName}/{methodName}',
      templated: true,
    },
  ];
}

export function getSearchLinkConfig() {
  return {
    templated: true,
    title: 'Search a movie',
    href: '/movies?filter={titleFilter}&page={page}&page_size={pageSize}',
  };
}

export function getDetailsLinkConfig() {
  return {
    templated: true,
    title: 'Get details of specif movie',
    href: '/movies/{id}',
  };
}

export function getResetSearchLinkConfig() {
  return {
    title: 'Reset search',
    href: '/movies',
  };
}
