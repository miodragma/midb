import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../../shared/interfaces/season-list/season.interface';
import { Episode } from '../../shared/interfaces/episodes/episode.interface';
import { map, mergeMap, tap } from 'rxjs/operators';
import { OmdbDetails } from '../../shared/interfaces/omdb/omdb-details.interface';
import { CacheService } from 'ionic-cache';

@Injectable()
export class EpisodesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _episodesListGroupKey = 'episodesList';
  private _delayType = 'all';
  private _ttl = 60 * 60 * 24;

  constructor(private _http: HttpClient, private _cache: CacheService) {
  }

  findAllEpisodesList(seasonNumber: number, tvShowId: number, refresher?): Observable<Season> {
    const url = `${this._url}/tv/${tvShowId}/season/${seasonNumber}?${this._apiKey}&language=en-US`;
    const req = this._http.get<Season>(url);
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._episodesListGroupKey, this._ttl, this._delayType)
        .pipe(
          tap(data => refresher.target.complete())
        );
    } else {
      return this._cache.loadFromObservable(url, req, this._episodesListGroupKey, this._ttl);
    }
  }

  findEpisodeDetailsById(tvShowId: number, seasonNumber: number, episodeNumber: number): Observable<Episode> {
    return this._http.get<Episode>(`${this._url}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}?${this._apiKey}&language=en-US&include_image_language=en,null&append_to_response=videos,images,recommendations,external_ids,credits`)
      .pipe(
        mergeMap(details => {
          return this._http.get<OmdbDetails>(`https://www.omdbapi.com/?apikey=8ed6e6d5&i=${details.external_ids.imdb_id}`)
            .pipe(
              map(omdb => ({ ...details, omdbDetails: omdb }))
            );
        })
      );
  }

}
