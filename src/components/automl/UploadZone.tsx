import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, FileSpreadsheet, Loader2, AlertCircle } from "lucide-react";

export function UploadZone({
  onFile,
  loading,
  error,
}: {
  onFile: (file: File) => void;
  loading: boolean;
  error: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".csv")) return;
    setFileName(file.name);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onFile(file);
    }, 1600);
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        onClick={() => !scanning && !loading && inputRef.current?.click()}
        className={[
          "glass relative flex min-h-64 sm:min-h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl p-6 sm:p-10 text-center transition-all",
          dragging ? "glow-border scale-[1.01]" : "",
        ].join(" ")}
      >
        {/* animated grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.78 0.15 200 / 0.10) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.78 0.15 200 / 0.10) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "float-grid 4s linear infinite",
          }}
        />

        <AnimatePresence mode="wait">
          {scanning ? (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-cyan/40 bg-cyan/5">
                <FileSpreadsheet className="absolute inset-0 m-auto h-9 w-9 text-cyan" />
                <div
                  className="absolute left-0 h-0.5 w-full bg-cyan shadow-[0_0_12px_2px_var(--cyan)]"
                  style={{ animation: "scan-line 1.2s ease-in-out infinite" }}
                />
              </div>
              <p className="font-display text-sm font-medium text-cyan">
                Scanning {fileName}…
              </p>
              <p className="text-xs text-muted-foreground">Detecting columns & schema</p>
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              <Loader2 className="h-9 w-9 animate-spin text-cyan" />
              <p className="text-sm text-muted-foreground">Analyzing dataset…</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/20 to-violet/20 ring-1 ring-cyan/30"
              >
                <UploadCloud className="h-8 w-8 text-cyan" />
              </motion.div>
              <div>
                <p className="font-display text-base sm:text-lg font-semibold">
                  Drop your CSV to begin
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  or <span className="text-cyan underline-offset-4 hover:underline">browse files</span> · max 20MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </motion.div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}
