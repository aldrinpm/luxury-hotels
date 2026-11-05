const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 5000;
const buildDir = path.join(__dirname, "build");

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".json": "application/json",
};

const server = http.createServer((req, res) => {
  let filePath = path.join(
    buildDir,
    req.url === "/" || req.url === "" ? "/index.html" : req.url
  );
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mime[ext] || "application/octet-stream";

  const assetExtensions = new Set([
    ".js", ".mjs", ".css", ".wasm", ".json", ".svg", ".png", ".jpg",
    ".jpeg", ".gif", ".ico", ".woff", ".woff2", ".ttf", ".eot", ".webp",
    ".mp4", ".mp3", ".txt",
  ]);
  const isAsset = assetExtensions.has(ext);

  fs.stat(filePath, (statErr, stat) => {
    if (statErr) {
      if (statErr.code === "ENOENT") {
        // Static assets that are missing should 404 (not return HTML, which
        // breaks Strict MIME type checking for module scripts).
        // Only extensionless client-side routes fall back to index.html.
        if (isAsset || ext === ".html") {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not found");
          return;
        }
        // SPA fallback for client-side routes
        fs.readFile(path.join(buildDir, "index.html"), (err2, content2) => {
          if (err2) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server error");
          } else {
            res.writeHead(200, {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "no-cache",
            });
            res.end(content2);
          }
        });
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server error");
      }
      return;
    }

    if (!stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const etag = 'W/"' + stat.size.toString(16) + "-" + stat.mtimeMs.toString(16) + '"';
    const lastModified = stat.mtime.toUTCString();

    // Always revalidate: a cached HTML body must never be reused for a
    // module script (or vice versa) after the file on disk changes.
    const headers = {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
      ETag: etag,
      "Last-Modified": lastModified,
    };

    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, headers);
      res.end();
      return;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server error");
        return;
      }
      headers["Content-Length"] = content.length;
      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

server.listen(port, () => {
  console.log("Static server running at http://localhost:" + port + "/");
});
