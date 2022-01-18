import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SwapiService {
    constructor(private httpService: HttpService) { }

    async getMovies() {
        const movies = this.httpService.get('/films').pipe(
        map(response => (response.data.results)));

        return await firstValueFrom(movies)
    }
}