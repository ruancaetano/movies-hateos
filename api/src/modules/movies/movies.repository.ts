import { EntityRepository, Repository } from 'typeorm';
import { PaginatedList } from '../common/types/paginated-list.type';
import { paginate } from '../common/utils/pagination.utils';
import { Movie } from './movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async listMovies(
    page: number,
    pageSize: number,
    filter: string,
  ): Promise<PaginatedList<Movie>> {
    const [totalItems, items] = await Promise.all([
      this.mountGetMovieTotalItemsQuery(filter),
      this.mountGetMovieListQuery(page, pageSize, filter),
    ]);

    return paginate({
      items,
      totalItems,
      page,
      pageSize,
      filter,
    });
  }

  private mountGetMovieTotalItemsQuery(filter: string) {
    if (filter) {
      return this.createQueryBuilder()
        .where('title ILIKE :filter', {
          filter: `%${filter}%`,
        })
        .getCount();
    }

    return this.createQueryBuilder().getCount();
  }

  private mountGetMovieListQuery(
    page: number,
    pageSize: number,
    filter: string,
  ) {
    if (filter) {
      return this.createQueryBuilder()
        .where('title ILIKE :filter', {
          filter: `%${filter}%`,
        })
        .orderBy('title')
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .getMany();
    }

    return this.createQueryBuilder()
      .orderBy('title')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getMany();
  }
}
