import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
  ) {}

  async listMovies(page: number, pageSize: number, filter: string) {
    return this.moviesRepository.listMovies(page, pageSize, filter);
  }

  async getMovieById(movieId) {
    return this.moviesRepository.findOne(movieId);
  }
}
