import { Factory } from "nestjs-seeder";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn('uuid')
    uuid: number

    @Factory(faker => faker.lorem.sentences())
    @Column({ length: 500})
    comment: string

    @Factory(faker => faker.internet.ip())
    @Column()
    ipAddress: string

    @Column({ default: new Date().toUTCString()})
    createdAt: string

}