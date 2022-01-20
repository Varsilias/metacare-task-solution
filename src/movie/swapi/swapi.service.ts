import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs';
import { Movie } from '../interfaces/movie.interface'
import { Character } from '../interfaces/character.interface';

@Injectable()
export class SwapiService {
    constructor(private httpService: HttpService) { }

    async getMovies(): Promise<Movie[]> {
        const movies = this.httpService.get('/films').pipe(
        map(response => (response.data.results)));

        return await firstValueFrom(movies)
    }

    async getCharacterDetails(characterUrlArray: any) {
        
        //loop through the array and gets the ID of the character
        // makes the API call to get specific character by ID
        const characterDetailsArray = await Promise.all(characterUrlArray.map(async (element: string) => {
            const characterId = element.split('/')[5]
            const characterDetails = this.httpService.get(`/people/${characterId}`).pipe(
                map(response => response.data))
            const characters = await firstValueFrom(characterDetails)
            return characters;
        }))

        return characterDetailsArray;
    }

    // The endpoint argument will be merged with the baseURL in the **movies.module.ts** file
    private async getDataFromSwapiApi(endpoint: string) {
        const data = this.httpService.get(endpoint).pipe(
            map(response => (response.data.results)));
        
        return await firstValueFrom(data)

    }
}