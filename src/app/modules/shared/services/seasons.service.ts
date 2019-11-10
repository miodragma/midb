import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SeasonList } from '../interfaces/season-list/season-list.interface';

@Injectable({ providedIn: 'root' })
export class SeasonsService {

  constructor(private _http: HttpClient) {
  }

  private _seasonsList = new BehaviorSubject<SeasonList[]>([]);

  get seasonsList() {
    return this._seasonsList.asObservable();
  }

  addAllSeasons(seasons: SeasonList[]) {
    this._seasonsList.next(seasons);
  }

}
