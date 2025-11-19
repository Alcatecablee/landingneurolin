# NeuroLint Landing Page - Replit Project

## Overview
This is the NeuroLint landing page - a Vite + React + TypeScript frontend application that showcases the NeuroLint 7-layer code transformation engine. It's a static landing page that connects to an external backend API at `app.neurolint.dev`.

**Migration Status**: Successfully migrated from Vercel to Replit on November 19, 2025

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.14
- **Language**: TypeScript 5.6.3
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI, Lucide React
- **Animations**: Framer Motion
- **Analytics**: Vercel Analytics (optional)

### Project Structure
```
.
├── client/              # Frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── landing/ # Landing page components
│   │   │   └── ui/      # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and API client
│   │   │   ├── config.ts        # App configuration
│   │   │   ├── neurolint-api.ts # API client for backend
│   │   │   ├── utils.ts         # Utility functions
│   │   │   └── validation.ts    # Validation helpers
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   ├── public/          # Static assets
│   └── index.html       # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## Replit Configuration

### Port & Host Settings
- **Development Port**: 5000 (bound to 0.0.0.0 for Replit compatibility)
- **Preview Port**: 5000
- The port configuration is critical for Replit's webview to work correctly

### Workflow
- **Name**: Start application
- **Command**: `npm run dev`
- **Output Type**: webview (displays the website)
- **Port**: 5000

### Deployment
- **Type**: Static site
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- The built files can be published using Replit's deployment feature

## Environment Variables

### Required Variables
None - the app works out of the box with default values

### Optional Variables
Create a `.env` file in the root directory (see `.env.example`):

- `VITE_API_URL` - Backend API URL (default: https://app.neurolint.dev/api)
- `VITE_ENABLE_ANALYTICS` - Enable Vercel Analytics (default: false)

**Note**: Vite requires environment variables to be prefixed with `VITE_` to be accessible in the frontend

## Recent Changes

### November 19, 2025 - Vercel to Replit Migration
1. **Port Configuration**: Changed from port 3000 to 5000, bound to 0.0.0.0
2. **Environment Variables**: Converted from Next.js style (`NEXT_PUBLIC_*`) to Vite style (`VITE_*`)
3. **Security Headers**: Updated CSP to allow Replit domains (*.replit.dev, *.repl.co)
4. **Deployment Config**: Set up static deployment configuration for Replit publishing
5. **Documentation**: Created comprehensive project documentation

## API Integration

This is a **frontend-only** landing page. The actual code transformation engine runs on a separate backend:
- **Backend URL**: https://app.neurolint.dev/api
- **API Client**: `client/src/lib/neurolint-api.ts`
- **Endpoints Used**:
  - `/analyze-simple` - Analyze code for issues
  - `/test` - Get engine status

The frontend makes fetch requests to the external API and displays results. No backend server runs in this Replit project.

## Development Workflow

### Running the App
The app starts automatically when you open the Replit. To restart manually:
1. Click "Start application" workflow
2. Or run: `npm run dev`
3. View the app in the webview pane

### Making Changes
1. Edit files in `client/src/`
2. Vite hot-reload will update the preview automatically
3. No need to restart the workflow for code changes

### Building for Production
```bash
npm run build
```
Output goes to `dist/` directory

### Type Checking
```bash
npm run check
```

## Security

### Content Security Policy
The app includes strict CSP headers in `client/index.html`:
- Allows scripts from self, Vercel Analytics, and Replit domains
- Allows connections to API backend (app.neurolint.dev)
- Includes WebSocket support for hot-reload and analytics
- Uses `frame-ancestors 'none'` to prevent clickjacking

### Best Practices
- Environment variables for sensitive data (though none required currently)
- `.env` files are gitignored
- No secrets in client-side code
- External API calls use HTTPS

## Troubleshooting

### App Not Loading
1. Check that workflow "Start application" is running
2. Verify port 5000 is in use: `lsof -i :5000`
3. Check workflow logs for errors

### Environment Variables Not Working
- Ensure variables are prefixed with `VITE_`
- Restart the workflow after changing `.env`
- Variables are baked into build at compile time

### API Connection Issues
- Check if app.neurolint.dev is accessible
- Verify CSP allows connections to the API domain
- Check browser console for CORS or CSP errors

## User Preferences
None specified yet.

## Notes
- This is a Vite + React app, not Next.js (despite some references to Next.js in content)
- The app is fully static - no server-side rendering
- All transformations happen on the external backend
- Perfect for Replit's static deployment model
