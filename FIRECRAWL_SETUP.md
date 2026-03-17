# 🔥 Firecrawl Setup Guide - Real Web Scraping

## What is Firecrawl?

**Firecrawl** is a powerful web scraping API that extracts clean, structured content from any website. It handles JavaScript-rendered pages, complex layouts, and returns content in multiple formats (markdown, HTML).

## ✅ Why Use Real Firecrawl?

Instead of mock data, you get:
- ✅ **Real web content** from news sites, weather alerts, social media
- ✅ **Live updates** - latest coastal hazard information
- ✅ **Clean extraction** - removes ads, navigation, clutter
- ✅ **Multiple formats** - markdown, HTML, structured data
- ✅ **JavaScript support** - handles dynamic pages

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Free API Key

1. Open: https://www.firecrawl.dev/
2. Click **"Sign Up"** (top right)
3. Create account with email (or Google/GitHub)
4. Verify email
5. Go to **Dashboard** → **API Keys**
6. Copy your API key (starts with `sk-` or similar)

### Step 2: Add API Key to Backend

1. Open `backend/.env` file
2. Find this line:
   ```
   FIRECRAWL_API_KEY=
   ```
3. Paste your API key:
   ```
   FIRECRAWL_API_KEY=your_actual_key_here
   ```
4. Save the file (Ctrl+S or Cmd+S)

### Step 3: Restart Backend Server

Stop the backend (if running):
```bash
Ctrl+C
```

Restart it:
```bash
cd backend
npm start
```

### Step 4: Test Real Scraping

Visit: http://localhost:3000

1. Click **"🔍 Scrape Content"** tab
2. Try these URLs:
   - `https://www.bbc.com/news` (BBC News)
   - `https://weather.gov/` (US Weather)
   - `https://www.wikipedia.org/` (Wikipedia)
3. Select hazard type
4. Click **"Scrape & Post"**
5. 🎉 Real content gets posted!

---

## 📊 Firecrawl Pricing

| Plan | Price | Requests/Month | Status |
|------|-------|-----------------|--------|
| **Free** | $0 | 19,200 | Perfect for demo |
| **Starter** | $99 | 100,000 | Small projects |
| **Pro** | $299 | 2,000,000 | Production |

**Free tier is perfect for testing!**

---

## 🎯 Sample URLs to Scrape

### Weather & Hazards
- `https://www.weather.com/`
- `https://weather.gov/`
- `https://www.timeanddate.com/weather/`

### News Sources
- `https://www.bbc.com/news`
- `https://weather.gov/`
- `https://news.google.com`

### Actual Coastal/Ocean Data
- `https://www.noaa.gov/` (US)
- `https://www.imd.gov.in/` (India Meteorological)
- `https://incois.gov.in/` (INCOIS - India Coastal)

### Social Media (if accessible)
- `https://twitter.com/worldbank/`
- Any public blog or news site

---

## ⚙️ Configuration Details

### Backend .env File

```env
# **REQUIRED** - Your Firecrawl API Key
FIRECRAWL_API_KEY=sk_xxxxxxxxxxxxxxxxxxx

# Server Settings
PORT=5000
NODE_ENV=development
```

### How It Works

1. **User enters URL** in frontend
2. **Request sent** to `POST /api/scrape-hazards`
3. **Backend validates** URL and checks API key
4. **Firecrawl API called** with:
   - URL to scrape
   - Request for markdown + HTML
   - JavaScript rendering enabled
   - Only main content extracted
5. **Content returned** in clean format
6. **Post created** and saved to feed
7. **Frontend updated** - new post appears!

---

## 🔧 Troubleshooting

### ❌ "FIRECRAWL_API_KEY is not set"

**Problem**: .env file doesn't have API key

**Solution**:
1. Check `backend/.env` exists
2. Add: `FIRECRAWL_API_KEY=your_key`
3. Restart backend
4. Try scraping again

### ❌ "Authentication failed: Invalid API key"

**Problem**: API key is wrong or expired

**Solution**:
1. Go to https://www.firecrawl.dev/dashboard
2. Generate a new API key
3. Update `backend/.env`
4. Restart backend

### ❌ "Rate limit exceeded"

**Problem**: Too many requests too fast (free tier has limits)

**Solution**:
- Free tier: 19,200 requests/month (~640/day)
- Wait a moment before scraping again
- Upgrade plan if needed

### ❌ "Connection refused" or "Timeout"

**Problem**: Firecrawl API unreachable

**Solution**:
1. Check your internet connection
2. Check Firecrawl status: https://status.firecrawl.dev/
3. Try a different URL
4. Contact Firecrawl support

### ❌ "Unable to scrape content from this URL"

**Problem**: Website blocks scraping or is behind paywall

**Solution**:
- Try a different URL
- Some sites (Twitter, Facebook) may block automated access
- Try public news sites instead

---

## 📱 Environment Variables Reference

```bash
# Backend configuration (backend/.env)
FIRECRAWL_API_KEY=sk_xxxxx      # Required for web scraping
PORT=5000                       # Backend server port
NODE_ENV=development            # development or production
```

---

## 🔐 Security Best Practices

1. **Never commit .env to Git**
   - .env is in .gitignore (ignored automatically)

2. **Keep API key secret**
   - Don't share .env file
   - Don't paste key in public code

3. **Use environment variables in production**
   - Deploy to Heroku/Railway/Render
   - Set env vars in dashboard
   - Never hardcode keys

---

## 📊 Monitoring Usage

Check your Firecrawl usage:
1. Log in: https://www.firecrawl.dev/
2. Go to **Dashboard**
3. See requests used this month
4. Monitor costs

---

## 🚀 Advanced: Upgrade Firecrawl Client

Currently using HTTP calls. Can upgrade to Firecrawl SDK:

```bash
npm install @firecrawl/sdk
```

Then in `firecrawlService.js`:
```javascript
import FirecrawlApp from '@firecrawl/sdk';

const app = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });
const result = await app.scrapeUrl(url);
```

---

## ❓ FAQ

**Q: Is my API key visible?**
- No, it's in backend/.env (not sent to frontend)

**Q: Can I scrape Facebook/Twitter?**
- Limited, most block API scraping due to terms of service
- Better to use public APIs they provide

**Q: What URLs work best?**
- News sites, blogs, public documentation
- Any site with public HTML content

**Q: Free tier limitations?**
- 19,200 requests/month
- Perfect for testing and demo projects
- ~640 scrapes per day (if you use all)

**Q: Can I use same API key everywhere?**
- Yes, but keep it secret
- Don't commit to GitHub

---

## Next Steps

1. ✅ Sign up at https://www.firecrawl.dev/
2. ✅ Copy API key
3. ✅ Add to `backend/.env`
4. ✅ Restart backend
5. ✅ Test scraping
6. 🎉 Start collecting real hazard data!

---

## Resources

- **Firecrawl Website**: https://www.firecrawl.dev/
- **Documentation**: https://docs.firecrawl.dev/
- **GitHub**: https://github.com/mendableai/firecrawl
- **Status Page**: https://status.firecrawl.dev/

---

**Built for India's coastal communities** 🌊
