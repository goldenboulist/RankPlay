import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { listUsers } from "@/lib/users.functions";
import { Users, UserCircle, ChevronRight, CalendarDays, Trophy } from "@/lib/icons";

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/_authenticated/users/")({
  head: () => ({ meta: [{ title: "Users" }] }),
  component: UsersPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(user: { display_name: string | null; email: string }) {
  if (user.display_name) {
    return user.display_name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return user.email[0].toUpperCase();
}

// Deterministic avatar gradient from user id
const AVATAR_GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-sky-500 to-indigo-600",
];

function avatarGradient(id: string) {
  let hash = 0;
  for (const c of id) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

// ─── User card ────────────────────────────────────────────────────────────────
function UserCard({
  user,
  index,
}: {
  user: { id: string; email: string; display_name: string | null; created_at: string };
  index: number;
}) {
  const initials = getInitials(user);
  const gradient = avatarGradient(user.id);
  const name = user.display_name || user.email.split("@")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.055, duration: 0.35 }}
    >
      <Link
        to="/users/$userId"
        params={{ userId: user.id }}
        className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card px-5 py-4 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/5 no-underline"
      >
        {/* Avatar */}
        <div
          className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${gradient} shadow-lg ring-2 ring-white/10`}
        >
          <span className="text-[15px] font-semibold text-white">{initials}</span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </p>
          <p className="truncate text-[12px] text-muted-foreground">{user.email}</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <CalendarDays className="h-3 w-3" />
            <span>Joined {formatDate(user.created_at)}</span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </Link>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/40 bg-card py-24 text-center"
    >
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-xl bg-muted/50 rotate-6" />
        <div className="absolute inset-0 rounded-xl bg-muted/30 -rotate-3" />
        <div className="relative grid h-full place-items-center rounded-xl bg-muted/60 border border-border/40">
          <Users className="h-5 w-5 text-muted-foreground/50" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-semibold">No users found</p>
        <p className="text-sm text-muted-foreground max-w-[240px]">
          There are no registered users yet.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-border/40 bg-card px-5 py-4 animate-pulse"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="h-12 w-12 shrink-0 rounded-full bg-muted/50" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-muted/50" />
            <div className="h-3 w-1/2 rounded bg-muted/30" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function UsersPage() {
  const fetchUsers = useServerFn(listUsers);
  const query = useQuery({ queryKey: ["users"], queryFn: () => fetchUsers() });

  const users = query.data ?? [];

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="pb-6 border-b border-border/40"
      >
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none mb-1.5">
          Community
        </p>
        <h1 className="text-4xl font-bold tracking-tight leading-none">Users</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse all registered members and explore their rankings.
        </p>
      </motion.div>

      {/* ── Stats bar ── */}
      {!query.isLoading && users.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-2 rounded-xl border border-border/50 bg-card px-5 py-3 w-fit"
        >
          <Trophy className="h-4 w-4 text-[var(--color-gold,#c9913a)]" />
          <span className="text-sm font-medium">
            <span className="text-[var(--color-gold,#c9913a)] font-bold">{users.length}</span>{" "}
            <span className="text-muted-foreground">
              {users.length === 1 ? "member" : "members"} registered
            </span>
          </span>
        </motion.div>
      )}

      {/* ── Content ── */}
      {query.isLoading ? (
        <Skeleton />
      ) : users.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {users.map((user, i) => (
            <UserCard key={user.id} user={user} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
