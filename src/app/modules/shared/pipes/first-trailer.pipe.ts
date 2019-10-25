import { Pipe, PipeTransform } from '@angular/core';
import { VideoResults } from '../interfaces/videos/video-results.interface';

@Pipe({ name: 'firstTrailer' })
export class FirstTrailer implements PipeTransform {
  transform(value: VideoResults[]): string {
    if (value !== null) {
      if (value.length) {
        return value.find(trailer => trailer.type === 'Trailer').key;
      }
    }
  }

}
