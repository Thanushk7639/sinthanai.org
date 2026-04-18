import { HiLanguage, HiComputerDesktop, HiLightBulb, HiHeart, HiGlobeAlt } from 'react-icons/hi2';

export interface Program {
  id: string;
  key: string;
  icon: typeof HiLanguage;
  num: string;
  accentBg: string;
  accentLight: string;
  accentText: string;
}

export const programs: Program[] = [
  { id: 'spoken_english', key: 'spoken_english', icon: HiLanguage, num: '01', accentBg: 'bg-brand-red', accentLight: 'bg-white/15', accentText: 'text-white' },
  { id: 'it_skills', key: 'it_skills', icon: HiComputerDesktop, num: '02', accentBg: 'bg-brand-teal', accentLight: 'bg-white/15', accentText: 'text-white' },
  { id: 'philosophy', key: 'philosophy', icon: HiLightBulb, num: '03', accentBg: 'bg-brand-red', accentLight: 'bg-white/15', accentText: 'text-white' },
  { id: 'food_thought', key: 'food_thought', icon: HiHeart, num: '04', accentBg: 'bg-brand-teal', accentLight: 'bg-white/15', accentText: 'text-white' },
  { id: 'skype_english', key: 'skype_english', icon: HiGlobeAlt, num: '05', accentBg: 'bg-brand-red', accentLight: 'bg-white/15', accentText: 'text-white' },
];

export interface ProgramDetail extends Program {
  title: string;
  overview: string;
  whatWeDo: string[];
  whyItMatters: string;
  outcome: string;
  keyFeatures?: string[];
}

export const programsDetail: ProgramDetail[] = [
  {
    id: 'spoken_english',
    key: 'spoken_english',
    icon: HiLanguage,
    num: '01',
    accentBg: 'bg-brand-red',
    accentLight: 'bg-white/15',
    accentText: 'text-white',
    title: 'Interactive Language Development',
    overview: 'Communication is a foundational skill for personal and professional success. This program focuses on developing strong language abilities through structured learning and interactive engagement.',
    whatWeDo: [
      'Training in English and Sinhala languages',
      'Vocabulary building and pronunciation improvement',
      'Group discussions, storytelling, and role-play',
      'Real-life communication scenarios',
    ],
    whyItMatters: 'Many students from underserved communities lack exposure to effective communication environments. This program ensures they gain the confidence and clarity required to express themselves in academic, professional, and social settings.',
    outcome: 'Participants become confident communicators, better prepared for higher education and workplace interactions.',
  },
  {
    id: 'it_skills',
    key: 'it_skills',
    icon: HiComputerDesktop,
    num: '02',
    accentBg: 'bg-brand-teal',
    accentLight: 'bg-white/15',
    accentText: 'text-white',
    title: 'IT & Digital Skills',
    overview: 'In today\'s digital world, technology literacy is essential. This program equips students with practical computer knowledge and digital skills required to succeed in modern careers.',
    whatWeDo: [
      'Basic computer training',
      'Internet and digital tool usage',
      'Introduction to office applications',
      'Digital communication and online collaboration',
    ],
    whyItMatters: 'Youth from plantation and rural communities often lack access to digital education. By bridging this gap, we ensure they are not left behind in an increasingly technology-driven world.',
    outcome: 'Participants gain essential digital competencies, enabling them to pursue higher education or enter the workforce with confidence.',
  },
  {
    id: 'philosophy',
    key: 'philosophy',
    icon: HiLightBulb,
    num: '03',
    accentBg: 'bg-brand-red',
    accentLight: 'bg-white/15',
    accentText: 'text-white',
    title: 'Philosophy & Critical Thinking',
    overview: 'In a fast-paced world, individuals rarely get the opportunity to reflect on the deeper aspects of life. This program introduces participants to philosophical thinking and analytical reasoning.',
    whatWeDo: [
      'Exploration of fundamental questions about life, existence, and purpose',
      'Discussions based on scientific and philosophical content',
      'Critical thinking exercises',
      'Group debates and reflective sessions',
    ],
    whyItMatters: 'Modern life often pushes individuals into a cycle of competition without reflection. This program helps participants develop clarity of thought, self-awareness, and the ability to make informed decisions.',
    outcome: 'Participants develop independent thinking skills, intellectual curiosity, and a deeper understanding of life.',
  },
  {
    id: 'food_thought',
    key: 'food_thought',
    icon: HiHeart,
    num: '04',
    accentBg: 'bg-brand-teal',
    accentLight: 'bg-white/15',
    accentText: 'text-white',
    title: 'Value Education',
    overview: 'A strong society is built on strong values. This program focuses on instilling essential human values in young individuals at an early stage of life.',
    whatWeDo: [
      'Interactive sessions with teenagers',
      'Teaching empathy, respect, and responsibility',
      'Activities that promote ethical thinking',
      'Real-life examples and guided discussions',
    ],
    whyItMatters: 'In today\'s competitive world, core human values are often overlooked, leading to self-centered attitudes. This program nurtures responsible individuals who contribute positively to society.',
    outcome: 'Participants grow into compassionate, ethical, and socially responsible individuals.',
  },
  {
    id: 'skype_english',
    key: 'skype_english',
    icon: HiGlobeAlt,
    num: '05',
    accentBg: 'bg-brand-red',
    accentLight: 'bg-white/15',
    accentText: 'text-white',
    title: 'Interactive Online English',
    overview: 'This program connects students with global volunteers to practice spoken English through live, interactive sessions.',
    whatWeDo: [
      'Weekly online sessions (1 to 1.5 hours)',
      'Conversations with international volunteers',
      'Real-world speaking practice',
      'Flexible participation via Google Meet',
    ],
    keyFeatures: [
      'Global exposure to English-speaking environments',
      'Volunteers can choose video/audio participation',
      'Designed to overcome lack of real-world language exposure',
    ],
    whyItMatters: 'Students in underserved communities often lack opportunities to practice English in real-life contexts. This initiative bridges that gap by creating a global learning environment.',
    outcome: 'Students gain confidence in spoken English, improve fluency, and develop global communication skills.',
  },
];