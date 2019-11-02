import { Component } from '@angular/core';
import { TabsService } from '../../services/tabs.service';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: [ 'tabs.page.scss' ]
})
export class TabsPage {

  constructor(private _tabsService: TabsService) {
  }

  clickTab(tab: string) {
    this._tabsService.changeTab(tab);
  }

}
