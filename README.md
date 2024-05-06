# Staff Management Project

This project aims to provide a comprehensive solution for managing staff information. It consists of an ASP.NET Core 6.0 API backend for handling data operations and an Angular frontend for user interaction.

## Features

- **Create:** Allows users to add new staff members to the database.
- **Update:** Enables users to modify existing staff information.
- **Delete:** Allows users to remove staff members from the database.
- **Search Advanced:** Provides advanced search functionality with filters based on staff ID, gender, and birthday within a specified date range.
- **Export Data:** We enable with Excel and PDF base on search

## Technologies Used

- **Backend:** ASP.NET Core 6.0
- **Frontend:** Angular 17.3.6
- **Database:** Microsoft SQL Server

## Database Schema

The project utilizes a Microsoft SQL Server database with a single table named `Staff`. The table schema is as follows:

- `id` (int): Primary key for the staff record.
- `staffid` (nchar(8)): Unique identifier for each staff member.
- `fullname` (nvarchar(100)): Full name of the staff member.
- `birthday` (date): Date of birth of the staff member.
- `gender` (int): Gender of the staff member. (1 for Male, 2 for Female)

## Functionality

- **Create:** Endpoint to add a new staff member.
- **Update:** Endpoint to modify existing staff information.
- **Delete:** Endpoint to remove a staff member from the database.
- **Search Advanced:** Endpoint to perform advanced search queries based on staff ID, gender, and birthday within a specified date range.

## API Endpoints

- **POST /api/staff:** Create a new staff member.
- **PUT /api/staff/{id}:** Update an existing staff member.
- **DELETE /api/staff/{id}:** Delete a staff member.
- **GET /api/staff/search:** Perform advanced search queries.

## Usage

To run the project:

1. Set up the backend API using ASP.NET Core 6.0.
2. Set up the frontend using Angular 17.3.6.
3. Ensure that the Microsoft SQL Server database is configured correctly with the `staff` table schema.

## Contributors

- [Ouch Bros](https://github.com/ouchbros168/Staff-Management.git)): Project Owner

Feel free to contribute to the project by submitting pull requests or reporting issues.

