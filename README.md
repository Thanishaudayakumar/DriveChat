# WhatsApp-Driven Google Drive Assistant

An n8n-based automation platform that enables Google Drive file management through WhatsApp commands using Twilio integration.

## Features

- **WhatsApp Integration**: Receive and respond to WhatsApp messages via Twilio sandbox
- **Google Drive Management**: Perform file operations (list, delete, move) on Google Drive using OAuth2
- **Document Summarization**: AI-powered summarization of DOCX, PDF, and TXT files using OpenAI GPT-4
- **Action Logging**: Log all operations to Google Sheets for audit trail
- **Safety Confirmations**: Require confirmation for destructive operations (e.g., "CONFIRM DELETE...")

## Quick Setup

### Simple Setup (Recommended)
```bash
node setup.js
```
This automatically:
- Installs n8n
- Copies workflow
- Starts server at http://localhost:5000
- Login: admin/demo123

## Supported WhatsApp Commands

### File Operations
- `LIST /ProjectX` - List files and folders in the specified directory
- `DELETE /ProjectX/file.pdf` - Delete a specific file (requires confirmation)
- `MOVE /ProjectX/file.pdf /Archive` - Move file to a different location
- `SUMMARY /ProjectX/document.docx` - Generate AI summary of document content

### System Commands
- `HELP` - Display available commands
- `STATUS` - Check system status
- `CONFIRM DELETE filename` - Confirm file deletion

### Example Usage
```
LIST /Projects/2024
DELETE /Archive/old_report.pdf
MOVE /Downloads/report.pdf /Projects/
SUMMARY /Documents/presentation.pptx
```

## Setup Instructions

### 1. Twilio WhatsApp Setup
1. Create a [Twilio account](https://www.twilio.com/)
2. Set up WhatsApp Sandbox in Twilio Console
3. Note your Account SID, Auth Token, and Phone Number
4. Configure webhook URL: `https://your-domain.com/webhook/whatsapp`

### 2. Google OAuth2 Setup
Follow the guide in `scripts/gdrive_oauth_helper.md` to:
1. Create Google Cloud Project
2. Enable Google Drive and Sheets APIs
3. Create OAuth2 credentials
4. Generate refresh token

### 3. OpenAI API Setup
1. Create [OpenAI account](https://openai.com/)
2. Generate API key from dashboard
3. Add key to environment variables

### 4. Environment Configuration
Copy `.env.sample` to `.env` and fill in your credentials:
```bash
cp .env.sample .env
# Edit .env with your actual API keys
```

## Workflow Import
1. Access n8n interface at http://localhost:5000
2. Go to "Workflows" → "Import from File"
3. Select `workflow/whatsapp_drive_workflow.json`
4. Configure credentials for each service node

## File Structure
```
whatsapp-drive-assistant/
├── docker-compose.yml          # Docker setup
├── Dockerfile                  # Container configuration
├── start.js                    # Node.js startup script
├── .env.sample                 # Environment template
├── README.md                   # This file
├── workflow/
│   └── whatsapp_drive_workflow.json  # n8n workflow
└── scripts/
    └── gdrive_oauth_helper.md   # Google OAuth setup guide
```

## Troubleshooting

### Common Issues
- **Webhook not receiving messages**: Check Twilio webhook URL configuration
- **Google Drive access denied**: Verify OAuth2 credentials and scopes
- **Document summarization fails**: Check OpenAI API key and usage limits
- **Workflow execution errors**: Ensure all credentials are properly configured

### Logs
- Check n8n execution logs in the interface
- View container logs: `docker-compose logs -f`
- Monitor webhook requests in Twilio console
- `HELP` - Show all commands
- `STATUS` - Check if system is working
- `CONFIRM DELETE filename` - Confirm file deletion

