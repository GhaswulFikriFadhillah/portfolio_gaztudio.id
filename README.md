# Portfolio Gaztudio.id

Portfolio website untuk GhaswulFikriFadhillah - Visual Design Studio

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deployment**: Vercel
- **Routing**: React Router

## 📋 Prerequisites

- Node.js 18+
- npm atau yarn
- Supabase account

## 🛠️ Setup

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd portfolio_gff
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase Storage

Script SQL sudah include pembuatan storage bucket `portfolio-images`. Jika perlu manual setup:

1. **Supabase Dashboard** → **Storage**
2. **Create bucket** dengan nama: `portfolio-images`
3. **Set to Public** (centang "Public bucket")
4. **Policies** akan dibuat otomatis oleh script SQL

### 4. Environment Variables
Copy `.env.example` ke `.env` dan isi dengan data Supabase Anda:
```env
VITE_SUPABASE_URL=https://hgqhjdmjfbcszpjegwxs.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server
```bash
npm run dev
```

## 🔧 Admin Panel

### Cara Mengakses Admin:
1. Buka website
2. Ketik "admin" di keyboard (secret shortcut)
3. Masukkan password (default: `admin123`)

### Fitur Admin:
- ✅ Tambah portfolio baru
- ✅ Edit portfolio existing
- ✅ Hapus portfolio
- ✅ Filter dan pencarian
- ✅ Upload gambar (URL)

## 🚀 Deployment ke Vercel

### 1. Push ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy ke Vercel
1. Buka [Vercel](https://vercel.com)
2. Import project dari GitHub
3. Set environment variables di Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### 3. Update Homepage URL
Setelah deploy, update `homepage` di `package.json` dengan URL Vercel Anda.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── WorkOverview.jsx
│   ├── ProjectDetail.jsx
│   └── AdminPage.jsx
├── services/           # API services
│   └── portfolioService.js
├── supabase.js         # Supabase config
└── App.jsx            # Main app component
```

## 🔒 Security Notes

- Ganti password admin default di `AdminPage.jsx`
- Jangan commit `.env` file ke repository
- Setup Row Level Security (RLS) di Supabase untuk production

## 📞 Support

Jika ada pertanyaan, hubungi developer.
