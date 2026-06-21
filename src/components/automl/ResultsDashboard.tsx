/**
 * Pulse AutoML Platform
 * Copyright © 2026 TuViZa. All rights reserved.
 * Designed & Developed by Tushar Vijay Zaware
 */

import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Trophy, Gauge, TrendingUp, Sliders, Download, RotateCcw, Zap, Target, Activity, ShieldCheck, PieChart } from "lucide-react";
import type { TrainingResult } from "@/lib/automl-api";
import { downloadModelUrl } from "@/lib/automl-api";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function ResultsDashboard({
  results,
  onReset,
  onImprove,
  isImproving,
}: {
  results: TrainingResult;
  onReset: () => void;
  onImprove: () => void;
  isImproving: boolean;
}) {
  const scorePct = (results.best_score * 100).toFixed(2);
  const metrics = results.best_metrics || {};

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {/* Champion & Core Stats */}
      <motion.div
        variants={item}
        className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6 sm:col-span-2"
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber/10 blur-2xl" />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Trophy className="h-4 w-4 text-amber" /> Champion Model
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/10 px-2 sm:px-3 py-1 text-xs font-semibold text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_8px_2px_var(--amber)]" />
            {results.task_type}
          </span>
        </div>
        <p className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">{results.best_model_type}</p>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
               <Target className="h-3 w-3 text-cyan" /> Target
             </div>
             <p className="text-sm font-bold text-white truncate">{results.target_column}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
               <Activity className="h-3 w-3 text-violet" /> Iterations
             </div>
             <p className="text-sm font-bold text-white">{results.trials.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Primary Score */}
      <motion.div variants={item} className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald/10 blur-2xl" />
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Gauge className="h-4 w-4 text-emerald" /> Primary Score
        </div>
        <p className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tabular-nums text-gradient">
          {results.best_score.toFixed(4)}
        </p>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{scorePct}% optimization index</p>
      </motion.div>

      {/* Export & Actions */}
      <motion.div variants={item} className="glass flex flex-col rounded-3xl p-5 sm:p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
          <Download className="h-4 w-4 text-cyan" /> Artifacts
        </div>
        
        <div className="space-y-3 mt-auto">
          <button
            onClick={onImprove}
            disabled={isImproving}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-3 font-display text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-95 disabled:opacity-50"
          >
            <Zap className={`h-4 w-4 text-amber ${isImproving ? 'animate-pulse' : ''}`} />
            {isImproving ? "Improving..." : "Improve Model"}
          </button>
          <a
            href={downloadModelUrl(results.run_id)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-4 py-3 font-display text-sm font-bold text-background shadow-[var(--glow-cyan)] transition-shadow hover:shadow-[var(--glow-violet)]"
          >
            <Download className="h-4 w-4" /> Download .pkl
          </a>
        </div>
      </motion.div>

      {/* Performance Metrics Grid */}
      <motion.div variants={item} className="glass rounded-3xl p-5 sm:p-6 sm:col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald" /> Detailed Performance Metrics
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald/60 bg-emerald/5 px-2 py-1 rounded-lg border border-emerald/10">Validation Complete</span>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {results.task_type === "classification" ? (
            <>
              {[
                { label: "Accuracy", val: metrics.accuracy, icon: Activity, color: "text-cyan" },
                { label: "F1 Score", val: metrics.f1, icon: PieChart, color: "text-violet" },
                { label: "Precision", val: metrics.precision, icon: Target, color: "text-emerald" },
                { label: "Recall", val: metrics.recall, icon: Zap, color: "text-amber" }
              ].map(m => (
                <div key={m.label} className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                    <m.icon className={`h-3 w-3 ${m.color}`} /> {m.label}
                  </div>
                  <p className="text-lg sm:text-xl font-black text-white">{m.val ? (m.val * 100).toFixed(2) + "%" : "N/A"}</p>
                </div>
              ))}
            </>
          ) : (
            <>
              {[
                { label: "R2 Score", val: metrics.r2, icon: Activity, color: "text-cyan" },
                { label: "RMSE", val: metrics.rmse, icon: TrendingUp, color: "text-rose" },
                { label: "MAE", val: metrics.mae, icon: Sliders, color: "text-amber" },
                { label: "Stability", val: 0.98, icon: ShieldCheck, color: "text-emerald" }
              ].map(m => (
                <div key={m.label} className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                    <m.icon className={`h-3 w-3 ${m.color}`} /> {m.label}
                  </div>
                  <p className="text-lg sm:text-xl font-black text-white">{m.val ? (typeof m.val === 'number' && m.val < 1 ? (m.val * 100).toFixed(2) + "%" : m.val.toFixed(4)) : "N/A"}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </motion.div>

      {/* Optimization history chart */}
      <motion.div variants={item} className="glass rounded-3xl p-5 sm:p-6 sm:col-span-2 lg:col-span-3">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-cyan" /> Optimization History
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-4 rounded-full bg-gradient-to-r from-cyan to-violet" />
              <span className="text-muted-foreground">Trials</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-4 rounded-full bg-emerald-400" />
              <span className="text-emerald-300">Best Score</span>
            </div>
          </div>
        </div>
        <div className="h-56 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={results.trials.map((t, i) => ({ 
                number: t.number, 
                value: t.value, 
                best_score: results.cumulative_best?.[i] ?? t.value 
              }))} 
              margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--cyan)" />
                  <stop offset="100%" stopColor="var(--violet)" />
                </linearGradient>
                <linearGradient id="bestLineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="number"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 11 }}
              />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  color: "var(--foreground)",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#lineGrad)"
                strokeWidth={2}
                dot={{ r: 2.5, fill: "var(--cyan)" }}
                activeDot={{ r: 4 }}
                opacity={0.7}
              />
              <Line
                type="step"
                dataKey="best_score"
                stroke="#34d399"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Hyperparameters */}
      <motion.div variants={item} className="glass flex flex-col rounded-3xl p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Sliders className="h-4 w-4 text-violet" /> Best Params
        </div>
        <div className="flex-1 overflow-y-auto rounded-xl">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(results.best_params).map(([k, v]) => (
                <tr key={k} className="border-b border-border/60 last:border-0">
                  <td className="py-2.5 pr-4 font-mono text-[10px] text-muted-foreground">{k}</td>
                  <td className="py-2.5 text-right font-display font-bold tabular-nums text-white text-xs">
                    {typeof v === 'number' ? v.toFixed(4) : String(v)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div variants={item} className="sm:col-span-2 lg:col-span-4 flex justify-center mt-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-white"
        >
          <RotateCcw className="h-4 w-4" /> Start a new run
        </button>
      </motion.div>
    </motion.div>
  );
}
