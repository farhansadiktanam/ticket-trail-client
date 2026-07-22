# 🎫 TicketTrail

A full-stack ticket booking platform for bus, train, launch, and flight tickets — built for the Bangladeshi market.

---

## 🔗 Live Links

|                 | Link                                                      |
| --------------- | --------------------------------------------------------- |
| **Live Site**   | `https://your-live-site.vercel.app`                       |
| **Client Repo** | `https://github.com/farhansadiktanam/ticket-trail-client` |
| **Server Repo** | `https://github.com/farhansadiktanam/ticket-trail-server` |

---

## 🔐 Test Credentials

| Role   | Email                    | Password    |
| ------ | ------------------------ | ----------- |
| Admin  | `admin@tickettrail.com`  | `admin123`  |
| Vendor | `vendor@tickettrail.com` | `vendor123` |
| User   | `user@tickettrail.com`   | `user123`   |

---

## ✨ Features

### 👤 User

- Register and log in with email/password or Google (via better-auth)
- Browse all approved tickets with search, filter by transport type, sort by price, and pagination
- View full ticket details with a live departure countdown
- Book tickets via a modal — booking saved instantly as "Pending"
- Pay for accepted bookings via Stripe
- View all bookings and their statuses (Pending / Accepted / Rejected / Paid)
- View full Stripe transaction history

### 🏪 Vendor

- Add tickets with image upload (imgbb), perks, departure date/time, and pricing
- All added tickets start as "Pending" — go live only after admin approval
- Update or delete their own tickets
- Accept or reject incoming booking requests from users
- View revenue overview with monthly chart and recent bookings table

### 🛡️ Admin

- Approve or reject vendor-submitted tickets
- Manage all users — promote to Admin or Vendor, mark vendors as fraud
- Marking a vendor as fraud hides all their tickets and blocks future uploads
- Choose up to 6 tickets to advertise on the homepage

---

## 🛠️ Tech Stack

### Client

| Tool                    | Purpose            |
| ----------------------- | ------------------ |
| Next.js 16 (App Router) | Framework          |
| React 19                | UI                 |
| Tailwind CSS v4         | Styling            |
| HeroUI v3               | Component library  |
| better-auth             | Authentication     |
| Stripe.js               | Payment UI         |
| Embla Carousel          | Hero banner slider |
| Lucide React            | Icons              |
| React Icons             | Additional icons   |

### Server

| Tool                    | Purpose               |
| ----------------------- | --------------------- |
| Node.js + Express       | Server                |
| MongoDB (native driver) | Database              |
| Stripe                  | Payment processing    |
| imgbb API               | Image hosting         |
| dotenv                  | Environment config    |
| CORS                    | Cross-origin requests |

---

## 📁 Project Structure

```
client/
├── app/
│   ├── (home)/
│   │   └── page.jsx              # Homepage
│   ├── all-tickets/
│   │   ├── page.jsx              # All Tickets listing
│   │   └── [id]/page.jsx         # Ticket Detail + Booking
│   ├── dashboard/
│   │   ├── layout.jsx            # User dashboard layout
│   │   ├── profile/page.jsx
│   │   ├── my-bookings/page.jsx
│   │   └── transactions/page.jsx
│   ├── vendor/
│   │   ├── layout.jsx
│   │   ├── overview/page.jsx
│   │   ├── add-ticket/page.jsx
│   │   ├── my-tickets/page.jsx
│   │   └── bookings/page.jsx
│   ├── admin/
│   │   ├── layout.jsx
│   │   ├── profile/page.jsx
│   │   ├── tickets/page.jsx
│   │   ├── users/page.jsx
│   │   └── advertise/page.jsx
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── testimonials/page.jsx
│   └── not-found.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Logo.jsx
│   ├── Banner.jsx
│   ├── AdvertisementSection.jsx
│   ├── PopularRoutes.jsx
│   ├── WhyChooseUs.jsx
│   ├── DashboardSidebar.jsx
│   └── TicketBookingPanel.jsx
└── lib/
    └── auth-client.js

server/
└── index.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Stripe account
- imgbb account

### 1. Clone the repositories

```bash
git clone https://github.com/yourusername/tickettrail-client
git clone https://github.com/yourusername/tickettrail-server
```

### 2. Set up the server

```bash
cd tickettrail-server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

Start the server:

```bash
node index.js
```

### 3. Set up the client

```bash
cd tickettrail-client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

# better-auth
BETTER_AUTH_SECRET=your_random_secret_string
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB (for better-auth)
MONGODB_URI=your_mongodb_connection_string

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

Start the client:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 API Endpoints

### Tickets

| Method | Endpoint                 | Description                                          |
| ------ | ------------------------ | ---------------------------------------------------- |
| GET    | `/tickets`               | All approved tickets (with filter, sort, pagination) |
| GET    | `/tickets/advertised`    | 6 advertised tickets for homepage                    |
| GET    | `/tickets/latest`        | 6–8 latest tickets for homepage                      |
| GET    | `/single-ticket/:id`     | Single ticket detail                                 |
| POST   | `/tickets`               | Add new ticket (vendor)                              |
| PATCH  | `/tickets/:id`           | Update ticket (vendor)                               |
| DELETE | `/tickets/:id`           | Delete ticket (vendor)                               |
| GET    | `/vendor-tickets/:email` | All tickets by a vendor                              |

### Admin

| Method | Endpoint                       | Description                      |
| ------ | ------------------------------ | -------------------------------- |
| GET    | `/admin/tickets`               | All tickets regardless of status |
| PATCH  | `/admin/tickets/:id/status`    | Approve or reject a ticket       |
| PATCH  | `/admin/tickets/:id/advertise` | Toggle advertise (max 6)         |

### Users

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/users`              | All users            |
| GET    | `/users/:email`       | Single user          |
| PATCH  | `/users/:email/role`  | Update user role     |
| PATCH  | `/users/:email/fraud` | Mark vendor as fraud |

### Bookings

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| POST   | `/bookings`               | Create a booking           |
| GET    | `/bookings/user/:email`   | User's bookings            |
| GET    | `/bookings/vendor/:email` | Vendor's booking requests  |
| PATCH  | `/bookings/:id/status`    | Accept or reject a booking |
| DELETE | `/bookings/:id`           | Cancel a pending booking   |

### Payments

| Method | Endpoint                  | Description                             |
| ------ | ------------------------- | --------------------------------------- |
| POST   | `/payments/create-intent` | Create Stripe payment intent            |
| POST   | `/payments/confirm`       | Confirm payment, reduce ticket quantity |
| GET    | `/payments/user/:email`   | User's transaction history              |
| GET    | `/vendor/revenue/:email`  | Vendor revenue stats                    |

---

## 📦 Key Packages

```bash
# Client
npm install next react react-dom
npm install @heroui/react @heroui/styles
npm install better-auth
npm install tailwindcss @tailwindcss/postcss
npm install embla-carousel-react embla-carousel-autoplay
npm install lucide-react react-icons
npm install stripe @stripe/stripe-js @stripe/react-stripe-js

# Server
npm install express mongodb stripe dotenv cors
```

---

## 🎨 Design System

| Token      | Value                               |
| ---------- | ----------------------------------- |
| Background | `slate-950` / `slate-900`           |
| Primary    | `orange-500`                        |
| Secondary  | `indigo-600`                        |
| Text       | `white` / `slate-300` / `slate-400` |
| Border     | `white/5` / `white/10`              |
| Success    | `green-400`                         |
| Danger     | `red-400`                           |

---

## 📌 Notes

- All vendor-submitted tickets start as `pending` and only appear publicly after admin approval
- Admin can advertise a maximum of **6 tickets** at a time on the homepage
- Booking status flow: `pending` → `accepted` / `rejected` → `paid`
- Users cannot pay for a booking if the departure date has already passed
- Marking a vendor as fraud immediately hides all their tickets from the platform
