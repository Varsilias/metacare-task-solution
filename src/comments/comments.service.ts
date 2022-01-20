import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>
    ) { }

  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

 async getTotalCommentCount(filmId: number): Promise<number> {
   const commentCount = await this.commentsRepository
                            .createQueryBuilder('comment')
                            .where('comment.filmId = :filmId', { filmId: filmId })
                            .getCount()
   return commentCount;
 }

}
