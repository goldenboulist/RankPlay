import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { supabase } from "@/integrations/supabase/client";

// The session cookie expired or was revoked: drop the local profile and go to /auth
function onError(error: unknown) {
  if (error instanceof Error && error.message.startsWith("Unauthorized")) {
    supabase.auth._expire();
  }
}

export const getRouter = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({ onError }),
    mutationCache: new MutationCache({ onError }),
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
