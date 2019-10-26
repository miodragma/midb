import { Component, Input } from '@angular/core';

@Component({
  selector: 'storyline',
  templateUrl: 'storyline.view.html',
  styleUrls: [ 'storyline.view.scss' ]
})
export class StorylineView {

  @Input() storyline: { overview: string, tagline: string };

}
