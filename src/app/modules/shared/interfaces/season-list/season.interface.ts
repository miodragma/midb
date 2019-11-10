import { EpisodeList } from './episode-list.interface';

export interface Season {
  _id: string;
  air_date: string;
  episodes: EpisodeList[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
}
