# Nate Rohweder Dot Com

A personal playground for software, music, health data, bloggy vibes, and the occasional existential crisis — all built on a modern stack with Next.js, TypeScript, PostCSS, Drizzle, and Vercel

## 🧹 Features

Sure, it's got the résumé stuff, but it's also got *actual tools* you can use — and some fun stuff just because. Here’s what’s inside:

- 🥦 **Nutrition Tracker**: Science-backed weekly food tracking to help you nourish your body, not restrict it. No calorie counting. No food shaming. Just real nutrients, good habits, and the occasional dark chocolate.
- 💪 **Calisthenics Tracker**: Inspired by the "10,000 push-ups a year" challenge. Add any exercise, set your rep goal for the year, and track your streaks, daily averages, and heroic effort to not skip leg day.
- 🗽 **Travel Blog**: A journal of adventures near and far, with beautiful layouts, hand-picked images, and stories for the curious and wanderlust-prone.
- 🎵 **Spotify Playlists**: Embedded vibes — curated playlists powered by Spotify so you can work, chill, or lift to the soundtrack of Nate's brain.
- 🤖 **AI Chatbot**: A custom GPT-powered chatbot baked into the site. Ask it stuff. Try to break it. Talk about kale. Your call.
- 🐞 **Feedback Button**: Click the bug icon to report a bug or suggest a feature. It's wired directly to the Nate Hive Mind™.

## 🛠️ Tech Stack

- **Framework**: Next.js 14  
- **Language**: TypeScript  
- **Styling**: CSS Modules + PostCSS
- **State & Fetching**: Server + client-side rendering with async goodies  
- **Database**: Drizzle ORM (Postgres), managed via Vercel  
- **Deployment**: Vercel magic ✨

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x+
- npm or yarn

### Installation

```bash
git clone https://github.com/naterohweder/nrdc-v5.git
cd nrdc-v5
npm install
# or
yarn install
npm run dev
# then open http://localhost:3000
```

## 📁 Project Structure

```
nrdc-v5/
├── app/                    # Next.js app directory
│   ├── health/            # Nutrition + calisthenics trackers
│   ├── home/              # Home page
│   └── travel/            # Travel blog
├── components/            # React components
│   ├── custom/            # Feature-specific components
│   └── generic/           # Reusable UI elements
├── public/                # Static files
└── styles/                # Global + module-specific CSS
```

## 🎨 Styling

- CSS Modules for scoped styles  
- Custom properties (`--like-this`) for theming  
- Responsive layouts using media queries and grid-based thinking  

## 💻 Dev Commands

- `npm run dev` – Fire up local dev  
- `npm run build` – Make it production ready  
- `npm run lint` – ESLint all the things  
- `npm run type-check` – Ensure your types behave  

## 🌍 Deployment

Powered by Vercel. Just push to `main` and go drink a coffee.

## 📊 Browser Support

Supports all modern browsers:

- Chrome  
- Firefox  
- Safari  
- Edge  
- Mobile browsers (iOS/Android)

## 🤝 Contributing

```bash
# Fork it
git checkout -b feature/your-awesome-thing
# Make changes
git commit -m "Add your awesome thing"
git push origin feature/your-awesome-thing
# Then open a PR
```

## 📩 Contact

Nate Rohweder – [LinkedIn](https://www.linkedin.com/in/naterohweder/)  
Project Repo: [https://github.com/naterohweder/nrdc-v5](https://github.com/naterohweder/nrdc-v5)

