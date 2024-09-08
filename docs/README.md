# Full-Stack Assessment Project Solutions

## 1. Database

### Solution

To normalize the data and improve the database structure, I implemented the following changes:

1. Created a `users` table with columns: `id` (primary key), `username`, and `email`.
2. Created a `homes` table with columns: `id` (primary key), `street_address`, `city`, `state`, `zip_code`, and other relevant home attributes.
3. Implemented a many-to-many relationship between users and homes using a junction table `user_home_interests` with columns: `user_id` (foreign key to users.id) and `home_id` (foreign key to homes.id).

This structure allows for efficient querying of user-home relationships while maintaining data integrity. The main challenge was ensuring that the data migration from the original `user_home` table to the new structure was done correctly, which I accomplished using a series of SQL statements in the `99_final_db_dump.sql` file.

## 2. React SPA

### Solution

For the React SPA, I implemented the following features:

1. Homes for User Page:
   - Created a dropdown component to select users, populating it with data from the `/user/find-all` API.
   - Implemented a `HomeCard` component to display individual home information.
   - Used Redux Toolkit to manage the global state, including selected user and related homes.
   - Fetched homes data using the `/home/find-by-user` API when a user is selected.

2. Edit User Functionality:
   - Developed a modal component that appears when the "Edit User" button is clicked on a home card.
   - Populated the modal with checkboxes for all users, using data from the `/user/find-by-home` API.
   - Implemented logic to ensure at least one user is always selected.
   - Used Redux to manage the state of selected users in the modal.
   - On save, called the `/home/update-users` API to update the backend, then refreshed the home list.

The main challenge was managing the state updates efficiently, especially when toggling user selections in the modal. I solved this by using Redux Toolkit's `createSlice` function to handle state updates in a more predictable manner.

## 3. Backend API

### Solution

For the backend API, I implemented the following endpoints using NestJS and TypeORM:

1. GET `/user/find-all`: 
   - Implemented a simple query to fetch all users from the `users` table.

2. GET `/home/find-by-user`:
   - Used a JOIN query to fetch homes related to a specific user through the `user_home_interests` table.
   - Implemented pagination with a default page size of 50 items.

3. GET `/user/find-by-home`:
   - Similar to `/home/find-by-user`, but reversed the relationship to find users for a specific home.

4. POST `/home/update-users`:
   - Implemented a transaction to ensure data consistency when updating user-home relationships.
   - Made this endpoint idempotent by first deleting existing relationships for the home, then inserting the new ones.

The main challenge was ensuring the `/home/update-users` endpoint was both efficient and idempotent. I solved this by using a database transaction and a two-step process of deleting and reinserting relationships.

For the extra pagination feature, I added query parameters for page number and page size to the `/home/find-by-user` endpoint, with default values if not provided. This allows for more flexible querying of large datasets.