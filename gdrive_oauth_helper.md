# Google Drive OAuth2 Setup Guide

This guide walks you through setting up Google OAuth2 credentials for the WhatsApp Drive Assistant.

## Prerequisites

- Google Cloud Console account
- Access to Google Drive and Google Sheets

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `whatsapp-drive-assistant`
4. Click "Create"

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for and enable the following APIs:
   - **Google Drive API**
   - **Google Sheets API**

For each API:
- Click on the API name
- Click "Enable"
- Wait for activation

## Step 3: Create OAuth2 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: **External** (unless you have Google Workspace)
   - App name: `WhatsApp Drive Assistant`
   - User support email: Your email
   - Developer contact information: Your email
   - Add scopes:
     - `https://www.googleapis.com/auth/drive`
     - `https://www.googleapis.com/auth/spreadsheets`
   - Add test users: Your email address

4. Create OAuth client ID:
   - Application type: **Web application**
   - Name: `WhatsApp Drive Assistant`
   - Authorized redirect URIs: `http://localhost:8080/oauth/callback`
   - Click "Create"

5. **Save the credentials:**
   - Copy **Client ID**
   - Copy **Client Secret**

## Step 4: Generate Refresh Token

You'll need to generate a refresh token using the OAuth2 flow. Here are two methods:

### Method A: Using Google OAuth2 Playground

1. Go to [Google OAuth2 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your **Client ID** and **Client Secret**
5. In the left panel, scroll to "Drive API v3" and select:
   - `https://www.googleapis.com/auth/drive`
   - `https://www.googleapis.com/auth/spreadsheets`
6. Click "Authorize APIs"
7. Sign in with your Google account
8. Grant permissions
9. Click "Exchange authorization code for tokens"
10. Copy the **refresh_token** (starts with `1//`)

### Method B: Using curl (Advanced)

1. **Get authorization code:**
   Open this URL in your browser (replace YOUR_CLIENT_ID):
   ```
   https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:8080/oauth/callback&scope=https://www.googleapis.com/auth/drive%20https://www.googleapis.com/auth/spreadsheets&response_type=code&access_type=offline&prompt=consent
   ```

2. **Extract code from redirect URL:**
   After granting permissions, you'll be redirected to a URL like:
   ```
   http://localhost:8080/oauth/callback?code=4/0AX4XfWi...&scope=https://www.googleapis.com/auth/drive...
   ```
   Copy the `code` parameter value.

3. **Exchange code for tokens:**
   ```bash
   curl -X POST https://oauth2.googleapis.com/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "code=AUTHORIZATION_CODE" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=http://localhost:8080/oauth/callback"
   ```

## Step 5: Create Google Sheets for Logging

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet named "WhatsApp Drive Log"
3. Add headers in row 1:
   - A1: `Timestamp`
   - B1: `User Phone`
   - C1: `Command`
   - D1: `File Path`
   - E1: `Action`
   - F1: `Status`
   - G1: `Details`
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## Step 6: Configure n8n Credentials

Once you have all the credentials:

1. Open n8n interface
2. Go to Settings → Credentials
3. Add new credentials for each service:

### Google Drive OAuth2
- **Name**: `Google Drive OAuth2`
- **Client ID**: Your Google Client ID
- **Client Secret**: Your Google Client Secret
- **Refresh Token**: Your generated refresh token

### Google Sheets
- **Name**: `Google Sheets`
- **Client ID**: Same as above
- **Client Secret**: Same as above
- **Refresh Token**: Same as above

### Twilio
- **Name**: `Twilio Account`
- **Account SID**: Your Twilio Account SID
- **Auth Token**: Your Twilio Auth Token

### OpenAI
- **Name**: `OpenAI Account`
- **API Key**: Your OpenAI API Key

## Environment Variables Summary

Add these to your `.env` file:

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+14155238886

# Google Configuration
GOOGLE_CLIENT_ID=xxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxx
GOOGLE_REFRESH_TOKEN=1//04xxxxxxxxxxxxxxxxxxxxxx
GOOGLE_SHEETS_ID=1BxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE

# OpenAI Configuration
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Testing the Setup

1. Import the workflow in n8n
2. Configure all credentials
3. Send a test message to your Twilio WhatsApp number: `HELP`
4. Check if you receive a response with available commands
5. Test file operations with: `LIST /` or `STATUS`

## Troubleshooting

### Common Issues

**OAuth Error: invalid_grant**
- Refresh token may have expired
- Regenerate refresh token using OAuth2 Playground

**Access Denied Errors**
- Check OAuth2 scopes include `drive` and `spreadsheets`
- Verify the correct Google account is being used

**Webhook Not Receiving Messages**
- Ensure webhook URL is publicly accessible
- Check Twilio webhook configuration
- Verify n8n is running and accessible

**Document Download Fails**
- Check file permissions in Google Drive
- Ensure file ID is correct (not file path)
- Verify Google Drive API quotas

### Security Notes

- Store credentials securely
- Use environment variables for production
- Regularly rotate API keys
- Monitor API usage and quotas
- Review OAuth app permissions periodically
   