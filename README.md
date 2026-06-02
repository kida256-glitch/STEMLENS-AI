# STEMLens AI

**Learn STEM from the world around you**

STEMLens AI is an AI-powered STEM education platform that allows students to upload or capture an image of any real-world object and instantly receive STEM lessons, explanations, quizzes, and interactive learning content based on that object.

## 🌟 Features

- **AI Vision Recognition**: Advanced computer vision powered by Google Gemini to identify objects instantly
- **STEM Concept Detection**: Automatically discover physics, mathematics, engineering, and technology concepts
- **Interactive Lessons**: Comprehensive lessons organized by STEM discipline with difficulty levels
- **AI-Generated Quizzes**: Test your knowledge with personalized quizzes
- **Learning History**: Track your progress and revisit past analyses
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Mobile-first design that works on all devices
- **User Profiles**: Track statistics and learning progress

## 🚀 Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI**
- **Lucide Icons**

### Backend
- **Next.js API Routes**

### AI
- **Google Gemini API** (Vision & Text)

### Database & Auth
- **Firebase Firestore**
- **Firebase Authentication**
- **Firebase Storage**

### Deployment
- **Vercel** (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A Google Cloud account (for Gemini API)
- A Firebase project

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd stemlens-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google)
4. Create a Firestore database
5. Enable Firebase Storage
6. Get your Firebase configuration

### 4. Set up Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key for Gemini

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
stemlens-ai/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── dashboard/
│   ├── analyze/
│   ├── analysis/[id]/
│   ├── profile/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── landing/
│   ├── auth/
│   ├── dashboard/
│   ├── analysis/
│   ├── quiz/
│   ├── profile/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── firebase.ts
│   └── utils.ts
├── services/
│   ├── gemini.ts
│   └── firestore.ts
├── hooks/
│   ├── useAuth.ts
│   └── useTheme.ts
├── types/
│   └── index.ts
└── public/
```

## 🎯 Usage

### For Students

1. **Sign Up**: Create an account using email or Google
2. **Upload Image**: Take a photo or upload an image of any object
3. **Learn**: Read comprehensive STEM lessons about the object
4. **Take Quiz**: Test your understanding with AI-generated questions
5. **Track Progress**: View your statistics and learning history

### For Teachers

1. Use STEMLens AI as a teaching tool in class
2. Encourage students to explore objects around them
3. Track student engagement through quiz scores
4. Create discussions based on real-world applications

## 🔐 Authentication

The app supports:
- Email/Password authentication
- Google Sign-In
- Password reset functionality

## 💾 Data Storage

### Firestore Collections

**analyses**
- userId
- imageUrl
- objectRecognition
- lessonContent
- quizQuestions
- quizResult (optional)
- createdAt

## 🎨 Design System

### Colors
- **Primary**: #2563EB (Blue)
- **Secondary**: #14B8A6 (Teal)
- **Border Radius**: 0.75rem (modern rounded corners)

### Typography
- **Font**: Inter (system font stack)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Firebase Connection Issues

- Verify environment variables are set correctly
- Check Firebase console for proper configuration
- Ensure Firestore and Storage are enabled

### Gemini API Errors

- Verify API key is valid
- Check API quota and limits
- Ensure correct model name is used

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Target Users

- Secondary school students
- University students
- STEM enthusiasts
- Teachers and educators

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Support

For support, please open an issue in the GitHub repository.

## 🙏 Acknowledgments

- Google Gemini AI for powerful vision and language models
- Firebase for backend services
- Shadcn/UI for beautiful components
- Next.js team for the amazing framework

---

Built with ❤️ for STEM education
