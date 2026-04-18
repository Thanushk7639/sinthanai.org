import { HiCalendarDays, HiMapPin, HiClock } from 'react-icons/hi2';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  accentBg: string;
  galleryFolder: string;
  icon: typeof HiCalendarDays;
}

export const events: Event[] = [
  {
    id: 'graduation-2024',
    title: 'Graduation Ceremony 2024',
    date: 'December 20, 2024',
    time: '10:00 AM',
    location: 'Kotagala, Sri Lanka',
    description: "Celebrating our students' achievements and milestones at our annual graduation ceremony. A memorable event honoring the hard work and dedication of our graduates.",
    accentBg: 'bg-brand-red',
    galleryFolder: 'gallery/Graduation Ceremony 2023',
    icon: HiCalendarDays,
  },
  {
    id: 'philosophy-2024',
    title: 'International Philosophy Day 2024',
    date: 'November 21, 2024',
    time: '9:00 AM',
    location: 'Kotagala, Sri Lanka',
    description: 'Exploring philosophical thinking in contemporary society with engaging discussions and activities. Celebrating intellectual development through philosophy.',
    accentBg: 'bg-brand-ink',
    galleryFolder: 'gallery/Graduation Ceremony 2020',
    icon: HiCalendarDays,
  },
  {
    id: 'environmental-2024',
    title: 'Environmental Day 2024',
    date: 'June 5, 2024',
    time: '9:00 AM',
    location: 'Kotagala, Sri Lanka',
    description: 'Community engagement event promoting environmental awareness and sustainable practices. A day of activities focused on protecting our environment.',
    accentBg: 'bg-brand-teal',
    galleryFolder: 'gallery/International Enviornmental Day 2023',
    icon: HiCalendarDays,
  },
  {
    id: 'graduation-2023',
    title: 'Graduation Ceremony 2023',
    date: 'January 13, 2024',
    time: '10:00 AM',
    location: 'Kotagala, Sri Lanka',
    description: 'Celebration of the 2023 batch graduates with certificate distribution and cultural performances. Honoring the achievements of our dedicated students.',
    accentBg: 'bg-brand-red',
    galleryFolder: 'gallery/Graduation Ceremony 2021',
    icon: HiCalendarDays,
  },
  {
    id: 'philosophy-2023',
    title: 'International Philosophy Day 2023',
    date: 'November 16, 2023',
    time: '9:00 AM',
    location: 'Kotagala, Sri Lanka',
    description: 'Annual celebration of intellectual development through philosophy, discussions, and contemplative activities.',
    accentBg: 'bg-brand-ink',
    galleryFolder: 'gallery/Certificate Awarding of Rapid Learning Programmes - 2020',
    icon: HiCalendarDays,
  },
  {
    id: 'youth-2023',
    title: 'International Youth Day 2023',
    date: 'August 12, 2023',
    time: '10:00 AM',
    location: 'Kotagala, Sri Lanka',
    description: 'Event addressing contemporary youth challenges with panel discussions and interactive workshops.',
    accentBg: 'bg-brand-teal',
    galleryFolder: 'gallery/Interactive English Session',
    icon: HiCalendarDays,
  },
];