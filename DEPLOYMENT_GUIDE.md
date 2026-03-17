# Full Production Deployment Guide

## Setup Checklist

### Step 1: MongoDB (Database)
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Sign Up** (free account)
3. Create cluster → Choose FREE tier
4. Wait 5-10 minutes for cluster to be ready
5. Get connection string:
   - Click "Connect" button
   - Choose "Drivers" option
   - Copy the connection string
   - Example: `mongodb+srv://user:password@cluster.mongodb.net/ocean-feed`

### Step 2: Update Backend (.env)
Add these variables:
```
FIRECRAWL_API_KEY=your_firecrawl_key_here
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ocean-feed
NODE_ENV=production
PORT=5000
```

### Step 3: Deploy to Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → "Deploy from GitHub"
4. Connect your repo
5. Set environment variables (copy from .env)
6. Deploy!

### Step 4: Deploy Frontend to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your frontend folder
4. Set API URL: `https://your-railway-backend.up.railway.app`
5. Deploy!

### Step 5: Verify
- Backend health: `https://your-backend.up.railway.app/api/health`
- Frontend: `https://your-frontend.vercel.app`

---

**Timeline:**
- MongoDB setup: 5-10 minutes
- Railway deployment: 2-3 minutes
- Vercel deployment: 1-2 minutes
- **Total: ~15 minutes**
