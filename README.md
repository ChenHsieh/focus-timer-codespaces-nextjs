# ⏱️ Focus Timer

A productivity timer application built with Next.js and React. This app helps you stay focused using timed work sessions and breaks, with persistent session tracking.

## ✨ Features

- **25-minute work sessions** with 5-minute breaks
- **Auto-switching** between work and break periods
- **Session tracking** with persistent localStorage storage
- **Daily and all-time statistics** 
- **Responsive design** with modern UI
- **Browser notifications** when sessions complete
- **Reset functionality** for timer and statistics

## 🚀 Getting Started

### Development

To run the application locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📊 How It Works

1. **Work Session**: Start a 25-minute focused work period
2. **Break Time**: Automatically switches to a 5-minute break
3. **Session Tracking**: Counts completed work sessions
4. **Data Persistence**: Your progress is saved locally and persists between browser sessions
5. **Daily Reset**: Today's session count resets automatically each day

## 🎯 Usage Tips

- Work for 25 minutes with full focus
- Take a 5-minute break when prompted
- Repeat the cycle throughout your work day
- After 4 work sessions, consider taking a longer break (15-30 minutes)

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **CSS Modules** - Styling
- **localStorage** - Data persistence

## 📱 Deployment

This app is optimized for deployment on:

- **Vercel** (Recommended - zero configuration)
- **Netlify** (Configured with `netlify.toml`)
- Any static hosting service

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Build settings are pre-configured in `netlify.toml`

## 📂 Project Structure

```
├── pages/
│   ├── _app.js          # App wrapper
│   └── index.js         # Main timer component
├── components/
│   ├── Button.js        # Reusable button component
│   └── Button.module.css
├── styles/
│   ├── global.css       # Global styles
│   └── home.module.css  # Home page styles
├── package.json
├── next.config.js       # Next.js configuration
└── netlify.toml        # Netlify deployment config
```

## 🔧 Customization

You can easily customize:

- **Timer durations**: Modify the time values in `pages/index.js`
- **Colors and styling**: Update CSS modules and inline styles
- **Session tracking**: Extend the localStorage functionality
- **Notifications**: Add browser notifications or sound alertsspaces ♥️ Next.js

Welcome to your shiny new Codespace running Next.js! We've got everything fired up and running for you to explore Next.js.

You've got a blank canvas to work on from a git perspective as well. There's a single initial commit with the what you're seeing right now - where you go from here is up to you!

Everything you do here is contained within this one codespace. There is no repository on GitHub yet. If and when you’re ready you can click "Publish Branch" and we’ll create your repository and push up your project. If you were just exploring then and have no further need for this code then you can simply delete your codespace and it's gone forever.

To run this application:

```
npm run dev
```
