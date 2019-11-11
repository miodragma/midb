import { Cast } from './cast.interface';
import { Crew } from './crew.interface';
import { Guest } from './guest.interface';

export interface Credits {
  cast: Cast[];
  crew: Crew[];
  guest_stars: Guest[];
}
