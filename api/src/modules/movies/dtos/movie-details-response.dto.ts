import { ApiProperty } from '@nestjs/swagger';
import { HALJsonLink } from '../../common/types/hal-json-link.type';
import { PaginatedList } from '../../common/types/paginated-list.type';
import { Movie } from '../movie.entity';
import {
  getCuriesLinksConfig,
  getSearchLinkConfig,
} from '../utils/movie-hal-json.util';
import { MovieDto } from './movie.dto';

class MovieDetailsLinksDto {
  @ApiProperty({ type: HALJsonLink, isArray: true })
  curies: HALJsonLink[];

  @ApiProperty({ type: HALJsonLink })
  self: HALJsonLink;

  @ApiProperty({ type: HALJsonLink, required: false })
  search?: HALJsonLink;
}

export class MovieDetailsResponseDto extends MovieDto {
  @ApiProperty({ type: MovieDetailsLinksDto })
  _links: MovieDetailsLinksDto;

  constructor(movie: Movie) {
    super();
    Object.assign(this, movie);

    this._links = {
      self: this.getSelfLinkConfig(movie),
      curies: getCuriesLinksConfig(),
      search: getSearchLinkConfig(),
    };
  }

  private getSelfLinkConfig(movie: Movie) {
    return {
      href: `/movies/${movie.id}`,
      title: 'Self resource',
    };
  }
}
