import { SimilarResults } from './similar-results.interface';

export interface Similar {
  page: number;
  results: SimilarResults[];
  total_pages: number;
  total_results: number;
}
