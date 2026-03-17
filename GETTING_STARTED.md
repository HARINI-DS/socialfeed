# Quick Start Guide - Coastal Hazard Awareness Feed

## ⚠️ IMPORTANT: Firecrawl API Key Required

This application now uses **real web scraping with Firecrawl**. To enable scraping:

1. **Get free API key**: https://www.firecrawl.dev/
2. **Add to backend/.env**: `FIRECRAWL_API_KEY=your_key`
3. **Restart backend**

See [FIRECRAWL_SETUP.md](FIRECRAWL_SETUP.md) for detailed instructions.

---

## ✅ What's Been Set Up

Your complete social feed application is now ready with:

✅ **Backend Server** - Express.js running on `http://localhost:5000`
✅ **Frontend Application** - React app running on `http://localhost:3000`
✅ **Real Firecrawl Integration** - Actual web scraping capability
✅ **Social Feed Components** - Full UI for posts and scraping
✅ **Error Handling** - Clear messages if API key is missing

## 🚀 Accessing the Application

Open your browser and go to:
```
http://localhost:3000
```

## 🎮 How to Use

### Step 1: Get Your Firecrawl API Key

Visit https://www.firecrawl.dev/:
- Sign up (free)
- Get API key
- Add to `backend/.env`

### Step 2: Create a Community Report

- Click **"📝 Create Post"** tab
- Fill in the form with title and description
- Click **"✅ Create Post"**
- Post appears in feed immediately!

### Step 3: Scrape Real Web Content

- Click **"🔍 Scrape Content"** tab
- Enter a URL (news site, weather report, etc.)
- Select hazard type (tsunami, storm surge, etc.)
- Click **"🔄 Scrape & Post"**
- Real content is extracted and posted!

### Step 4: View Live Feed

- Scroll through all posts
- Critical alerts appear first (red badge)
- Click refresh to reload
- See post sources and details

---

## 📋 Example URLs to Try

### News & Weather
- `https://www.bbc.com/news`
- `https://weather.gov/`
- `https://www.wikipedia.org/`

### Coastal/Ocean Data
- `https://www.imd.gov.in/` (India Meteorological)
- `https://weather.gov/` (US Weather)

---

## 🗂️ Project Structure

```
social feed/
├── backend/
│   ├── controllers/       # Handle requests
│   ├── utils/
│   │   ├── firecrawlService.js   # Firecrawl API integration
│   │   └── dataStore.js          # Data storage
│   ├── data/
│   │   └── posts.json     # All posts stored here
│   ├── server.js          # Main server file
│   ├── .env               # Your API key goes here
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/         # Helper functions
│   │   └── App.jsx        # Main app
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── Documentation/
    ├── README.md                  # Full documentation
    ├── FIRECRAWL_SETUP.md        # Firecrawl setup guide
    └── GETTING_STARTED.md        # This file
```

## 🔌 API Endpoints Reference

### Get All Posts
```
GET http://localhost:5000/api/posts
```

### Create New Post
```
POST http://localhost:5000/api/posts
Content-Type: application/json

{
  "title": "Tsunami Alert",
  "content": "Strong waves detected",
  "hazardType": "tsunami",
  "location": "Maharashtra Coast",
  "community": "Local Fishermen"
}
```

### Scrape and Create Post (Requires API Key!)
```
POST http://localhost:5000/api/scrape-hazards
Content-Type: application/json

{
  "url": "https://example.com/alert",
  "hazardType": "storm_surge"
}
```

### Health Check
```
GET http://localhost:5000/api/health
```

## 💾 Data Storage

Posts are automatically saved to `backend/data/posts.json`

This is a JSON file containing all posts. You can:
- Edit it directly to modify posts
- Back it up for data persistence
- Migrate to a database later

## 🛠️ Troubleshooting

### Scraping says "API key not set"

**Solution**: 
1. Visit https://www.firecrawl.dev/
2. Sign up and copy API key
3. Edit `backend/.env`
4. Add: `FIRECRAWL_API_KEY=your_key`
5. Restart backend (Ctrl+C and npm start)

### "Invalid API key"

**Solution**:
1. Check if API key is correct in .env
2. Log in to Firecrawl dashboard
3. Generate a new API key
4. Update .env and restart

### Port 3000 or 5000 Already in Use

- Change port in `frontend/vite.config.js` (port: 3000)
- Or: `lsof -i :3000` (macOS/Linux) to find what's using it

### Backend Not Starting

```bash
cd backend
npm install
npm start
```

### Frontend Not Starting

```bash
cd frontend
npm install
npm run dev
```

## 📱 Next Steps

1. **Get Firecrawl API Key** - https://www.firecrawl.dev/
2. **Add to .env** - `FIRECRAWL_API_KEY=your_key`
3. **Restart Backend** - Ctrl+C then npm start
4. **Test Scraping** - Visit http://localhost:3000
5. **Create Posts** - Start scraping real content!

## 📚 Documentation

- **Full README**: See [README.md](../README.md)
- **Firecrawl Setup**: See [FIRECRAWL_SETUP.md](../FIRECRAWL_SETUP.md)
- **API Reference**: See backend controllers

## ❓ Questions?

Refer to [FIRECRAWL_SETUP.md](../FIRECRAWL_SETUP.md) for common API key issues.

---

**Ready to build real-time coastal hazard awareness!** 🌊


## 📊 Sample URLs to Try (With Real API Key)

Once you have Firecrawl set up, try scraping:
- https://example.com/weather-alerts
- https://www.ndtv.com/(search for coastal news)
- https://news.google.com/search?q=tsunami+warning
- Any URL with coastal or weather content

## 🗂️ Project Structure

```
social feed/
├── backend/
│   ├── controllers/       # Handle requests
│   ├── utils/             # Firecrawl & data storage
│   ├── data/
│   │   └── posts.json     # All posts stored here
│   ├── server.js          # Main server file
│   ├── package.json
│   ├── .env               # Configuration (your API key here)
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/         # Helper functions
│   │   └── App.jsx        # Main app
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints Reference

### Get All Posts
```
GET http://localhost:5000/api/posts
```

### Create New Post
```
POST http://localhost:5000/api/posts
Content-Type: application/json

{
  "title": "Tsunami Alert",
  "content": "Strong waves detected",
  "hazardType": "tsunami",
  "location": "Maharashtra Coast",
  "community": "Local Fishermen"
}
```

### Scrape and Create Post
```
POST http://localhost:5000/api/scrape-hazards
Content-Type: application/json

{
  "url": "https://example.com/alert",
  "hazardType": "storm_surge"
}
```

### Health Check
```
GET http://localhost:5000/api/health
```

## 💾 Data Storage

Posts are automatically saved to `backend/data/posts.json`

This is a JSON file containing all posts. You can:
- Edit it directly to modify posts
- Back it up for data persistence
- Migrate to a database later

## 🛠️ Troubleshooting

### Backend Not Starting
```bash
cd backend
npm install
npm start
```

### Frontend Not Starting
```bash
cd frontend
npm install
npm run dev
```

### Port 3000 or 5000 Already in Use
- Change port in `frontend/vite.config.js` (port: 3000)
- Change port in `backend/server.js` (PORT=5000)

### CORS Errors
- Backend CORS is already configured for localhost:3000
- If deploying, update CORS settings in `backend/server.js`

## 📱 Next Steps

1. **Try the Demo**
   - Create a post to test the system
   - Use the scrape tab with mock data

2. **Add Firecrawl API Key**
   - Get free API key from firecrawl.dev
   - Add to .env file
   - Test real web scraping

3. **Customize**
   - Modify hazard types in components
   - Add more priority levels
   - Integrate with real database

4. **Deploy**
   - Deploy backend to Heroku, Railway, or Render
   - Deploy frontend to Vercel, Netlify
   - Update API endpoint in frontend

## 📚 Documentation

- Full README: See [README.md](../README.md)
- Component docs: See individual .jsx files
- API reference: See backend controllers

## ❓ Questions?

Refer to the main [README.md](../README.md) for detailed information about the project.

---

**Ready to use! No additional setup needed for the demo.**
**Just visit http://localhost:3000**
