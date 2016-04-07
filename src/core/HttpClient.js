import request from 'superagent';

function getUrl(path) {
  return `http://localhost:8182/api${path}`;
}

const HttpClient = {
  get: path => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  }),
};

export default HttpClient;