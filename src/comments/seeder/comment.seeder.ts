// import { DataFactory, Seeder } from 'nestjs-seeder'
// import { InjectRepository } from '@nestjs/typeorm'
// import { Repository } from 'typeorm'
// import { Comment } from '../entities/comment.entity'

// export class CommentSeeder implements Seeder {

//     constructor(
//         @InjectRepository(Comment) 
//         private commentsRepository: Repository<Comment>
//     ) {}

//     drop(): Promise<any> {
//         return this.commentsRepository.delete({});
//     }

//     seed(): Promise<any> {
//         const comments = DataFactory.createForClass(Comment).generate(50);
//         return this.commentsRepository.insert(comments);
//     }

// }