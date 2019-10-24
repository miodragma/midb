import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from '../../shared/interfaces/movies/details/movie-details.interface';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { OmdbDetails } from '../../shared/interfaces/omdb/omdb-details.interface';

@Injectable()
export class DetailsService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {
  }

  findDetailsById(id: number): Observable<MovieDetails> {
    const detailsUrl = `${this.url}/movie/${id}?${this.apiKey}&language=en-US&include_image_language=en,null&append_to_response=videos,images,recommendations,credits`;
    return this._http.get<MovieDetails>(detailsUrl)
      .pipe(
        mergeMap(details => {
          return this._http.get<OmdbDetails>(`https://www.omdbapi.com/?apikey=8ed6e6d5&i=${details.imdb_id}`)
            .pipe(
              map(omdb => ({ ...details, omdbDetails: omdb }))
            );
        })
      );
  }

}
