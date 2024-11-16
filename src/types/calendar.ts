export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: 'work' | 'personal' | 'holiday' | 'meeting';
  color: string;
}

export interface EventFormData {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: Event['category'];
}