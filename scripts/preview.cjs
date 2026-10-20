const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const config = require('../vercel.json')
const directory = path.resolve(__dirname, '../build')
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2'
}

const resolveFile = (url) => {
  const filename = path.resolve(directory, `.${url}`)
  if (!filename.startsWith(directory + path.sep)) return null
  if (!fs.existsSync(filename)) return null
  if (fs.statSync(filename).isDirectory()) {
    const index = path.join(filename, 'index.html')
    return fs.existsSync(index) ? index : null
  }
  return filename
}

http
  .createServer((request, response) => {
    let pathname
    try {
      pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    } catch {
      response.writeHead(400).end()
      return
    }
    let filename
    let status = 200
    for (const route of config.routes) {
      if (route.handle === 'filesystem') {
        filename = resolveFile(pathname)
        if (filename) break
        continue
      }
      const pattern = new RegExp(route.src)
      if (!pattern.test(pathname)) continue
      if (route.headers) {
        response.writeHead(route.status, route.headers).end()
        return
      }
      filename = resolveFile(pathname.replace(pattern, route.dest))
      status = route.status || 200
      break
    }
    if (!filename) {
      filename = path.join(directory, '404.html')
      status = 404
    }
    response.writeHead(status, {
      'Content-Type': mime[path.extname(filename)] || 'application/octet-stream'
    })
    if (request.method === 'HEAD') response.end()
    else fs.createReadStream(filename).pipe(response)
  })
  .listen(Number(process.env.PORT || 4173), '127.0.0.1', () => {
    console.log(`Production preview: http://127.0.0.1:${process.env.PORT || 4173}`)
  })
