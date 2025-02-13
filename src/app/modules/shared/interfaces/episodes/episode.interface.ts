import { Video } from '../videos/video.interface';
import { OmdbDetails } from '../omdb/omdb-details.interface';
import { ExternalIds } from '../external-ids/external-ids.interface';
import { Credits } from '../credits/credits.interface';
import { Stills } from './stills.interface';

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  videos: Video;
  images: Stills;
  omdbDetails: OmdbDetails;
  external_ids: ExternalIds;
  credits: Credits;
}
