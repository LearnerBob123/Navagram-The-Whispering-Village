export interface Position {
  x: number;
  y: number;
  name?: string;
}

export interface ChatMessage {
  sender: 'player' | 'npc';
  text: string;
}

export interface ChatOption {
  label: string;
  onClick: () => void;
}

export interface Rumor {
  id: string;
  text: string;
  isTrue: boolean;
  credibility: number;
  verificationLocation?: Position;
  tags: string[];
  category: string;
}

export interface Location {
  id: string;
  name: string;
  emoji: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  border: string;
  clue?: string;
}
