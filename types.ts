
export interface Language {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  code: string;
  language: Language;
  feedback: string;
  timestamp: string;
}
