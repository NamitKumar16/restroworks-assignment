# 🧾 Restroworks – CMS-Powered Multi-Language Website

A **Next.js 15 + PayloadCMS** project built for the Restroworks assignment.  
This prototype demonstrates a CMS-driven, SEO-optimized, responsive, and multilingual website.

---

## 🚀 Tech Stack

| Layer | Technology |
|:--|:--|
| **Frontend** | Next.js 15 (App Router) |
| **Backend / CMS** | PayloadCMS |
| **Database** | MongoDB (via MongoDB Atlas) |
| **Styling** | Tailwind CSS |
| **Deployment** | Render (Fullstack Deployment) |

---

## 🌍 Live Demo

🔗 **Frontend + CMS:**  
[https://restroworks-payload.onrender.com](https://restroworks-payload.onrender.com)

---

## 📄 Project Overview

### ✅ Implemented Features

- Fully **CMS-driven content** (Hero, Feature, Testimonial, and CTA blocks)
- **English and Hindi** localization
- **Dynamic content fetch** using Payload’s REST API
- **Responsive design** built with TailwindCSS
- **SEO metadata** (titles, descriptions, Open Graph, robots.txt)
- **Shared Header and Footer**
- **Contact form** storing submissions in PayloadCMS
- **Accessible and semantic HTML**
- **Image optimization** using Next.js `<Image>` component

---

### 🌟 Extra Credit

- Live multilingual preview (via `/en` and `/hi` routes)
- Smooth animations on scroll
- Deployed live demo on Render

---

## 🧱 CMS Modeling

### Collections

| Collection | Purpose |
|:--|:--|
| `Pages` | Stores modular page layouts (Hero, Feature, Testimonial, CTA) |
| `Media` | Manages uploaded images |
| `Users` | Admin authentication |
| `Contacts` | Stores contact form submissions |

### Blocks

- **Hero Block:** Heading, Subheading, Background Image, CTA  
- **Feature Block:** Title, Description, Icon, Optional Link  
- **Testimonial Block:** Quote, Author Info, Image  
- **CTA Block:** Heading, Description, Button

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NamitKumar16/restroworks-assignment.git
cd restroworks-assignment
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```env
DATABASE_URI=mongodb+srv://<your_mongo_uri>
PAYLOAD_SECRET=<any_random_secret>
PAYLOAD_URL=http://localhost:3000
```

### 4️⃣ Run Locally

```bash
npm run dev
```

Then open: **http://localhost:3000/admin**

---

## 📦 Deployment (Render)

1. Push the project to a **public GitHub repo**
2. Create a **Web Service** on [Render](https://render.com/)
3. Add Environment Variables:
   - `DATABASE_URI`
   - `PAYLOAD_SECRET`
   - `PAYLOAD_URL=https://<your_render_domain>`
4. Build Command:
   ```bash
   npm install && npm run build
   ```
5. Start Command:
   ```bash
   npm run start
   ```
6. Wait for the deployment to finish and open your live link.

---

## 🧩 CMS Editing Guide

### To edit content:

1. Go to `/admin`
2. Use id admin@admin.com and password admin123
3. Open **Pages → home-page**
4. Add or reorder blocks (Hero, Feature, Testimonial, CTA)
5. Add translations for Hindi (`hi`)
6. Save and publish — changes reflect instantly

---

## 🔍 SEO Configuration

- Metadata handled by **Next.js Metadata API**
- Per-page SEO fields from Payload:
  - `seoTitle`
  - `seoDescription`
- Automatic generation of:
  - `robots.txt`
  - `sitemap.xml`

---

## ⚡ Performance & Optimization

- Image optimization using Next.js `<Image>`  
- Lazy loading and caching via Next.js and Render CDN  
- SEO-friendly routes (`/en`, `/hi`)  
- Lighthouse score improvements with preload and minified JS

---

## 👨‍💻 Author

**Namit Kumar**  
React Native & Frontend Developer  
[LinkedIn Profile](https://www.linkedin.com/in/namitkumar16)

---

## ✅ Submission Includes

- Frontend (Next.js) + Backend (PayloadCMS)
- MongoDB integration
- Live deployment link
- Complete README with setup, CMS modeling & SEO details

---

### 🏁 Summary

This project demonstrates a **production-ready fullstack architecture** integrating **Next.js App Router** with **PayloadCMS** —  
fully modular, multilingual, responsive, and SEO-optimized.
