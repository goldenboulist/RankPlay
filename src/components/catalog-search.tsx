import { useEffect, useState, type ReactNode } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { describeError } from "@/lib/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "@/lib/icons";

/** Debounced search box over an external catalog (Steam, TVmaze, Wikidata, TMDB) that prefills a form. */
export function CatalogSearch<T>({
  label,
  placeholder,
  queryKey,
  search,
  getKey,
  renderItem,
  onPick,
}: {
  label: string;
  placeholder: string;
  queryKey: string;
  search: (term: string) => Promise<T[]>;
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  onPick: (item: T) => unknown;
}) {
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(term.trim()), 300);
    return () => clearTimeout(t);
  }, [term]);

  const results = useQuery({
    queryKey: [queryKey, debounced],
    queryFn: () => search(debounced),
    enabled: debounced.length >= 2,
    staleTime: 5 * 60_000,
    retry: false,
  });

  const pick = useMutation({
    mutationFn: async (item: T) => onPick(item),
    onSuccess: () => {
      setTerm("");
      setOpen(false);
    },
    onError: (e) =>
      toast.error(describeError("load the details of this result", e)),
  });

  const items = results.data ?? [];
  const showList = open && debounced.length >= 2;

  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            // Enter picks the first hit instead of submitting the form
            if (e.key === "Enter") {
              e.preventDefault();
              if (items[0]) pick.mutate(items[0]);
            }
          }}
          placeholder={placeholder}
          className="pl-9 pr-9"
          autoFocus
        />
        {(results.isFetching || pick.isPending) && (
          <Loader2 className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>

      {showList && (
        <div className="max-h-64 overflow-y-auto rounded-md border border-border/50 bg-muted/20">
          {results.isError ? (
            <p className="px-3 py-2 text-xs text-muted-foreground">
              {results.error instanceof Error
                ? results.error.message
                : "Search unavailable"}{" "}
              — fill the fields manually.
            </p>
          ) : items.length === 0 ? (
            !results.isFetching && (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                No results — fill the fields manually.
              </p>
            )
          ) : (
            items.map((item) => (
              <button
                key={getKey(item)}
                type="button"
                disabled={pick.isPending}
                onClick={() => pick.mutate(item)}
                className="flex w-full items-center gap-3 px-2 py-1.5 text-left text-sm hover:bg-muted/60 disabled:opacity-50"
              >
                {renderItem(item)}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
