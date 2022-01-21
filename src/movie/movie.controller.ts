import { Controller, Get, Post, Body, Param, Req, Ip, Query } from '@nestjs/common';
import { Request } from 'express';
import { MovieService } from './movie.service';
import { getClientIp } from '@supercharge/request-ip'
import { CreateCommentDto } from '../comments/dto/create-comment.dto'


@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post(':id/comments')
  createComment(
    @Body() dto: CreateCommentDto,
    @Req() req: Request,
    @Param('id') filmId: string,
    @Ip() ip: string
    ) {
    const data = { filmId: +filmId, ...dto, ipAddress: getClientIp(req)}
    return this.movieService.createComment(data);
    
  }

  @Get(':id/comments')
  getMovieComments(@Param('id') id: string) {
    return this.movieService.getCommentsByMovieId(+id)
  }

  @Get()
  getAllMovies() {
    return this.movieService.getMovies();
  }

  @Get(':id/characters')
  async getCharacters(
    @Param('id') id: string,
    @Query('sort') sortValue: string,
    @Query('order') sortOrder: string,
    @Query('filter') filterValue: string
    ) {

    let characters = await this.movieService.getMovieCharacters(+id)

      // if (filterValue) {
      //   const filteredCharacter = characters.filter((character) => {
      //     return character.gender == filterValue;
      //   })
        
      //   let totalHeight = 0

      //   filteredCharacter.forEach((character) => {
      //     if (character.height == 'unknown' || character.height == 'none') {
      //       totalHeight = totalHeight + 0
      //     } else {
      //       totalHeight = totalHeight + Number(character.height)
      //     }
      //   })
        
      //   const convertibleHeight = totalHeight / 30;
      //   const totalHeightInFeet = Math.floor(convertibleHeight)
      //   const totalHeightInches = ((convertibleHeight - totalHeightInFeet) * 10).toFixed(2)

      //   return {
      //     metadata: {
      //       totalCharacters: filteredCharacter.length,
      //       "total height in CM": `${totalHeight}cm`,
      //       "total height in feet/inches": `${totalHeightInFeet}ft ${totalHeightInches}inches`
      //     },
      //     characters: filteredCharacter
      //   };
      // }

      if (sortValue && sortOrder) {
        if (sortValue == 'name') {
          const data = characters.sort((a, b) => {
            let x = a.name.toUpperCase;
            let y = b.name.toUpperCase;
            return x == y ? 0 : a > b ? 1 : -1;
          })
          return data
        }
        
        if (sortValue == 'gender') {
          
        }

        if (sortValue == 'height') {
          
        }
        
      }

      
      // return characters;
  }
}
