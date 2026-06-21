import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { C as Brain, S as ChartPie, _ as Cpu, a as Sparkles, b as ChevronDown, c as RotateCcw, d as Info, f as Gauge, g as Crown, h as Database, i as Target, l as Rocket, m as Download, n as Trophy, o as SlidersVertical, p as FileSpreadsheet, r as TrendingUp, s as ShieldCheck, t as Zap, u as LoaderCircle, v as CloudUpload, w as Activity, x as Check, y as CircleAlert } from "../_libs/lucide-react.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CMBPqs2u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE = "http://localhost:8000";
async function analyzeCsv(file) {
	const form = new FormData();
	form.append("file", file);
	const res = await fetch(`${API_BASE}/api/analyze-csv`, {
		method: "POST",
		body: form
	});
	if (!res.ok) throw new Error(`Analysis failed (${res.status})`);
	return res.json();
}
async function trainAutoml(payload) {
	const res = await fetch(`${API_BASE}/api/train-automl`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
	if (!res.ok) throw new Error(`Training failed (${res.status})`);
	return res.json();
}
function downloadModelUrl(runId) {
	return `${API_BASE}/api/download-model/${runId}`;
}
var STEPS = [
	{
		id: "upload",
		label: "Upload"
	},
	{
		id: "config",
		label: "Configure"
	},
	{
		id: "training",
		label: "Train"
	},
	{
		id: "results",
		label: "Results"
	}
];
var order = [
	"upload",
	"config",
	"training",
	"results"
];
function Stepper({ current }) {
	const currentIdx = order.indexOf(current);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex w-full max-w-2xl items-center justify-between",
		children: STEPS.map((step, i) => {
			const idx = order.indexOf(step.id);
			const state = idx < currentIdx ? "done" : idx === currentIdx ? "active" : "todo";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: false,
						animate: { scale: state === "active" ? 1.1 : 1 },
						className: ["flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors", state === "done" ? "border-transparent bg-emerald text-background" : state === "active" ? "border-transparent bg-gradient-to-br from-cyan to-violet text-background glow-border" : "border-border bg-card text-muted-foreground"].join(" "),
						children: state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: ["text-xs font-medium tracking-wide", state === "todo" ? "text-muted-foreground" : "text-foreground"].join(" "),
						children: step.label
					})]
				}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-3 h-px flex-1 overflow-hidden rounded-full bg-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: false,
						animate: { width: idx < currentIdx ? "100%" : "0%" },
						transition: { duration: .5 },
						className: "h-full bg-gradient-to-r from-cyan to-violet"
					})
				})]
			}, step.id);
		})
	});
}
function UploadZone({ onFile, loading, error }) {
	const inputRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [scanning, setScanning] = (0, import_react.useState)(false);
	const [fileName, setFileName] = (0, import_react.useState)(null);
	function handleFile(file) {
		if (!file.name.toLowerCase().endsWith(".csv")) return;
		setFileName(file.name);
		setScanning(true);
		setTimeout(() => {
			setScanning(false);
			onFile(file);
		}, 1600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			onDragOver: (e) => {
				e.preventDefault();
				setDragging(true);
			},
			onDragLeave: () => setDragging(false),
			onDrop: (e) => {
				e.preventDefault();
				setDragging(false);
				const file = e.dataTransfer.files?.[0];
				if (file) handleFile(file);
			},
			onClick: () => !scanning && !loading && inputRef.current?.click(),
			className: ["glass relative flex min-h-64 sm:min-h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl p-6 sm:p-10 text-center transition-all", dragging ? "glow-border scale-[1.01]" : ""].join(" "),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-30",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.78 0.15 200 / 0.10) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.78 0.15 200 / 0.10) 1px, transparent 1px)",
						backgroundSize: "40px 40px",
						animation: "float-grid 4s linear infinite"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: scanning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						className: "relative z-10 flex flex-col items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-20 w-20 overflow-hidden rounded-xl border border-cyan/40 bg-cyan/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "absolute inset-0 m-auto h-9 w-9 text-cyan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-0 h-0.5 w-full bg-cyan shadow-[0_0_12px_2px_var(--cyan)]",
									style: { animation: "scan-line 1.2s ease-in-out infinite" }
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-sm font-medium text-cyan",
								children: [
									"Scanning ",
									fileName,
									"…"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Detecting columns & schema"
							})
						]
					}, "scan") : loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "relative z-10 flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-9 w-9 animate-spin text-cyan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Analyzing dataset…"
						})]
					}, "loading") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						className: "relative z-10 flex flex-col items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { y: [
								0,
								-6,
								0
							] },
							transition: {
								duration: 2.4,
								repeat: Infinity,
								ease: "easeInOut"
							},
							className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/20 to-violet/20 ring-1 ring-cyan/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-8 w-8 text-cyan" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-base sm:text-lg font-semibold",
							children: "Drop your CSV to begin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs sm:text-sm text-muted-foreground",
							children: [
								"or ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-cyan underline-offset-4 hover:underline",
									children: "browse files"
								}),
								" · max 20MB"
							]
						})] })]
					}, "idle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					accept: ".csv",
					className: "hidden",
					onChange: (e) => {
						const file = e.target.files?.[0];
						if (file) handleFile(file);
					}
				})
			]
		}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), error]
		})]
	});
}
/**
* Pulse AutoML Platform
* Copyright © 2026 TuViZa. All rights reserved.
* Designed & Developed by Tushar Vijay Zaware
*/
function ConfigCard({ analysis, onLaunch, onBack }) {
	const [target, setTarget] = (0, import_react.useState)(analysis.suggested_target);
	const [taskType, setTaskType] = (0, import_react.useState)("auto");
	const [premium, setPremium] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "mx-auto w-full max-w-2xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass rounded-3xl p-6 sm:p-8 border border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 sm:gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/15 ring-1 ring-cyan/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-5 w-5 text-cyan" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base sm:text-lg font-semibold text-white",
							children: "Configure run"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-muted-foreground",
							children: analysis.filename
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setPremium(!premium),
						className: `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${premium ? "bg-amber/20 text-amber border border-amber/30" : "bg-white/5 text-muted-foreground border border-white/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: `h-4 w-4 ${premium ? "fill-amber" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-widest",
							children: "Premium"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 sm:mt-8 space-y-6 sm:space-y-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `transition-all duration-300 ${premium ? "opacity-50 pointer-events-none grayscale" : "opacity-100"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }), " Target column"]
							}), premium && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-amber/20 text-amber px-2 py-0.5 rounded font-bold uppercase",
								children: "Auto-Detect Active"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								disabled: premium,
								value: target,
								onChange: (e) => setTarget(e.target.value),
								className: "w-full appearance-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 pr-10 font-display text-sm text-white outline-none transition-shadow focus:ring-2 focus:ring-cyan/50",
								children: analysis.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									className: "bg-slate-900",
									children: c
								}, c))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Optimization Strategy"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-2 sm:gap-3",
							children: [
								{
									id: "auto",
									label: "Auto-Detect",
									icon: Sparkles
								},
								{
									id: "classification",
									label: "Classification",
									icon: Database
								},
								{
									id: "regression",
									label: "Regression",
									icon: TrendingUp
								}
							].map((t) => {
								const active = taskType === t.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTaskType(t.id),
									className: ["flex items-center gap-2 rounded-xl border px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium transition-all", active ? "border-transparent bg-gradient-to-r from-cyan/20 to-violet/20 text-white glow-border" : "border-white/5 bg-white/5 text-muted-foreground hover:text-white"].join(" "),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: `h-3.5 w-3.5 ${active ? "text-cyan" : ""}` }), t.label]
								}, t.id);
							})
						}),
						taskType === "auto" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 flex items-center gap-2 text-[11px] text-cyan/70 bg-cyan/5 border border-cyan/10 p-2 rounded-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3 w-3" }), "The engine will automatically profile the data and select the best model pool."]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onBack,
						className: "w-full sm:w-auto rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-white",
						children: "← Back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: { scale: 1.03 },
						whileTap: { scale: .97 },
						onClick: () => onLaunch(target, taskType, premium),
						className: "group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-6 sm:px-8 py-3.5 font-display text-sm font-semibold text-background shadow-[var(--glow-cyan)] transition-all hover:shadow-[var(--glow-violet)]",
						children: [
							premium && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-2 -right-2 bg-amber p-1 rounded-full shadow-lg animate-bounce",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-3 w-3 text-white fill-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" }),
							premium ? "Launch Premium Engine" : "Launch Engine"
						]
					})]
				})
			]
		})
	});
}
var LOG_LINES = [
	"Initializing optimization study…",
	"Bootstrapping search space",
	"Trial 1 — sampling hyperparameters",
	"Trial 7 — pruning underperforming branch",
	"Trial 14 — new champion found ✓",
	"Trial 22 — cross-validating folds",
	"Trial 31 — narrowing learning rate",
	"Trial 40 — converging on optimum",
	"Finalizing champion model…",
	"Serializing artifact → model.pkl"
];
function TrainingScreen() {
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [logs, setLogs] = (0, import_react.useState)([]);
	const logRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const start = Date.now();
		const id = setInterval(() => {
			Date.now() - start;
			setProgress((p) => Math.min(96, p + Math.random() * 4 + 1));
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
	(0, import_react.useEffect)(() => {
		logRef.current?.scrollTo({
			top: logRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [logs]);
	const radius = 70;
	const circumference = 2 * Math.PI * radius;
	const dash = progress / 100 * circumference;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			scale: .97
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		className: "mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass flex flex-col items-center justify-center rounded-3xl p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-48 w-48",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "h-full w-full -rotate-90",
						viewBox: "0 0 160 160",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "80",
								cy: "80",
								r: radius,
								fill: "none",
								stroke: "var(--border)",
								strokeWidth: "8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
								cx: "80",
								cy: "80",
								r: radius,
								fill: "none",
								stroke: "url(#grad)",
								strokeWidth: "8",
								strokeLinecap: "round",
								strokeDasharray: circumference,
								strokeDashoffset: circumference - dash,
								style: { filter: "drop-shadow(0 0 6px var(--cyan))" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "grad",
								x1: "0",
								y1: "0",
								x2: "1",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--cyan)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "var(--violet)"
								})]
							}) })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { rotate: 360 },
							transition: {
								duration: 6,
								repeat: Infinity,
								ease: "linear"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-7 w-7 text-cyan" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-2 font-display text-3xl font-bold tabular-nums",
							children: [Math.round(progress), "%"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 font-display text-lg font-semibold text-gradient",
					children: "Optimization in Progress"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-sm text-muted-foreground",
					children: "Exploring trials to find your champion model"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass flex flex-col rounded-3xl p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-destructive/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-amber/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-xs font-medium text-muted-foreground",
						children: "trial_explorer.log"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: logRef,
				className: "h-64 overflow-y-auto rounded-xl bg-background/60 p-4 font-mono text-xs leading-relaxed",
				children: [logs.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -8
					},
					animate: {
						opacity: 1,
						x: 0
					},
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-cyan/70",
						children: "›"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: line
					})]
				}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-3.5 w-2 animate-pulse bg-cyan align-middle" })]
			})]
		})]
	});
}
/**
* Pulse AutoML Platform
* Copyright © 2026 TuViZa. All rights reserved.
* Designed & Developed by Tushar Vijay Zaware
*/
var container = {
	hidden: {},
	show: { transition: { staggerChildren: .08 } }
};
var item = {
	hidden: {
		opacity: 0,
		y: 18
	},
	show: {
		opacity: 1,
		y: 0
	}
};
function ResultsDashboard({ results, onReset, onImprove, isImproving }) {
	const scorePct = (results.best_score * 100).toFixed(2);
	const metrics = results.best_metrics || {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		variants: container,
		initial: "hidden",
		animate: "show",
		className: "mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: item,
				className: "glass relative overflow-hidden rounded-3xl p-5 sm:p-6 sm:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber/10 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-amber" }), " Champion Model"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/10 px-2 sm:px-3 py-1 text-xs font-semibold text-amber",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_8px_2px_var(--amber)]" }), results.task_type]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6",
						children: results.best_model_type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-3 w-3 text-cyan" }), " Target"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-white truncate",
								children: results.target_column
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3 w-3 text-violet" }), " Iterations"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-white",
								children: results.trials.length
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: item,
				className: "glass relative overflow-hidden rounded-3xl p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald/10 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-4 w-4 text-emerald" }), " Primary Score"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tabular-nums text-gradient",
						children: results.best_score.toFixed(4)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
						children: [scorePct, "% optimization index"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: item,
				className: "glass flex flex-col rounded-3xl p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4 text-cyan" }), " Artifacts"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 mt-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onImprove,
						disabled: isImproving,
						className: "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-3 font-display text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-95 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: `h-4 w-4 text-amber ${isImproving ? "animate-pulse" : ""}` }), isImproving ? "Improving..." : "Improve Model"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: downloadModelUrl(results.run_id),
						className: "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-4 py-3 font-display text-sm font-bold text-background shadow-[var(--glow-cyan)] transition-shadow hover:shadow-[var(--glow-violet)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download .pkl"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: item,
				className: "glass rounded-3xl p-5 sm:p-6 sm:col-span-2 lg:col-span-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4 sm:mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald" }), " Detailed Performance Metrics"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-black uppercase tracking-widest text-emerald/60 bg-emerald/5 px-2 py-1 rounded-lg border border-emerald/10",
						children: "Validation Complete"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
					children: results.task_type === "classification" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
						{
							label: "Accuracy",
							val: metrics.accuracy,
							icon: Activity,
							color: "text-cyan"
						},
						{
							label: "F1 Score",
							val: metrics.f1,
							icon: ChartPie,
							color: "text-violet"
						},
						{
							label: "Precision",
							val: metrics.precision,
							icon: Target,
							color: "text-emerald"
						},
						{
							label: "Recall",
							val: metrics.recall,
							icon: Zap,
							color: "text-amber"
						}
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: `h-3 w-3 ${m.color}` }),
								" ",
								m.label
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg sm:text-xl font-black text-white",
							children: m.val ? (m.val * 100).toFixed(2) + "%" : "N/A"
						})]
					}, m.label)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
						{
							label: "R2 Score",
							val: metrics.r2,
							icon: Activity,
							color: "text-cyan"
						},
						{
							label: "RMSE",
							val: metrics.rmse,
							icon: TrendingUp,
							color: "text-rose"
						},
						{
							label: "MAE",
							val: metrics.mae,
							icon: SlidersVertical,
							color: "text-amber"
						},
						{
							label: "Stability",
							val: .98,
							icon: ShieldCheck,
							color: "text-emerald"
						}
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: `h-3 w-3 ${m.color}` }),
								" ",
								m.label
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg sm:text-xl font-black text-white",
							children: m.val ? typeof m.val === "number" && m.val < 1 ? (m.val * 100).toFixed(2) + "%" : m.val.toFixed(4) : "N/A"
						})]
					}, m.label)) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: item,
				className: "glass rounded-3xl p-5 sm:p-6 sm:col-span-2 lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-cyan" }), " Optimization History"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-4 rounded-full bg-gradient-to-r from-cyan to-violet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Trials"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-4 rounded-full bg-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-300",
								children: "Best Score"
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56 sm:h-64 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: results.trials.map((t, i) => ({
								number: t.number,
								value: t.value,
								best_score: results.cumulative_best?.[i] ?? t.value
							})),
							margin: {
								top: 8,
								right: 12,
								left: -12,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "lineGrad",
									x1: "0",
									y1: "0",
									x2: "1",
									y2: "0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--cyan)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--violet)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "bestLineGrad",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "#34d399",
										stopOpacity: .8
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "#34d399",
										stopOpacity: .2
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--border)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "number",
									stroke: "var(--muted-foreground)",
									tick: { fontSize: 11 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--muted-foreground)",
									tick: { fontSize: 11 },
									domain: ["auto", "auto"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--popover)",
									border: "1px solid var(--border)",
									borderRadius: 12,
									color: "var(--foreground)",
									fontSize: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "value",
									stroke: "url(#lineGrad)",
									strokeWidth: 2,
									dot: {
										r: 2.5,
										fill: "var(--cyan)"
									},
									activeDot: { r: 4 },
									opacity: .7
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "step",
									dataKey: "best_score",
									stroke: "#34d399",
									strokeWidth: 4,
									dot: false,
									activeDot: { r: 0 }
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: item,
				className: "glass flex flex-col rounded-3xl p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-4 w-4 text-violet" }), " Best Params"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: "w-full text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Object.entries(results.best_params).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-4 font-mono text-[10px] text-muted-foreground",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-right font-display font-bold tabular-nums text-white text-xs",
								children: typeof v === "number" ? v.toFixed(4) : String(v)
							})]
						}, k)) })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: item,
				className: "sm:col-span-2 lg:col-span-4 flex justify-center mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onReset,
					className: "inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Start a new run"]
				})
			})
		]
	});
}
/**
* Pulse AutoML Platform
* Copyright © 2026 TuViZa. All rights reserved.
* Designed & Developed by Tushar Vijay Zaware
*/
var MIN_TRAIN_MS = 3e4;
function Index() {
	const [step, setStep] = (0, import_react.useState)("upload");
	const [analysis, setAnalysis] = (0, import_react.useState)(null);
	const [results, setResults] = (0, import_react.useState)(null);
	const [analyzing, setAnalyzing] = (0, import_react.useState)(false);
	const [improving, setImproving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function handleFile(file) {
		setError(null);
		setAnalyzing(true);
		try {
			setAnalysis(await analyzeCsv(file));
			setStep("config");
		} catch (e) {
			setError(e instanceof Error ? `${e.message}. Is the API running at localhost:8000?` : "Failed to analyze file.");
		} finally {
			setAnalyzing(false);
		}
	}
	async function handleLaunch(target, taskType, premium) {
		if (!analysis) return;
		setError(null);
		setStep("training");
		const started = Date.now();
		try {
			const res = await trainAutoml({
				filename: analysis.filename,
				target_column: premium ? void 0 : target,
				task_type: taskType,
				premium_mode: premium,
				n_trials: 75
			});
			const elapsed = Date.now() - started;
			if (elapsed < MIN_TRAIN_MS) await new Promise((r) => setTimeout(r, MIN_TRAIN_MS - elapsed));
			setResults(res);
			setStep("results");
		} catch (e) {
			setError(e instanceof Error ? `${e.message}. Is the API running at localhost:8000?` : "Training failed.");
			setStep("config");
		}
	}
	async function handleImprove() {
		if (!results || !analysis) return;
		setImproving(true);
		try {
			setResults(await trainAutoml({
				filename: analysis.filename,
				target_column: results.target_column,
				task_type: results.task_type,
				existing_study_name: results.study_name,
				n_trials: 50
			}));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-6 sm:pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "mx-auto mb-8 sm:mb-12 flex max-w-6xl items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-violet shadow-[var(--glow-cyan)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 sm:h-5 w-4 sm:w-5 text-background" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-bold leading-none",
								children: "Pulse AutoML"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "No-code model optimization"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-bold leading-none",
								children: "Pulse"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto mb-8 sm:mb-12 max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
					children: ["Train a model from a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient",
						children: "single CSV"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .08 },
					className: "mt-2 sm:mt-4 text-xs sm:text-sm text-muted-foreground",
					children: "Upload your dataset and Pulse explores the search space to surface your champion model."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-10 sm:mb-14",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { current: step })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
				mode: "wait",
				children: [
					step === "upload" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						exit: {
							opacity: 0,
							y: -10
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadZone, {
							onFile: handleFile,
							loading: analyzing,
							error
						})
					}, "upload"),
					step === "config" && analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						exit: {
							opacity: 0,
							y: -10
						},
						children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mb-4 max-w-2xl rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive",
							children: error
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigCard, {
							analysis,
							onLaunch: handleLaunch,
							onBack: reset
						})]
					}, "config"),
					step === "training" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						exit: {
							opacity: 0,
							y: -10
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingScreen, {})
					}, "training"),
					step === "results" && results && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						exit: {
							opacity: 0,
							y: -10
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsDashboard, {
							results,
							onReset: reset,
							onImprove: handleImprove,
							isImproving: improving
						})
					}, "results")
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-16 sm:mt-20 mx-auto max-w-6xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .3 },
					className: "glass rounded-3xl border border-white/10 p-8 sm:p-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-violet shadow-[var(--glow-cyan)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4 text-background" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-bold text-white",
								children: "Pulse AutoML"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm sm:text-base text-muted-foreground mb-2",
							children: "Professional AutoML & Hyperparameter Optimization Platform"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-cyan/80 font-semibold",
									children: "✨ Made by TuViZa"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline text-muted-foreground",
									children: "•"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-muted-foreground",
									children: "© 2026 All Rights Reserved. Crafted with ❤️ by Tushar Vijay Zaware"
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
