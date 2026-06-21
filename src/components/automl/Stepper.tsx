import { motion } from "motion/react";
import { Check } from "lucide-react";

export type Step = "upload" | "config" | "training" | "results";

const STEPS: { id: Step; label: string }[] = [
  { id: "upload", label: "Upload" },
  { id: "config", label: "Configure" },
  { id: "training", label: "Train" },
  { id: "results", label: "Results" },
];

const order: Step[] = ["upload", "config", "training", "results"];

export function Stepper({ current }: { current: Step }) {
  const currentIdx = order.indexOf(current);
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
      {STEPS.map((step, i) => {
        const idx = order.indexOf(step.id);
        const state = idx < currentIdx ? "done" : idx === currentIdx ? "active" : "todo";
        return (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: state === "active" ? 1.1 : 1,
                }}
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                  state === "done"
                    ? "border-transparent bg-emerald text-background"
                    : state === "active"
                      ? "border-transparent bg-gradient-to-br from-cyan to-violet text-background glow-border"
                      : "border-border bg-card text-muted-foreground",
                ].join(" ")}
              >
                {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
              <span
                className={[
                  "text-xs font-medium tracking-wide",
                  state === "todo" ? "text-muted-foreground" : "text-foreground",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-3 h-px flex-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  initial={false}
                  animate={{ width: idx < currentIdx ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-cyan to-violet"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
