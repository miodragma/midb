import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Season } from '../../../shared/interfaces/season-list/season.interface';
import { EpisodesService } from '../../services/episodes.service';

@Component({
  templateUrl: 'episodes-list.page.html',
  styleUrls: [ 'episodes-list.page.scss' ]
})
export class EpisodesListPage implements OnInit {

  season$: Observable<Season>;
  seasonNumber: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _navCtrl: NavController,
    private _episodesService: EpisodesService) {
  }

  ngOnInit() {
    this._route.paramMap
      .pipe(
        filter(params => !!params.has('seasonNumber') && !!params.has('id')),
        tap(param => {
          this.seasonNumber = param.get('seasonNumber');
          this.season$ = this._episodesService.findAllEpisodesList(+param.get('seasonNumber'), +param.get('id'));
        })
      )
      .subscribe();
  }

  navigate() {
    this._navCtrl.back();
  }

}
