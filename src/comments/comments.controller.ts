import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { getClientIp } from '@supercharge/request-ip'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req
    ) {
      const ip = getClientIp(req)
      const data = {
        ip,
        createCommentDto,
      }
      console.log(data)
      return data
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('/count/:id')
  getCommentCount(@Param('id') id: string) {
    return this.commentsService.getTotalCommentCount(+id)
  }
}
