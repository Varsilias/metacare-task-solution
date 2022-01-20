import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs';
import { Movie } from '../interfaces/movie.interface'

@Injectable()
export class SwapiService {
    constructor(private httpService: HttpService) { }

    async getMovies(): Promise<Movie[]> {
        const movies = this.httpService.get('/films').pipe(
        map(response => (response.data.results)));

        return await firstValueFrom(movies)
    }
}