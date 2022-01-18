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

@Injectable()
export class MovieService {
  
  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async findAll() {
    return `This will return an array of movies`
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
// .map((movie: Movie) => ({

//   title: movie.title,
//   openingCrawl: movie.opening_crawl,
//   releaseDate: movie.release_date,
//   characters: movie.characters,
//   createdAt: movie.created,
//   editedAt: movie.edited,
//   url: movie.url,
//   commentCount: 0
// }))