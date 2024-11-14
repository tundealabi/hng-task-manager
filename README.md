# API Mastery: Build a Scalable RESTful API

This project is a **NestJS** application that interacts with a **MongoDB** database. It is designed to help you manage tasks efficiently, providing features such as pagination, filtering, and validation. The application is containerized using **Docker**, allowing for easy setup and execution in a local development environment.

## Objective

Develop a RESTful API that enables users to create, read, update, and delete (CRUD) tasks in a task management system. Emphasise error handling, authentication, and scalability throughout the development process.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/package-manager)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/tundealabi/hng-task-manager.git
cd hng-task-manager
```

### Update environment variables

```bash
cp src/config/envs/.env.sample src/config/envs/.env.development
```

Update the values in the .env.development file as required.

## Running The Application

<p>1. Install packages</p>

```
yarn install
```

<p>2. Build and start the container</p>

```
yarn docker:up
```

<p>3. Start the development server from the docker shell in your terminal</p>

```
yarn start:dev
```

## 📜 API Documentation

<p>The swagger docs is located at https://hng-task-manager.onrender.com/docs</p>

## 💻 Built with

Technologies used in the project:

- Docker
- MongoDB
- NestJs
- PassportJs
