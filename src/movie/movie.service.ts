import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { SwapiService } from './swapi/swapi.service';
import { CommentsService } from '../comments/comments.service';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Character } from './interfaces/character.interface';


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

  async getMovieCharacters(movieId: number) {
    const movies = await this.swapiService.getMovies();
    const foundMovie = movies.find((movie) => {
      const remoteMovieId = movie.url.split('/')[5]
      return movieId == +remoteMovieId
    })

    if(!foundMovie) {
      throw new HttpException("Movie Not Found", HttpStatus.NOT_FOUND)
      
    }
    const characters = await this.swapiService.getCharacterDetails(foundMovie.characters);
    const characterArray = characters.map((character: Character) => {
      const { homeworld, films, species, vehicles, starships, url, ...rest } = character
      return rest;
    })

    return characterArray;
  }

}
