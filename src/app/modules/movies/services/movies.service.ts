import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MoviesService {

  constructor(private _http: HttpClient) {
  }

  findAllSlides(): Observable<{ url: string }[]> {
    return of<{ url: string }[]>([
      { url: './assets/slides/1.jpg' },
      { url: './assets/slides/2.jpg' },
      { url: './assets/slides/3.jpg' },
      { url: './assets/slides/4.jpg' },
      { url: './assets/slides/5.jpg' },
      { url: './assets/slides/6.jpg' },
      { url: './assets/slides/7.jpg' },
      { url: './assets/slides/8.jpg' }
    ]);
  }

}
