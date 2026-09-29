globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"3aee-UoTsfIkKKnWxFY03kRscmle3c5w"',
    "mtime": "2026-06-26T14:50:00.792Z",
    "size": 15086,
    "path": "../public/favicon.ico"
  },
  "/assets/AnimatedDots-DrDmJeTb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3d0-CY4N3JWB3t5VwK97eEXWKJx2xys"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 976,
    "path": "../public/assets/AnimatedDots-DrDmJeTb.js"
  },
  "/assets/auth-j_IwhOqW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3179-Dj+5TGQRb1m5rPiaC9NzFb94Wek"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 12665,
    "path": "../public/assets/auth-j_IwhOqW.js"
  },
  "/assets/auth-middleware-DO2phsW_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c8-UCi4VJYzp6VgxNTo/uz8oE9c2Qk"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 9160,
    "path": "../public/assets/auth-middleware-DO2phsW_.js"
  },
  "/assets/button-BVO6EQ9V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"796-xl3uPGAwLiHD7ZtruqtFpcb0y5w"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 1942,
    "path": "../public/assets/button-BVO6EQ9V.js"
  },
  "/assets/catalog-search-DzTUZVhy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7e0-0pSQBKRak9lNQuW80JhENJvUUG8"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 2016,
    "path": "../public/assets/catalog-search-DzTUZVhy.js"
  },
  "/assets/category-icons-CbwptSIE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1bd-oWxNVNpyOOCoMZZ12N6wkOqJWiA"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 445,
    "path": "../public/assets/category-icons-CbwptSIE.js"
  },
  "/assets/Combination-DldKZvia.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5029-cfKaKofBfe3lNkJKs2CrGQG6bOQ"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 20521,
    "path": "../public/assets/Combination-DldKZvia.js"
  },
  "/assets/confirm-dialog-B0dBfmD-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"273d-pfDJudfPHJO2GMLM2jHu9SdXPgA"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 10045,
    "path": "../public/assets/confirm-dialog-B0dBfmD-.js"
  },
  "/assets/dialog-BXJ4mNK6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"87a-KzxdwdQC70TXCA15oh9nOlrXjK8"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 2170,
    "path": "../public/assets/dialog-BXJ4mNK6.js"
  },
  "/assets/discover-DJQLKMsy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15e6-FEdzY/bvseMi7Vrk8L6cSyW7BrA"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 5606,
    "path": "../public/assets/discover-DJQLKMsy.js"
  },
  "/assets/error-message-CWIfMaS4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82d-v4uMY79RvNehoCl/xPqeaWzkzD0"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 2093,
    "path": "../public/assets/error-message-CWIfMaS4.js"
  },
  "/assets/games.functions-BUtLtsfV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"819-W/H/cc6eOFUyRqRF9q5ubofU200"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 2073,
    "path": "../public/assets/games.functions-BUtLtsfV.js"
  },
  "/assets/game-fields-Cwh44IcU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"738-Ocj+psFI2KROkQpHdXWGVKHAxqM"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 1848,
    "path": "../public/assets/game-fields-Cwh44IcU.js"
  },
  "/assets/games.index-CN6ah8oY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4a3f-jt/fGaslZ6+muU9WBd7nn6yug7g"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 19007,
    "path": "../public/assets/games.index-CN6ah8oY.js"
  },
  "/assets/games.tiers-BUI-s8RW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e3b-BHXWJ9kTfBPUsByDvR8NNcWs37M"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 7739,
    "path": "../public/assets/games.tiers-BUI-s8RW.js"
  },
  "/assets/games._gameId-VcMk4iFr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4851-+gDVta0sAW3qROlG/amENjxCtfI"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 18513,
    "path": "../public/assets/games._gameId-VcMk4iFr.js"
  },
  "/assets/dashboard-X8rlVOH7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f2d2-vUZFqi8xCbyQabhR4Ptph/Hqyjg"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 389842,
    "path": "../public/assets/dashboard-X8rlVOH7.js"
  },
  "/assets/index-dZ1tbji6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10c4-aO1tjR2ZSivQN/2CHrJiIwwH5dk"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 4292,
    "path": "../public/assets/index-dZ1tbji6.js"
  },
  "/assets/index-fwvOTges.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"530-0VTr0jUnwOYNMsQZQ212AExL670"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 1328,
    "path": "../public/assets/index-fwvOTges.js"
  },
  "/assets/index-xwOUPD-t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15da-bRq/G0e0/tmFjZtCVUegtPSYUJY"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 5594,
    "path": "../public/assets/index-xwOUPD-t.js"
  },
  "/assets/input-DC5D-rsq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24e-fZDsBJ3URMngJFybMUCQOLD56kQ"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 590,
    "path": "../public/assets/input-DC5D-rsq.js"
  },
  "/assets/item-navigator-DbElrYt7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e0a-KX6I5LLTw9EJvRb+TPTiW7ODMkA"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 3594,
    "path": "../public/assets/item-navigator-DbElrYt7.js"
  },
  "/assets/label-C07cjfPI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"275-cyUVwqrujhOPZJs1nG1mdVXQGis"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 629,
    "path": "../public/assets/label-C07cjfPI.js"
  },
  "/assets/index-CCxxLcYI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"836d5-nSpysHr1Iy460X53smVeRib7Y+Q"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 538325,
    "path": "../public/assets/index-CCxxLcYI.js"
  },
  "/assets/media.functions-DpgTPtEA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"658-RK2lRcfV+drrUygwIJySQyQ6yF4"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 1624,
    "path": "../public/assets/media.functions-DpgTPtEA.js"
  },
  "/assets/legal-config-DSFTtCOP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"442-nj9ZSm8bNaSCgp5ZVGKN24rqC0Y"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 1090,
    "path": "../public/assets/legal-config-DSFTtCOP.js"
  },
  "/assets/media.index-DBWZnnik.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4658-awGPNKUTVGdni/UAyeMeAMEnebc"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 18008,
    "path": "../public/assets/media.index-DBWZnnik.js"
  },
  "/assets/media._mediaId-CU7iXTUk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"45b8-Lk6eSWecYjtS2k+KyRwbrGWOvNc"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 17848,
    "path": "../public/assets/media._mediaId-CU7iXTUk.js"
  },
  "/assets/mentions-legales-wjc8pvWm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1591-fEWbWaWRY9GleP2d8ItAc/a6ICs"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 5521,
    "path": "../public/assets/mentions-legales-wjc8pvWm.js"
  },
  "/assets/music-picker-DUPuKiXs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"675a-Ak8HBEUItG22xAhV5vaqm+uCbfM"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 26458,
    "path": "../public/assets/music-picker-DUPuKiXs.js"
  },
  "/assets/music-player-BF2UhbzV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1644-n4LI5YGCua85UUUJL33pvAwGq/4"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 5700,
    "path": "../public/assets/music-player-BF2UhbzV.js"
  },
  "/assets/reset-password-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 41,
    "path": "../public/assets/reset-password-DtqBFgK5.js"
  },
  "/assets/politique-confidentialite-BarIdFxr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c0f-IWIiWXi+PMaq2IqPXMpUqFvFtbs"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 11279,
    "path": "../public/assets/politique-confidentialite-BarIdFxr.js"
  },
  "/assets/route-Crq240Zh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e47-PBMut935vCABmFthWjDLTy2Ru+8"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 3655,
    "path": "../public/assets/route-Crq240Zh.js"
  },
  "/assets/scoring-BgxhvF5M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"167-O10k4cOLmzWhX0jCWbkup1F6LAM"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 359,
    "path": "../public/assets/scoring-BgxhvF5M.js"
  },
  "/assets/settings-BOK1_1IB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12c4-CN9GH/cUnwFGrBmJjvYWco+BdWY"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 4804,
    "path": "../public/assets/settings-BOK1_1IB.js"
  },
  "/assets/select-jzDgCnU-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c595-72KLi37+KHjw1yQcfQw6c4bLnu0"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 50581,
    "path": "../public/assets/select-jzDgCnU-.js"
  },
  "/assets/slider-D35w96QE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25fc-aglTzsq3xxzJCKij+avdzOBxNNY"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 9724,
    "path": "../public/assets/slider-D35w96QE.js"
  },
  "/assets/steam.functions-1mCO-pPD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-U6SrJGae4vcBKJzz9uXc7Hsr4us"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 356,
    "path": "../public/assets/steam.functions-1mCO-pPD.js"
  },
  "/assets/types-Bp05YxvD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"63-xaVrpyIneNxhUbSc42kBWFD8t/4"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 99,
    "path": "../public/assets/types-Bp05YxvD.js"
  },
  "/assets/styles-CaLVjvJy.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1f78f-O6dw7qpnHxheQu3gpxMx+tE0cJE"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 128911,
    "path": "../public/assets/styles-CaLVjvJy.css"
  },
  "/assets/useMutation-DR1j74yM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-Oq4pSZizUgUBBZ+Pk7ThJDWhong"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 2210,
    "path": "../public/assets/useMutation-DR1j74yM.js"
  },
  "/assets/users.functions-DN_wZR4C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15f-hJ8vDyEiEhVE3JaeR9S20YuTyU4"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 351,
    "path": "../public/assets/users.functions-DN_wZR4C.js"
  },
  "/assets/users.index-D9pB0wOu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1228-bM0I86xEwgsfNDHRAPOK9+l4icM"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 4648,
    "path": "../public/assets/users.index-D9pB0wOu.js"
  },
  "/assets/users._userId_._kind._itemId-Bzflf-xv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2486-2O0m6mpmNjYBnG4JorcnI5FvLMU"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 9350,
    "path": "../public/assets/users._userId_._kind._itemId-Bzflf-xv.js"
  },
  "/assets/users._userId-BWcHdAFR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3d62-vhPCdPxsR0f5L6Os3Z3+0JTjDxg"',
    "mtime": "2026-09-29T18:31:30.067Z",
    "size": 15714,
    "path": "../public/assets/users._userId-BWcHdAFR.js"
  },
  "/assets/utils-B4RGGOSw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7588-+JJBhQqwpZo54nuklDr498SaTSE"',
    "mtime": "2026-09-29T18:31:30.069Z",
    "size": 30088,
    "path": "../public/assets/utils-B4RGGOSw.js"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _9lbQVn = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_VQLNDo = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_VQLNDo };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_9lbQVn)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    middleware.push(...h3App["~middleware"]);
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
