import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../../shared/interfaces/season-list/season.interface';

@Injectable()
export class EpisodesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {
  }

  findAllEpisodesList(seasonId: number, tvShowId: number): Observable<Season> {
    return this._http.get<Season>(`${this._url}/tv/${tvShowId}/season/${seasonId}?api_key=e78954865ca9c1de70cf8701f4a24d26&language=en-US`);
  }

}
