import { Injectable } from '@nestjs/common';
import { SwapiService } from './swapi/swapi.service';
import { CommentsService } from '../comments/comments.service';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Character, TransformedCharacter } from './interfaces/character.interface';
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
    return await this.commentService.getCommentsById(movieId)
  }

  async getMovies() {
    const movies = await this.swapiService.getMovies();

    const moviesWithCommentCount = await Promise.all(movies.map(async ({title, opening_crawl, release_date, created, url}) => {
        const movieId = this.getMovieIdFromUrl(url)
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
      const { url } = movie;
      const remoteMovieId = this.getMovieIdFromUrl(url)
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

  async getFilteredCharacters(characters: TransformedCharacter[], filterValue: string) {
    const filteredCharacter = characters.filter((character) => {
          return character.gender == filterValue;
        })
        
        let totalHeight = 0

        filteredCharacter.forEach((character) => {
          if (character.height == 'unknown' || character.height == 'none') {
            totalHeight = totalHeight + 0
          } else {
            totalHeight = totalHeight + Number(character.height)
          }
        })
        
        const convertibleHeight = totalHeight / 30;
        const totalHeightInFeet = Math.floor(convertibleHeight)
        const totalHeightInches = ((convertibleHeight - totalHeightInFeet) * 10).toFixed(2)

        return {
          metadata: {
            totalCharacters: filteredCharacter.length,
            "total height in CM": `${totalHeight}cm`,
            "total height in feet/inches": `${totalHeightInFeet}ft ${totalHeightInches}inches`
          },
          characters: filteredCharacter
        };
  }

  private getMovieIdFromUrl(url: string) {
    return url.split('/')[5]
  }
}
