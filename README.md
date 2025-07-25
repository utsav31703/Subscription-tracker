text
# 📱 SubDub - Subscription Tracker API

A modern, feature-rich subscription tracking API built with Node.js, Express, and MongoDB. Automatically sends beautiful email reminders before subscription renewals using advanced workflow automation.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔄 **Subscription Management** - Create, update, and track multiple subscriptions
- 📧 **Automated Email Reminders** - Beautiful, responsive email templates
- ⏰ **Smart Workflow System** - Powered by Upstash Workflow for reliable scheduling
- 🎨 **Modern Email Design** - Gradient-based, mobile-responsive templates
- 📅 **Multi-tier Reminders** - 7, 5, 2, and 1 day before renewal notifications
- 🚀 **RESTful API** - Clean, documented endpoints
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📊 **MongoDB Integration** - Robust data persistence
- 🌈 **Modern UI Ready** - API designed for frontend integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 4.4+
- Gmail account (for SMTP) or any SMTP provider
- Upstash account (for workflow automation)

### Installation

1. **Clone the repository**
git clone https://github.com/utsav31703/Subscription-tracker.git
cd Subscription-tracker

text

2. **Install dependencies**
npm install

text

3. **Environment Setup**

Create a `.env` file in the root directory:
Server Configuration
PORT=3000
NODE_ENV=development
APP_URL=http://localhost:3000

Database
MONGODB_URI=mongodb://localhost:27017/subscription-tracker

JWT Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=7d

Email Configuration (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@subdub.com
REPLY_TO_EMAIL=support@subdub.com

Upstash Workflow (Production)
QSTASH_URL=https://qstash.upstash.io
QSTASH_TOKEN=your-qstash-token

Local Development
QSTASH_URL_LOCAL=http://127.0.0.1:8080
QSTASH_TOKEN_LOCAL=eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=

text

4. **Start the application**
Development mode
npm run dev

Production mode
npm start

text

5. **For local workflow testing**
Install QStash CLI
npm install -g @upstash/cli

Start local QStash server
qstash dev --port 8080

text

## 📚 API Documentation

### Authentication

All protected endpoints require a JWT token in the Authorization header:
Authorization: Bearer <your-jwt-token>

text

### Core Endpoints

#### 🔐 Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh

text

#### 📱 Subscriptions
GET /api/subscriptions # Get all user subscriptions
POST /api/subscriptions # Create new subscription
GET /api/subscriptions/:id # Get specific subscription
PUT /api/subscriptions/:id # Update subscription
DELETE /api/subscriptions/:id # Delete subscription
POST /api/subscriptions/reminders # Trigger reminder workflow

text

### Example Subscription Object

{
"name": "Netflix Premium",
"price": 15.99,
"currency": "USD",
"frequency": "monthly",
"category": "entertainment",
"paymentMethod": "Credit Card ending in 1234",
"status": "active",
"startDate": "2025-01-01T00:00:00.000Z",
"renewalDate": "2025-02-01T00:00:00.000Z",
"planName": "Premium Plan",
"serviceName": "Netflix"
}

text

## 📧 Email Template System

The system includes 4 beautifully designed email templates:

### Template Features
- ✨ **Modern Design** - Gradient backgrounds and clean typography
- 📱 **Mobile Responsive** - Perfect on all devices
- 🎨 **Brand Customizable** - Easy color and logo updates
- 🚨 **Urgency Indicators** - Visual cues based on days remaining
- 📊 **Subscription Details** - Clear pricing and plan information

### Email Schedule
- **7 days before** - "📅 Heads up! Your subscription renews in 7 days"
- **5 days before** - "⏰ 5 days left: subscription renewal"
- **2 days before** - "🚨 Just 2 days! subscription renews soon"
- **1 day before** - "⚡ Tomorrow: subscription renewal"

## 🔧 Workflow System

Built with **Upstash Workflow** for reliable, scalable automation:

// Trigger workflow for a subscription
POST /api/subscriptions/reminders
{
"subscriptionId": "subscription-id-here"
}

text

### Workflow Features
- ⏰ **Precise Scheduling** - Sleeps until exact reminder times
- 🔄 **Auto-retry** - Built-in error handling and retries
- 📊 **Status Tracking** - Real-time workflow monitoring
- 🛡️ **Fault Tolerant** - Handles subscription status changes

## 🏗️ Project Structure

subscription-tracker/
├── config/ # Configuration files
├── controllers/ # Route controllers
├── database/ # Database connection
├── middlewares/ # Custom middleware
├── models/ # MongoDB schemas
├── routes/ # API routes
├── utils/ # Utility functions
│ ├── send.email.js # Email service
│ └── modernEmailTemplate.js # Email templates
├── workflows/ # Upstash workflows
├── app.js # Express app setup
└── package.json # Dependencies

text

## 🧪 Testing

### Manual Testing with cURL

Register a new user
curl -X POST http://localhost:3000/api/auth/register
-H "Content-Type: application/json"
-d '{"name":"Test User","email":"test@example.com","password":"password123"}'

Create a subscription
curl -X POST http://localhost:3000/api/subscriptions
-H "Authorization: Bearer YOUR_JWT_TOKEN"
-H "Content-Type: application/json"
-d '{
"name": "Netflix",
"price": 15.99,
"currency": "USD",
"frequency": "monthly",
"category": "entertainment",
"renewalDate": "2025-08-01T00:00:00.000Z"
}'

Trigger reminder workflow
curl -X POST http://localhost:3000/api/subscriptions/reminders
-H "Authorization: Bearer YOUR_JWT_TOKEN"
-H "Content-Type: application/json"
-d '{"subscriptionId": "SUBSCRIPTION_ID"}'

text

## 🛠️ Configuration

### Email Providers

#### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use in SMTP_PASS environment variable

#### Other Providers
- **SendGrid**: Set SMTP_HOST to `smtp.sendgrid.net`
- **Mailgun**: Set SMTP_HOST to `smtp.mailgun.org`
- **AWS SES**: Configure with your SES credentials

### Database Options
- **Local MongoDB**: `mongodb://localhost:27017/subscription-tracker`
- **MongoDB Atlas**: Use your Atlas connection string
- **Docker**: `mongodb://mongo:27017/subscription-tracker`

## 🚀 Deployment

### Using PM2 (Recommended)
npm install -g pm2
pm2 start app.js --name "subscription-tracker"
pm2 startup
pm2 save

text

### Using Docker
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

text

### Environment Variables for Production
NODE_ENV=production
APP_URL=https://your-domain.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/subscription-tracker

... other production configs
text

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub**: [https://github.com/utsav31703/Subscription-tracker](https://github.com/utsav31703/Subscription-tracker)
- **Upstash Workflow Docs**: [https://upstash.com/docs/qstash/workflow](https://upstash.com/docs/qstash/workflow)
- **Nodemailer**: [https://nodemailer.com/](https://nodemailer.com/)

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Email: support@subdub.com

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by [utsav31703](https://github.com/utsav31703)
