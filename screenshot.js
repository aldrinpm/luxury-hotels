const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const DEBUG_PORT = 9222;
const BASE = "http://localhost:5000";
const OUTDIR = path.join(__dirname, "assets", "screenshots");
fs.mkdirSync(OUTDIR, { recursive: true });

const pending = new Map();
let nextId = 1;
let socket = null;

function send(method, params) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params: params || {} }));
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForDebuggingPort() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://localhost:${DEBUG_PORT}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) {
      // not ready yet
    }
    await sleep(300);
  }
  throw new Error("No page target found on debugging port");
}

async function main() {
  const userDataDir = path.join(os.tmpdir(), "chrome-screenshot-luxury");
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=1280,900",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${userDataDir}`,
    BASE + "/",
  ], { stdio: ["ignore", "pipe", "pipe"] });

  chrome.stderr.on("data", (d) => process.stderr.write(d));
  const exit = new Promise((r) => chrome.on("exit", r));

  const wsUrl = await waitForDebuggingPort();
  socket = new WebSocket(wsUrl);
  await new Promise((res, rej) => { socket.onopen = res; socket.onerror = rej; });

  const loadEvent = new Promise((res) => {
    const handler = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === "Page.loadEventFired") res();
    };
    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && pending.has(msg.id)) {
        const p = pending.get(msg.id); pending.delete(msg.id);
        if (msg.error) p.reject(new Error(JSON.stringify(msg.error)));
        else p.resolve(msg.result);
      } else if (msg.method === "Page.loadEventFired") {
        handler(e);
      }
    };
  });

  await send("Page.enable");
  await send("Page.navigate", { url: BASE + "/" });
  await loadEvent;
  // give the WebGL shader a moment to paint its first frame
  await sleep(3000);

  // Section IDs to capture (3 distinct views of the live page)
  const sections = ["top", "rooms", "book"];
  for (let i = 0; i < sections.length; i++) {
    const id = sections[i];
    // scroll the section into view
    await send("Runtime.evaluate", {
      expression: `document.querySelector('#${id}')?.scrollIntoView({block:'start'})`,
      awaitPromise: true,
      userGesture: true,
    });
    await sleep(1200);
    const shot = await send("Page.captureScreenshot", {
      format: "png",
      quality: 100,
      captureBeyondViewport: false,
    });
    const buf = Buffer.from(shot.data, "base64");
    const outPath = path.join(OUTDIR, `screenshot-${i + 1}-${id}.png`);
    fs.writeFileSync(outPath, buf);
    console.log("Wrote", outPath, "(" + buf.length + " bytes)");
  }

  await send("Page.stopScreencast").catch(() => {});
  chrome.kill();
  await exit.catch(() => {});
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
