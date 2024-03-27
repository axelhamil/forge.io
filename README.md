# Forge - The One and Only SaaS Boilerplate You Need

Forge is the ultimate boilerplate for building scalable and maintainable SaaS 
applications with ease. Based on Clean Architecture and DDD principles, Forge is
the perfect starting point for your next project.

## Features

- Clean Architecture & Domain-Driven Design
- TypeScript for strong typing and improved code quality
- Fastify for high-performance web framework
- DrizzleORM for easy database management
- Postgres for reliable and scalable data storage
- Docker for simplified deployment and development
- Eslint for consistent code style
- HBS for easy templating

### Coming Soon

#### Priority:
- **Unpoly** for seamless client-side navigation 
- **TailwindCSS** for beautiful and responsive design
- **DaisyUI** for easy and customizable components
---
#### Secondary:
- Jest for comprehensive testing
- Stripe Integration for easy payments
- Mailgun Integration for email management
- Auth with IdentityPlatform for secure user authentication
- Admin Panel for managing your application
- Landing Page to showcase your product
- Documentation to help you get started

## Getting Started

Install Forge using the following command:
```bash
pnpm install
```
Start the development server:
```bash
pnpm dev
```
Or use Docker:
```bash
docker-compose up forge --build --force-recreate -V
```
Start the production server:
```bash
pnpm build
pnpm start
```
Or use Docker:
```bash
docker-compose up forge --target runner --build --force-recreate -V
```
