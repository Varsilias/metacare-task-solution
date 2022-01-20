import { randomInt } from "crypto";
import { Factory } from "nestjs-seeder";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number; 

    @Factory(() => randomInt(1, 7)) 
    @Column()
    filmId: number;

    @Factory(faker => faker.lorem.sentences())
    @Column({ length: 500})
    comment: string;

    @Factory(faker => faker.internet.ip())
    @Column()
    ipAddress: string;

    @Column({ default: new Date().toUTCString()})
    createdAt: string;

}