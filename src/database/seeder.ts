import { seeder } from 'nestjs-seeder'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Comment } from '../comments/entities/comment.entity'
import { CommentSeeder } from '../comments/seeder/comment.seeder';


seeder({
    imports: [
        TypeOrmModule.forRoot({
            type: process.env.DB_DRIVER || 'mysql',
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || 3306,
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_DATABASE || "swapi",
            synchronize: process.env.SYNCHRONIZE || true,
            logging: false,
            entities: [ Comment ],
            url: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },

        } as TypeOrmModuleOptions),
        
        TypeOrmModule.forFeature([Comment])
    ]
}).run([CommentSeeder])
