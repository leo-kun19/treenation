# 🚀 Quick Start - Deploy ke Railway

## Cara Tercepat (5 Menit)

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login ke Railway
```bash
railway login
```
Browser akan terbuka, login dengan GitHub.

### 3. Deploy Backend
```bash
cd backend
railway init
railway up
```

### 4. Set Environment Variables
```bash
railway variables set PORT=3001
railway variables set NODE_ENV=production
```

### 5. Get Railway URL
```bash
railway domain
```
Copy URL yang muncul, contoh: `https://treennation-production.up.railway.app`

### 6. Update Frontend API URL
Edit file `js/api.js`:
```javascript
// Ganti ini:
const API_BASE_URL = 'http://localhost:3001/api';

// Jadi ini (ganti dengan Railway URL Anda):
const API_BASE_URL = 'https://treennation-production.up.railway.app/api';
```

### 7. Deploy Frontend ke Netlify

**Via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Via Netlify Dashboard:**
1. Drag & drop folder project ke [netlify.com/drop](https://app.netlify.com/drop)
2. Done!

---

## Test Deployment

### Test Backend
```bash
curl https://your-railway-url.railway.app/api/health
```

### Test Frontend
Buka URL Netlify Anda di browser dan test:
- Homepage
- Shop page (harus load products dari Railway)
- Add to cart
- Contact form

---

## Troubleshooting

### Backend tidak bisa diakses
```bash
# Check logs
railway logs

# Restart
railway restart
```

### Frontend tidak connect ke backend
1. Cek `js/api.js` - pastikan URL Railway benar
2. Cek CORS di backend
3. Clear browser cache

### Database reset setiap deploy
Railway menggunakan ephemeral storage. Solusi:
1. Add PostgreSQL plugin di Railway
2. Atau accept bahwa data akan reset (OK untuk demo)

---

## Alternative: Deploy Semuanya di Railway

Railway bisa host frontend + backend sekaligus:

```bash
# Deploy full stack
railway init
railway up

# Set root directory ke backend
railway service settings
# Set: Root Directory = backend
# Set: Start Command = npm start
```

Frontend akan accessible via Railway URL juga.

---

## Monitoring

```bash
# View logs
railway logs

# Check status
railway status

# Open in browser
railway open
```

---

## Cost
- **Free tier**: 500 hours/month
- **Pro**: $5/month unlimited
- Cukup untuk production kecil-menengah

---

Selesai! Website Anda sudah online 🎉
