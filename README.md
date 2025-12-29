<div align="center">
  <h1>🏕️ YelpCamp</h1>
  <p><strong>A Full-Stack Campground Discovery & Sharing Platform</strong></p>
  
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
  [![MapTiler](https://img.shields.io/badge/MapTiler-0078A8?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMyA3VjE3TDEyIDIyTDIxIDE3VjdMMTIgMloiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==&logoColor=white)](https://www.maptiler.com/)
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

  <p>Discover, share, and review the best campgrounds around the world. Join a thriving community of outdoor enthusiasts!</p>

  [Live Demo](https://yelpcamp-t3fu.onrender.com/) • [Report Bug](https://github.com/abhinavxdd/YelpCamp/issues) • [Request Feature](https://github.com/abhinavxdd/YelpCamp/issues)
</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [API Routes](#api-routes)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

YelpCamp is a comprehensive web application that allows users to discover, share, and review campgrounds from around the world. Built with modern web technologies, it provides a seamless experience for camping enthusiasts to find their next adventure.

**Note:** Any statistics or counts (such as the number of campgrounds) in the UI are currently hardcoded for illustrative purposes.

### Why YelpCamp?

- **🗺️ Interactive Maps**: Visualize campground locations with integrated MapTiler mapping
- **✍️ User Reviews**: Read and write authentic reviews from fellow campers
- **📸 Photo Sharing**: Upload and share beautiful campground photos
- **🔐 Secure Authentication**: Safe and secure user authentication system
- **📱 Responsive Design**: Works flawlessly on desktop, tablet, and mobile devices
- **⭐ Rating System**: 5-star rating system for honest campground reviews

---

## ✨ Features

### Core Functionality
- 🏕️ **Browse Campgrounds**: Explore a collection of campgrounds added by the community
- 📝 **Add Campgrounds**: Share your favorite camping spots with the community
- ⭐ **Review System**: Leave ratings and reviews for campgrounds
- 🗺️ **Interactive Maps**: View campground locations on an interactive map
- 🔍 **Search & Filter**: Find campgrounds by location and amenities
- 👤 **User Profiles**: Create and manage your camping profile

### User Authentication
- ✅ Secure registration and login system
- 🔒 Password encryption with Passport.js
- 👥 Session management
- 🛡️ Authorization for edit/delete actions

### Additional Features
- 📷 Multi-image upload with Cloudinary integration
- 💬 Flash messages for user feedback
- 🎨 Modern, responsive UI with Bootstrap 5
- 🔒 Input validation and sanitization
- 🚫 MongoDB injection prevention
- 🛡️ Helmet.js security headers
- 📍 Geocoding for campground locations

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **Connect Flash** - Flash messages

### Frontend
- **EJS** - Embedded JavaScript templating
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **Custom CSS** - Modern, responsive styling

### Cloud Services
- **Cloudinary** - Image hosting and management
- **MapTiler** - Interactive maps and geocoding
- **MongoDB Atlas** - Cloud database hosting

### Security & Validation
- **Helmet.js** - Security headers
- **Joi** - Schema validation
- **Express Mongo Sanitize** - MongoDB injection prevention
- **Sanitize HTML** - XSS protection

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/YelpCamp.git
   cd YelpCamp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGO_URI=your_mongodb_connection_string
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   
   # MapTiler
   MAPTILER_API_KEY=your_maptiler_api_key
   ```

4. **Seed the database (optional)**
   ```bash
   node seeds/index.js
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:8080`

---

## 🔐 Environment Variables

Create a `.env` file with the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_SECRET` | Cloudinary API secret | Yes |
| `MAPTILER_API_KEY` | MapTiler API key | Yes |

---

## 💻 Usage

### For Users

1. **Register/Login**: Create an account or login to access full features
2. **Browse Campgrounds**: Explore campgrounds on the homepage
3. **View Details**: Click on any campground to see detailed information
4. **Add Review**: Leave a rating and review for campgrounds you've visited
5. **Create Campground**: Share your own campground discoveries
6. **Edit/Delete**: Manage your own campground listings

### For Developers

```bash
# Development mode
npm run dev

# Production mode
npm start

# Seed database
node seeds/index.js
```

---

## 📁 Project Structure

```
YelpCamp/
├── controllers/          # Route controllers
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── models/              # Mongoose models
│   ├── campground.js
│   ├── review.js
│   └── user.js
├── public/              # Static assets
│   ├── javascripts/
│   └── stylesheets/
├── routes/              # Express routes
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── seeds/               # Database seeding
│   ├── cities.js
│   └── index.js
├── utils/               # Utility functions
│   ├── catchAsync.js
│   └── ExpressError.js
├── views/               # EJS templates
│   ├── campgrounds/
│   ├── layouts/
│   ├── partials/
│   └── users/
├── middleware.js        # Custom middleware
├── schemas.js           # Joi validation schemas
├── app.js              # Express app setup
└── package.json
```

---

## 🔒 Security Features

YelpCamp implements multiple security layers:

- **Authentication**: Passport.js with local strategy
- **Authorization**: User-specific permissions for CRUD operations
- **Password Security**: Encrypted password storage
- **Session Security**: Secure session configuration with MongoDB store
- **Input Validation**: Joi schema validation on all inputs
- **XSS Protection**: HTML sanitization with sanitize-html
- **MongoDB Injection Prevention**: Express-mongo-sanitize
- **Security Headers**: Helmet.js CSP configuration
- **CSRF Protection**: Built-in Express protections

---

## 🛣️ API Routes

### Campgrounds
```
GET     /campgrounds           - View all campgrounds
GET     /campgrounds/new       - Form to create new campground
POST    /campgrounds           - Create new campground
GET     /campgrounds/:id       - View single campground
GET     /campgrounds/:id/edit  - Form to edit campground
PUT     /campgrounds/:id       - Update campground
DELETE  /campgrounds/:id       - Delete campground
```

### Reviews
```
POST    /campgrounds/:id/reviews           - Create review
DELETE  /campgrounds/:id/reviews/:reviewId - Delete review
```

### Authentication
```
GET     /register              - Registration form
POST    /register              - Create new user
GET     /login                 - Login form
POST    /login                 - Authenticate user
GET     /logout                - Logout user
```

---

## 📸 Screenshots
<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/3b8cefe9-e376-4b1b-aa20-b2c3b7347061" />
<img width="1919" height="976" alt="image" src="https://github.com/user-attachments/assets/4dd9f388-1dff-4db1-bb21-54b3cabf964d" />
<img width="1919" height="978" alt="image" src="https://github.com/user-attachments/assets/0fd9e793-4851-4cff-8d7e-80c40ba33097" />
<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/485174ed-5681-4ef6-9596-7826288ce427" />

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clean, documented code
- Follow the existing code style
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Contact

Abhinav Rajput - [LinkedIn](https://www.linkedin.com/in/abh1navvv/)

Project Link: [https://github.com/abhinavxdd/YelpCamp](https://github.com/abhinavxdd/YelpCamp)

---

## 🙏 Acknowledgments

This project was built as part of learning full-stack web development. Special thanks to:

- [Bootstrap](https://getbootstrap.com/) - Frontend framework
- [MapTiler](https://www.maptiler.com/) - Interactive maps
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting
- [Font Awesome](https://fontawesome.com/) - Icons
- All the amazing open-source contributors

---

<div align="center">
  <p>Made with ♥ for campers</p>
  <p>© 2025 YelpCamp. All rights reserved.</p>
</div>
