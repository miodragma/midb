interface KnownFor {
  poster_path: string;
  title: string;
}

export interface Actor {
  id: number;
  profile_path: string;
  name: string;
  known_for: KnownFor[];
}
