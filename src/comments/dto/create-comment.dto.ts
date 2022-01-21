import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class CreateCommentDto {

    @IsNotEmpty()
    @IsNumber()
    readonly filmId: number;
    
    @IsNotEmpty()
    @IsString()
    readonly comment: string;

    @IsNotEmpty()
    @IsString()
    readonly ipAddress: string;
}
