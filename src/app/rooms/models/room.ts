import { Desk } from './desk';

export interface Room {
  nb: number;
  name: string;

  width: number;
  height: number;

  load: number;
  maxLoad: number;

  desks: Array<Desk>;
}
