export interface Actor {
  id: number;
  profile_path: string;
  name: string;
  known_for: {
    poster_path: string,
    title: string
  }[];
}
