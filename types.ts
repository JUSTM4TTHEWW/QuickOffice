
export type ModuleType = 'word' | 'excel' | 'powerpoint';

export interface User {
  userid: string;
  first_name: string;
  last_name: string;
  email: string;
  url_address: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Tools' | 'Features';
}

export interface ModuleData {
  id: ModuleType;
  title: string;
  icon: string;
  color: string;
  description: string;
  questions: Question[];
}

export interface GearItem {
  id: string;
  name: string;
  type: 'head' | 'weapon' | 'shield' | 'cape';
  icon: string;
  description: string;
  unlockedBy?: string; // module id or quest id
}

export interface UserProgress {
  xp: number;
  level: number;
  avatarBase: string; // URL or base64
  avatarColor: string; // hex or tailwind color class
  selectedGear: {
    head: string | null;
    weapon: string | null;
    shield: string | null;
    cape: string | null;
  };
  unlockedGear: string[];
  word: {
    preTestScore: number | null;
    postTestScore: number | null;
    isCompleted: boolean;
  };
  excel: {
    preTestScore: number | null;
    postTestScore: number | null;
    isCompleted: boolean;
  };
  powerpoint: {
    preTestScore: number | null;
    postTestScore: number | null;
    isCompleted: boolean;
  };
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: string;
  isCompleted: boolean;
  xpReward: number;
}
