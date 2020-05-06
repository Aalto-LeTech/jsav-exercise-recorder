const axios = require('axios');

async function sendSubmission(data, url) {
  if(url === 'window'){
    try {
      window.parent.postMessage(data, "*");
    } catch (err) {
      console.warn('Failed posting submission to window', err);
    }
  }
  else {
    try {
      const response = await axios.post(`${url}/submissions`, data);
    } catch (err) {
      console.warn(`Failed posting submission to url ${url}: ${err}`)
    }
  }
}

module.exports = {
  sendSubmission
}
