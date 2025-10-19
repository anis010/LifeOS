import { motion } from 'framer-motion';

const AinAvatar = ({ size = 'md', speaking = false }) => {
  const dimension = size === 'lg' ? 'w-24 h-24' : size === 'sm' ? 'w-12 h-12' : 'w-16 h-16';

  return (
    <motion.div
      className={`${dimension} relative rounded-full bg-gradient-to-br from-ain-amber/90 via-ain-amber/80 to-ain-emerald/60 shadow-glow flex items-center justify-center overflow-hidden`}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0 bg-[#0B1024]/70"
        animate={speaking ? { opacity: [0.4, 0.2, 0.4] } : { opacity: 0.45 }}
        transition={speaking ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : {}}
      />
      <div className="relative flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          <span className="owl-eye block w-3 h-3 bg-white rounded-full" />
          <span className="owl-eye block w-3 h-3 bg-white rounded-full" />
        </div>
        <div className="w-6 h-3 bg-ain-amber/80 rounded-b-full" />
        <div className="text-[0.5rem] uppercase tracking-[0.2em] text-white/70">ain</div>
      </div>
    </motion.div>
  );
};

export default AinAvatar;
