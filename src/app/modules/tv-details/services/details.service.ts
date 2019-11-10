import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from '../../shared/interfaces/movies/details/movie-details.interface';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { OmdbDetails } from '../../shared/interfaces/omdb/omdb-details.interface';
import { SeasonsService } from '../../shared/services/seasons.service';

@Injectable({ providedIn: 'root' })
export class DetailsService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient, private _seasonsService: SeasonsService) {
  }

  findDetailsById(id: number): Observable<MovieDetails> {
    const detailsUrl = `${this.url}/tv/${id}?${this.apiKey}&language=en-US&include_image_language=en,null&append_to_response=videos,images,recommendations,credits,external_ids`;
    return this._http.get<MovieDetails>(detailsUrl)
      .pipe(
        mergeMap(details => {
          const imdbId = details.external_ids.imdb_id;
          return this._http.get<OmdbDetails>(`https://www.omdbapi.com/?apikey=8ed6e6d5&i=${imdbId}`)
            .pipe(
              map(omdb => {
                this._seasonsService.addAllSeasons(details.seasons.filter(season => season.name !== 'Specials'));
                return { ...details, omdbDetails: omdb };
              })
            );
        }),
      );
  }

}
