import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../../shared/interfaces/movies/movie-response.interface';
import { Actor } from '../../../shared/interfaces/actors/actor.interface';
import { IonSlides } from '@ionic/angular';
import { CelebritiesService } from '../../services/celebrities.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'celebrities.page.html',
  styleUrls: [ 'celebrities.page.scss' ]
})
export class CelebritiesPage implements OnInit {

  slideOpts = {
    observer: true,
    // allowTouchMove: false,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 500
  };

  actors$: Observable<MovieResponse<Actor>>;
  slides$: Observable<MovieResponse<Actor>>;

  private _value = '';
  private _page = null;

  get val() {
    return this._value;
  }

  constructor(private _service: CelebritiesService, private _router: Router) {
  }

  ngOnInit() {
    this.actors$ = this._service.findActorsList;
    this._service.findAllActorTrendings();
    this.slides$ = this._service.findAllSlides;
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  forceReload(refresher) {
    this._value && this._service.findMoreActorsByValue(this._value, this._page, refresher);
  }

  onSearch(value) {
    this._value = value;
    value && this._service.findAllActors(value, 1);
    value === '' && this._service.removeActorsFromList();
  }

  more(page: number) {
    const newPage = page + 1;
    this._page = newPage;
    this._service.findMoreActorsByValue(this._value, newPage);
  }

  checkActor(actor: Actor) {
    this._router.navigate([ `details/celebrities/${actor.id}` ]);
  }

}
