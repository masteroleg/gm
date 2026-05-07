$script = @'
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const ROOT = './site';

const types = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon'};

http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
  let ext = path.extname(filePath);
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); res.end('Not Found'); }
    else { res.writeHead(200, {'Content-Type': types[ext] || 'text/plain'}); res.end(content); }
  });
}).listen(PORT, '127.0.0.1', () => console.log('Server running on http://127.0.0.1:' + PORT));
'@

$script | Out-File -FilePath "serve.js" -Encoding UTF8
& node serve.js