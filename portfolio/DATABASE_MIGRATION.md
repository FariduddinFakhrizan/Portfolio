# Database Migration Required

## Issue
The guestbook is unable to fetch entries because the database tables haven't been created in production yet.

## Solution
Run the following command in your Vercel deployment or production environment:

```bash
npx prisma db push
```

This will:
1. Create the `GuestbookEntry` table
2. Create the `GuestbookReaction` table  
3. Create the `Playground` table
4. Apply all indexes and constraints

## Vercel Deployment Steps

### Option 1: Via Vercel CLI (Recommended)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Run migration
vercel env pull .env.production
npx prisma db push
```

### Option 2: Via Vercel Dashboard
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Ensure `DATABASE_URL` is set correctly
4. Go to Deployments → Active deployment
5. Click the three dots → Redeploy with `npm run db:push` added to build command temporarily

### Option 3: Add Migration API Route (Already Created)
You can create an API route to run migrations by visiting:
`https://your-domain.vercel.app/api/db/migrate`

This should have been created already in your codebase.

## Verification
After running the migration, the guestbook should work at:
`https://portfolio-eight-delta-xvs3oju84d.vercel.app/guestbook`

## Database Schema Changes
The following models were added:
- `GuestbookEntry` - Stores visitor messages
- `GuestbookReaction` - Stores emoji reactions
- `Playground` - Stores code playground metadata (optional, using static data currently)
