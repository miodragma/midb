import { CelebrityCast } from './celebrity-cast.interface';
import { CelebrityCrew } from './celebrity-crew.interface';
import { BackdropAndPosters } from '../../shared/interfaces/images/backdrop-and-posters.interface';

export interface CelebrityResponse {
  adult: boolean;
  also_known_as: [];
  biography: string;
  birthday: string;
  combined_credits: { cast: CelebrityCast[], crew: CelebrityCrew[] };
  deathday: null;
  gender: number;
  homepage: null;
  id: number;
  images: { profiles: BackdropAndPosters[] };
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}
