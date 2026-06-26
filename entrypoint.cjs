// Workaround LiteSpeed + Node ESM stdin fd conflict
process.on("uncaughtException", function (e) {
    if (e.code === "EEXIST") return; // ignore stdin fd clash
    console.error(e);
    process.exit(1);
});

// Dynamically import the ESM server
import("./.output/server/index.mjs").catch(function (e) {
    if (e.code !== "EEXIST") {
        console.error(e);
        process.exit(1);
    }
});