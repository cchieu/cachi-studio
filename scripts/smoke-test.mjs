/**
 * Headless smoke test: loads the production build inside jsdom and captures
 * any runtime crash so "blank black screen" bugs can be diagnosed locally.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { readdirSync } from "fs";
import { JSDOM, VirtualConsole } from "jsdom";
import { execSync } from "child_process";

// 1. Bundle the module-based dist output into a single IIFE jsdom can run.
if (!existsSync("dist")) {
  console.error("dist/ missing — run npm run build first");
  process.exit(1);
}
const assets = readdirSync("dist/assets");
const jsEntry = assets.find((f) => f.startsWith("index-") && f.endsWith(".js"));
mkdirSync("dist-test", { recursive: true });
execSync(
  `npx esbuild dist/assets/${jsEntry} --bundle --format=iife --outfile=dist-test/app.cjs.js`,
  { stdio: "inherit" }
);
const appJs = readFileSync("dist-test/app.cjs.js", "utf8");

// 2. Prepare a script-free copy of index.html.
let html = readFileSync("dist/index.html", "utf8");
html = html.replace(/<script[^>]*><\/script>/g, "");

// 3. Boot jsdom with browser API stubs.
const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) =>
  errors.push("jsdomError: " + e.message + (e.detail?.stack ? "\n" + e.detail.stack : ""))
);
vc.on("error", (...a) => errors.push("console.error: " + a.map(String).join(" ")));

const dom = new JSDOM(html, {
  url: "http://localhost:5174/",
  runScripts: "dangerously",
  pretendToBeVisual: true,
  virtualConsole: vc,
  beforeParse(window) {
    window.matchMedia =
      window.matchMedia ||
      ((q) => ({
        matches: false,
        media: q,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
      }));
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    };
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    window.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = () => {};
    window.fetch = () => Promise.reject(new Error("fetch stubbed"));
  },
});

const { window } = dom;
window.addEventListener("error", (e) =>
  errors.push("window.onerror: " + e.message + "\n" + (e.error?.stack ?? ""))
);
window.addEventListener("unhandledrejection", (e) =>
  errors.push("unhandledrejection: " + (e.reason?.stack ?? e.reason))
);

// 4. Run the app.
const script = window.document.createElement("script");
script.textContent = appJs;
window.document.body.appendChild(script);

await new Promise((r) => setTimeout(r, 3500));

// 5. Report.
console.log("=== ERRORS ===");
console.log(errors.length ? errors.join("\n---\n") : "(none)");
const root = window.document.getElementById("root");
console.log("=== root children ===", root ? root.children.length : "no root");
console.log("=== root html preview ===");
console.log(root ? root.innerHTML.slice(0, 400) : "(empty)");
process.exit(0);
