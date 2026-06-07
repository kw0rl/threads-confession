# Threads Confession

An anonymous confession web app that automatically posts user-submitted confessions to a [Threads](https://www.threads.net/) account via the Threads API. Built with Laravel, Inertia.js, and React.

## Features

- **Anonymous Confessions** — Users can submit confessions without creating an account or logging in.
- **Auto-Post to Threads** — Each confession is automatically published to a connected Threads account using the official Threads API.
- **Real-time Feedback** — Toast notifications inform users whether their confession was successfully posted.
- **Dark / Light Mode** — Toggle between themes via the command menu (`Ctrl+K` / `⌘+K`).
- **Command Menu** — A spotlight-style command palette powered by `cmdk` for quick settings access.
- **Character Limit** — Confessions are capped at 500 characters with a live counter.
- **Status Tracking** — Each confession is stored in the database with a status (`pending` → `posted`).
- **Animated Background** — Subtle dot-grid particle animation for a polished look.

## Tech Stack

| Layer      | Technology                                                     |
|------------|----------------------------------------------------------------|
| Backend    | [Laravel 13](https://laravel.com/) (PHP 8.3+)                 |
| Frontend   | [React 18](https://react.dev/) + [Inertia.js](https://inertiajs.com/) |
| Styling    | [Tailwind CSS 4](https://tailwindcss.com/)                     |
| UI Library | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Build Tool | [Vite](https://vitejs.dev/)                                    |
| Database   | MySQL / [TiDB](https://www.pingcap.com/tidb/) (production)    |
| Auth       | [Laravel Breeze](https://laravel.com/docs/starter-kits#laravel-breeze) (optional, included) |
| API        | [Threads API](https://developers.facebook.com/docs/threads)   |

## Project Structure

```
threads-confession/
├── app/
│   ├── Http/Controllers/
│   │   ├── ConfessionController.php   # Handles confession submission & Threads API
│   │   └── ProfileController.php      # User profile management
│   └── Models/
│       ├── Confession.php             # Confession model
│       └── User.php                   # User model
├── database/
│   └── migrations/
│       └── create_confessions_table   # message (text), status (string)
├── resources/js/
│   ├── Pages/
│   │   ├── Welcome.jsx                # Main confession form page
│   │   └── Dashboard.jsx              # Dashboard page
│   ├── Components/ui/                 # shadcn/ui components
│   └── Layouts/                       # App layouts
├── routes/
│   └── web.php                        # Web routes
└── ...
```

## Getting Started

### Prerequisites

- **PHP** >= 8.3
- **Composer** >= 2.x
- **Node.js** >= 18.x
- **npm** >= 9.x
- A **Threads** account with API access

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/threads-confession.git
   cd threads-confession
   ```

2. **Install dependencies**

   ```bash
   composer install
   npm install
   ```

3. **Set up environment**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure the `.env` file**

   ```env
   # App
   APP_URL=http://localhost:8000

   # Database (use sqlite for local dev, or mysql/tidb for production)
   DB_CONNECTION=sqlite

   # Threads API
   THREADS_ACCESS_TOKEN=your_threads_access_token_here
   ```

5. **Run migrations**

   ```bash
   php artisan migrate
   ```

6. **Build frontend assets**

   ```bash
   npm run build
   ```

7. **Start the development server**

   ```bash
   composer dev
   ```

   This will concurrently start:
   - Laravel dev server
   - Queue listener
   - Log viewer (Pail)
   - Vite dev server

   Or start them individually:

   ```bash
   php artisan serve
   npm run dev
   ```

## Threads API Setup

1. Go to the [Meta for Developers](https://developers.facebook.com/) portal.
2. Create or select an app with **Threads API** access.
3. Generate a long-lived access token for your Threads account.
4. Add the token to your `.env` file:

   ```env
   THREADS_ACCESS_TOKEN=your_token_here
   ```

### How It Works

When a user submits a confession:

1. The message is validated (max 500 characters).
2. A `Confession` record is saved to the database with `status: pending`.
3. The app calls the Threads API to create a media container.
4. The container is then published to Threads.
5. On success, the confession status is updated to `posted`.
