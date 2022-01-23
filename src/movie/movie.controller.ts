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
    @Query('filter') filterValue: string
    ) {

    const characters = await this.movieService.getMovieCharacters(+id)
      if (filterValue) {
        return this.movieService.getFilteredCharacters(characters, filterValue)
      }

      return characters;
  }
}
