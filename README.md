💻 Technologies Used

Language : TypeScript

Frontend:
Reactjs , tailwind , lucid-react

Backend:
Node.js
Express.js
Mongoose
Database:
MongoDB (Atlas)
Authentication:
JSON Web Tokens (JWT)
Environment Variables:
dotenv
Others:
CORS for cross-origin requests

PROJECT SETUP

Clone the Repository:

git clone https://github.com/your-username/auth-api.git -> cd Client and cd server

Install Dependencies: Run the following command to install the required packages:
npm install
Set Up Environment Variables:

Create a .env file in the project root.
Add the following variables to the file:
env

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>?retryWrites=true&w=majority
Replace <username>, <password>, and <database_name> with your actual MongoDB credentials.
Start the Server:

Run the development server:
bash
Copy code
npm run dev


🚀Features Implemented
1. User Registration
Allows users to register with their email and password.
Passwords are securely hashed before being stored in the database.

3. User Login
Authenticates users using their email and password.
Responds with a JSON Web Token (JWT) for authentication.

5. Middleware for Authentication
JWT is validated via middleware to secure routes.

✨ Frontend Features
Landing Page:
Designed a responsive landing page 
Fully optimized for mobile, tablet, and desktop views.
Roles and Dashboards

User Roles: Teacher and Student.

Dashboards:
Teacher Dashboard: Provides navigation to teacher-specific features.
Student Dashboard: Provides navigation to student-specific features.
Authentication

Implemented login, sign-up, and registration functionalities

Role-Based Redirection:
Teachers are redirected to the Teacher Dashboard.
Students are redirected to the Student Dashboard.


