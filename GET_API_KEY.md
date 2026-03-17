# 🔥 Get Your Firecrawl API Key in 2 Minutes

## Step 1: Visit Firecrawl
Open this link in your browser:
👉 https://www.firecrawl.dev/

## Step 2: Sign Up (Choose One)
- **Email**: Click "Sign Up" and create account
- **Google**: Click Google icon to sign up with Google account
- **GitHub**: Click GitHub icon to sign up with GitHub account

Any method works - takes 30 seconds!

## Step 3: Verify Email (if using email signup)
Check your email inbox, click verification link

## Step 4: Get Your API Key
1. Log in to: https://www.firecrawl.dev/dashboard
2. Look for **"API Keys"** section
3. Copy your API key (looks like: `sk_xxxxxxxxxxxxx`)

## Step 5: Add to Backend Configuration

### Option A: Edit File Directly
1. Open: `backend/.env`
2. Find this line:
   ```
   FIRECRAWL_API_KEY=
   ```
3. Add your key:
   ```
   FIRECRAWL_API_KEY=sk_your_actual_key_here
   ```
4. Save file (Ctrl+S)

### Option B: Via Terminal
Run this command and paste your key:
```bash
echo "FIRECRAWL_API_KEY=your_key_here" > backend/.env
```

## Step 6: Restart Backend

Stop the backend if running (Ctrl+C), then:
```bash
cd backend
npm start
```

You should see:
```
✅ Server running on http://localhost:5000
```

## Step 7: Test in Frontend

1. Go to http://localhost:3000
2. Click "🔍 Scrape Content" tab
3. Paste any URL (try: `https://www.wikipedia.org`)
4. Select a hazard type
5. Click "🔄 Scrape & Post"
6. 🎉 Real content scraped and posted!

---

## 🆓 Free Tier Info
- **Monthly Limit**: 19,200 requests (~640/day)
- **Perfect for**: Testing and demo projects
- **Upgrade Later**: When you need more requests

## ⚡ Sample URLs to Try

- `https://www.bbc.com/news`
- `https://weather.gov/`
- `https://en.wikipedia.org/wiki/Tsunami`
- `https://www.weather.com/`

---

**Need help?** Refer to [FIRECRAWL_SETUP.md](../FIRECRAWL_SETUP.md) for detailed guide.
