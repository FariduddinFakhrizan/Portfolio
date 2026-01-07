# Vercel Root Directory Configuration

## ⚠️ Important: Configure Root Directory in Vercel Dashboard

The `rootDirectory` property cannot be set in `vercel.json`. You must configure it in the Vercel Dashboard:

### Steps to Set Root Directory:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **General**
3. Scroll down to **Root Directory**
4. Set it to: `portfolio`
5. Click **Save**

### Alternative: Use Vercel CLI

```bash
vercel --cwd portfolio
```

Or set it via API/CLI:
```bash
vercel project update --root-directory portfolio
```

## Current Configuration

The `vercel.json` file uses `cd portfolio` in the build commands as a workaround, but the proper solution is to set the root directory in Vercel Dashboard settings.

Once you set the root directory in Vercel Dashboard, you can simplify `vercel.json` to:

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```
