export interface ITechnology {
  name: string;
  rating: number;
}

export interface IProfile {
  name: string;
  role: string;

  technologies: ITechnology[];
}
