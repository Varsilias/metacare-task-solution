export interface Movie {
    readonly title: string;
    readonly episode_id: number;
    readonly opening_crawl: string
    readonly director: string,
    readonly producer: string,
    readonly release_date: Date,
    readonly characters: string[]
    readonly planets: string[]
    readonly starships: string[]
    readonly vehicles: string[]
    readonly species: string[]
    readonly created: Date
    readonly edited: Date
    readonly url: string
}