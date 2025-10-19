import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Onboarding from './components/Onboarding.jsx';
import Dashboard from './components/Dashboard.jsx';
import AinCortex from './components/AinCortex.jsx';
import AinAvatar from './components/AinAvatar.jsx';
import baseModules from './data/modules.js';

const questions = [
  {
    id: 'name',
    type: 'text',
    prompt: 'First things first — what should Ain call you inside MyLifeOS?',
    supportText: 'Personalizing your salutation lets Ain weave your rituals and reflections in a way that sounds like you.',
    placeholder: 'Type your name or a call-sign you resonate with…',
  },
  {
    id: 'focusAreas',
    type: 'multi-select',
    prompt: 'Which realms of your life are top priority for Ain to orchestrate right now?',
    supportText: 'Select the constellations you want your Unified Data Graph to pulse on for the next 30 days.',
    minSelect: 1,
    options: [
      {
        value: 'financial',
        label: 'Financial Health',
        description: 'Cashflow clarity, investing rhythm, wealth stability.',
      },
      {
        value: 'wellness',
        label: 'Physical Wellness',
        description: 'Energy systems, recovery, and micro-habit loops.',
      },
      {
        value: 'spiritual',
        label: 'Spiritual Growth',
        description: 'Presence practice, gratitude resonance, inner clarity.',
      },
      {
        value: 'habits',
        label: 'Habit Strength',
        description: 'Streak intelligence, habit friction, ritual design.',
      },
      {
        value: 'career',
        label: 'Career Progress',
        description: 'Impact, learning sprints, and opportunity radar.',
      },
    ],
  },
  {
    id: 'energyLevel',
    type: 'range',
    prompt: 'Where is your vitality meter right now?',
    supportText: 'Helps Ain calibrate the intensity of daily nudges and replenishment rituals.',
    min: 1,
    max: 10,
    default: 6,
    minLabel: 'Running low',
    maxLabel: 'Fully charged',
  },
  {
    id: 'stressLevel',
    type: 'range',
    prompt: 'How charged is your nervous system this week?',
    supportText: 'Stress levels shape how much recovery vs. acceleration Ain threads into your plan.',
    min: 1,
    max: 10,
    default: 4,
    minLabel: 'Calm waters',
    maxLabel: 'High voltage',
  },
  {
    id: 'guidingWord',
    type: 'text',
    prompt: 'What single word captures how you want to feel over the next month?',
    supportText: 'This becomes the emotional tone for Ain’s insights, rituals, and weekly reflections.',
    placeholder: 'e.g. Grounded, Expansive, Courageous…',
  },
  {
    id: 'preferredCadence',
    type: 'choice',
    prompt: 'When do you prefer Ain to sync with you for micro check-ins?',
    supportText: 'Choosing a cadence ensures Ain nudges you when it’s most natural.',
    options: [
      { value: 'morning', label: 'Morning orbit', description: 'Launch the day with clarity and priming rituals.' },
      { value: 'midday', label: 'Midday recalibration', description: 'Align during your midday pulse check.' },
      { value: 'evening', label: 'Evening integration', description: 'Unwind and integrate learnings before rest.' },
    ],
  },
  {
    id: 'growthEdge',
    type: 'text',
    prompt: 'Describe the growth edge you’re leaning into right now.',
    supportText: 'Ain references this when proposing experiments and reframing insight loops.',
    placeholder: 'Share a sentence or two…',
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const generateModuleInsight = (moduleId, profile, progress) => {
  const guidingWord = profile.guidingWord?.trim();
  const cadence = profile.preferredCadence;
  const growthEdge = profile.growthEdge?.trim();

  switch (moduleId) {
    case 'financial':
      return `Channel ${guidingWord || 'stability'} by pairing a ${cadence === 'morning' ? 'dawn' : 'daily'} capital check with micro-savings rituals. Your growth edge — ${
        growthEdge || 'staying intentional'
      } — syncs well with mindful spending scans.`;
    case 'wellness':
      return `Your vitality curve sits at ${progress}%. Layer short breathwork bursts ${
        cadence === 'midday' ? 'after lunch' : cadence === 'evening' ? 'before shutdown' : 'during sunrise stretches'
      } to amplify recovery.`;
    case 'spiritual':
      return `Protect a 7-minute stillness window ${
        cadence === 'evening' ? 'before sleep' : 'after your key transition'
      } so ${guidingWord || 'presence'} becomes your baseline frequency.`;
    case 'habits':
      return `Ain recommends anchoring your keystone habit to an existing ritual. ${
        guidingWord ? `Let “${guidingWord}” guide each cue-response.` : 'Name the feeling you want each habit to unlock.'
      }`;
    case 'career':
      return `Aim weekly deep work at your declared edge — ${
        growthEdge || 'elevating your craft'
      }. Combine with a ${cadence || 'daily'} reflection to track opportunity radar.`;
    default:
      return 'Ain is synthesizing more signals to craft your next step.';
  }
};

const deriveModules = (profile) => {
  const focusAreas = profile.focusAreas ?? [];
  const selected = focusAreas.length
    ? baseModules.filter((module) => focusAreas.includes(module.id))
    : baseModules.slice(0, 3);

  const energyDelta = Number(profile.energyLevel ?? 6) - 5;
  const stressDelta = Number(profile.stressLevel ?? 4) - 4;

  return selected.map((module) => {
    const tunedProgress = clamp(Math.round(module.baseProgress + energyDelta * 3 - stressDelta * 2), 28, 96);
    const tunedTrend = clamp(Math.round(module.baseTrend + energyDelta * 0.7 - stressDelta * 0.4), 1, 12);

    return {
      ...module,
      progress: tunedProgress,
      trend: tunedTrend,
      insight: generateModuleInsight(module.id, profile, tunedProgress),
    };
  });
};

const App = () => {
  const [phase, setPhase] = useState('landing');
  const [profile, setProfile] = useState(null);
  const [modules, setModules] = useState([]);
  const [initialAnswers, setInitialAnswers] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('mylifeos_profile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        setModules(deriveModules(parsed));
        setPhase('dashboard');
        setInitialAnswers(parsed);
      } catch (error) {
        console.error('Failed to parse stored profile', error);
      }
    }
  }, []);

  const handleStart = () => {
    setPhase('onboarding');
  };

  const handleComplete = (responses) => {
    const enrichedProfile = {
      ...responses,
      lastUpdated: new Date().toISOString(),
    };
    const tunedModules = deriveModules(enrichedProfile);
    window.localStorage.setItem('mylifeos_profile', JSON.stringify(enrichedProfile));
    setProfile(enrichedProfile);
    setModules(tunedModules);
    setPhase('building');

    setTimeout(() => {
      setPhase('dashboard');
    }, 2200);
  };

  const landingContent = (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 text-center"
    >
      <AinAvatar size="lg" />
      <h1 className="mt-10 text-4xl font-semibold leading-tight md:text-6xl">
        <span className="bg-gradient-to-r from-ain-amber to-ain-emerald bg-clip-text text-transparent">
          Your AI-driven LifeOS for unified personal optimization.
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-white/75">
        Welcome to MyLifeOS — a cosmic workspace where Ain, your adaptive owl intelligence, orchestrates rituals,
        metrics, and meaning into a single unified experience.
      </p>
      <motion.button
        type="button"
        onClick={handleStart}
        className="mt-10 flex items-center gap-3 rounded-full bg-gradient-to-r from-ain-amber via-ain-amber/80 to-ain-emerald px-7 py-3 text-base font-semibold text-[#050B1A] shadow-glow transition hover:scale-[1.04]"
        whileTap={{ scale: 0.96 }}
      >
        <AinAvatar size="sm" />
        Start with Ain
      </motion.button>
    </motion.div>
  );

  const onboardingContent = (
    <motion.div
      key="onboarding"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Onboarding questions={questions} onComplete={handleComplete} initialAnswers={initialAnswers} />
    </motion.div>
  );

  const buildingContent = (
    <motion.div
      key="building"
      className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={{ rotate: [0, 8, -6, 0], scale: [1, 1.02, 0.98, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-full border border-ain-amber/40 bg-white/5 p-6 backdrop-blur-xl shadow-glow"
      >
        <AinAvatar size="lg" speaking />
      </motion.div>
      <p className="mt-8 text-sm uppercase tracking-[0.45em] text-ain-amber/70">Synthesizing signals</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Building your Unified Data Graph…</h2>
      <p className="mt-3 max-w-xl text-base text-white/70">
        Ain is weaving your preferences into modular dashboards and preparing the first wave of adaptive insights.
      </p>
      <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-ain-amber via-ain-emerald to-ain-amber"
          initial={{ x: '-100%' }}
          animate={{ x: ['-100%', '0%', '100%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );

  const dashboardContent = profile ? (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Dashboard profile={profile} modules={modules} />
    </motion.div>
  ) : null;

  const contentMap = {
    landing: landingContent,
    onboarding: onboardingContent,
    building: buildingContent,
    dashboard: dashboardContent,
  };

  const activeContent = contentMap[phase] ?? landingContent;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050B1A] text-white">
      <div className="starfield" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <AnimatePresence mode="wait">{activeContent}</AnimatePresence>
      </div>
      {phase === 'dashboard' && profile ? <AinCortex profile={profile} modules={modules} /> : null}
    </div>
  );
};

export default App;
