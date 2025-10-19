import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AinAvatar from './AinAvatar.jsx';

const cortexVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.95 },
};

const generateInsight = (profile, modules) => {
  if (!modules.length) {
    return 'I am standing by to map your next growth vector whenever you are ready.';
  }

  const strongest = [...modules].sort((a, b) => b.progress - a.progress)[0];
  const lowest = [...modules].sort((a, b) => a.progress - b.progress)[0];
  const energy = Number(profile.energyLevel ?? 6);
  const stress = Number(profile.stressLevel ?? 4);

  const energyCue = energy > 7 ? 'your high momentum' : energy < 4 ? 'your current low energy window' : 'your steady cadence';
  const stressCue = stress > 6 ? 'Let’s diffuse the overload with micro-breaks and grounding rituals.' : 'Keep harmonizing micro-recoveries to stay in flow.';

  return `I notice ${energyCue} and see ${strongest.title} trending strongest while ${lowest.title} could use a nudge. ${stressCue}`;
};

const AinCortex = ({ profile, modules }) => {
  const [open, setOpen] = useState(false);
  const insight = useMemo(() => generateInsight(profile, modules), [profile, modules]);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="cortex"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cortexVariants}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-72 rounded-3xl border border-white/10 bg-[#0C142B]/90 p-4 text-sm text-white/80 shadow-xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3">
              <AinAvatar size="sm" speaking />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-ain-amber/80">Ain’s Cortex</p>
                <p className="font-semibold text-white">Live insight</p>
              </div>
            </div>
            <p className="mt-3 leading-relaxed">{insight}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group relative flex items-center gap-3 rounded-full border border-ain-amber/60 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-glow backdrop-blur-xl transition hover:scale-[1.05]"
        whileTap={{ scale: 0.96 }}
      >
        <AinAvatar size="sm" speaking={open} />
        <span>{open ? 'Hide Cortex' : 'Ain’s Cortex'}</span>
      </motion.button>
    </div>
  );
};

export default AinCortex;
