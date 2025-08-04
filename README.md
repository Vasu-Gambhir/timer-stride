# ⏱️ Timer-Stride

**Timer-Stride** is a feature-rich timer management application built using React, Redux, TypeScript, Tailwind CSS, and React Router. It is designed to closely match a Figma-based UI while implementing a robust and user-friendly timer system.

---

## ✨ Features

### ✅ Core Features

- **Timers List Screen**

  - Displays a dynamic list of timers
  - Play/Pause individual timers with real-time updates
  - Clear or Stop specific timers
  - UI exactly as per Figma
  - Tabs for viewing favorites, active, and local (completed) timers

- **Create Timer Screen**

  - Form to create a new timer
  - Dropdowns for selecting project and task
  - Text input for description
  - Checkbox for marking as favorite
  - On submission, user is redirected back to timers list

- **Task Details Screen**

  - View task info (e.g., assigned user, deadline)
  - Timesheets tab for running timer details
  - Controls for Play, Pause, and Stop with live updates
  - Updates are reflected across all views

- **State Synchronization**

  - Timers managed using Redux
  - Bidirectional updates across components
  - Timers can be favorited/unfavorited in real-time

- **Data Persistence**

  - Timer data is persisted in `localStorage`
  - Timers survive page reloads
  - Only cleared manually using per-timer "Clear" buttons

- **Theme & Design**

  - Tailwind CSS used with a custom theme based on [Figma Design System]
  - Fully responsive, pixel-perfect match with Figma mockups

- **Deep Linking & Routing**
  - Pages accessible via URL
  - Proper routes for list, creation, and task detail screens

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/timer-stride.git
   cd timer-stride
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

---

## 🤖 AI Tool Usage

See [AI_USAGE.md](./AI_USAGE.md) for a detailed breakdown.

---

## 👤 Author

Developed and maintained by **Vasu Gambhir**  
Built with ❤️ using modern frontend technologies

---
