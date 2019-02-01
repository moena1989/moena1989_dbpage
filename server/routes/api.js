const express = require('express');
const axios = require('axios');
const router = express.Router();
const API = 'https://jsonplaceholder.typicode.com';
/* GET api listing. */
router.get('/', (req, res) => {
  axios.get('https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.users.ALL&client_id=1000.RB2VFC7BUPTR4485035TCLCVU1FICJ&response_type=code&access_type=onlineid}}n&redirect_uri=https://www.google.com').then(posts => {
    res.status(200).json(posts.data);
    // res.send('tesing works');
  })
    .catch(error => {
      res.status(500).send(error)
    });
});


module.exports = router;

// router.get('/tesing', (req, res) => {
//   // Get posts from the mock api
//   // This should ideally be replaced with a service that connects to MongoDB
//   res.send('tesing works');
//   axios.get(`${API}/posts`).then(posts => {
//     res.status(200).json(posts.data);
//   })
//     .catch(error => {
//       res.status(500).send(error)
//     });
//
// });


