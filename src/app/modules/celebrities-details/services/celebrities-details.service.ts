import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CelebrityResponse } from '../interfaces/celebrity-response.interface';

@Injectable()
export class CelebritiesDetailsService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {
  }

  findDetailsById(id: number) {
    return this._http.get<CelebrityResponse>(`${this.url}/person/${id}?${this.apiKey}&language=en-US&include_image_language=en,null&append_to_response=images,combined_credits`);
  }

}
