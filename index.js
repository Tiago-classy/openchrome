const express = require('express');
const app = express();

app.get('/open-chrome', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const targetUrl = 'https://tiago-classy.github.io/';

  if (/android/i.test(userAgent)) {
    res.redirect(`googlechrome://${targetUrl}`);
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    res.redirect(`googlechrome://${targetUrl}`);
  } else {
    res.redirect(targetUrl); // fallback to regular URL
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Redirection service running on port ${PORT}`);
});
