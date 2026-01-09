export type EventStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Participant {
  id: number;
  name: string;
  email: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  status: EventStatus;
  description: string;
  participants: Participant[];
}


