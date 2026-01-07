# Vercel Deployment Guide

## ✅ Code Pushed Successfully

Your code has been successfully pushed to: `https://github.com/FariduddinFakhrizan/Portfolio`

## 🚀 Vercel Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `FariduddinFakhrizan/Portfolio`
4. Vercel will automatically detect Next.js framework

### 2. Configure Environment Variables

**CRITICAL**: You must add the following environment variable in Vercel:

- **`DATABASE_URL`**: Your PostgreSQL database connection string
  - **For Prisma Accelerate**: Use your Prisma Accelerate URL (format: `prisma+postgres://accelerate.prisma-data.net/...`)
  - **For Direct PostgreSQL**: Format: `postgresql://user:password@host:port/database?sslmode=require`
  - **For Vercel Postgres**: Use the connection string provided by Vercel

**To add environment variables in Vercel:**
1. Go to Project Settings → Environment Variables
2. Add `DATABASE_URL` with your production database connection string
3. Make sure to add it for **Production**, **Preview**, and **Development** environments

**Note**: This project is configured to use Prisma Accelerate automatically when a `prisma+postgres://` URL is detected. Prisma Accelerate provides connection pooling, caching, and improved performance for serverless environments.

### 3. Database Setup

Your project uses Prisma with PostgreSQL. After deployment:

1. **Run Prisma Migrations** (if needed):
   ```bash
   npx prisma migrate deploy
   ```
   Or use Vercel's build command which includes `prisma generate`

2. **Seed the Database** (optional):
   - Use the `/api/seed` endpoint after deployment
   - Or run seed scripts locally pointing to production database

### 4. Build Configuration

The project is configured with:
- **Build Command**: `prisma generate && next build` (handled by `postinstall` script)
- **Install Command**: `npm install`
- **Framework**: Next.js (auto-detected)

The `postinstall` script in `package.json` automatically runs `prisma generate` after `npm install`, ensuring Prisma Client is always generated during builds.

### 5. Verify Deployment

After deployment, check:
- ✅ Homepage loads correctly
- ✅ Projects page works (`/projects`)
- ✅ Database connections work (check `/api/visitors/test`)
- ✅ No build errors in Vercel logs

## 📋 Pre-Deployment Checklist

- [x] Code pushed to GitHub
- [x] Vercel configuration optimized (`vercel.json`)
- [x] Build artifacts excluded from git (`.next/` in `.gitignore`)
- [x] Prisma schema configured
- [ ] **DATABASE_URL environment variable set in Vercel**
- [ ] Database migrations run (if needed)
- [ ] Database seeded with initial data (optional)

## 🔧 Troubleshooting

### Build Fails with Prisma Errors
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Check that Prisma can connect to your database
- Verify database is accessible from Vercel's IP ranges

### Database Connection Issues
- Verify `DATABASE_URL` format is correct
- Check database firewall/security settings allow Vercel IPs
- Ensure SSL is properly configured (`sslmode=require`)

### Missing Dependencies
- All dependencies are listed in `package.json`
- Vercel will automatically run `npm install`

## 📝 Notes

- The project uses Next.js 16.1.1 with React 19
- Tailwind CSS v4 is configured via PostCSS
- Prisma Client is generated automatically during build
- **Prisma Accelerate** is configured for optimal serverless performance
  - Automatically enabled when `DATABASE_URL` starts with `prisma+postgres://`
  - Provides connection pooling, caching, and improved query performance
- The app gracefully handles missing DATABASE_URL in development

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
