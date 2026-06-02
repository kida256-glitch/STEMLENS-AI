# STEMLens AI - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Google account
- 5 minutes of your time

## Step 1: Get Your API Keys (3 minutes)

### Firebase Setup
1. Go to [console.firebase.google.com](https://console.firebase.google.com/)
2. Click "Add project" → Name it "stemlens-ai" → Create
3. In Authentication → Enable "Email/Password" and "Google"
4. In Firestore → Create database → Start in production mode
5. In Storage → Get started → Use default rules
6. In Project Settings → Your apps → Add web app
7. Copy the config values (apiKey, projectId, etc.)

### Gemini API Setup
1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

## Step 2: Setup Project (2 minutes)

```bash
# Navigate to project
cd stemlens-ai

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit .env.local with your API keys
# (Use nano, vim, or any text editor)
nano .env.local
```

Paste your values:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## Step 3: Run! (10 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Test

1. Click "Get Started"
2. Sign up with email/password
3. Upload any image (try a bicycle, phone, or cup)
4. Click "Analyze with AI"
5. Explore the lesson and take the quiz!

## Common Issues

**Port 3000 in use?**
```bash
PORT=3001 npm run dev
```

**Firebase error?**
- Double-check your `.env.local` values
- Make sure no extra spaces in the file

**Gemini API error?**
- Verify your API key is correct
- Check you have API quota available

## What's Next?

- 📖 Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- 📚 Check [FEATURES.md](./FEATURES.md) for all features
- 🚀 See [README.md](./README.md) for deployment instructions

## Need Help?

- Check browser console for errors
- Review Firebase Console logs
- Verify all environment variables are set

---

**That's it! You're ready to learn STEM from the world around you!** 🎉
