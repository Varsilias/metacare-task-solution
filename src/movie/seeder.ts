// import { seeder } from 'nestjs-seeder'
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
// import { DatabaseConfig } from '../config/database.config';
// import { ConfigModule } from '@nestjs/config';
// import { Comment } from './entities/comment.entity'
// import { CommentSeeder } from './seeders/comment.seeder';
// import { Config } from '../config/config';

// seeder({
//     imports: [
//         TypeOrmModule.forRoot({
//             type: "mysql",
//             host: "localhost",
//             port: 3306,
//             username: "root",
//             password: "",
//             database: "auth",
//             synchronize: true,
//             logging: false,
//             entities: [ Comment ]

//         } as TypeOrmModuleOptions),
        
//         TypeOrmModule.forFeature([Comment])
//     ]
// }).run([CommentSeeder])
