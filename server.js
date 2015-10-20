/**
 * @author: Jerry Zou
 * @email: jerry.zry@outlook.com
 */

var http = require('http')
  , exec = require('exec')

const PORT = 9988
  , PATH = '../html'

var deployServer = http.createServer(function(request, response) {
  if (request.url.search(/deploy$/i) > 0) {

    exec('cd ' + PATH + ' && git pull', function(err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      response.writeHead(200)
      response.end('Deploy Done.')
    })

  } else {

    response.writeHead(404)
    response.end('Not Found.')

  }
})

deployServer.listen(PORT)
