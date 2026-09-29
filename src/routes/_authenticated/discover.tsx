import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  getRecommendations,
  type Recommendation,
} from "@/lib/recommendations.functions";
import { getSteamGameDetails } from "@/lib/steam.functions";
import { createGame } from "@/lib/games.functions";
import { Button } from "@/components/ui/button";
import {
  Compass,
  ExternalLink,
  Loader2,
  Plus,
  RefreshCw,
  Check,
} from "@/lib/icons";

export const Route = createFileRoute("/_authenticated/discover")({
  head: () => ({ meta: [{ title: "Discover" }] }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const get = useServerFn(getRecommendations);
  const query = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => get(),
    staleTime: 60 * 60_000,
    retry: false,
  });
  const [added, setAdded] = useState<Set<number>>(new Set());

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/60 select-none">
            Recommendations
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-none">
            Discover
          </h1>
          {query.data && query.data.basedOn.length > 0 && (
            <p className="pt-2 text-xs text-muted-foreground max-w-2xl">
              Based on{" "}
              <span className="text-foreground">
                {query.data.basedOn.slice(0, 5).join(", ")}
              </span>
              {query.data.basedOn.length > 5 &&
                ` and ${query.data.basedOn.length - 5} more`}
            </p>
          )}
          {query.data && query.data.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {query.data.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-2"
          onClick={() => query.refetch()}
          disabled={query.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${query.isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {query.isLoading ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center text-sm text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Analysing your library…</p>
          <p className="text-xs opacity-70">
            The first time can take up to ~30 seconds while game tags are
            fetched.
          </p>
        </div>
      ) : query.isError ? (
        <p className="py-24 text-center text-sm text-muted-foreground">
          Couldn't compute recommendations right now (
          {query.error instanceof Error ? query.error.message : "error"}).
        </p>
      ) : !query.data || query.data.recommendations.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <Compass className="h-8 w-8 text-muted-foreground/50" />
          <p className="font-semibold">Nothing to recommend yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Rate a few games you liked — recommendations are built from the Steam tags of your favourite
            games.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {query.data.recommendations.map((r, i) => (
            <motion.div
              key={r.appId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
            >
              <RecommendationCard
                rec={r}
                added={added.has(r.appId)}
                onAdded={() => setAdded((s) => new Set(s).add(r.appId))}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecommendationCard({
  rec,
  added,
  onAdded,
}: {
  rec: Recommendation;
  added: boolean;
  onAdded: () => void;
}) {
  const qc = useQueryClient();
  const details = useServerFn(getSteamGameDetails);
  const create = useServerFn(createGame);
  const [cover, setCover] = useState(rec.cover);

  const add = useMutation({
    mutationFn: async () => {
      const d = await details({ data: { appId: rec.appId } }).catch(() => null);
      return create({
        data: {
          title: d?.title ?? rec.name,
          cover_url: d?.cover_url ?? rec.fallbackCover,
          release_date: d?.release_date ?? null,
          genre: d?.genre ?? null,
          platform: "PC",
          status: "backlog",
          steam_appid: rec.appId,
        },
      });
    },
    onSuccess: () => {
      toast.success(`${rec.name} added to “To play”`);
      onAdded();
      qc.invalidateQueries({ queryKey: ["games"] });
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "Failed to add"),
  });

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card">
      <a
        href={`https://store.steampowered.com/app/${rec.appId}`}
        target="_blank"
        rel="noreferrer noopener"
        className="relative block aspect-[3/4] overflow-hidden bg-muted"
      >
        <img
          src={cover}
          alt={rec.name}
          loading="lazy"
          // Not every game has a portrait capsule; the header image always exists
          onError={() =>
            cover !== rec.fallbackCover && setCover(rec.fallbackCover)
          }
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          {rec.positiveRatio}% 👍
        </span>
        <span className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </a>
      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <h3 className="line-clamp-1 text-sm font-semibold" title={rec.name}>
          {rec.name}
        </h3>
        {rec.because.length > 0 && (
          <p className="line-clamp-2 text-[11px] text-muted-foreground">
            Because you liked{" "}
            <span className="text-foreground">{rec.because.join(" & ")}</span>
          </p>
        )}
        <div className="flex flex-wrap gap-1">
          {rec.matchedTags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <Button
          size="sm"
          variant={added ? "ghost" : "secondary"}
          className="mt-auto h-7 gap-1.5 text-xs"
          disabled={added || add.isPending}
          onClick={() => add.mutate()}
        >
          {added ? (
            <>
              <Check className="h-3.5 w-3.5" /> Added
            </>
          ) : add.isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" /> To play
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
