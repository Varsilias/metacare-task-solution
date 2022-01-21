import { Injectable } from '@nestjs/common';
import { SwapiService } from './swapi/swapi.service';
import { CommentsService } from '../comments/comments.service';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Character } from './interfaces/character.interface';
import { CreateCommentDto } from '../comments/dto/create-comment.dto'


@Injectable()
export class MovieService {

   constructor(
     private swapiService: SwapiService,
     private commentService: CommentsService
    ) { }
  
  createComment(createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto)
  }

  async getCommentsByMovieId(movieId: number) {
    const comments = await this.commentService.getCommentsById(movieId)
    if (comments === []) {
      throw new HttpException('No comments for movie with this ID', HttpStatus.NOT_FOUND);
    } else {
      return comments;
    }

  }

  async getMovies() {
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
      throw new HttpException("There are no characters for this movie", HttpStatus.NOT_FOUND)
      
    }
    const characters = await this.swapiService.getCharacterDetails(foundMovie.characters);
    const characterArray = characters.map((character: Character) => {
      const { homeworld, films, species, vehicles, starships, url, ...rest } = character
      return rest;
    })

    return characterArray;
  }

}
