const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 5000;
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

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // SPA fallback for client-side routes
        fs.readFile(path.join(buildDir, "index.html"), (err2, content2) => {
          if (err2) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server error");
          } else {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(content2);
          }
        });
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log("Static server running at http://localhost:" + port + "/");
});
