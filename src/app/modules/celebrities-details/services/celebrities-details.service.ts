import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CelebrityResponse } from '../interfaces/celebrity-response.interface';
import { CacheService } from 'ionic-cache';

@Injectable()
export class CelebritiesDetailsService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _celebrityDetailsGroupKey = 'actorsList';
  private _delayType = 'all';
  private _ttl = 60 * 60 * 24;

  constructor(private _http: HttpClient, private _cache: CacheService) {
  }

  findDetailsById(id: number, refresher?) {
    const url = `${this._url}/person/${id}?${this._apiKey}&language=en-US&include_image_language=en,null&append_to_response=images,combined_credits`;
    const req = this._http.get<CelebrityResponse>(url);
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._celebrityDetailsGroupKey, this._ttl, this._delayType);
    } else {
      return this._cache.loadFromObservable(url, req, this._celebrityDetailsGroupKey, this._ttl);
    }
  }

}
