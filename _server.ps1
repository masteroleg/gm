$server = @"
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const ROOT = 'D:/w/genu.im/gm/site';

const mimeTypes = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg'
};

const srv = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); res.end('Not Found'); }
    else { res.writeHead(200, {'Content-Type': mimeTypes[ext] || 'text/plain'}); res.end(content); }
  });
});

srv.listen(PORT, '127.0.0.1', () => console.log('Server on http://127.0.0.1:' + PORT));
"@

$server | Out-File -FilePath "$env:TEMP\_myserver.js" -Encoding UTF8

$nodeProc = Start-Process -FilePath "node" -ArgumentList "$env:TEMP\_myserver.js" -WindowStyle Hidden -PassThru

Start-Sleep -Seconds 3

if ($nodeProc.HasExited) {
    Write-Host "Server failed to start"
    exit 1
}

Write-Host "Server started with PID: $($nodeProc.Id)"