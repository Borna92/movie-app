import Axios from 'axios';

function getData(url) {
  return new Promise((resolve, reject) => {
    Axios.get(url)
      .then((res) => {
        const data = res.data.results;
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default getData;
