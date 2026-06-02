# STEMLens AI - Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Google Gemini API Setup](#google-gemini-api-setup)
4. [Local Development Setup](#local-development-setup)
5. [Deployment to Vercel](#deployment-to-vercel)
6. [Testing the Application](#testing-the-application)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, make sure you have:
- Node.js 18.x or higher
- npm or yarn package manager
- A Google account
- Git installed on your machine

## Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `stemlens-ai` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

### Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google** authentication:
   - Click on "Google"
   - Toggle "Enable"
   - Enter a support email
   - Click "Save"

### Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in production mode" (we'll add rules later)
4. Choose your Firestore location (select closest to your users)
5. Click "Enable"

### Step 4: Set Firestore Security Rules

1. In Firestore, go to the "Rules" tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own analyses
    match /analyses/{analysisId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && resource.data.userId == request.auth.uid;
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

3. Click "Publish"

### Step 5: Enable Firebase Storage

1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Start in production mode
4. Choose your storage location
5. Click "Done"

### Step 6: Set Storage Security Rules

1. In Storage, go to the "Rules" tab
2. Replace the rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /analyses/{userId}/{allPaths=**} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

### Step 7: Get Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (`</>`)
5. Register app with nickname: "STEMLens Web"
6. Don't check "Also set up Firebase Hosting"
7. Click "Register app"
8. Copy the `firebaseConfig` object values

You'll need these values:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

## Google Gemini API Setup

### Step 1: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Select your Google Cloud project (or create a new one)
5. Click "Create API key in existing project" or "Create API key in new project"
6. Copy the API key that appears

**Important:** Keep this API key secure and never commit it to version control!

### Step 2: Enable Gemini API

1. The API should be automatically enabled when you create the key
2. If you encounter issues, go to [Google Cloud Console](https://console.cloud.google.com/)
3. Navigate to "APIs & Services" > "Library"
4. Search for "Generative Language API"
5. Click "Enable"

## Local Development Setup

### Step 1: Clone and Install

```bash
# Navigate to the project directory
cd stemlens-ai

# Install dependencies
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and fill in your values:

```env
# Firebase Configuration (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# Google Gemini API (from Google AI Studio)
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```

### Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: STEMLens AI"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/stemlens-ai.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up or log in
3. Click "Add New" > "Project"
4. Import your GitHub repository
5. Configure your project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables in Vercel

1. In your Vercel project dashboard, go to "Settings"
2. Click "Environment Variables"
3. Add all variables from your `.env.local` file:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_GEMINI_API_KEY`

4. Click "Deploy"

### Step 4: Update Firebase Authentication

1. Go back to Firebase Console
2. Navigate to "Authentication" > "Settings" > "Authorized domains"
3. Add your Vercel domain (e.g., `stemlens-ai.vercel.app`)

## Testing the Application

### Test User Registration

1. Go to your deployed or local URL
2. Click "Get Started" or "Sign Up"
3. Register with an email and password
4. Verify you're redirected to the dashboard

### Test Google Sign-In

1. Click "Sign in with Google"
2. Select your Google account
3. Verify successful login

### Test Image Analysis

1. From the dashboard, click "Analyze New Object"
2. Upload an image (try a bicycle, smartphone, or any common object)
3. Click "Analyze with AI"
4. Wait for the analysis to complete
5. Verify you see:
   - Object name and category
   - STEM concepts tags
   - Lesson content (Physics, Math, Engineering, Technology tabs)
   - Quiz questions

### Test Quiz Functionality

1. After analyzing an image, click the "Quiz" tab
2. Answer the quiz questions
3. Check that explanations appear after each answer
4. Verify the final score is displayed
5. Check that the quiz result is saved

### Test Learning History

1. Analyze multiple objects
2. Go to the Dashboard
3. Verify recent analyses appear
4. Click on an analysis to view it again
5. Check that quiz scores are displayed

### Test Profile Page

1. Click on your avatar in the navbar
2. Select "Profile"
3. Verify your statistics are displayed:
   - Total Analyses
   - Quizzes Completed
   - Average Score
4. Check the learning progress section

### Test Dark Mode

1. Click the sun/moon icon in the navbar
2. Toggle between Light, Dark, and System modes
3. Verify the theme changes correctly

## Troubleshooting

### Build Errors

**Error: "Firebase: Error (auth/invalid-api-key)"**
- Solution: Check that all Firebase environment variables are set correctly
- Verify the API key format is correct (should start with "AIza")

**Error: "Failed to fetch"**
- Solution: Check your internet connection
- Verify Firebase and Gemini API keys are valid
- Check browser console for specific error messages

### Authentication Issues

**Can't sign in with Google**
- Solution: Add your domain to Firebase authorized domains
- Check that Google authentication is enabled in Firebase Console

**Email verification not working**
- Solution: Check Firebase email templates in Authentication > Templates
- Verify your domain is authorized

### Image Upload Issues

**Image not uploading**
- Solution: Check Firebase Storage rules
- Verify Storage is enabled in Firebase Console
- Check image file size (should be < 5MB)

**AI analysis fails**
- Solution: Verify Gemini API key is correct
- Check API quota in Google Cloud Console
- Try with a different image (clear, well-lit object)

### Firestore Errors

**Permission denied**
- Solution: Check Firestore security rules
- Verify user is authenticated
- Ensure userId matches the authenticated user

### Performance Issues

**Slow analysis**
- This is normal for first-time use (cold start)
- Gemini API may take 5-15 seconds
- Ensure stable internet connection

**Images not loading**
- Check Firebase Storage rules
- Verify image URLs are correct
- Check browser console for CORS errors

### Development Issues

**Port 3000 already in use**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3001 npm run dev
```

**Module not found errors**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build fails locally**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)

## Support

If you encounter any issues not covered here:
1. Check the browser console for error messages
2. Review Firebase Console logs
3. Check Vercel deployment logs
4. Open an issue on GitHub

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Rotate API keys** periodically
3. **Monitor Firebase usage** to detect unusual activity
4. **Set up billing alerts** in Google Cloud Console
5. **Review Firestore and Storage rules** regularly
6. **Enable Firebase App Check** for production (optional but recommended)

---

**Congratulations!** You should now have a fully functional STEMLens AI application running locally and deployed to production. Happy learning! 🎉
