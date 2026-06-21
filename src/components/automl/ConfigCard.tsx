/**
 * Pulse AutoML Platform
 * Copyright © 2026 TuViZa. All rights reserved.
 * Designed & Developed by Tushar Vijay Zaware
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Target, Sparkles, Rocket, ChevronDown, Database, Crown, Info, TrendingUp } from "lucide-react";
import type { AnalysisResult } from "@/lib/automl-api";

export function ConfigCard({
  analysis,
  onLaunch,
  onBack,
}: {
  analysis: AnalysisResult;
  onLaunch: (target: string, taskType: string, premium?: boolean) => void;
  onBack: () => void;
}) {
  const [target, setTarget] = useState(analysis.suggested_target);
  const [taskType, setTaskType] = useState("auto");
  const [premium, setPremium] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-2xl"
    >
      <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/15 ring-1 ring-cyan/30">
              <Database className="h-5 w-5 text-cyan" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-semibold text-white">Configure run</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">{analysis.filename}</p>
            </div>
          </div>
          <button 
            onClick={() => setPremium(!premium)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${premium ? 'bg-amber/20 text-amber border border-amber/30' : 'bg-white/5 text-muted-foreground border border-white/5'}`}
          >
            <Crown className={`h-4 w-4 ${premium ? 'fill-amber' : ''}`} />
            <span className="text-xs font-bold uppercase tracking-widest">Premium</span>
          </button>
        </div>

        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          {/* Target Column */}
          <div className={`transition-all duration-300 ${premium ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" /> Target column
              </div>
              {premium && <span className="text-[10px] bg-amber/20 text-amber px-2 py-0.5 rounded font-bold uppercase">Auto-Detect Active</span>}
            </label>
            <div className="relative">
              <select
                disabled={premium}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 pr-10 font-display text-sm text-white outline-none transition-shadow focus:ring-2 focus:ring-cyan/50"
              >
                {analysis.columns.map((c) => (
                  <option key={c} value={c} className="bg-slate-900">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Task Type */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4" /> Optimization Strategy
            </label>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                { id: "auto", label: "Auto-Detect", icon: Sparkles },
                { id: "classification", label: "Classification", icon: Database },
                { id: "regression", label: "Regression", icon: TrendingUp }
              ].map((t) => {
                const active = taskType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTaskType(t.id)}
                    className={[
                      "flex items-center gap-2 rounded-xl border px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium transition-all",
                      active
                        ? "border-transparent bg-gradient-to-r from-cyan/20 to-violet/20 text-white glow-border"
                        : "border-white/5 bg-white/5 text-muted-foreground hover:text-white",
                    ].join(" ")}
                  >
                    <t.icon className={`h-3.5 w-3.5 ${active ? 'text-cyan' : ''}`} />
                    {t.label}
                  </button>
                );
              })}
            </div>
            {taskType === "auto" && (
              <p className="mt-3 flex items-center gap-2 text-[11px] text-cyan/70 bg-cyan/5 border border-cyan/10 p-2 rounded-lg">
                <Info className="h-3 w-3" />
                The engine will automatically profile the data and select the best model pool.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-3">
          <button
            onClick={onBack}
            className="w-full sm:w-auto rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-white"
          >
            ← Back
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onLaunch(target, taskType, premium)}
            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-6 sm:px-8 py-3.5 font-display text-sm font-semibold text-background shadow-[var(--glow-cyan)] transition-all hover:shadow-[var(--glow-violet)]"
          >
            {premium && <div className="absolute -top-2 -right-2 bg-amber p-1 rounded-full shadow-lg animate-bounce"><Crown className="h-3 w-3 text-white fill-white" /></div>}
            <Rocket className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            {premium ? "Launch Premium Engine" : "Launch Engine"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
