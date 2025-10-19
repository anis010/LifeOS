import { motion } from 'framer-motion';
import AinAvatar from './AinAvatar.jsx';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  enter: (index) => ({ opacity: 1, y: 0, transition: { delay: index * 0.12, duration: 0.6, ease: 'easeOut' } }),
};

const Dashboard = ({ profile, modules }) => {
  return (
    <div className="relative z-10 flex min-h-screen flex-col gap-10 px-6 pb-24 pt-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <AinAvatar size="lg" />
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-ain-amber/80">Welcome back, {profile.name || 'Visionary'}.</p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              Your Unified Personal Optimization Dashboard
            </h1>
            <p className="mt-2 max-w-xl text-base text-white/70">
              Ain harmonized your responses and tuned this dashboard to amplify the realms you care about most.
              Each module syncs with your Unified Data Graph for daily recalibration.
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm text-white/60">
          {['Home', 'Explore', 'Vision', 'Welcome'].map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-full border border-transparent px-4 py-2 transition hover:border-ain-amber/60 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-ain-amber">Focus Constellations</h2>
        <p className="mt-2 text-sm text-white/70">
          These are the realms you highlighted during onboarding. Ain continuously adapts recommendations to sustain
          momentum across each domain.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {modules.map((module) => (
            <span
              key={module.id}
              className="rounded-full border border-ain-amber/40 bg-ain-amber/10 px-4 py-2 text-sm text-ain-amber shadow-glow"
            >
              {module.title}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {modules.map((module, index) => (
          <motion.article
            key={module.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="enter"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C142B]/70 p-6 backdrop-blur-2xl transition hover:border-ain-amber/60 hover:shadow-glow"
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-30 bg-cosmic-gradient" />
            <div className="relative flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{module.title}</h3>
                <p className="mt-1 text-sm text-white/70">{module.description}</p>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-semibold text-white">{module.progress}%</span>
                  <span className="text-sm font-medium text-ain-emerald">+{module.trend}% this week</span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-ain-amber to-ain-emerald"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <p className="font-medium text-white/80">Ain observes</p>
                <p className="mt-1 leading-relaxed">{module.insight}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
