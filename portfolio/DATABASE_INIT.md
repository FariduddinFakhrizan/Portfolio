# Database Initialization Guide

## 🚀 Quick Fix: Initialize Database Now

Your database needs to be initialized and seeded. Here's how to fix it:

### Option 1: Use the Init Endpoint (Recommended)

Visit this URL in your browser or use curl:

```
https://your-app.vercel.app/api/init
```

Or use curl:
```bash
curl -X POST https://your-app.vercel.app/api/init
```

This endpoint will:
1. ✅ Create the database schema (Project table)
2. ✅ Add the type column if needed
3. ✅ Clear existing projects
4. ✅ Seed 3 default projects (REACH Hub, IIIHWS, KLIBS)

### Option 2: Use the Seed Endpoint

If schema already exists:

```bash
curl -X POST https://your-app.vercel.app/api/seed
```

### Option 3: Check Database Status

Check if database is connected and how many projects exist:

```bash
curl https://your-app.vercel.app/api/init
```

## 📋 What Gets Seeded

The initialization will add these 3 projects:

1. **REACH Journal Hub** - Academic publishing platform
2. **IIIHWS - Integrative Healthcare** - Healthcare portal
3. **KLIBS Portal** - Learning management system

## ✅ Verify It Worked

After initialization:

1. Visit `/api/init` (GET request) to check status
2. Visit `/projects` page - should show 3 projects
3. Check Vercel logs for any errors

## 🔧 Troubleshooting

### "Database not configured" error
- Make sure `DATABASE_URL` is set in Vercel environment variables
- Check it's set for Production, Preview, and Development environments

### "Prisma client not initialized" error
- Database URL might be invalid
- Check Vercel logs for connection errors

### Projects still not showing
- Clear browser cache
- Check `/api/init` GET endpoint to see project count
- Verify DATABASE_URL is correct in Vercel

## 🎯 Next Steps

Once initialized:
- Projects will appear on `/projects` page
- You can add more projects via `/api/projects/add` endpoint
- Database is ready for production use
