import { Event } from '@/types/calendar';

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team sync',
    startDate: new Date(2024, 3, 15, 10, 0),
    endDate: new Date(2024, 3, 15, 11, 30),
    category: 'meeting',
    color: 'bg-blue-200 dark:bg-blue-800',
  },
  {
    id: '2',
    title: 'Summer Vacation',
    description: 'Family trip to Italy',
    startDate: new Date(2024, 7, 1),
    endDate: new Date(2024, 7, 14),
    category: 'holiday',
    color: 'bg-green-200 dark:bg-green-800',
  },
  {
    id: '3',
    title: 'Project Deadline',
    description: 'Final delivery of the React project',
    startDate: new Date(2024, 3, 20),
    endDate: new Date(2024, 3, 20),
    category: 'work',
    color: 'bg-red-200 dark:bg-red-800',
  },
];