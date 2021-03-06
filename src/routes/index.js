const express = require('express');
const router = express.Router();

const { database } = require('../keys');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/db', async (req, res) => {
    try {
      const client = await database.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

module.exports = router;