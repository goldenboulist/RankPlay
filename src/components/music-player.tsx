import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { formatTimecode } from "@/lib/timecode";
import { describeAudioError, describeError } from "@/lib/error-message";
import { ChevronDown, ChevronUp, Pause, Play, Trash2, Volume2, VolumeX } from "@/lib/icons";

const RestartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

/** Floating player shown on item detail pages. Remount (key) it when the item changes. */
export function MusicPlayer({
  url,
  start,
  title,
  onRemove,
  removeDescription,
}: {
  url: string;
  start: number | null;
  title: string;
  /** Omit to hide the remove button (read-only views) */
  onRemove?: () => void;
  removeDescription?: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(start ?? 0);
  const [scrubbing, setScrubbing] = useState<number | null>(null);
  const [volume, setVolume] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("music-volume") : null;
    return saved !== null ? Number(saved) : 0.7;
  });
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);

  useEffect(() => () => ref.current?.pause(), []);

  // Load failures are reported by the <audio> onError handler
  const play = () =>
    ref.current?.play().catch((e) => {
      if (!ref.current?.error) toast.error(describeError(`play “${title}”`, e));
    });

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) a.pause();
    else play();
  };

  const restart = () => {
    const a = ref.current;
    if (!a) return;
    a.currentTime = start ?? 0;
    if (!playing) play();
  };

  const shown = scrubbing ?? position;

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className={`fixed bottom-5 left-5 z-50 overflow-hidden rounded-2xl border border-white/10 bg-card/70 shadow-2xl backdrop-blur-2xl transition-all ${minimized ? "w-auto" : "w-80"}`}
    >
      <audio
        ref={ref}
        src={url}
        preload="auto"
        onError={(e) => {
          describeAudioError(e.currentTarget, url).then((msg) => toast.error(msg, { id: `audio-error:${url}` }));
        }}
        onLoadedMetadata={(e) => {
          const a = e.currentTarget;
          setDuration(a.duration || 0);
          if (start) a.currentTime = start;
          a.volume = volume;
          a.muted = muted;
          a.play().catch(() => {});
        }}
        onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {minimized ? (
        <div className="flex items-center gap-3 px-3 py-2">
          <button
            onClick={toggle}
            className="h-8 w-8 shrink-0 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-md hover:scale-105 active:scale-95 transition-transform"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 translate-x-0.5" />}
          </button>
          <div className="max-w-[120px]">
            <p className="line-clamp-1 text-xs font-semibold">{title}</p>
          </div>
          <button
            onClick={() => setMinimized(false)}
            title="Expand"
            className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors ml-1"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="h-11 w-11 shrink-0 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
            </button>

            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-semibold">{title}</p>
              <div className="mt-1.5 flex h-3 items-end gap-[3px]">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-primary/70"
                    animate={playing ? { height: ["30%", "100%", "50%", "80%", "30%"] } : { height: "20%" }}
                    transition={
                      playing
                        ? { duration: 0.6 + i * 0.07, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.1 }
                        : {}
                    }
                    style={{ display: "block" }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={restart}
                title={start ? `Restart from ${formatTimecode(start)}` : "Restart"}
                className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <RestartIcon className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setMinimized(true)}
                title="Minimize"
                className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => setMuted((m) => !m)}
                title={muted ? "Unmute" : "Mute"}
                className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
              {onRemove && <ConfirmDialog
                trigger={
                  <button
                    title="Remove music"
                    className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                }
                title="Remove music"
                description={removeDescription ?? ""}
                confirmLabel="Remove"
                onConfirm={() => {
                  ref.current?.pause();
                  onRemove();
                }}
              />}
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-1">
            <div className="relative">
              <Slider
                value={[shown]}
                min={0}
                max={duration || 1}
                step={0.1}
                disabled={!duration}
                onValueChange={(v) => setScrubbing(v[0])}
                onValueCommit={(v) => {
                  if (ref.current) ref.current.currentTime = v[0];
                  setPosition(v[0]);
                  setScrubbing(null);
                }}
              />
              {start != null && duration > 0 && (
                <span
                  title={`Timecode ${formatTimecode(start)}`}
                  className="pointer-events-none absolute -top-1.5 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-primary"
                  style={{ left: `${(start / duration) * 100}%` }}
                />
              )}
            </div>
            <div className="flex justify-between font-mono text-[10px] tabular-nums text-muted-foreground">
              <span>{formatTimecode(shown)}</span>
              <span>{duration > 0 ? formatTimecode(duration) : "--:--"}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Volume2 className="h-3 w-3 shrink-0 text-muted-foreground" />
            <Slider
              value={[volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(v) => {
                const val = v[0] / 100;
                setVolume(val);
                localStorage.setItem("music-volume", String(val));
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
