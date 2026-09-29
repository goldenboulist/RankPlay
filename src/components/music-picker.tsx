import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { listUploads } from "@/lib/games.functions";
import { formatTimecode, parseTimecode } from "@/lib/timecode";
import { cn } from "@/lib/utils";
import { describeAudioError, describeError, responseError } from "@/lib/error-message";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Slider } from "@/components/ui/slider";
import {
  Check,
  ChevronDown,
  Loader2,
  Music2,
  Pause,
  Play,
  Plus,
  X,
} from "@/lib/icons";

export type MusicValue = { url: string; start: number | null };

const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;

type UploadedTrack = { filename: string; url: string; label: string };

export function useUploadedTracks() {
  const getUploads = useServerFn(listUploads);
  return useQuery<UploadedTrack[]>({
    queryKey: ["uploaded-tracks"],
    queryFn: () => getUploads(),
    staleTime: 30_000,
  });
}

/** Human-readable name for any audio URL (uploaded file or external link). */
export function trackLabel(url: string, tracks: UploadedTrack[] = []): string {
  const known = tracks.find((t) => t.url === url);
  if (known) return known.label;
  const last = url.split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? url;
  let name = last;
  try {
    name = decodeURIComponent(last);
  } catch {
    /* keep raw */
  }
  return (
    name
      .replace(/^\d+-/, "")
      .replace(/\.[^.]+$/, "")
      .replace(/_/g, " ") || url
  );
}

/* ─── Picker ──────────────────────────────────────────────────────── */

export function MusicPicker({
  value,
  onChange,
}: {
  value: MusicValue;
  onChange: (v: MusicValue) => void;
}) {
  const qc = useQueryClient();
  const tracksQuery = useUploadedTracks();
  const tracks = tracksQuery.data ?? [];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const select = (url: string) => {
    onChange({ url, start: url === value.url ? value.start : null });
    setOpen(false);
    setSearch("");
  };

  const upload = async (file: File) => {
    setUploading(true);
    const toastId = toast.loading(`Uploading “${file.name}”…`);
    try {
      if (file.size > MAX_UPLOAD_BYTES) {
        throw new Error(`the file is ${(file.size / 1024 / 1024).toFixed(1)} MB, the limit is 30 MB`);
      }
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw await responseError(res);
      const data = await res.json();
      await qc.invalidateQueries({ queryKey: ["uploaded-tracks"] });
      select(data.url);
      toast.success("Uploaded!", { id: toastId });
    } catch (e) {
      toast.error(describeError(`upload “${file.name}”`, e), { id: toastId });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const searchLooksLikeUrl = /^(https?:\/\/|\/)\S+$/.test(search.trim());

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        <Popover open={open} onOpenChange={setOpen} modal>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-input bg-transparent px-3 text-left text-sm shadow-xs transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                !value.url && "text-muted-foreground",
              )}
            >
              <Music2
                className={cn(
                  "h-3.5 w-3.5 shrink-0",
                  value.url ? "text-primary" : "opacity-60",
                )}
              />
              <span className="flex-1 truncate">
                {value.url ? trackLabel(value.url, tracks) : "Choose a track…"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] min-w-72 p-0"
            align="start"
          >
            <Command>
              <CommandInput
                value={search}
                onValueChange={setSearch}
                placeholder="Search or paste a URL…"
              />
              <CommandList className="max-h-64">
                <CommandEmpty className="py-4 text-center text-xs text-muted-foreground">
                  {tracksQuery.isLoading
                    ? "Loading tracks…"
                    : tracksQuery.isError
                      ? describeError("load the uploaded tracks", tracksQuery.error)
                      : searchLooksLikeUrl
                      ? "Press the button below to use this link"
                      : "No track found"}
                </CommandEmpty>
                {tracks.length > 0 && (
                  <CommandGroup heading={`Uploaded tracks · ${tracks.length}`}>
                    {tracks.map((t) => (
                      <CommandItem
                        key={t.url}
                        value={t.label}
                        onSelect={() => select(t.url)}
                        className="gap-2 text-xs"
                      >
                        <Music2 className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                        <span className="flex-1 truncate" title={t.label}>
                          {t.label}
                        </span>
                        {t.url === value.url && (
                          <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
            <div className="flex flex-col gap-1 border-t border-border p-1.5">
              {searchLooksLikeUrl && (
                <button
                  type="button"
                  onClick={() => select(search.trim())}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs hover:bg-accent"
                >
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate">Use link “{search.trim()}”</span>
                </button>
              )}
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs hover:bg-accent disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
                Upload an audio file…
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(f);
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
        {value.url && (
          <button
            type="button"
            onClick={() => onChange({ url: "", start: null })}
            aria-label="Remove music"
            title="Remove music"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {value.url && (
        <TimecodeEditor
          key={value.url}
          url={value.url}
          start={value.start}
          onStartChange={(start) => onChange({ url: value.url, start })}
        />
      )}
    </div>
  );
}

/* ─── Preview + start timecode ────────────────────────────────────── */

function TimecodeEditor({
  url,
  start,
  onStartChange,
}: {
  url: string;
  start: number | null;
  onStartChange: (s: number | null) => void;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(start ?? 0);
  const [scrubbing, setScrubbing] = useState<number | null>(null);
  const [draft, setDraft] = useState(start ? formatTimecode(start) : "");

  useEffect(() => {
    setDraft(start ? formatTimecode(start) : "");
  }, [start]);
  useEffect(() => () => ref.current?.pause(), []);

  const seek = (t: number) => {
    const a = ref.current;
    if (a) a.currentTime = t;
    setPosition(t);
  };

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      return;
    }
    if (a.currentTime === 0 && start) a.currentTime = start;
    // Load failures are reported by the <audio> onError handler
    a.play().catch((e) => {
      if (!a.error) toast.error(describeError("play the preview", e));
    });
  };

  const commitDraft = () => {
    if (draft === (start ? formatTimecode(start) : "")) return;
    const parsed = parseTimecode(draft);
    if (parsed === null) {
      onStartChange(null);
      return;
    }
    if (Number.isNaN(parsed) || (duration > 0 && parsed >= duration)) {
      toast.error("Invalid timecode — use m:ss, e.g. 1:23");
      setDraft(start ? formatTimecode(start) : "");
      return;
    }
    onStartChange(parsed || null);
    seek(parsed);
  };

  const shown = scrubbing ?? position;

  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5 space-y-2.5">
      <audio
        ref={ref}
        src={url}
        preload="metadata"
        onError={(e) => {
          describeAudioError(e.currentTarget, url).then((msg) => toast.error(msg, { id: `audio-error:${url}` }));
        }}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
          if (start) e.currentTarget.currentTime = start;
        }}
        onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause preview" : "Play preview"}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          {playing ? (
            <Pause className="h-3 w-3" />
          ) : (
            <Play className="h-3 w-3 translate-x-px" />
          )}
        </button>
        <div className="relative flex-1">
          <Slider
            value={[shown]}
            min={0}
            max={duration || 1}
            step={0.1}
            disabled={!duration}
            onValueChange={(v) => setScrubbing(v[0])}
            onValueCommit={(v) => {
              seek(v[0]);
              setScrubbing(null);
            }}
          />
          {start != null && duration > 0 && (
            <span
              title={`Starts at ${formatTimecode(start)}`}
              className="pointer-events-none absolute -top-1.5 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-primary"
              style={{ left: `${(start / duration) * 100}%` }}
            />
          )}
        </div>
        <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
          {formatTimecode(shown)}
          {duration > 0 && ` / ${formatTimecode(duration)}`}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground">Start at</span>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitDraft();
            }
          }}
          placeholder="0:00"
          inputMode="decimal"
          aria-label="Start timecode"
          className="h-7 w-16 rounded-md border border-input bg-background px-2 text-center font-mono text-xs"
        />
        <button
          type="button"
          onClick={() => onStartChange(Math.round(position * 10) / 10 || null)}
          className="h-7 flex-1 truncate rounded-md border border-border bg-background px-2 text-xs hover:bg-accent"
          title="Use the current preview position as start"
        >
          Set to {formatTimecode(position)}
        </button>
        {start != null && (
          <button
            type="button"
            onClick={() => onStartChange(null)}
            aria-label="Reset start timecode"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
