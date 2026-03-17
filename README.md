# 🌊 Coastal Hazard Awareness Social Feed

A real-time social feed platform combining **web scraping with Firecrawl** and **community reports** to provide early warnings for coastal hazards like tsunamis, storm surges, and high waves. Designed specifically for fishermen and coastal communities in India.

## 🎯 Problem Statement

India's coastline is vulnerable to hazards like tsunamis, storm surges, and high waves. While INCOIS provides early warnings, real-time citizen reports are often missing or delayed. Critical information on social media goes unnoticed, and fishermen lack adequate alerts, endangering their lives, boats, and livelihoods.

## ✨ Features

- **🔍 Web Scraping with Firecrawl** - Automatically scrapes coastal hazard information from web sources
- **📢 Community Reports** - Fishermen and coastal communities can create real-time posts
- **🚨 Priority-Based Feed** - Critical alerts appear first
- **📊 Hazard Classification** - Identifies tsunami, storm surge, cyclone, and high wave alerts
- **✅ Verification System** - Posts from INCOIS are marked as verified
- **💬 Social Features** - Upvoting, comments, and sharing capabilities
- **📱 Responsive Design** - Works on desktop and mobile devices

## 🏗️ Architecture

```
social feed/
├── backend/                 # Node.js Express server
│   ├── controllers/        # Request handlers
│   ├── utils/              # Firecrawl integration & data store
│   ├── data/               # JSON data storage
│   ├── server.js           # Express server
│   └── package.json
│
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx         # Main app
│   │   └── index.css       # Global styles
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- **Firecrawl API key** (free at https://www.firecrawl.dev) - **REQUIRED for real scraping**

### Installation

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Get Firecrawl API Key** (Required!)
   - Visit: https://www.firecrawl.dev/
   - Sign up (free)
   - Copy your API key from Dashboard

3. **Configure Backend with API Key**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `backend/.env` and paste your API key:
   ```
   FIRECRAWL_API_KEY=your_api_key_here
   ```

4. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm start
```
Server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

Open your browser and visit: **http://localhost:3000**

### ⚠️ Important: API Key Required

The application requires a **Firecrawl API key** to scrape web content. Without it, you'll see an error asking you to configure it.

See [FIRECRAWL_SETUP.md](FIRECRAWL_SETUP.md) for detailed setup instructions.

## 📖 How to Use

### Option 1: Scrape Web Content
1. Go to the **"🔍 Scrape Content"** tab
2. Paste a URL with coastal hazard information
3. Select the hazard type
4. Click **"Scrape & Post"**
5. The content will be automatically extracted and added to the feed

### Option 2: Create Community Report
1. Go to the **"📝 Create Post"** tab
2. Fill in the title and description
3. Select hazard type and location
4. Click **"✅ Create Post"**
5. Your report appears immediately in the feed

## 🔧 API Endpoints

### Get All Posts
```
GET /api/posts
```

### Create New Post
```
POST /api/posts
Body: {
  title: string,
  content: string,
  hazardType: string,
  location: string,
  community: string
}
```

### Scrape and Create Post
```
POST /api/scrape-hazards
Body: {
  url: string,
  hazardType: string
}
```

### Health Check
```
GET /api/health
```

## 🎨 Components

### Frontend Components
- **Header** - Application title and description
- **SocialFeed** - Displays all posts with refresh capability
- **PostCard** - Individual post display with metadata
- **ScraperPanel** - Web scraping and community report forms

### Backend Modules
- **feedController** - Handles content scraping
- **postsController** - Manages post CRUD operations
- **firecrawlService** - Firecrawl API integration
- **dataStore** - JSON-based data persistence

## 🔐 Security Considerations

- Validate and sanitize all URLs before scraping
- Implement rate limiting for web scraping
- Add authentication for admin features
- Use HTTPS for production deployment
- Validate user input on the backend

## 📦 Technology Stack

- **Backend**: Node.js, Express.js, Axios
- **Frontend**: React 18, Vite, CSS3
- **Web Scraping**: Firecrawl API
- **Data Storage**: JSON (for demo), can migrate to MongoDB
- **Styling**: CSS3 with responsive design

## 🚀 Deployment

### Backend (Heroku, Railway, Render)
```bash
npm install
npm start
```

### Frontend (Vercel, Netlify)
```bash
npm run build
npm run preview
```

Update the API base URL in frontend to point to your production backend.

## 🛠️ Customization

### Add New Hazard Types
Edit `ScraperPanel.jsx` and `PostCard.jsx` to add more hazard types:
```jsx
<option value="your_hazard">🌊 Your Hazard</option>
```

### Change Priority Logic
Modify the `determinePriority()` function in `feedController.js` to update priority detection keywords.

### Data Storage
Replace JSON storage with MongoDB:
```bash
npm install mongoose
```
Then update `dataStore.js` to use MongoDB models.

## 📞 Support & Contribution

For issues or suggestions, please open an issue in the repository.

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for India's coastal communities**
