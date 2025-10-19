const baseModules = [
  {
    id: 'financial',
    title: 'Financial Health',
    description: 'Track cashflow, savings momentum, and mindful spending pulses.',
    baseProgress: 62,
    baseTrend: 4,
  },
  {
    id: 'wellness',
    title: 'Physical Wellness',
    description: 'Energy rituals, recovery rhythm, and biomarker snapshots.',
    baseProgress: 55,
    baseTrend: 3,
  },
  {
    id: 'spiritual',
    title: 'Spiritual Growth',
    description: 'Meditation cadence, reflection depth, and gratitude resonance.',
    baseProgress: 48,
    baseTrend: 5,
  },
  {
    id: 'habits',
    title: 'Habit Strength',
    description: 'Daily habits, streak integrity, and friction diagnostics.',
    baseProgress: 68,
    baseTrend: 6,
  },
  {
    id: 'career',
    title: 'Career Progress',
    description: 'Impact score, learning sprints, and opportunity radar.',
    baseProgress: 57,
    baseTrend: 2,
  },
];

export const moduleDictionary = {
  financial: 'Financial Health',
  wellness: 'Physical Wellness',
  spiritual: 'Spiritual Growth',
  habits: 'Habit Strength',
  career: 'Career Progress',
};

export default baseModules;
