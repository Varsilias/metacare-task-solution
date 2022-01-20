import { seeder } from 'nestjs-seeder'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Comment } from '../comments/entities/comment.entity'
import { CommentSeeder } from '../comments/seeder/comment.seeder';
// import { DatabaseConfig } from '../config/database.config';
// import { ConfigModule } from '@nestjs/config';
// import { Config } from '../config/config';

seeder({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "swapi",
            synchronize: true,
            logging: false,
            entities: [ Comment ]

        } as TypeOrmModuleOptions),
        
        TypeOrmModule.forFeature([Comment])
    ]
}).run([CommentSeeder])
