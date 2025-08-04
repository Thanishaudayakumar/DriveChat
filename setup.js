#!/usr/bin/env node

// Simple WhatsApp Drive Assistant Setup Script

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up WhatsApp Drive Assistant...\n');

// Check if required workflow exists
const workflowPath = './workflow/simple_whatsapp_drive.json';
if (fs.existsSync(workflowPath)) {
  console.log('✅ Workflow file found');
} else {
  console.log('❌ Workflow file missing');
  process.exit(1);
}

// Create n8n data directory
const n8nDir = path.join(process.env.HOME || '.', '.n8n');
const workflowsDir = path.join(n8nDir, 'workflows');

if (!fs.existsSync(workflowsDir)) {
  fs.mkdirSync(workflowsDir, { recursive: true });
  console.log('✅ Created n8n workflows directory');
}

// Copy workflow to n8n directory
const targetPath = path.join(workflowsDir, 'simple_whatsapp_drive.json');
fs.copyFileSync(workflowPath, targetPath);
console.log('✅ Workflow copied to n8n');

// Set environment variables
process.env.N8N_HOST = '0.0.0.0';
process.env.N8N_PORT = '5000';
process.env.N8N_BASIC_AUTH_ACTIVE = 'true';
process.env.N8N_BASIC_AUTH_USER = 'admin';
process.env.N8N_BASIC_AUTH_PASSWORD = 'demo123';
process.env.N8N_LOG_LEVEL = 'info';
process.env.N8N_RUNNERS_ENABLED = 'true';
process.env.N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS = 'false';

console.log('✅ Environment configured');

console.log('\n🎯 Setup Instructions:');
console.log('1. Access n8n at: http://localhost:5000');
console.log('2. Login: admin / demo123');
console.log('3. Import workflow: simple_whatsapp_drive.json');
console.log('4. Configure API credentials for:');
console.log('   - Twilio (WhatsApp)');
console.log('   - Google Drive OAuth2');
console.log('   - Google Sheets OAuth2');
console.log('   - OpenAI API');
console.log('5. Set webhook URL in Twilio: https://your-domain.com/webhook/whatsapp-webhook');

console.log('\n📱 Test Commands:');
console.log('- HELP');
console.log('- LIST /');
console.log('- SUMMARY /Documents');

console.log('\n🚀 Starting n8n server...');

// Start n8n
const { spawn } = require('child_process');
const n8n = spawn('npx', ['n8n', 'start'], {
  stdio: 'inherit',
  env: process.env
});

n8n.on('error', (err) => {
  console.error('Failed to start n8n:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  n8n.kill();
});

process.on('SIGTERM', () => {
  n8n.kill();
});