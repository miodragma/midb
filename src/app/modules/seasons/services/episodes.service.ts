import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../../shared/interfaces/season-list/season.interface';
import { Episode } from '../../shared/interfaces/episodes/episode.interface';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { OmdbDetails } from '../../shared/interfaces/omdb/omdb-details.interface';
import { CacheService } from 'ionic-cache';
import { LanguageService } from '../../shared/services/language.service';

@Injectable()
export class EpisodesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _episodesListGroupKey = 'episodesList';
  private _episodeDetailsGroupKey = 'episodeDetails';
  private _delayType = 'all';
  private _ttl = 60 * 60 * 24;

  constructor(
    private _http: HttpClient,
    private _cache: CacheService,
    private _languageService: LanguageService) {
  }

  getLng() {
    return this._languageService.selectedLocale;
  }

  findAllEpisodesList(seasonNumber: number, tvShowId: number, refresher?): Observable<Season> {
    const url = `${this._url}/tv/${tvShowId}/season/${seasonNumber}?${this._apiKey}&language=${this.getLng()}`;
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

  findEpisodeDetailsById(tvShowId: number, seasonNumber: number, episodeNumber: number, refresher?): Observable<Episode> {
    return this.sourceDetailsTmdb(tvShowId, seasonNumber, episodeNumber, refresher)
      .pipe(
        take(1),
        mergeMap(details => {
          return this.sourceDetailsOmdb(details, refresher)
            .pipe(
              map(omdb => ({ ...details, omdbDetails: omdb }))
            );
        })
      );
  }

  sourceDetailsTmdb(tvShowId: number, seasonNumber: number, episodeNumber: number, refresher) {
    const url = `${this._url}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}?${this._apiKey}&language=${this.getLng()}&include_image_language=${this.getLng()},null&append_to_response=videos,images,recommendations,external_ids,credits`;
    const req = this._http.get<Episode>(url);
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._episodeDetailsGroupKey, this._ttl, this._delayType);
    } else {
      return this._cache.loadFromObservable(url, req, this._episodeDetailsGroupKey, this._ttl);
    }
  }

  sourceDetailsOmdb(details, refresher) {
    const url = `https://www.omdbapi.com/?apikey=8ed6e6d5&i=${details.external_ids.imdb_id}`;
    const req = this._http.get<OmdbDetails>(url);
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._episodeDetailsGroupKey, this._ttl, this._delayType);
    } else {
      return this._cache.loadFromObservable(url, req, this._episodeDetailsGroupKey, this._ttl);
    }
  }

}
