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
  "/assets/button-HOvmVqC7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"796-fcfrdnZQUziFoI3sHxVj6nwcriE"',
    "mtime": "2026-09-29T17:50:48.021Z",
    "size": 1942,
    "path": "../public/assets/button-HOvmVqC7.js"
  },
  "/assets/auth-DGftIX8a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3179-Xy2JtR6WkPl/j3rOlIcuPrmU0ZU"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 12665,
    "path": "../public/assets/auth-DGftIX8a.js"
  },
  "/assets/auth-middleware-CxKzFUTg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c8-cpsoEtJTEBKebOuQCZXxcRhQFXE"',
    "mtime": "2026-09-29T17:50:48.021Z",
    "size": 9160,
    "path": "../public/assets/auth-middleware-CxKzFUTg.js"
  },
  "/assets/AnimatedDots-DQ3kw8cC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3d0-7XfaIJuQLH5auLRDTZH1bPgB690"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 976,
    "path": "../public/assets/AnimatedDots-DQ3kw8cC.js"
  },
  "/assets/catalog-search-BAIbeDip.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7e0-CzGs+3CbqdveJJzIP8/2+B7THyk"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 2016,
    "path": "../public/assets/catalog-search-BAIbeDip.js"
  },
  "/assets/confirm-dialog-Bez4xpCQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"273d-IwgBi49JB+UU+/7cPzVywBQnj3A"',
    "mtime": "2026-09-29T17:50:48.021Z",
    "size": 10045,
    "path": "../public/assets/confirm-dialog-Bez4xpCQ.js"
  },
  "/assets/Combination-iM2SKE05.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5029-tlr9IrH4t/qz7RL5baox8eSSans"',
    "mtime": "2026-09-29T17:50:48.021Z",
    "size": 20521,
    "path": "../public/assets/Combination-iM2SKE05.js"
  },
  "/assets/category-icons-C4bsYvYl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1bd-XXsC0HfxmKCKyjY7Gq+71MTBjPY"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 445,
    "path": "../public/assets/category-icons-C4bsYvYl.js"
  },
  "/assets/discover-Ckt751JF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15e6-1PitM9D0rXS8PsdkwfMh1dCkhsE"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 5606,
    "path": "../public/assets/discover-Ckt751JF.js"
  },
  "/assets/dialog-WzGJYg9d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"87a-W5wV+I57LMLVGhNmct1CJEsJtp0"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 2170,
    "path": "../public/assets/dialog-WzGJYg9d.js"
  },
  "/assets/error-message-CWIfMaS4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82d-v4uMY79RvNehoCl/xPqeaWzkzD0"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 2093,
    "path": "../public/assets/error-message-CWIfMaS4.js"
  },
  "/assets/games.functions-LoR_F7MB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"819-u7VNUsN45gZNxILT+jY8mOjhS+g"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 2073,
    "path": "../public/assets/games.functions-LoR_F7MB.js"
  },
  "/assets/game-fields-EjZZU5Pi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"738-Pqs0FuO8qtF3lxYCc7gOV/rE+kE"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 1848,
    "path": "../public/assets/game-fields-EjZZU5Pi.js"
  },
  "/assets/games.index-COYeLZM_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4a3f-dolxut35iW6yohwj7Std1qmrYsM"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 19007,
    "path": "../public/assets/games.index-COYeLZM_.js"
  },
  "/assets/games.tiers-CVWESds3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e3b-JrbnQ6U3WSoU/KvVtb/MoCvzeuw"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 7739,
    "path": "../public/assets/games.tiers-CVWESds3.js"
  },
  "/assets/games._gameId-BZAH83iv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4850-rlCvNg98efMoK5PZG1NWZymiT7M"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 18512,
    "path": "../public/assets/games._gameId-BZAH83iv.js"
  },
  "/assets/index-B-kovTy2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10c4-O+CajH0CcxyL54AaJ3zAd569AyY"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 4292,
    "path": "../public/assets/index-B-kovTy2.js"
  },
  "/assets/dashboard-DdrnE6By.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f2d2-ppoaenGsWSxDL/n4V28w9FBS0cM"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 389842,
    "path": "../public/assets/dashboard-DdrnE6By.js"
  },
  "/assets/index-D3-Akv5N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"530-RjhJQxQA/ko1wWnsKwqxNhTpV+Q"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 1328,
    "path": "../public/assets/index-D3-Akv5N.js"
  },
  "/assets/index-Da210KYA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15da-0Fwye11T4Y7Y84Gl8EEfMljW78I"',
    "mtime": "2026-09-29T17:50:48.021Z",
    "size": 5594,
    "path": "../public/assets/index-Da210KYA.js"
  },
  "/assets/input-jEFdEXCe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24e-tTcvecuyIeJPRTdmIVz67lgUnJ0"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 590,
    "path": "../public/assets/input-jEFdEXCe.js"
  },
  "/assets/item-navigator-BQXtgBId.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e0a-SbF/Kbffy/GHkXMNFe1/XVOJRHQ"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 3594,
    "path": "../public/assets/item-navigator-BQXtgBId.js"
  },
  "/assets/label-mJZB0hKF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"275-59xixAIENCvW7YXcHeFuy878B7I"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 629,
    "path": "../public/assets/label-mJZB0hKF.js"
  },
  "/assets/index-CntBhD7H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"836d5-zKdO64CGi6mIa3CtyaszMc7zzKo"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 538325,
    "path": "../public/assets/index-CntBhD7H.js"
  },
  "/assets/legal-config-DSFTtCOP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"442-nj9ZSm8bNaSCgp5ZVGKN24rqC0Y"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 1090,
    "path": "../public/assets/legal-config-DSFTtCOP.js"
  },
  "/assets/media.functions-BBukyz1d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"658-taR6X05rmO5Zg/0fr79jEoceiq4"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 1624,
    "path": "../public/assets/media.functions-BBukyz1d.js"
  },
  "/assets/media.index-Ba8pyEBE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4658-aBMARHeR8Mo1Y4FlBYqVOWXhN6Y"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 18008,
    "path": "../public/assets/media.index-Ba8pyEBE.js"
  },
  "/assets/mentions-legales-Ch4PEQTx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1591-hK7J0K8FGGRarkNY3W//HjkzvA0"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 5521,
    "path": "../public/assets/mentions-legales-Ch4PEQTx.js"
  },
  "/assets/media._mediaId-C5Dvl7sv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"45b7-hfCTKThXamGuN8zmMpHXVOCoQ9E"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 17847,
    "path": "../public/assets/media._mediaId-C5Dvl7sv.js"
  },
  "/assets/music-player-DzLawo1y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1644-Y/gWP1xYFhnboUGdjxiWKc5a2D8"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 5700,
    "path": "../public/assets/music-player-DzLawo1y.js"
  },
  "/assets/politique-confidentialite-pbDiMyvB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c0f-eOmcCSKr0PhJPQZhfkDaD39bZoM"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 11279,
    "path": "../public/assets/politique-confidentialite-pbDiMyvB.js"
  },
  "/assets/music-picker-8SQx2tdL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"675a-P2X27/VD4e7yYhvR5IDUWgJNoBc"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 26458,
    "path": "../public/assets/music-picker-8SQx2tdL.js"
  },
  "/assets/route-Dz7HUibm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e47-m53mDfpbCx5rxwR9e8uFsLd6SEQ"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 3655,
    "path": "../public/assets/route-Dz7HUibm.js"
  },
  "/assets/reset-password-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 41,
    "path": "../public/assets/reset-password-DtqBFgK5.js"
  },
  "/assets/select-wLAKyZmS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c595-agacCMpf44xIUzmwEQtqjO6ebfU"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 50581,
    "path": "../public/assets/select-wLAKyZmS.js"
  },
  "/assets/scoring-BgxhvF5M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"167-O10k4cOLmzWhX0jCWbkup1F6LAM"',
    "mtime": "2026-09-29T17:50:48.021Z",
    "size": 359,
    "path": "../public/assets/scoring-BgxhvF5M.js"
  },
  "/assets/settings-iR4Z8AP-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12c4-QsnHerYx33dUrrkG4E2EFbw6ZGE"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 4804,
    "path": "../public/assets/settings-iR4Z8AP-.js"
  },
  "/assets/slider-Bj-LXW36.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25fc-KsB0hDw25s5NjJz12uCrSmiJU3I"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 9724,
    "path": "../public/assets/slider-Bj-LXW36.js"
  },
  "/assets/steam.functions-BrSJuz5y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-VVdhp7Qwjn/zuTXJeN2pYIV3/PI"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 356,
    "path": "../public/assets/steam.functions-BrSJuz5y.js"
  },
  "/assets/types-Bp05YxvD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"63-xaVrpyIneNxhUbSc42kBWFD8t/4"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 99,
    "path": "../public/assets/types-Bp05YxvD.js"
  },
  "/assets/styles-CaLVjvJy.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1f78f-O6dw7qpnHxheQu3gpxMx+tE0cJE"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 128911,
    "path": "../public/assets/styles-CaLVjvJy.css"
  },
  "/assets/useMutation-DpipBXZ6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8a2-/AmGEI1fvqOw6E+zx3ppBKNsoS4"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 2210,
    "path": "../public/assets/useMutation-DpipBXZ6.js"
  },
  "/assets/users.functions-CBaFsFz8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15f-UWKOTmHbuBdDQHEcvF4uc7Nw86Y"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 351,
    "path": "../public/assets/users.functions-CBaFsFz8.js"
  },
  "/assets/users.index-CZ2QJq9O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1228-6E5Pph/3DOeeFjjBfDyYHDd1F8E"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 4648,
    "path": "../public/assets/users.index-CZ2QJq9O.js"
  },
  "/assets/users._userId-B2ML5g9V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3d62-vnY8HwcmmuW6b9j/MdSHJRYw/vc"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 15714,
    "path": "../public/assets/users._userId-B2ML5g9V.js"
  },
  "/assets/users._userId_._kind._itemId-CCWQVNEY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2485-gBK6ZEcXoSk+HDJTvICh3wRsKUk"',
    "mtime": "2026-09-29T17:50:48.020Z",
    "size": 9349,
    "path": "../public/assets/users._userId_._kind._itemId-CCWQVNEY.js"
  },
  "/assets/utils-CVeBQDGX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7588-0OBm4FklLd363yIrxY0q0QaJ9QQ"',
    "mtime": "2026-09-29T17:50:48.021Z",
    "size": 30088,
    "path": "../public/assets/utils-CVeBQDGX.js"
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
  "/uploads/1782043875046-007_First_Light_Title_Sequence__Lana_Del_Rey.mp3": {
    "type": "audio/mpeg",
    "etag": '"230264-ECdyZIQYuO8Q70Qk7gfeIWaf5vU"',
    "mtime": "2026-06-26T14:50:01.176Z",
    "size": 2294372,
    "path": "../public/uploads/1782043875046-007_First_Light_Title_Sequence__Lana_Del_Rey.mp3"
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
  "/uploads/1783009207355-Ilan_Eshkeri_-_The_Way_of_the_Ghost_Ghost_of_Tsushima__Music_from_the_Video_Game__ft._Clare_Uchima.mp3": {
    "type": "audio/mpeg",
    "etag": '"34e9ec-8Ac2AhsXIIzjpWFjcgMdhOCJ/H8"',
    "mtime": "2026-07-02T16:20:07.368Z",
    "size": 3467756,
    "path": "../public/uploads/1783009207355-Ilan_Eshkeri_-_The_Way_of_the_Ghost_Ghost_of_Tsushima__Music_from_the_Video_Game__ft._Clare_Uchima.mp3"
  },
  "/uploads/1780847433471-Horizon.mp3": {
    "type": "audio/mpeg",
    "etag": '"3abfb8-7aJ0UzsrMRlMy7kR0rCtZ241Tzs"',
    "mtime": "2026-06-26T14:50:00.954Z",
    "size": 3850168,
    "path": "../public/uploads/1780847433471-Horizon.mp3"
  },
  "/uploads/1780848007599-The_Forest__Original_Game_Soundtrack_-_Main_Menu_Theme.mp3": {
    "type": "audio/mpeg",
    "etag": '"450379-1oyxNw7WgA02PeD7xygHSuZ1Njk"',
    "mtime": "2026-06-26T14:50:01.136Z",
    "size": 4522873,
    "path": "../public/uploads/1780848007599-The_Forest__Original_Game_Soundtrack_-_Main_Menu_Theme.mp3"
  },
  "/uploads/1782070138732-Watch_Dogs_Main_Menu_Theme_HQ__Main_Menu_Soundtrack.mp3": {
    "type": "audio/mpeg",
    "etag": '"4a2dec-rE4quQdjomWPrbi3qAhHvrcTxig"',
    "mtime": "2026-06-26T14:50:01.200Z",
    "size": 4861420,
    "path": "../public/uploads/1782070138732-Watch_Dogs_Main_Menu_Theme_HQ__Main_Menu_Soundtrack.mp3"
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
