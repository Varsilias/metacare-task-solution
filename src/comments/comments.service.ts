import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentsRepository.create(createCommentDto);
    return await this.commentsRepository.save(comment);
  }

  async getCommentsById(id: number): Promise<Comment[]> {
    return  await this.commentsRepository.find({ where: { filmId: id } })
  }

  findAll() {
    return this.commentsRepository.find({ order: { createdAt: 'ASC' }});
  }

 async getTotalCommentCount(filmId: number): Promise<number> {
   const commentCount = await this.commentsRepository
      .createQueryBuilder('comment')
      .where('comment.filmId = :filmId', { filmId: filmId })
      .getCount()
   return commentCount;
 }

}
