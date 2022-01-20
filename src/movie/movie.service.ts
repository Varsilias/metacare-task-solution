import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Movie } from './interfaces/movie.interface';
import { map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SwapiService } from './swapi/swapi.service';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class MovieService {
   constructor(
     private swapiService: SwapiService,
     private commentService: CommentsService
    ) { }
  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async findAll() {
    const movies = await this.swapiService.getMovies();
    const moviesWithCommentCount = await Promise.all(movies.map(async ({title, opening_crawl, release_date, created, url}) => {
      const movieId = url.split('/')[5]
      const commentCount = await this.commentService.getTotalCommentCount(+movieId)

      return {
        movieId: +movieId,
        title,
        opening_crawl,
        release_date,
        commentCount,
        createdAt: created
      }
    })
);
    return moviesWithCommentCount
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
