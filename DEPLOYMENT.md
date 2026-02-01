# 🚀 Deployment Guide - Railway

## Prerequisites
1. Akun Railway - [Sign up di railway.app](https://railway.app/)
2. GitHub account (optional, bisa deploy langsung dari CLI)

## Option 1: Deploy via Railway Dashboard (Recommended)

### Step 1: Prepare Project
```bash
# Pastikan semua file sudah di-commit
git init
git add .
git commit -m "Initial commit for Railway deployment"
```

### Step 2: Push to GitHub
```bash
# Buat repository baru di GitHub
# Lalu push code
git remote add origin https://github.com/username/treennation.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy di Railway
1. Login ke [railway.app](https://railway.app/)
2. Klik "New Project"
3. Pilih "Deploy from GitHub repo"
4. Pilih repository `treennation`
5. Railway akan auto-detect Node.js project

### Step 4: Configure Environment Variables
Di Railway dashboard, tambahkan environment variables:
```
PORT=3001
NODE_ENV=production
JWT_SECRET=your_production_secret_key_here
```

### Step 5: Set Root Directory
1. Klik project settings
2. Set "Root Directory" ke `backend`
3. Set "Start Command" ke `npm start`

### Step 6: Deploy Frontend
Untuk frontend, ada 2 opsi:

**Option A: Deploy ke Netlify/Vercel**
1. Push frontend files ke GitHub
2. Connect ke Netlify/Vercel
3. Update `js/api.js` dengan Railway backend URL:
```javascript
const API_BASE_URL = 'https://your-railway-app.railway.app/api';
```

**Option B: Serve dari Railway**
Backend sudah bisa serve static files, tinggal akses via Railway URL.

---

## Option 2: Deploy via Railway CLI

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login
```bash
railway login
```

### Step 3: Initialize Project
```bash
cd backend
railway init
```

### Step 4: Deploy
```bash
railway up
```

### Step 5: Set Environment Variables
```bash
railway variables set PORT=3001
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your_secret_key
```

### Step 6: Open App
```bash
railway open
```

---

## Post-Deployment

### 1. Test API
```bash
curl https://your-app.railway.app/api/health
```

### 2. Update Frontend API URL
Edit `js/api.js`:
```javascript
const API_BASE_URL = 'https://your-app.railway.app/api';
```

### 3. Test All Endpoints
- Products: `https://your-app.railway.app/api/products`
- Health: `https://your-app.railway.app/api/health`
- Services: `https://your-app.railway.app/api/services`

---

## Troubleshooting

### Database Issues
Railway menggunakan ephemeral storage, jadi database SQLite akan reset setiap deploy.

**Solution: Upgrade ke PostgreSQL**
```bash
# Di Railway dashboard
1. Add PostgreSQL plugin
2. Update database.js untuk support PostgreSQL
```

### Port Issues
Pastikan menggunakan `process.env.PORT` dan listen ke `0.0.0.0`:
```javascript
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
```

### CORS Issues
Pastikan CORS sudah di-enable untuk frontend domain:
```javascript
app.use(cors({
    origin: ['https://your-frontend.netlify.app', 'http://localhost:5500']
}));
```

---

## Monitoring

### View Logs
```bash
railway logs
```

### Check Status
```bash
railway status
```

### Restart Service
```bash
railway restart
```

---

## Cost
- Railway free tier: 500 hours/month
- Cukup untuk development & testing
- Upgrade ke Pro ($5/month) untuk production

---

## Next Steps
1. ✅ Deploy backend ke Railway
2. ✅ Deploy frontend ke Netlify/Vercel
3. ✅ Update API URLs
4. ✅ Test semua fitur
5. ✅ Setup custom domain (optional)

---

Made with 💚 for sustainable fashion
