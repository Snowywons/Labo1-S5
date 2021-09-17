const url = require('url');

exports.addition = function (parsed, res) {

  let properties = "op,x,y";
  var response = [];
  var body = {};

  // Vérifie si la requête contient le bon nombre et nom de paramètres
  if (hasProperties(parsed, properties, body)) {
    // Vérifie si les paramètres sont valides
    if (!isEmptyOrNaN(body.x) && !isEmptyOrNaN(body.y)) {
      body.value = parseFloat(body.x) + parseFloat(body.y);
      res.statusCode = 200;
    } else {
      // Paramètre(s) invalide(s), l'utilisateur doit modifier sa requête
      createErrorMessage(body);
      res.statusCode = 422;
    }
  } else {
    // Paramètre(s) invalide(s), l'utilisateur doit modifier sa requête
    res.statusCode = 422;
  }

  response.push(body);
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

exports.substraction = function (parsed, res) {

  let properties = "op,x,y";
  var response = [];
  var body = {};

  if (hasProperties(parsed, properties, body)) {
    if (!isEmptyOrNaN(body.x) && !isEmptyOrNaN(body.y)) {
      body.value = parseFloat(body.x) - parseFloat(body.y);
      res.statusCode = 200;
    } else {
      createErrorMessage(body);
      res.statusCode = 422;
    }
  } else {
    res.statusCode = 422;
  }

  response.push(body);
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

exports.multiplication = function (parsed, res) {

  let properties = "op,x,y";
  var response = [];
  var body = {};

  if (hasProperties(parsed, properties, body)) {
    if (!isEmptyOrNaN(body.x) && !isEmptyOrNaN(body.y)) {
      body.value = parseFloat(body.x) * parseFloat(body.y);
      res.statusCode = 200;
    } else {
      createErrorMessage(body);
      res.statusCode = 422;
    }
  } else {
    res.statusCode = 422;
  }

  response.push(body);
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

exports.division = function (parsed, res) {

  let properties = "op,x,y";
  var response = [];
  var body = {};

  if (hasProperties(parsed, properties, body)) {
    if (!isEmptyOrNaN(body.x) && !isEmptyOrNaN(body.y)) {
      if (body.y != 0) {
        body.value = parseFloat(body.x) / parseFloat(body.y);
        res.statusCode = 200;
      } else {
        body.error = "'y' paramater must be greater than 0.";
        res.statusCode = 422;
      }
    } else {
      createErrorMessage(body);
      res.statusCode = 422;
    }
  } else {
    res.statusCode = 422;
  }

  response.push(body);
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

exports.modulo = function (parsed, res) {

  let properties = "op,x,y";
  var response = [];
  var body = {};

  if (hasProperties(parsed, properties, body)) {
    if (!isEmptyOrNaN(body.x) && !isEmptyOrNaN(body.y)) {
      if (body.y != 0) {
        body.value = parseInt(body.x) % parseInt(body.y);
        res.statusCode = 200;
      } else {
        body.error = "'y' paramater must be greater than 0.";
        res.statusCode = 422;
      }
    } else {
      createErrorMessage(body);
      res.statusCode = 422;
    }
  } else {
    res.statusCode = 422;
  }

  response.push(body);
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

exports.factorialization = function (parsed, res) {

  let properties = "op,n";
  var response = [];
  var body = {};

  if (hasProperties(parsed, properties, body)) {
    if (!isEmptyOrNaN(body.n)) {
      let number = parseFloat(body.n);
      if (number >= 0 && number % 1 == 0) {
          body.value = factorialize(body.n);
          res.statusCode = 200;
      } else {
        body.error = "'n' paramater must be an integer greater than or equal to 0.";
        res.statusCode = 422;
      }
    } else {
      createErrorMessage(body);
      res.statusCode = 422;
    }
  } else {
    res.statusCode = 422;
  }

  response.push(body);
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

exports.prime = function (parsed, res) {

  let properties = "op,n";
  var response = [];
  var body = {};

  if (hasProperties(parsed, properties, body)) {
    if (!isEmptyOrNaN(body.n)) {
      let number = parseFloat(body.n);
      if (number >= 0 && number % 1 == 0) {
        body.value = isPrime(number);
        res.statusCode = 200;
      } else {
        body.error = "'n' paramater must be an integer greater than or equal to 0.";
        res.statusCode = 422;
      }
    } else {
      createErrorMessage(body);
      res.statusCode = 422;
    }
  } else {
    res.statusCode = 422;
  }

  response.push(body);
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response))
}

exports.nthPrime = function (parsed, res) {

  let limit = 1000;
  let properties = "op,n";
  var response = [];
  var body = {};

  if (hasProperties(parsed, properties, body)) {
    if (!isEmptyOrNaN(body.n)) {
      let number = parseFloat(body.n);
      if (number > 0 && number % 1 == 0) {
        let primes = [];
        for (let i = 0; i <= limit; i++)
          if (isPrime(i))
            primes.push(i);

        if (primes[number - 1]) {
          body.value = primes[number - 1];
          res.statusCode = 200;
        } else {
          body.error = "'n' parameter must be lower.";
          res.statusCode = 422;
        }
      } else {
        body.error = "'n' parameter must be an integer greater than 0";
        res.statusCode = 422;
      }
    } else {
      createErrorMessage(body);
      res.statusCode = 422;
    }
  } else {
    res.statusCode = 422;
  }

  response.push(body);
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

exports.invalidOperation = function (parsed, res) {
  var response = [
    { "error": "This operation is not implemented." },
    { "Implemented operations" : availableOperations }
  ];
  res.statusCode = 404;
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

exports.invalidUrl = function (parsed, res) {
  var response = [
    { "error": "Invalid endpoint. Try this" },
    availableEndpoints
  ];
  res.statusCode = 404;
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response));
}

function isEmptyOrNaN(val) {
  return val == undefined || val == null || val == "" || isNaN(val);
}

function hasProperties(obj, properties, body) {

  let props = properties.split(",");
  let n = Object.keys(obj).length;

  // Création du corps de la réponse
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      body[key] = obj[key];
    }
  }

  // Nombre de propriétés invalide
  if (n != props.length) {
    if (n > props.length) {
      body.message = "Too many parameters.";
    } else {
      body.message = "One or more parameters are missing.";
    }
    return false;
  }

  // Vérificaton des propriétés
  for (let i = 0; i < n; i++)
    if (!hasKey(obj, props[i])) {
      body.error = props[i] + " parameter is missing";
      return false;
    }

  return true;
}

exports.hasProperties = function (obj, properties, body) { hasOwnProperty(obj, properties, body)};

function hasKey(obj, key) {
  return Object.keys(obj).indexOf(key.trim()) != -1;
}

function createErrorMessage(body) {

  if (body.hasOwnProperty('x') && body.hasOwnProperty('y')) {
    if (isEmptyOrNaN(body.x) && isEmptyOrNaN(body.y)) {
      body.error = "'x' and 'y' parameters are not a number";
    } else {
      if (isEmptyOrNaN(body.x)) {
        body.error = "'x'";
      } else {
        body.error = "'y'";
      }
      body.error = body.error + " parameter is not a number";
    }
  }

  else if (body.hasOwnProperty('n')) {
    if (isEmptyOrNaN(body.n)) {
      body.error = "'n' parameter is not a number";
    }
  }
}

function isPrime(number) {
  // Trouver sur :
  //https://stackoverflow.com/questions/40200089/number-prime-test-in-javascript#:~:text=function%20isPrime(num)%20%7B%20if,log(isPrime(121))%3B

  for (let i = 2, j = Math.sqrt(number); i <= j; i++)
    if (number % i == 0) return false;
  return number > 1;
}

function factorialize(number) {
  // Trouver sur :
  //https://www.freecodecamp.org/news/how-to-factorialize-a-number-in-javascript-9263c89a4b38/

  if (number < 0) return false;
  else if (number == 0) return 1;
  else return (number * factorialize(number - 1));
}

const availableOperations = [
  {
    addition: "?op=+&y=&x=",
    substraction: "?op=-&y=&x=",
    multiplication: "?op=*&y=&x=",
    division: "?op=/&y=&x=",
    modulo: "?op=%&y=&x=",
    factorialization: "?op=!&n=",
    prime: "?op=p&n=",
    nthPrime: "?op=np&n=",
  }
]

const availableEndpoints = [
  {
    method: "GET",
    op: "/api/maths"
  },
]