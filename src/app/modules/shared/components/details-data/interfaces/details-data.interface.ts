import { Observable } from 'rxjs';

export interface DetailsData<T> {

  apiKey: string;
  url: string;

  findDetailsById(id: number, refresher?): Observable<T>;
}
