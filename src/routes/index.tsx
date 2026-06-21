/**
 * Pulse AutoML Platform
 * Copyright © 2026 TuViZa. All rights reserved.
 * Designed & Developed by Tushar Vijay Zaware
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Brain } from "lucide-react";
import {
  analyzeCsv,
  trainAutoml,
  type AnalysisResult,
  type TrainingResult,
  API_BASE,
} from "@/lib/automl-api";
import { Stepper, type Step } from "@/components/automl/Stepper";
import { UploadZone } from "@/components/automl/UploadZone";
import { ConfigCard } from "@/components/automl/ConfigCard";
import { TrainingScreen } from "@/components/automl/TrainingScreen";
import { ResultsDashboard } from "@/components/automl/ResultsDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse AutoML - Train models without code | Made by TuViZa" },
      {
        name: "description",
        content:
          "Upload your CSV and let Pulse's AutoML engine find your champion model. Built by Tushar Vijay Zaware (TuViZa).",
      },
      { property: "og:title", content: "Pulse AutoML by TuViZa" },
      {
        property: "og:description",
        content: "High-end AutoML dashboard with live trial optimization and one-click model export. Made with ❤️ by Tushar Vijay Zaware.",
      },
    ],
  }),
  component: Index,
});

const MIN_TRAIN_MS = 30000; // 30 seconds minimum for high quality

function Index() {
  const [step, setStep] = useState<Step>("upload");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [results, setResults] = useState<TrainingResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [improving, setImproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setAnalyzing(true);
    try {
      const res = await analyzeCsv(file);
      setAnalysis(res);
      setStep("config");
    } catch (e) {
      setError(
        e instanceof Error
          ? `${e.message}. Is the API running at ${API_BASE}?`
          : "Failed to analyze file.",
      );
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleLaunch(target: string, taskType: string, premium?: boolean) {
    if (!analysis) return;
    setError(null);
    setStep("training");
    const started = Date.now();
    try {
      const res = await trainAutoml({
        filename: analysis.filename,
        target_column: premium ? undefined : target,
        task_type: taskType,
        premium_mode: premium,
        n_trials: 75
      });
      const elapsed = Date.now() - started;
      if (elapsed < MIN_TRAIN_MS) {
        await new Promise((r) => setTimeout(r, MIN_TRAIN_MS - elapsed));
      }
      setResults(res);
      setStep("results");
    } catch (e) {
      setError(
        e instanceof Error
          ? `${e.message}. Is the API running at ${API_BASE}?`
          : "Training failed.",
      );
      setStep("config");
    }
  }

  async function handleImprove() {
    if (!results || !analysis) return;
    setImproving(true);
    try {
      const res = await trainAutoml({
        filename: analysis.filename,
        target_column: results.target_column,
        task_type: results.task_type,
        existing_study_name: results.study_name,
        n_trials: 50
      });
      setResults(res);
    } catch (e) {
      console.error(e);
      alert("Failed to improve model. Please check the backend.");
    } finally {
      setImproving(false);
    }
  }

  function reset() {
    setAnalysis(null);
    setResults(null);
    setError(null);
    setStep("upload");
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-6 sm:pt-8">
      <header className="mx-auto mb-8 sm:mb-12 flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-violet shadow-[var(--glow-cyan)]">
            <Brain className="h-4 sm:h-5 w-4 sm:w-5 text-background" />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-lg font-bold leading-none">Pulse AutoML</p>
            <p className="text-xs text-muted-foreground">No-code model optimization</p>
          </div>
          <div className="sm:hidden">
            <p className="font-display text-sm font-bold leading-none">Pulse</p>
          </div>
        </div>
      </header>

      <section className="mx-auto mb-8 sm:mb-12 max-w-2xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
        >
          Train a model from a <span className="text-gradient">single CSV</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-2 sm:mt-4 text-xs sm:text-sm text-muted-foreground"
        >
          Upload your dataset and Pulse explores the search space to surface your champion model.
        </motion.p>
      </section>

      <div className="mb-10 sm:mb-14">
        <Stepper current={step} />
      </div>

      <main>
        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div key="upload" exit={{ opacity: 0, y: -10 }}>
              <UploadZone onFile={handleFile} loading={analyzing} error={error} />
            </motion.div>
          )}
          {step === "config" && analysis && (
            <motion.div key="config" exit={{ opacity: 0, y: -10 }}>
              {error && (
                <p className="mx-auto mb-4 max-w-2xl rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
                  {error}
                </p>
              )}
              <ConfigCard analysis={analysis} onLaunch={handleLaunch} onBack={reset} />
            </motion.div>
          )}
          {step === "training" && (
            <motion.div key="training" exit={{ opacity: 0, y: -10 }}>
              <TrainingScreen />
            </motion.div>
          )}
          {step === "results" && results && (
            <motion.div key="results" exit={{ opacity: 0, y: -10 }}>
              <ResultsDashboard 
                results={results} 
                onReset={reset} 
                onImprove={handleImprove}
                isImproving={improving}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Beautiful Footer */}
      <footer className="mt-16 sm:mt-20 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl border border-white/10 p-8 sm:p-10 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-violet shadow-[var(--glow-cyan)]">
              <Brain className="h-4 w-4 text-background" />
            </div>
            <p className="font-display text-xl font-bold text-white">Pulse AutoML</p>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mb-2">
            Professional AutoML & Hyperparameter Optimization Platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-cyan/80 font-semibold">
              ✨ Made by TuViZa
            </p>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2026 All Rights Reserved. Crafted with ❤️ by Tushar Vijay Zaware
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
