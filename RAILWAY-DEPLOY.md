# 🚂 Deploy Full Stack ke Railway (1 Service Aja!)

## Langkah Deploy:

### 1. Buka Railway Dashboard
- Go to: https://railway.app/
- Login dengan GitHub

### 2. Create New Project
- Click "New Project"
- Pilih "Deploy from GitHub repo"
- Pilih repo: **leo-kun19/treenation**

### 3. Configure Service
Railway akan auto-detect. Set ini di Settings:

**Root Directory:**
```
backend
```

**Start Command:**
```
npm start
```

**Environment Variables:**
- `PORT` = (kosongkan, Railway auto-set)
- `NODE_ENV` = production

### 4. Generate Domain
- Go to Settings tab
- Click "Generate Domain"
- Copy URL (contoh: `treenation-production.up.railway.app`)

### 5. Done! 🎉

Buka URL Railway, website langsung jalan:
- Frontend: `https://your-app.railway.app/`
- API: `https://your-app.railway.app/api/products`
- Images: `https://your-app.railway.app/images/Hibiscus%20Tank%20top.jpeg`

---

## Cara Kerja:

Backend server sekarang serve:
1. **Static files** (HTML, CSS, JS, images) dari root folder
2. **API endpoints** di `/api/*`
3. **Auto-routing** untuk SPA

Jadi cuma butuh 1 service Railway, ga perlu Netlify/Vercel lagi!

---

## Test Deployment

```bash
# Test frontend
curl https://YOUR-RAILWAY-URL.railway.app/

# Test API
curl https://YOUR-RAILWAY-URL.railway.app/api/health

# Test products
curl https://YOUR-RAILWAY-URL.railway.app/api/products
```

---

## Auto-Deploy ✅

Setiap push ke GitHub main branch:
- Railway auto-deploy
- Frontend + Backend update otomatis

---

## Update Code

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Railway auto-deploy in ~2 minutes
```

---

## Monitoring

**Railway Dashboard:**
- View logs: Deployments > Logs
- Check metrics: CPU, Memory, Network
- View builds: Deployments tab

---

Lebih simple, cuma 1 service! 🚀
