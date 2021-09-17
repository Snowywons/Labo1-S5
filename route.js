const http = require('http');
const url = require('url');
const queryString = require('query-string');

function AccessControlConfig(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
}

function Prefligth(req, res) {
  if (req.method === 'OPTIONS') {
    console.log('preflight CORS verifications');
    res.end();
    // request handled
    return true;
  }
  // request not handled
  return false;
}

// Matière à discussion
// https://stackoverflow.com/questions/21001455/should-a-rest-api-be-case-sensitive-or-non-case-sensitive
// https://blog.restcase.com/5-basic-rest-api-design-guidelines/

module.exports = http.createServer((req, res) => {
  AccessControlConfig(res);
  if (!Prefligth(req, res)) {
    var operation = require('./controller.js');
    const reqUrl = url.parse(req.url, true);

    // GET endpoint
    if (reqUrl.pathname == '/api/maths' && req.method === 'GET') {
      console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

      let url = req.url.substring(req.url.indexOf("?"));
      const parsed = queryString.parse(url);
      console.log(parsed.op);

      switch (parsed.op) {
        case " ":
          parsed.op = "+";
          operation.addition(parsed, res);
          break;

        case "-":
          operation.substraction(parsed, res);
          break;

        case "*":
          operation.multiplication(parsed, res);
          break;

        case "/":
          operation.division(parsed, res);
          break;

        case "%":
          operation.modulo(parsed, res);
          break;

        case "!":
          operation.factorialization(parsed, res);
          break;

        case "p":
          operation.prime(parsed, res);
          break;

        case "np":
          operation.nthPrime(parsed, res);
          break;

        case undefined:
          let body = {};
          for (const key in parsed) {
              body[key] = parsed[key];
          }
          body.error = "'op' parameter is missing";
          res.setHeader('content-Type', 'Application/json');
          res.end(JSON.stringify(body));
          break;

        default:
          operation.invalidOperation(parsed, res);
          break;
      }
    }

    // URL invalide
    else {
      console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
      operation.invalidUrl(req, res);
    }
  }
})