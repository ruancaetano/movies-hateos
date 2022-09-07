import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ListMovieResponseDto } from './dtos/list-movies-response.dto';
import { MovieDetailsResponseDto } from './dtos/movie-details-response.dto';
import { MoviesService } from './movies.service';

@Controller('/movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/')
  @ApiQuery({ name: 'page_size', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'filter', type: 'string', required: false })
  @ApiResponse({ type: ListMovieResponseDto })
  @ApiTags('Movies')
  async listMovies(
    @Query('page_size', new DefaultValuePipe(5), ParseIntPipe)
    pageSize: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('filter') filter: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ListMovieResponseDto> {
    const movieList = await this.moviesService.listMovies(
      page,
      Math.min(pageSize, 100),
      filter,
    );

    response.setHeader('Content-type', 'application/hal+json');
    return new ListMovieResponseDto(movieList);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Movie id' })
  @ApiTags('Movies')
  @ApiResponse({ type: MovieDetailsResponseDto })
  async getById(
    @Param('id') movieId,
    @Res({ passthrough: true }) response: Response,
  ) {
    const movie = await this.moviesService.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found!');
    }
    response.setHeader('Content-type', 'application/hal+json');
    return new MovieDetailsResponseDto(movie);
  }
}
