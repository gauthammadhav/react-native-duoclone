# AI Language Tutor (Duolingo Clone)

A modern, interactive AI-powered language learning application inspired by Duolingo. Built with Expo, React Native, and Tailwind CSS (NativeWind v5), it integrates real-time AI agents to act as your personal language teacher.

## Features 🚀

- **Interactive AI Teacher**: Real-time voice and video conversations using [Stream Edge](https://getstream.io/) and [Vision Agents SDK](https://github.com/getstream/vision-agent). The AI listens to you and helps with grammar, vocabulary, and pronunciation.
- **Language Selection & Onboarding**: Smooth onboarding flow to choose your target language.
- **Structured Lessons System**: Progress through structured units and lessons with vocabulary, grammar, and speaking practice.
- **Authentication**: Secure and seamless sign-up/sign-in flows powered by [Clerk](https://clerk.com/).
- **Beautiful Mobile-First UI**: A pixel-perfect, engaging, and playful design system built with NativeWind v5 and Lucide Icons.
- **Progress Tracking**: Track your day streak, total XP, and league rankings directly in your profile.
- **Analytics Integration**: Built-in event tracking using [PostHog](https://posthog.com/).

## Tech Stack 🛠️

- **Framework**: Expo / React Native
- **Language**: TypeScript
- **Styling**: NativeWind v5 (Tailwind CSS for React Native)
- **State Management**: Zustand & AsyncStorage for persistence
- **Authentication**: Clerk
- **AI & Video Communication**: Stream Video React Native SDK & Vision Agents Python SDK
- **Analytics**: PostHog React Native

## Getting Started

### 1. Prerequisites

- Node.js (v18+)
- Python (v3.9+) for running the Vision Agent service.
- Android Studio or Xcode (if you plan to run on emulators/simulators).

### 2. Install Dependencies

Install the Expo app dependencies:
```bash
npm install
```

Set up the Vision Agent (Python environment):
```bash
cd vision-agent
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

### 3. Environment Variables

Create a `.env` file in the root of the project and populate it with your keys:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

EXPO_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret_key

EXPO_PUBLIC_POSTHOG_HOST=your_posthog_host
EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_project_token
```

Create a `.env` file in the `vision-agent/` directory:
```env
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Running the App

Start the AI Teacher service (in a separate terminal):
```bash
cd vision-agent
# Activate your venv if not already active
python agent.py serve
```

Start the Expo bundler:
```bash
npm start
```
From the Expo CLI, press `a` to open the app on an Android emulator, or `i` for iOS.

## Project Structure

- `src/app/` - Expo Router screens and navigation
- `src/components/` - Reusable UI components
- `src/constants/` - Centralized assets and configurations
- `src/data/` - Hardcoded lesson content, activities, and languages
- `src/store/` - Zustand global state stores
- `src/tw/` - NativeWind styled utility components
- `vision-agent/` - Python backend service for the AI voice teacher

## License
MIT License
