#!/usr/bin/env node

// WhatsApp Drive Assistant - Simple n8n setup
console.log('Starting WhatsApp Drive Assistant...');
console.log('Access at: http://localhost:5000');
console.log('Login: admin / demo123');

// Configure n8n
process.env.N8N_HOST = '0.0.0.0';
process.env.N8N_PORT = '5000';
process.env.N8N_BASIC_AUTH_ACTIVE = 'true';
process.env.N8N_BASIC_AUTH_USER = 'admin';
process.env.N8N_BASIC_AUTH_PASSWORD = 'demo123';
process.env.N8N_LOG_LEVEL = 'info';
process.env.N8N_RUNNERS_ENABLED = 'true';
process.env.N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS = 'false';

// Start n8n
const { spawn } = require('child_process');
const n8n = spawn('npx', ['n8n', 'start'], {
  stdio: 'inherit',
  env: process.env
});

n8n.on('error', (err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  n8n.kill();
});

process.on('SIGTERM', () => {
  n8n.kill();
});