const expressJwt = require('express-jwt');

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      {
        url: /\/api\/v1\/testimonial(.*)/,
        methods: ['GET', 'OPTIONS', 'POST'],
      },
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS','PUT','POST',"DELETE"] },
      { url: /\/api\/v1\/listing(.*)/, methods: ['GET', 'OPTIONS','PUT','POST',"DELETE"] },
      { url: /\/api\/v1\/dashboard(.*)/, methods: ['GET', 'OPTIONS','PUT','POST',"DELETE"] },
      { url: /\/api\/v1\/city(.*)/, methods: ['GET', 'OPTIONS','PUT','POST',"DELETE"] },
      { url: /\/api\/v1\/booking(.*)/, methods: ['GET', 'OPTIONS','PUT','POST',"DELETE"] },
      { url: /\/api\/v1\/category(.*)/, methods: ['GET', 'OPTIONS','PUT','POST',"DELETE"] },
      { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS','PUT','POST',"DELETE"] },
      
      `${api}/users/login`,
      `${api}/users/register`,
      `${api}/users/mail`,
      `${api}/users/contact`,
      
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
