import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Cpu } from "lucide-react";

const LOG_LINES = [
  "Initializing optimization study…",
  "Bootstrapping search space",
  "Trial 1 — sampling hyperparameters",
  "Trial 7 — pruning underperforming branch",
  "Trial 14 — new champion found ✓",
  "Trial 22 — cross-validating folds",
  "Trial 31 — narrowing learning rate",
  "Trial 40 — converging on optimum",
  "Finalizing champion model…",
  "Serializing artifact → model.pkl",
];

export function TrainingScreen() {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress((p) => Math.min(96, p + Math.random() * 4 + 1));
      void elapsed;
    }, 220);

    let i = 0;
    const logId = setInterval(() => {
      if (i < LOG_LINES.length) {
        setLogs((prev) => [...prev, LOG_LINES[i]]);
        i++;
      }
    }, 900);

    return () => {
      clearInterval(id);
      clearInterval(logId);
    };
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dash = (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-2"
    >
      {/* circular loader */}
      <div className="glass flex flex-col items-center justify-center rounded-3xl p-10">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border)" strokeWidth="8" />
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="url(#grad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - dash}
              style={{ filter: "drop-shadow(0 0 6px var(--cyan))" }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--cyan)" />
                <stop offset="100%" stopColor="var(--violet)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="h-7 w-7 text-cyan" />
            </motion.div>
            <span className="mt-2 font-display text-3xl font-bold tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <h2 className="mt-6 font-display text-lg font-semibold text-gradient">
          Optimization in Progress
        </h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Exploring trials to find your champion model
        </p>
      </div>

      {/* logs */}
      <div className="glass flex flex-col rounded-3xl p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald/80" />
          <span className="ml-2 text-xs font-medium text-muted-foreground">trial_explorer.log</span>
        </div>
        <div
          ref={logRef}
          className="h-64 overflow-y-auto rounded-xl bg-background/60 p-4 font-mono text-xs leading-relaxed"
        >
          {logs.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <span className="text-cyan/70">›</span>
              <span className="text-muted-foreground">{line}</span>
            </motion.div>
          ))}
          <span className="inline-block h-3.5 w-2 animate-pulse bg-cyan align-middle" />
        </div>
      </div>
    </motion.div>
  );
}
