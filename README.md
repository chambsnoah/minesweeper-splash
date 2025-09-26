# Minesweeper Splash

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/chambsnoah/minesweeper)

A visually stunning and playful implementation of the classic Minesweeper game with a modern, kid-friendly design. Minesweeper Splash is a single-page experience where players uncover squares on a grid, aiming to avoid hidden 'water balloons' (mines). The game features three difficulty levels, a delightful 'Kid Playful' aesthetic, bright colors, smooth animations, and charming icons to create an engaging and fun experience for all ages.

## ✨ Key Features

*   **Classic Minesweeper Gameplay**: The beloved logic puzzle, reimagined.
*   **Three Difficulty Levels**: Easy, Medium, and Hard modes to challenge players of all skill levels.
*   **Playful & Modern UI**: A clean, kid-friendly design with rounded shapes, bright colors, and a fun aesthetic.
*   **Responsive Perfection**: Flawless gameplay experience across desktops, tablets, and mobile devices.
*   **Engaging Micro-interactions**: Smooth animations, hover states, and tactile feedback make the game a joy to play.
*   **Purely Client-Side**: All game logic is handled in the browser with no backend required for gameplay.

## 🚀 Technology Stack

This project is built with a modern, high-performance tech stack:

*   **Frontend**: React, Vite
*   **State Management**: Zustand
*   **Styling**: Tailwind CSS
*   **Animation**: Framer Motion
*   **Icons**: Lucide React
*   **Language**: TypeScript
*   **Deployment**: Cloudflare Workers & Pages

## 🏁 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your machine:
*   [Bun](https://bun.sh/)
*   [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/minesweeper_splash.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd minesweeper_splash
    ```
3.  **Install dependencies:**
    ```sh
    bun install
    ```

## 💻 Development

To run the application in a local development environment with hot-reloading:

```sh
bun dev
```

Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal) to see the application.

### Building for Production

To create a production-ready build of the application:

```sh
bun build
```

This command bundles the application into the `dist` directory, optimized for deployment.

## ☁️ Deployment

This project is configured for seamless deployment to the Cloudflare network.

1.  **Login to Wrangler:**
    If you haven't already, authenticate with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```
2.  **Deploy the application:**
    Run the deploy script, which will build and deploy your application to Cloudflare.
    ```sh
    bun deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/chambsnoah/minesweeper)