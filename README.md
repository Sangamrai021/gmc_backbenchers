# 🎓 GMC Backbenchers

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

> **GMC Backbenchers** is a modern, collaborative educational ecosystem designed to empower students, teachers, and institution administrators. By seamlessly blending academic management with vibrant community engagement, the platform cultivates an enriching environment for learning, peer mentorship, and open discourse.

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#️-technology-stack)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Contributing & Security](#-contributing--security)
- [License](#-license)

---

## 🌟 Overview

GMC Backbenchers bridges the traditional gap between formal classroom management and informal community interaction. Our platform not only equips educators with robust tools for academic tracking but also empowers students to collaborate, seek mentorship, showcase their talents, and engage in meaningful discussions.

Built with a powerful **Laravel** backend and a highly dynamic, reactive **React** frontend (powered by **Inertia.js**), the application offers a seamless single-page application (SPA) experience without the complexity of traditional API routing.

---

## 🚀 Key Features

### 🏢 Institutional Management
- **Multi-Tenant Architecture:** Secure, logical separation of data—including semesters, subjects, and students—across different institutions.
- **Advanced Role-Based Access Control (RBAC):** Fine-grained permission handling powered by Spatie. Custom experiences and safeguards for Super Admins, Institution Admins, Teachers, and Students.

### 📚 Academic & Classroom Tools
- **Assignment Lifecycle Management:** Comprehensive workflow for creating assignments, handling late submissions, and facilitating teacher grading and feedback.
- **Activity & Engagement Tracking:** Built-in logging to monitor student participation and academic engagement over time.

### 🤝 Community & Collaboration
- **Interactive Q&A Forum:** A dynamic, StackOverflow-style discussion board supporting subject-specific queries, general discussions, anonymous posting, and robust upvote/downvote mechanics.
- **Peer-to-Peer Mentorship:** A dedicated mentorship board allowing students to seek guidance, share knowledge, and earn Gamified Mentor Badges.
- **Student Talent Showcase:** A personalized portfolio system enabling students to publish, share, and discover inspiring personal projects.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Backend Framework** | Laravel 11.x (PHP 8.2+) |
| **Frontend Framework** | React 18, Inertia.js |
| **Styling** | TailwindCSS |
| **Database** | SQLite (Dev/Testing), MySQL / PostgreSQL (Production) |
| **Authentication** | Laravel Breeze (Session-based) |
| **Authorization** | Spatie Laravel Permission |

---

## ⚙️ Getting Started

Follow these steps to set up the project locally for development and testing.

### Prerequisites

Ensure you have the following installed on your machine:
- **PHP** (8.2 or higher)
- **Composer**
- **Node.js** & **npm** (or yarn/pnpm)
- **SQLite** (or your preferred relational database)

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Sangamrai021/gmc_backbenchers.git
   cd gmc_backbenchers
   ```

2. **Install PHP Dependencies:**
   ```bash
   composer install
   ```

3. **Install JavaScript Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Configuration:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   > **Note:** Ensure your `.env` file is properly configured. By default, you can utilize SQLite by creating an empty `database/database.sqlite` file.

5. **Run Migrations & Seeders:**
   ```bash
   php artisan migrate --seed
   ```
   > **Note:** The seeders will populate your database with essential default roles, permissions, and initial test data.

6. **Start the Development Servers:**

   You will need two terminal instances to run the backend and frontend simultaneously.

   **Terminal 1 (Laravel API):**
   ```bash
   php artisan serve
   ```

   **Terminal 2 (Vite HMR):**
   ```bash
   npm run dev
   ```

7. **Access the Application:**  
   Open your browser and navigate to [http://localhost:8000](http://localhost:8000).

---

## 🧪 Testing

The platform includes a robust automated test suite built with **PHPUnit**. It ensures that data integrity, authorization constraints, and core feature functionality remain intact during development.

To execute the test suite, run:
```bash
php artisan test
```

> **Note:** The tests utilize an in-memory SQLite database via the `RefreshDatabase` trait. Ensure your environment supports SQLite testing.

---

## 🛡️ Contributing & Security

We welcome contributions! If you would like to contribute, please fork the repository and submit a pull request with your proposed changes.

**Security Vulnerabilities:**  
If you discover a security vulnerability within GMC Backbenchers, please send an email to the repository maintainers directly rather than creating a public issue. All security vulnerabilities will be promptly and carefully addressed.

---

## 📄 License

GMC Backbenchers is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
