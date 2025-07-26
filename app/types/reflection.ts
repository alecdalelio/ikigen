export interface ReflectionData {
  love: string;
  goodAt: string;
  worldNeeds: string;
  paidFor: string;
}

export interface ReflectionStep {
  id: keyof ReflectionData;
  title: string;
  question: string;
  placeholder: string;
  route: string;
  nextRoute?: string;
}

export const REFLECTION_STEPS: ReflectionStep[] = [
  {
    id: 'love',
    title: 'What You Love',
    question: 'What do you love doing?',
    placeholder: 'Think about activities that bring you joy, excitement, or fulfillment. What could you spend hours doing without getting tired? What makes you lose track of time?',
    route: '/reflect/love',
    nextRoute: '/reflect/good-at'
  },
  {
    id: 'goodAt',
    title: 'What You\'re Good At',
    question: 'What are you naturally good at?',
    placeholder: 'Consider your skills, talents, and abilities. What do others often compliment you on? What comes easily to you? What have you been doing for a long time?',
    route: '/reflect/good-at',
    nextRoute: '/reflect/world-needs'
  },
  {
    id: 'worldNeeds',
    title: 'What the World Needs',
    question: 'What does the world need?',
    placeholder: 'Think about problems you see in the world, your community, or your field. What gaps exist that you could help fill? What would make a positive impact?',
    route: '/reflect/world-needs',
    nextRoute: '/reflect/paid-for'
  },
  {
    id: 'paidFor',
    title: 'What You Can Be Paid For',
    question: 'What can you be paid for?',
    placeholder: 'Consider how your passions and skills could create value for others. What services or products could you offer? What would people be willing to pay for?',
    route: '/reflect/paid-for',
    nextRoute: '/reflect/summary'
  }
]; 