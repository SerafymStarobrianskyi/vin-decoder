# VIN Decoder – React Project

A single-page React application for decoding vehicle VIN codes using the public NHTSA API.  
The app validates VIN input, shows decoded vehicle data, stores the last 3 requests in localStorage, and provides pages with all vehicle variables and detailed variable descriptions.

## Live Demo
Add your deployed link here  
https://vin-decoder-gilt.vercel.app/ 

## Tech Stack
- React
- TypeScript
- Vite
- React Router DOM
- CSS
- NHTSA vPIC API

## Features
- VIN input form with validation
- API message display
- Vehicle data decoding
- History of last 3 decoded VIN requests
- Reuse previous VIN requests from history
- Variables list page
- Variable details page

## Project Structure

```bash
src/
├── api/             # API requests
├── components/      # Reusable UI components
├── hooks/           # Custom hooks
├── pages/           # Application pages
├── types/           # TypeScript types
├── utils/           # Helpers, validation, storage
├── App.tsx
├── main.tsx
└── index.css
```

## Installation and local run

- npm install
- npm run dev

## Build

- npm run build
- npm run preview
