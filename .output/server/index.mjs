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
  "/assets/AnimatedDots-DiCYawVE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3d0-jUZdThbG9cxnazaDfiTBYR2Bo10"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 976,
    "path": "../public/assets/AnimatedDots-DiCYawVE.js"
  },
  "/assets/auth-middleware-CTEOSuV0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c8-MJUuzzmgQS21oimzceAVM/9grwE"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 9160,
    "path": "../public/assets/auth-middleware-CTEOSuV0.js"
  },
  "/assets/auth-B1iREVg5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3158-PMZ+3UwJBzojYPXllP6w8tNa7yg"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 12632,
    "path": "../public/assets/auth-B1iREVg5.js"
  },
  "/assets/button-Cha-t3ub.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"796-C5DE+ewVAoZeaLDPM1OhcuWIAGs"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 1942,
    "path": "../public/assets/button-Cha-t3ub.js"
  },
  "/assets/category-icons-C3jHd3z8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31c-pufAqijzRJ6TeMOSr/9638cRnlg"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 796,
    "path": "../public/assets/category-icons-C3jHd3z8.js"
  },
  "/assets/confirm-dialog-BZVcWjKs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2740-pJkxBiSwbsWUA1UvVjar0npxOBk"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 10048,
    "path": "../public/assets/confirm-dialog-BZVcWjKs.js"
  },
  "/assets/dialog-DlfoyHD6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10eb-9XNJRZ6NhF/QpEMrA8ahhLJY1Kk"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 4331,
    "path": "../public/assets/dialog-DlfoyHD6.js"
  },
  "/assets/games.functions-CDfPO1s0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"71e-+Pv4v6woWf5QM3q8eYSn8XnZaKo"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 1822,
    "path": "../public/assets/games.functions-CDfPO1s0.js"
  },
  "/assets/games.index-B66Fedy5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"45ab-RxUAS9SJs0x+v+SL9fiZIE6qQpI"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 17835,
    "path": "../public/assets/games.index-B66Fedy5.js"
  },
  "/assets/games._gameId-D683Yfmd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4350-pztRwWJFfa4FqhkYuv2Jc5gKfxA"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 17232,
    "path": "../public/assets/games._gameId-D683Yfmd.js"
  },
  "/assets/index-Bb4fnYIB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10c4-R0h9CZTNofB6M3biOgd4i9cqz70"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 4292,
    "path": "../public/assets/index-Bb4fnYIB.js"
  },
  "/assets/index-CPF65M8B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a8a-g9RxATsXPjbjpNb9W582bWe2ZjM"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 6794,
    "path": "../public/assets/index-CPF65M8B.js"
  },
  "/assets/dashboard-Dyi6vXZ5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f2af-RE2c65MuJsOgyv/51S7qxle2gRs"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 389807,
    "path": "../public/assets/dashboard-Dyi6vXZ5.js"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"3aee-UoTsfIkKKnWxFY03kRscmle3c5w"',
    "mtime": "2026-06-26T14:50:00.792Z",
    "size": 15086,
    "path": "../public/favicon.ico"
  },
  "/assets/label-Db5nspyz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"275-xo3QUa5efH0cyf31gWHOeAALzow"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 629,
    "path": "../public/assets/label-Db5nspyz.js"
  },
  "/assets/input-Bg7nTerN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24e-7RWYMLcGbsI88P2JHpenDkEgYz8"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 590,
    "path": "../public/assets/input-Bg7nTerN.js"
  },
  "/assets/legal-config-DSFTtCOP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"442-nj9ZSm8bNaSCgp5ZVGKN24rqC0Y"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 1090,
    "path": "../public/assets/legal-config-DSFTtCOP.js"
  },
  "/assets/item-navigator-Bg4R_m3c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5dec-0iYey79dOpvI93x8rn9XylSlVpM"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 24044,
    "path": "../public/assets/item-navigator-Bg4R_m3c.js"
  },
  "/assets/media.functions-BLgNssPT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"658-cZ/dAQa1GmEX7SDaLvTuVcOwrTk"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 1624,
    "path": "../public/assets/media.functions-BLgNssPT.js"
  },
  "/assets/media._mediaId-BVlW-mjs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4475-9wCNpzAWf99Dx24VyTWYXyE2fhI"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 17525,
    "path": "../public/assets/media._mediaId-BVlW-mjs.js"
  },
  "/assets/mentions-legales-nT5xTTdW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1591-+EK7WF2OxPEYet9DRwaf2JklFAE"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 5521,
    "path": "../public/assets/mentions-legales-nT5xTTdW.js"
  },
  "/assets/media.index-DwpcyISQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4046-j+q3Ps3mWoUA73qUpv+k0U0X9RA"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 16454,
    "path": "../public/assets/media.index-DwpcyISQ.js"
  },
  "/assets/music-picker-Dkg3nn9p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6635-L6gmEbsmJJPK4FF7ry/ArrBioso"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 26165,
    "path": "../public/assets/music-picker-Dkg3nn9p.js"
  },
  "/assets/music-player-CSzUN7di.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15ac-/FSq8+PUmEYeai6zZ00rhSmnd2M"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 5548,
    "path": "../public/assets/music-player-CSzUN7di.js"
  },
  "/assets/index-Dj8MLrWo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8307f-vMJFFwdE59SAo2ZSpAAH8hhLz1Y"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 536703,
    "path": "../public/assets/index-Dj8MLrWo.js"
  },
  "/assets/politique-confidentialite-BSZehI2e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c0f-oLZU/uITFSHm/vi+ZUgR6SHKcI0"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 11279,
    "path": "../public/assets/politique-confidentialite-BSZehI2e.js"
  },
  "/assets/reset-password-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 41,
    "path": "../public/assets/reset-password-DtqBFgK5.js"
  },
  "/assets/select-C1hVJuwl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c54d-1myh3ra6Tf6AhMAoE1jk98LlcLU"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 50509,
    "path": "../public/assets/select-C1hVJuwl.js"
  },
  "/assets/route-DwZq_q1W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e17-VnUN9dPQQ25M/7OuRA056lbov3k"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 3607,
    "path": "../public/assets/route-DwZq_q1W.js"
  },
  "/assets/slider-DniUHbBq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25db-qnAcnrPGkjI6+b42JhZsDtX568A"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 9691,
    "path": "../public/assets/slider-DniUHbBq.js"
  },
  "/assets/settings-LmQ2rJ54.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12c4-R41mduAjYu/0HZAA9iYz3JLaGtw"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 4804,
    "path": "../public/assets/settings-LmQ2rJ54.js"
  },
  "/assets/users.functions-Clf1P0Pg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15f-mFW5o4lW07yZBs4X17i9fqOe1Zg"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 351,
    "path": "../public/assets/users.functions-Clf1P0Pg.js"
  },
  "/assets/users.index-CkVPn7w6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1228-QcSMcRFB9oGw+nD6SCGFVNQSMVs"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 4648,
    "path": "../public/assets/users.index-CkVPn7w6.js"
  },
  "/assets/styles-wXb395py.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"2234d-1nivHPKk/sNd2QOp/Goiygo6+FU"',
    "mtime": "2026-09-28T21:13:09.309Z",
    "size": 140109,
    "path": "../public/assets/styles-wXb395py.css"
  },
  "/assets/users._userId-CzbMiIk5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3d00-rtXN3qBJcdRh+8rgYBkSz6Lb6kU"',
    "mtime": "2026-09-28T21:13:09.314Z",
    "size": 15616,
    "path": "../public/assets/users._userId-CzbMiIk5.js"
  },
  "/assets/users._userId_._kind._itemId-N740qJvK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23ff-jz1PxalysN4Rf6vlJsAnrI9Sxdg"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 9215,
    "path": "../public/assets/users._userId_._kind._itemId-N740qJvK.js"
  },
  "/assets/utils-TwuVwSnW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7588-HVRvWXad0j6TAbhPUAyxV/Wlk0Y"',
    "mtime": "2026-09-28T21:13:09.315Z",
    "size": 30088,
    "path": "../public/assets/utils-TwuVwSnW.js"
  },
  "/uploads/1780844501449-Mafia__Definitive_Edition_-_Jesse_Harlin__Main_Menu_Theme_Soundtrack_-_Salieri.mp3": {
    "type": "audio/mpeg",
    "etag": '"dc6f6-nE/Vfff1bmYfEpBXfRtgEObYM4k"',
    "mtime": "2026-06-26T14:50:00.909Z",
    "size": 902902,
    "path": "../public/uploads/1780844501449-Mafia__Definitive_Edition_-_Jesse_Harlin__Main_Menu_Theme_Soundtrack_-_Salieri.mp3"
  },
  "/uploads/1780844981634-Mafia_3_-_New_Bordeaux_Theme_OST.mp3": {
    "type": "audio/mpeg",
    "etag": '"23be9e-7E012Vuwr1mhCnHbFFzKsf7H81Y"',
    "mtime": "2026-06-26T14:50:00.937Z",
    "size": 2342558,
    "path": "../public/uploads/1780844981634-Mafia_3_-_New_Bordeaux_Theme_OST.mp3"
  },
  "/uploads/1780847646602-Grand_Theft_Auto_IV_Theme_Song__best_quality_.mp3": {
    "type": "audio/mpeg",
    "etag": '"2e671b-KMyHpF2830wW+MqDAjetNSOweQU"',
    "mtime": "2026-06-26T14:50:01.021Z",
    "size": 3041051,
    "path": "../public/uploads/1780847646602-Grand_Theft_Auto_IV_Theme_Song__best_quality_.mp3"
  },
  "/uploads/1780844825174-Mafia_II_-_Main_Theme_Music.mp3": {
    "type": "audio/mpeg",
    "etag": '"344c5a-XeRC2rzDsgJa8Dzo48UyuzhGVls"',
    "mtime": "2026-06-26T14:50:00.925Z",
    "size": 3427418,
    "path": "../public/uploads/1780844825174-Mafia_II_-_Main_Theme_Music.mp3"
  },
  "/uploads/1780847633561-GTA_V_-_Welcome_to_Los_Santos_Soundtrack_-_IntroTheme_song.mp3": {
    "type": "audio/mpeg",
    "etag": '"36bd98-GUDqY+Konit8iWevfRqIvmLP19o"',
    "mtime": "2026-06-26T14:50:01.002Z",
    "size": 3587480,
    "path": "../public/uploads/1780847633561-GTA_V_-_Welcome_to_Los_Santos_Soundtrack_-_IntroTheme_song.mp3"
  },
  "/uploads/1780847955007-Main_Theme__Red_Dead_Redemption_2_OST.mp3": {
    "type": "audio/mpeg",
    "etag": '"37556e-mgpycLNiPbtiRBWQhH06J5cXrWw"',
    "mtime": "2026-06-26T14:50:01.112Z",
    "size": 3626350,
    "path": "../public/uploads/1780847955007-Main_Theme__Red_Dead_Redemption_2_OST.mp3"
  },
  "/uploads/1780847433471-Horizon.mp3": {
    "type": "audio/mpeg",
    "etag": '"3abfb8-7aJ0UzsrMRlMy7kR0rCtZ241Tzs"',
    "mtime": "2026-06-26T14:50:00.954Z",
    "size": 3850168,
    "path": "../public/uploads/1780847433471-Horizon.mp3"
  },
  "/uploads/1782043875046-007_First_Light_Title_Sequence__Lana_Del_Rey.mp3": {
    "type": "audio/mpeg",
    "etag": '"230264-ECdyZIQYuO8Q70Qk7gfeIWaf5vU"',
    "mtime": "2026-06-26T14:50:01.176Z",
    "size": 2294372,
    "path": "../public/uploads/1782043875046-007_First_Light_Title_Sequence__Lana_Del_Rey.mp3"
  },
  "/uploads/1780848007599-The_Forest__Original_Game_Soundtrack_-_Main_Menu_Theme.mp3": {
    "type": "audio/mpeg",
    "etag": '"450379-1oyxNw7WgA02PeD7xygHSuZ1Njk"',
    "mtime": "2026-06-26T14:50:01.136Z",
    "size": 4522873,
    "path": "../public/uploads/1780848007599-The_Forest__Original_Game_Soundtrack_-_Main_Menu_Theme.mp3"
  },
  "/uploads/1783009207355-Ilan_Eshkeri_-_The_Way_of_the_Ghost_Ghost_of_Tsushima__Music_from_the_Video_Game__ft._Clare_Uchima.mp3": {
    "type": "audio/mpeg",
    "etag": '"34e9ec-8Ac2AhsXIIzjpWFjcgMdhOCJ/H8"',
    "mtime": "2026-07-02T16:20:07.368Z",
    "size": 3467756,
    "path": "../public/uploads/1783009207355-Ilan_Eshkeri_-_The_Way_of_the_Ghost_Ghost_of_Tsushima__Music_from_the_Video_Game__ft._Clare_Uchima.mp3"
  },
  "/uploads/1780847889731-HITMAN_3_Soundtrack_-_Main_Menu.mp3": {
    "type": "audio/mpeg",
    "etag": '"5392d2-nSd0FqaroaD7M3DYkjGsJeF/I7o"',
    "mtime": "2026-06-26T14:50:01.093Z",
    "size": 5477074,
    "path": "../public/uploads/1780847889731-HITMAN_3_Soundtrack_-_Main_Menu.mp3"
  },
  "/uploads/1780847453849-Run__Jump__Fight_-_Main_Theme_Music_Track_from_Dying_Light_2_Stay_Human.mp3": {
    "type": "audio/mpeg",
    "etag": '"5af7e1-QnOtoxMfZYUjSSz2aUrXatmGjnk"',
    "mtime": "2026-06-26T14:50:00.982Z",
    "size": 5961697,
    "path": "../public/uploads/1780847453849-Run__Jump__Fight_-_Main_Theme_Music_Track_from_Dying_Light_2_Stay_Human.mp3"
  },
  "/uploads/1780848016596-Sons_of_the_Forest__Original_Game_Soundtrack_-_Main_Theme__1.0_.mp3": {
    "type": "audio/mpeg",
    "etag": '"5c5889-BBD6H8DUww3GPzC5azq6qIPF5Ek"',
    "mtime": "2026-06-26T14:50:01.163Z",
    "size": 6051977,
    "path": "../public/uploads/1780848016596-Sons_of_the_Forest__Original_Game_Soundtrack_-_Main_Theme__1.0_.mp3"
  },
  "/uploads/1782070138732-Watch_Dogs_Main_Menu_Theme_HQ__Main_Menu_Soundtrack.mp3": {
    "type": "audio/mpeg",
    "etag": '"4a2dec-rE4quQdjomWPrbi3qAhHvrcTxig"',
    "mtime": "2026-06-26T14:50:01.200Z",
    "size": 4861420,
    "path": "../public/uploads/1782070138732-Watch_Dogs_Main_Menu_Theme_HQ__Main_Menu_Soundtrack.mp3"
  },
  "/uploads/1780847766421-GTA_San_Andreas_Theme_Song_Full____.mp3": {
    "type": "audio/mpeg",
    "etag": '"874035-zuEiZdmzVbWK5yh+KvMudaVgTy4"',
    "mtime": "2026-06-26T14:50:01.065Z",
    "size": 8863797,
    "path": "../public/uploads/1780847766421-GTA_San_Andreas_Theme_Song_Full____.mp3"
  },
  "/uploads/1780840221920-Mafia__The_Old_Country_-_Main_Menu_Theme.mp3": {
    "type": "audio/mpeg",
    "etag": '"14c2d45-WKtQ+HNreS4TO50Y9ioBTpT1rNk"',
    "mtime": "2026-06-26T14:50:00.904Z",
    "size": 21769541,
    "path": "../public/uploads/1780840221920-Mafia__The_Old_Country_-_Main_Menu_Theme.mp3"
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
