# Project Setup & Development Guide

## Workspace Structure

```
social feed/
├── backend/           - Express server with Firecrawl integration
├── frontend/          - React social feed UI
└── .github/           - Configuration files
```

## Initial Setup Checklist

- [ ] Install backend dependencies (`backend/package.json`)
- [ ] Configure Firecrawl API key in `backend/.env`
- [ ] Install frontend dependencies (`frontend/package.json`)
- [ ] Run backend server on port 5000
- [ ] Run frontend dev server on port 3000
- [ ] Test scraping and post creation features

## Communication Points

### Backend API
- Health Check: GET `/api/health`
- Posts Feed: GET `/api/posts`
- Create Post: POST `/api/posts`
- Scrape Content: POST `/api/scrape-hazards`

### Frontend
- Scraper Panel for web scraping and community reports
- Social Feed displaying all posts with priority sorting
- Real-time refresh capability

## Environment Variables

Backend requires `FIRECRAWL_API_KEY` in `.env` file.

If not provided, the system uses mock data for demonstration.

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 3000  
- CORS enabled for local development
- No authentication required for demo
- Data persists in `backend/data/posts.json`

---

**Status**: Development ready
**Last Updated**: March 17, 2026
