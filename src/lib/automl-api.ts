export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface AnalysisResult {
  columns: string[];
  suggested_target: string;
  suggested_task: string;
  filename: string;
}

export interface Trial {
  number: number;
  value: number;
}

export interface TrainingResult {
  best_model_type: string;
  best_params: Record<string, string | number | boolean>;
  best_score: number;
  best_metrics: Record<string, number>;
  trials: Trial[];
  cumulative_best: number[];
  run_id: string;
  task_type: string;
  study_name: string;
  target_column: string;
}

export async function analyzeCsv(file: File): Promise<AnalysisResult> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/api/analyze-csv`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`Analysis failed (${res.status})`);
  return res.json();
}

export async function trainAutoml(payload: {
  filename: string;
  target_column?: string;
  task_type: string;
  premium_mode?: boolean;
  existing_study_name?: string;
  n_trials?: number;
}): Promise<TrainingResult> {
  const res = await fetch(`${API_BASE}/api/train-automl`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Training failed (${res.status})`);
  return res.json();
}

export function downloadModelUrl(runId: string): string {
  return `${API_BASE}/api/download-model/${runId}`;
}
