const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 5000;

// Serve a simple landing page at root
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>WhatsApp Drive Assistant</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .status { color: #28a745; font-weight: bold; }
        .link { color: #007bff; text-decoration: none; }
        .link:hover { text-decoration: underline; }
        h1 { color: #333; }
        .info { background: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 WhatsApp Drive Assistant</h1>
        
        <div class="status">✅ System Status: Running</div>
        
        <div class="info">
            <h3>Access n8n Workflow Editor:</h3>
            <p><a href="/n8n" class="link">🔗 Open n8n Interface</a></p>
            <p><strong>Login:</strong> admin / demo123</p>
        </div>
        
        <h3>What this app does:</h3>
        <ul>
            <li>Manages Google Drive files through WhatsApp</li>
            <li>Creates AI summaries of documents</li>
            <li>Logs all actions for tracking</li>
            <li>Provides safety confirmations</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ol>
            <li>Click the n8n link above</li>
            <li>Login with provided credentials</li>
            <li>Import the WhatsApp Drive workflow</li>
            <li>Configure API credentials when ready</li>
        </ol>
        
        <div class="info">
            <strong>Note:</strong> This is a demo setup. Add real API keys when ready to use with live services.
        </div>
    </div>
</body>
</html>
  `);
});

// Proxy /n8n to the actual n8n server on port 5001
app.use('/n8n', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: {
    '^/n8n': ''
  }
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 WhatsApp Drive Assistant running on port ${PORT}`);
  console.log(`📍 Access at: http://localhost:${PORT}`);
  console.log(`🔧 n8n Interface: http://localhost:${PORT}/n8n`);
});