const express = require('express');
const axios = require('axios');
const router = express.Router();
const API = 'https://jsonplaceholder.typicode.com';
/* GET api listing. */
router.get('/', (req, res) => {
  console.log('holi');
  console.log(req.query.code);
  // req.query.code;
  axios.post('https://accounts.zoho.com/oauth/v2/token?code=' + req.query.code + '&redirect_uri=http://localhost:4200/OAuthCallback&client_id=1000.A67SKNS3UDRO530634DXY89X5CFYNO&client_secret=282e9f6a83ef14932f389f49ad40996e0651c6b5a8&grant_type=authorization_code').then(posts => {
    console.log('result');
    console.log(posts.data);
    // console.log(JSON.parse(posts));
    res.status(200).json(posts.data);
    console.log('se logueo de manera correcta perro!');
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


