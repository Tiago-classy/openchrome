const express = require('express');

const app = express();

app.get('/open-chrome', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const targetUrl = 'https://tiago-classy.github.io/XM_BOLD1';
  
  if (/android/i.test(userAgent)) {
    // Attempt to open in Chrome on AndroidPO
    res.send(`
      <script>
        const url = '${targetUrl}';
        const androidIntent = 'intent://${targetUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end';
        window.location.href = androidIntent;
        setTimeout(() => { window.location.href = url; }, 1000); // Fallback if intent fails
      </script>
    `);
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    // Attempt to open in Chrome on iOS
    res.send(`
      <script>
        const url = '${targetUrl}';
        const iosChromeUrl = 'googlechrome://${targetUrl.replace(/^https?:\/\//, '')}';
        window.location.href = iosChromeUrl;
        setTimeout(() => { window.location.href = url; }, 1000); // Fallback if chrome URL fails
      </script>
    `);
  } else {
    // Fallback to regular URL
    res.redirect(targetUrl);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Redirection service running on port ${PORT}`);
});
