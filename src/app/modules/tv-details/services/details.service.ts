import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from '../../shared/interfaces/movies/details/movie-details.interface';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, take } from 'rxjs/operators';
import { OmdbDetails } from '../../shared/interfaces/omdb/omdb-details.interface';
import { SeasonsService } from '../../shared/services/seasons.service';
import { CacheService } from 'ionic-cache';
import { LanguageService } from '../../shared/services/language.service';

@Injectable({ providedIn: 'root' })
export class DetailsService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  private _tvShowDetailsGroupKey = 'tvShowDetails';
  private _delayType = 'all';
  private _ttl = 60 * 60 * 24;

  constructor(
    private _http: HttpClient,
    private _seasonsService: SeasonsService,
    private _cache: CacheService,
    private _languageService: LanguageService) {
  }

  getLng() {
    return this._languageService.selectedLocale;
  }

  findDetailsById(id: number, refresher?): Observable<MovieDetails> {

    return this.sourceDetailsTMDB(id, refresher)
      .pipe(
        take(1),
        mergeMap(details => {
          return this.sourceDetailsOmdb(details, refresher)
            .pipe(
              map(omdb => {
                this._seasonsService.addAllSeasons(details.seasons.filter(season => season.name !== 'Specials'));
                return { ...details, omdbDetails: omdb };
              })
            );
        }),
      );
  }

  sourceDetailsTMDB(id: number, refresher) {
    const url = `${this.url}/tv/${id}?${this.apiKey}&language=${this.getLng()}&include_image_language=${this.getLng()},null&append_to_response=videos,images,recommendations,credits,external_ids`;
    const req = this._http.get<MovieDetails>(url);
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._tvShowDetailsGroupKey, this._ttl, this._delayType);
    } else {
      return this._cache.loadFromObservable(url, req, this._tvShowDetailsGroupKey, this._ttl);
    }
  }

  sourceDetailsOmdb(details, refresher) {
    const imdbId = details.external_ids.imdb_id;
    const url = `https://www.omdbapi.com/?apikey=8ed6e6d5&i=${imdbId}`;
    const req = this._http.get<OmdbDetails>(url);
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._tvShowDetailsGroupKey, this._ttl, this._delayType);
    } else {
      return this._cache.loadFromObservable(url, req, this._tvShowDetailsGroupKey, this._ttl);
    }
  }

}
