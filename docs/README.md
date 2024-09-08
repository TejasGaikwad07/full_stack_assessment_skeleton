# Full-Stack Assessment Project

This README provides detailed instructions on how to set up and run this full-stack project, which includes a MySQL database, a React frontend, and a Node.js backend.

## Prerequisites

- Docker and Docker Compose
- Node.js (version 14 or higher recommended)
- npm (usually comes with Node.js)
- Git

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/TejasGaikwad07/full_stack_assessment_skeleton.git
   cd full_stack_assessment_skeleton
   ```

2. Set up the database:
   ```
   docker-compose -f docker-compose.final.yml up --build -d
   ```
   This command will start a MySQL container with the final database structure and data.

## Running the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm run start
   ```
   The backend should now be running on `http://localhost:3000` (or the port specified in your .env file).

## Running the Frontend

1. Open a new terminal window and navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```
   The frontend should now be accessible at `http://localhost:5173` (or the port specified by Vite).

## API Endpoints

The following API endpoints are available:

- GET `/user/find-all`: Returns all users from the database.
- GET `/home/find-by-user`: Returns all homes related to a user.
- GET `/user/find-by-home`: Returns all users related to a home.
- POST `/home/update-users`: Updates the users associated with a home.

## Database Structure

The database has been normalized and consists of the following main tables:
- `user`: Stores user information (username, email).
- `home`: Stores home information.
- (Any additional tables you created for the relationship)

To view or modify the database directly, you can use the following credentials:
- Host: localhost
- Port: 3306
- Database: home_db
- Username: db_user
- Password: (As specified in the docker-compose file)

## Troubleshooting

If you encounter any issues:

1. Ensure all services are running (database, backend, frontend).
2. Check the console output for any error messages.
3. Verify that the ports specified in the .env files are not being used by other applications.
4. If database-related issues occur, you can reset the database to its initial state using:
   ```
   docker-compose -f docker-compose.final.yml down
   docker-compose -f docker-compose.final.yml up --build -d
   ```

## Additional Notes

- The frontend uses Redux for state management. The store configuration can be found in the appropriate files within the frontend directory.
- The backend uses [NestJS/Express] with [TypeORM/Prisma/Sequelize] for database interactions.
- Ensure that your .env files are properly configured in both frontend and backend directories.

If you have any questions or encounter any issues not covered here, please don't hesitate to reach out.