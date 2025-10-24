# AIEasyEasy2 - Runware Clone

A Next.js application that replicates Runware's functionality with AI image generation, GitHub integration, and Vercel deployment capabilities.

## 🚀 Features

- **AI Image Generation**: Generate high-quality images using Runware's API with FLUX.1 model
- **GitHub Integration**: Connect repositories and manage deployments  
- **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion
- **Real-time Generation**: Interactive playground for testing AI models
- **Authentication**: GitHub OAuth integration
- **Deployment Ready**: Optimized for Vercel deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **API Integration**: Runware AI API, GitHub API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnBravo17/aieasyeasy2.git
   cd aieasyeasy2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   ```env
   RUNWARE_API_KEY=your_runware_api_key_here
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys Setup

### Runware API
1. Sign up at [Runware.ai](https://my.runware.ai/signup)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file

### GitHub OAuth App
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/github/callback`
4. Copy Client ID and Client Secret to `.env.local`

## 🚀 Deployment

### Deploy to Vercel

1. **Push code to GitHub**
2. **Import project in Vercel dashboard**
3. **Configure environment variables**
4. **Update GitHub OAuth callback URL to your Vercel domain**

### Environment Variables
Add these in your Vercel project settings:
- `RUNWARE_API_KEY`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `NEXTAUTH_URL` (your Vercel domain)
- `NEXTAUTH_SECRET`

## 📁 Key Files

- `src/app/page.tsx` - Homepage with hero and features
- `src/app/playground/page.tsx` - AI image generation interface  
- `src/app/dashboard/page.tsx` - GitHub repository management
- `src/lib/runware.ts` - Runware API integration
- `src/lib/github.ts` - GitHub API integration
- `.env.example` - Environment variables template

## 📝 Usage

### Image Generation
1. Navigate to `/playground`
2. Enter a descriptive prompt
3. Adjust generation parameters
4. Click "Generate Image"

### Repository Management
1. Connect your GitHub account at `/dashboard`
2. Create and manage repositories
3. Deploy to Vercel with one click

## 📊 API Endpoints

- `POST /api/generate` - Generate images with Runware
- `GET /api/models` - List available AI models
- `GET /api/auth/github` - GitHub OAuth flow
- `GET /api/github/repos` - List user repositories
- `POST /api/github/repos` - Create new repository
- `POST /api/github/deploy` - Trigger Vercel deployment
