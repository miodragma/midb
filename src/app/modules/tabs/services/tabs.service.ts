import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TabsService {

  private _tabClicked = new BehaviorSubject<string>('');

  get tabClicked() {
    return this._tabClicked.asObservable();
  }

  changeTab(tab: string) {
    this._tabClicked.next(tab);
  }

}
