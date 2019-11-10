import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Season } from '../../../shared/interfaces/season-list/season.interface';
import { EpisodesService } from '../../services/episodes.service';

@Component({
  templateUrl: 'episodes-list.page.html',
  styleUrls: [ 'episodes-list.page.scss' ]
})
export class EpisodesListPage {

  season$: Observable<Season>;
  seasonNumber: string;

  constructor(
    private _route: ActivatedRoute,
    private _navCtrl: NavController,
    private _episodesService: EpisodesService) {
  }

  ionViewWillEnter() {
    this._route.paramMap
      .pipe(
        filter(params => !!params.has('seasonId') && !!params.has('id')),
        tap(param => {
          this.seasonNumber = param.get('seasonId');
          this.season$ = this._episodesService.findAllEpisodesList(+param.get('seasonId'), +param.get('id'));
        })
      )
      .subscribe();
  }

  onEpisodeClicked(episodeId: number) {
    console.log(episodeId);
  }

  navigate() {
    this._navCtrl.back();
  }

}
