import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { SeasonsService } from '../../../shared/services/seasons.service';
import { SeasonList } from '../../../shared/interfaces/season-list/season-list.interface';

@Component({
  templateUrl: 'seasons-list.page.html',
  styleUrls: [ 'seasons-list.page.scss' ]
})
export class SeasonsListPage implements OnInit {

  tvShowId$: Observable<number>;
  seasonList$: Observable<SeasonList[]>;

  constructor(
    private _route: ActivatedRoute,
    private _navCtrl: NavController,
    private _seasonsService: SeasonsService) {
  }

  ngOnInit() {
    this.seasonList$ = this._seasonsService.seasonsList;
    this.tvShowId$ = this._route.paramMap
      .pipe(
        filter(params => params.has('id')),
        map(param => +param.get('id'))
      );
  }

  navigate() {
    this._navCtrl.back();
  }

}
