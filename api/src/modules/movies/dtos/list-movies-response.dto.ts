import { ApiProperty } from '@nestjs/swagger';
import { HALJsonLink } from '../../common/types/hal-json-link.type';

import { PaginatedList } from '../../common/types/paginated-list.type';
import { Movie } from '../movie.entity';
import {
  getPrevLinkConfig,
  getNextLinkConfig,
  getCuriesLinksConfig,
  getSearchLinkConfig,
  getResetSearchLinkConfig,
  getDetailsLinkConfig,
} from '../utils/movie-hal-json.util';
import { MovieDto } from './movie.dto';

class ListMovieResponseLinksDto {
  @ApiProperty({ type: HALJsonLink, isArray: true })
  curies: HALJsonLink[];

  @ApiProperty({ type: HALJsonLink })
  self: HALJsonLink;

  @ApiProperty({ type: HALJsonLink, required: false })
  search?: HALJsonLink;

  @ApiProperty({ type: HALJsonLink, required: false })
  reset?: HALJsonLink;

  @ApiProperty({ type: HALJsonLink })
  details: HALJsonLink;

  @ApiProperty({ type: HALJsonLink, required: false })
  next?: HALJsonLink;

  @ApiProperty({ type: HALJsonLink, required: false })
  prev?: HALJsonLink;
}

export class ListMovieResponseDto {
  @ApiProperty({ type: ListMovieResponseLinksDto })
  _links: ListMovieResponseLinksDto;

  @ApiProperty({ type: MovieDto, isArray: true })
  items: MovieDto[];

  constructor(movieList: PaginatedList<Movie>) {
    const { filter } = movieList;

    const prevLink = getPrevLinkConfig(movieList);
    const nextLink = getNextLinkConfig(movieList);

    this.items = movieList.items as MovieDto[];

    this._links = {
      self: this.getSelfLinkConfig(movieList),
      curies: getCuriesLinksConfig(),
      search: !filter ? getSearchLinkConfig() : undefined,
      reset: filter ? getResetSearchLinkConfig() : undefined,
      details: getDetailsLinkConfig(),
      ...nextLink,
      ...prevLink,
    };
  }

  private getSelfLinkConfig(movieList: PaginatedList<Movie>) {
    const { filter, page, pageSize } = movieList;
    const filterParam = filter ? `filter=${filter}` : '';
    const pageParam = `page=${page}`;
    const pageSizeParam = `page_size=${pageSize}`;

    return {
      href: `/movies?${pageParam}&${pageSizeParam}&${filterParam}`,
      title: 'Self resource',
    };
  }
}
