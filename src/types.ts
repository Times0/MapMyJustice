export interface LegalCase {
  id: string;
  title: string;
  summary: string;
  year: number;
  category: string;
  position: [number, number, number];
  color: string;
  cluster: string;
}

export interface Cluster {
  name: string;
  color: string;
  center: [number, number, number];
}