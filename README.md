# 🎟️ Ehgzly

> A modern event booking platform where users can browse, discover, and book tickets for events.

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (React, TypeScript)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://www.prisma.io/)
* **Hosting (DB):** [Neon](https://neon.tech/) (Serverless Postgres)
* **Error Monitoring:** [Sentry](https://sentry.io/)
* **For Notification** [Sonner](https://sonner.io/)

---

## 🧩 Core Features

| Status | Feature                                               
| --- | ---
(✅) |🔍 **Search and explore upcoming events**                 
(✅)|🎫 **Book and manage event tickets**                       
(✅)|👤 **Authentication & user profiles**
(✅)|💳 **Secure booking flow**
(✅)|📊**Admin dashboard for event organizers**
(✅)|🛡️ **Error tracking & monitoring with Sentry**
(✅)|📋 **Dynamic Data Tables (with sorting/filtering)**
(✅)|📱 **Responsive Layout**
(✅)|🎨 **Reusable UI Components** 


---

## 🚧 Upcoming Features

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mooddex/Ehgzly
cd evently
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the root:

```env
DataBase_url="postgresql://USER:PASSWORD@HOST:PORT/DB"
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
DATABASE_URL="prisma+postgres://localhost:51213/ + Your API key"
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

## 📌 Roadmap

* [ ] Integrate payment gateway
* [ ] Email notifications for bookings
* [ ] Event categories & filtering
* [ ] Mobile-first optimizations

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to check the [issues](../../issues) page.

## 📜 License

This project is licensed under the **MIT License**.

---

## 📂 Previous Projects

Here are a few of my other projects you might like:

* 🥘 **Matbakhy** – A marketplace for kitchen makers built with Next.js, TypeScript and MongoDB. [Repo](https://github.com/Mooddex/matbakhy)
* 📝 **Blogbook** – A full-stack blogging platform with JWT authentication and CRUD posts. [Repo](https://github.com/Mooddex/Blogbook)
* ⚖️ **My Office** – A case & client management system for lawyers. [Repo](https://github.com/Mooddex/My-Office)

---

👉 Do you want me to make the **previous projects section with shields/badges and mini-descriptions**, or keep it minimal with just repo links?
