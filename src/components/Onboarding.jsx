import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AinAvatar from './AinAvatar.jsx';

const bubbleVariants = {
  hidden: { opacity: 0, x: 40 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const Onboarding = ({ questions, onComplete, initialAnswers = {} }) => {
  const sanitizedInitialAnswers = useMemo(() => {
    if (initialAnswers && typeof initialAnswers === 'object') {
      return initialAnswers;
    }
    return {};
  }, [initialAnswers]);

  const starter = useMemo(() => {
    return questions.reduce((acc, question) => {
      const storedValue = sanitizedInitialAnswers[question.id];

      if (question.type === 'multi-select') {
        acc[question.id] = Array.isArray(storedValue) ? storedValue : [];
      } else if (question.type === 'range') {
        acc[question.id] =
          typeof storedValue === 'number'
            ? storedValue
            : question.default ?? Math.round((question.min + question.max) / 2);
      } else if (question.type === 'choice') {
        acc[question.id] = typeof storedValue === 'string' ? storedValue : '';
      } else {
        acc[question.id] = typeof storedValue === 'string' ? storedValue : '';
      }
      return acc;
    }, {});
  }, [questions, sanitizedInitialAnswers]);

  const [answers, setAnswers] = useState(starter);

  useEffect(() => {
    setAnswers(starter);
  }, [starter]);
  const [index, setIndex] = useState(0);
  const current = questions[index];

  const handleNext = () => {
    if (index === questions.length - 1) {
      onComplete(answers);
      return;
    }
    setIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
  };

  const toggleOption = (option) => {
    setAnswers((prev) => {
      const existing = prev[current.id] ?? [];
      const hasOption = existing.includes(option);
      return {
        ...prev,
        [current.id]: hasOption ? existing.filter((item) => item !== option) : [...existing, option],
      };
    });
  };

  const setValue = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: value,
    }));
  };

  const isValid = () => {
    const value = answers[current.id];
    if (current.type === 'multi-select') {
      return Array.isArray(value) && value.length >= (current.minSelect ?? 1);
    }
    if (current.type === 'range') {
      return typeof value === 'number';
    }
    return value && value.toString().trim().length > 0;
  };

  const completion = Math.round(((index + 1) / questions.length) * 100);

  const renderInput = () => {
    if (current.type === 'multi-select') {
      const selected = answers[current.id] ?? [];
      return (
        <div className="grid grid-cols-2 gap-3 mt-6">
          {current.options.map((option) => {
            const active = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`rounded-2xl border border-white/10 px-4 py-3 text-left backdrop-blur-md transition shadow-inner hover:border-ain-amber/60 hover:shadow-glow ${
                  active ? 'bg-white/15 border-ain-amber/80 shadow-glow' : 'bg-white/5'
                }`}
              >
                <div className="font-semibold text-white">{option.label}</div>
                <div className="text-sm text-white/70">{option.description}</div>
              </button>
            );
          })}
        </div>
      );
    }

    if (current.type === 'range') {
      const value = answers[current.id] ?? current.default ?? Math.round((current.min + current.max) / 2);
      return (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>{current.minLabel ?? current.min}</span>
            <span className="font-semibold text-ain-amber">{value}</span>
            <span>{current.maxLabel ?? current.max}</span>
          </div>
          <input
            type="range"
            min={current.min}
            max={current.max}
            step={current.step ?? 1}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="w-full accent-ain-amber"
          />
        </div>
      );
    }

    if (current.type === 'choice') {
      const value = answers[current.id] ?? '';
      return (
        <div className="flex flex-wrap gap-3 mt-6">
          {current.options.map((option) => {
            const active = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue(option.value)}
                className={`rounded-2xl border border-white/10 px-4 py-2 backdrop-blur-md transition hover:border-ain-amber/70 hover:shadow-glow ${
                  active ? 'bg-white/15 border-ain-amber/70 shadow-glow' : 'bg-white/5'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
                {option.description ? <div className="text-xs text-white/70">{option.description}</div> : null}
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <textarea
        value={answers[current.id] ?? ''}
        onChange={(event) => setValue(event.target.value)}
        placeholder={current.placeholder}
        rows={3}
        className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 backdrop-blur-md focus:border-ain-amber/70 focus:outline-none focus:ring-0"
      />
    );
  };

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-ain-amber/80">Guided by Ain</p>
          <h2 className="mt-1 text-2xl font-semibold">Adaptive Onboarding</h2>
        </div>
        <div className="text-sm text-white/70">{completion}% complete</div>
      </div>

      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-ain-amber to-ain-emerald"
          initial={{ width: 0 }}
          animate={{ width: `${completion}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative rounded-3xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-xl shadow-xl">
        <div className="absolute -top-10 left-6">
          <AinAvatar speaking />
        </div>
        <div className="mt-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              variants={bubbleVariants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-3xl bg-[#0C142B]/80 px-5 py-6 text-lg text-white/90 shadow-inner"
            >
              <p className="font-semibold text-white">{current.prompt}</p>
              <p className="mt-2 text-base text-white/70">{current.supportText}</p>
              {renderInput()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={index === 0}
          className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 transition hover:border-ain-amber/60 hover:text-white disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/30"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid()}
          className="rounded-full bg-gradient-to-r from-ain-amber via-ain-amber/80 to-ain-emerald px-6 py-3 text-sm font-semibold text-[#050B1A] shadow-glow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
        >
          {index === questions.length - 1 ? 'Generate Dashboard' : 'Next with Ain'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
