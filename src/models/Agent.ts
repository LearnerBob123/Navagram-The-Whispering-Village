import { Position } from '../types';

export class Agent {
  id: number;
  name: string;
  color: string;
  pos: Position;
  isBackground: boolean = false;
  role?: string;
  title?: string;
  intro?: string;
  isStationary?: boolean;
  knownRumors: string[] = [];

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.pos = { x: 0, y: 0 };
  }

  move() {
    if (this.isStationary) return;
    const dx = Math.floor(Math.random() * 3) - 1;
    const dy = Math.floor(Math.random() * 3) - 1;
    this.pos.x = Math.max(0, Math.min(39, this.pos.x + dx));
    this.pos.y = Math.max(0, Math.min(39, this.pos.y + dy));
  }
}
