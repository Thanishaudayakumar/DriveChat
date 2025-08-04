# WhatsApp Drive Assistant - Complete Setup Guide

## 🚀 Quick Start

1. **Run the setup script:**
   ```bash
   node setup.js
   ```

2. **Access n8n interface:**
   - URL: http://localhost:5000
   - Login: admin / demo123

3. **Import the workflow:**
   - Go to "Workflows" → "Import from File"
   - Select `workflow/simple_whatsapp_drive.json`

## 📋 API Configuration

### 1. Twilio WhatsApp Setup

1. Create [Twilio account](https://www.twilio.com/)
2. Go to Console → Messaging → WhatsApp sandbox
3. Note these values:
   - Account SID
   - Auth Token  
   - WhatsApp phone number (e.g., +14155238886)

4. Configure webhook in Twilio:
   - URL: `https://your-domain.com/webhook/whatsapp-webhook`
   - Method: POST

### 2. Google Drive OAuth2

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "WhatsApp Drive Assistant"
3. Enable APIs:
   - Google Drive API
   - Google Sheets API

4. Create OAuth2 credentials:
   - Type: Web application
   - Authorized redirect URI: `http://localhost:8080/oauth/callback`

5. Generate refresh token using [OAuth2 Playground](https://developers.google.com/oauthplayground/)

### 3. OpenAI API

1. Create [OpenAI account](https://platform.openai.com/)
2. Generate API key from dashboard
3. Ensure you have GPT-4 access

### 4. Google Sheets Audit Log

1. Create new Google Sheet: "WhatsApp Drive Audit"
2. Add headers in row 1:
   - A1: Timestamp
   - B1: User Phone
   - C1: Action
   - D1: File Path
   - E1: Status
   - F1: Details
3. Copy sheet ID from URL

## 🔧 n8n Credential Configuration

### Add these credentials in n8n:

**Google Drive OAuth2:**
- Name: `google-drive-creds`
- Client ID: [Your Google Client ID]
- Client Secret: [Your Google Client Secret]
- Refresh Token: [Your Google Refresh Token]

**Google Sheets OAuth2:**
- Name: `google-sheets-creds`
- Client ID: [Same as Drive]
- Client Secret: [Same as Drive]  
- Refresh Token: [Same as Drive]

**Twilio:**
- Name: `twilio-creds`
- Account SID: [Your Twilio Account SID]
- Auth Token: [Your Twilio Auth Token]

**OpenAI:**
- Name: `openai-creds`
- API Key: [Your OpenAI API Key]

## 📱 Supported Commands

### File Operations
- `LIST /ProjectX` - List files in folder
- `DELETE /ProjectX/report.pdf` - Delete specific file
- `MOVE /ProjectX/file.pdf /Archive` - Move file
- `SUMMARY /ProjectX` - AI summaries of documents

### System Commands  
- `HELP` - Show command menu
- `STATUS` - Check system status

## 🔒 Security Features

- **OAuth2 Authentication:** Secure Google Drive access
- **Audit Logging:** All actions logged to Google Sheets
- **Error Handling:** User-friendly error messages
- **Input Validation:** Command parsing and validation

## 🧪 Testing

1. **Test webhook:** Send "HELP" to your Twilio WhatsApp number
2. **Test Drive access:** Send "LIST /"
3. **Test AI summary:** Send "SUMMARY /Documents"

## 📊 Workflow Structure

The n8n workflow includes:

1. **📱 WhatsApp Webhook** - Receives Twilio messages
2. **🔍 Parse Command** - Extracts command and parameters
3. **🎯 Command Router** - Routes to appropriate handler
4. **📁 Drive Operations** - List, delete, move files
5. **🤖 AI Summarization** - GPT-4 document summaries
6. **📊 Audit Logging** - Google Sheets logging
7. **⚠️ Error Handling** - Comprehensive error responses

## 🛠 Troubleshooting

### Common Issues

**Webhook not receiving messages:**
- Check Twilio webhook URL configuration
- Ensure n8n is accessible from internet
- Verify webhook path: `/webhook/whatsapp-webhook`

**Google Drive access denied:**
- Verify OAuth2 credentials
- Check API scopes include `drive` and `spreadsheets`
- Regenerate refresh token if expired

**AI summarization fails:**
- Check OpenAI API key
- Verify GPT-4 access
- Monitor API usage limits

**Workflow execution errors:**
- Check all credentials are configured
- Verify Google Sheets audit log exists
- Review n8n execution logs

### Debug Tips

1. **Test each node individually** in n8n
2. **Check execution logs** for detailed errors
3. **Verify file permissions** in Google Drive
4. **Monitor API quotas** for all services

## 🔄 Workflow Customization

### Adding New Commands

1. **Add condition** in "🎯 Command Router"
2. **Create handler node** with JavaScript code
3. **Connect to audit log** and response nodes
4. **Update help text** with new command

### Enhancing Security

1. **Add user authentication** by phone number
2. **Implement rate limiting** in webhook
3. **Add confirmation flows** for destructive operations
4. **Set up monitoring alerts** for suspicious activity

## 📈 Production Deployment

1. **Use HTTPS webhook URL**
2. **Set up proper domain** with SSL certificate
3. **Configure environment variables** securely
4. **Monitor logs and performance**
5. **Set up backup procedures** for audit data

## 📞 Support

For issues or questions:
1. Check n8n execution logs
2. Verify API credentials and quotas
3. Test individual workflow nodes
4. Review Twilio webhook logs