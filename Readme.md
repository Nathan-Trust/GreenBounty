# GreenBounty

## Introduction

**GreenBounty** is a web application designed to connect waste producers with recycling companies, incentivizing proper waste disposal and recycling through a points system that can be exchanged for goods and services. The platform facilitates seamless collaboration between users and recycling companies, promoting sustainability and responsible waste management through a clean and intuitive interface.

## Getting Started

This section provides a quick start guide for developers interested in contributing to the GreenBounty project.

### Prerequisites

- Node.js (LTS version)
- FastAPI (for backend services)
- A supported SQL database (to be determined)
- Git

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Nathan-Trust/GreenBounty.git
    cd GreenBounty
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Setup environment variables:  
   Copy the `.env.example` file to a new file named `.env.local` and fill in the necessary details.

4. Run the development server:

    ```bash
    yarn dev
    ```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Technology Stack

- **[React](https://legacy.reactjs.org/)**: A popular JavaScript library for building user interfaces. The core of the frontend architecture.
- **[FastAPI](https://fastapi.tiangolo.com/)**: A modern, fast (high-performance) web framework for building APIs with Python, used for the backend.
- **[ShadCN UI](https://ui.shadcn.com/)**: A library of accessible and customizable components, used to ensure a consistent UI design across the application.
- **[Zod](https://zod.dev)**: A TypeScript-first schema validation library, used to validate and parse user input and data throughout the application.
- **[Husky](https://typicode.github.io/husky/get-started.html)**: A tool for Git hooks, used to enforce code quality and prevent bad commits by running pre-commit and pre-push checks.

## Key Features

- **Waste Management**: Users can easily connect with recycling companies to schedule waste pickups and monitor their recycling activities.
- **Incentive System**: A points system that rewards users for proper waste disposal, allowing them to redeem points for goods or services.
- **User Dashboard**: A user-friendly dashboard that provides insights into recycling progress, points earned, and available rewards.
- **Admin Dashboard**: A robust dashboard for administrators to oversee user activities, manage recycling companies, and monitor overall platform performance.

## Contributing

We welcome contributions from everyone. Here are some ways you can contribute:

- Reporting bugs
- Suggesting enhancements
- Submitting pull requests with fixes and improvements

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests to us.

## License

All rights reserved, GreenBounty (2024)
