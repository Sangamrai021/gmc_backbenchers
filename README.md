# GMC Backbenchers 🎓

GMC Backbenchers is a modern, collaborative educational platform built for students, teachers, and institution administrators. It bridges the gap between classroom management and community engagement by providing tools for academic tracking, peer-to-peer mentorship, and open discussions.

This application is built with a robust **Laravel** backend and a dynamic **React** frontend using **Inertia.js**.

---

## 🚀 Features

- **Multi-Tenant Architecture**: Logical separation of data (Semesters, Subjects, Students) by Institutions.
- **Role-Based Access Control (RBAC)**: Comprehensive permission handling via Spatie for Super Admins, Institution Admins, Teachers, and Students.
- **Q&A Discussion Forum**: A StackOverflow-style forum supporting subject-specific and general questions, anonymous posting, and voting mechanics.
- **Academic Management**: Full lifecycle management of assignments, including late submission handling and teacher grading.
- **Talent Showcase**: A portfolio system for students to publish and share personal projects.
- **Mentorship Board**: Peer-to-peer mentoring system with integrated gamification (Mentor Badges).
- **Activity Tracking**: Built-in student activity logging for engagement tracking.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 11.x (PHP 8.2+)
- **Frontend**: React 18, Inertia.js, TailwindCSS
- **Database**: SQLite (Development/Testing), MySQL/PostgreSQL (Production ready)
- **Authentication**: Laravel Breeze (Session-based)
- **Authorization**: Spatie Laravel Permission

---

## ⚙️ Local Development Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js & npm
- SQLite (or your preferred database)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sangamrai021/gmc_backbenchers.git
   cd gmc_backbenchers
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Note: Ensure your `.env` file is configured for your local database. By default, you can use SQLite by creating a `database/database.sqlite` file.*

5. **Run Migrations & Seeders:**
   ```bash
   php artisan migrate --seed
   ```
   *The seeders will populate the database with default roles, permissions, and test data.*

6. **Start the Development Servers:**

   Terminal 1 (Laravel Backend):
   ```bash
   php artisan serve
   ```

   Terminal 2 (Vite Frontend):
   ```bash
   npm run dev
   ```

7. **Visit the application:** Open `http://localhost:8000` in your browser.

---

## 🧪 Testing

The platform includes a comprehensive automated test suite built with PHPUnit, ensuring authorization, data integrity, and feature functionality remain intact.

To run the test suite:
```bash
php artisan test
```

*Note: The test suite utilizes an in-memory SQLite database (`RefreshDatabase` trait). Ensure your environment is properly set up for SQLite testing.*

---

## 🛡️ Security Vulnerabilities

If you discover a security vulnerability within GMC Backbenchers, please send an e-mail to the repository maintainers rather than creating a public issue. All security vulnerabilities will be promptly addressed.

## 📄 License

GMC Backbenchers is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
