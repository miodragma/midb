import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../../shared/interfaces/movies/movie-response.interface';
import { Actor } from '../../../shared/interfaces/actors/actor.interface';
import { IonContent, IonSlides } from '@ionic/angular';
import { CelebritiesService } from '../../services/celebrities.service';

@Component({
  templateUrl: 'celebrities.page.html',
  styleUrls: [ 'celebrities.page.scss' ]
})
export class CelebritiesPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  slideOpts = {
    // allowTouchMove: false,
    autoplay: true,
    // slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000
  };

  actors$: Observable<MovieResponse<Actor>>;
  slides$: Observable<MovieResponse<Actor>>;

  private _value = '';

  constructor(private _service: CelebritiesService) {
  }

  ngOnInit() {
    this.actors$ = this._service.findActorsList;
    this._service.findAllActorTrendings();
    this.slides$ = this._service.findAllSlides;
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  onSearch(value) {
    this._value = value;
    value && this._service.findAllActors(value, 1);
    value === '' && this._service.removeActorsFromList();
  }

  more(page: number) {
    const newPage = page + 1;
    this._service.findMoreActorsByValue(this._value, newPage);
  }

  checkActor(actor: Actor) {
    console.log(actor);
  }

  clickScroll() {
    this.content.scrollToTop(1000);
  }

}
