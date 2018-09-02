const axios = require('axios');

axios.get('https://yesno.wtf/api/')
  .then(res => {
    console.log(res.data.answer)
    return true;
  })
  .catch(err => {
    console.log(`Err: ${err}`);
    return false;
  });

