const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
    printAlltaskref,
    taskrefbyId,
    createtaskref,
    updatetaskref,
    deleteUser
} = require('../controllers/userController.js');
const Auth_middleware = require('../middlewares/authMiddleware.js');
const {
    registration
} = require('../controllers/AuthControllers.js');


router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Employment Task Management API</title>
            <style>
                body {
                    background-color: black;
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                }
                .container {
                    text-align: center;
                }
                h1 {
                    font-size: 2em;
                }
                p {
                    font-size: 1.2em;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to the Employment Task Management API</h1>
                <p>Your one-stop solution for managing employee tasks efficiently and effectively.</p>
                <p>
                Employment Task Management API Documentation
Overview
The Employment Task Management API is designed to help manage tasks associated with employees in an organization. It provides functionalities to create, update, delete, and retrieve task references for employees. This API ensures secure access through authentication mechanisms and supports file uploads for task-related documents.

Base URL
arduino
Copy code
http://yourapiurl.com/api
Authentication
This API uses a middleware-based authentication mechanism. Users must include a valid token in the request headers to access protected endpoints.

Endpoints
User Registration
POST /signup
Register a new user in the system.

URL: /signup
Method: POST
Body Parameters:
username (string, required): The username of the new user.
email (string, required): The email address of the new user.
password (string, required): The password for the new user.
Responses:
200 OK: Registration successful.
400 Bad Request: User already exists.
500 Internal Server Error: Server error.
Example Request:
json
Copy code
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
Example Response:
json
Copy code
{
  "message": "registration done"
}
Task Management
GET /
Retrieve all task references.

URL: /
Method: GET
Headers:
Authorization: Bearer token
Responses:
200 OK: List of task references.
500 Internal Server Error: Server error.
Example Response:
json
Copy code
[
  {
    "task": "Complete project report",
    "employeeName": "Jane Doe",
    "time": "2024-06-01T10:00:00Z",
    "priority": "High",
    "description": "Finish the annual project report.",
    "photo": "uploads/report.jpg"
  }
]
GET /get
Retrieve task references by employee name.

URL: /get
Method: GET
Headers:
Authorization: Bearer token
Query Parameters:
employeeName (string, required): The name of the employee whose tasks are being retrieved.
Responses:
200 OK: Task references for the specified employee.
404 Not Found: No task references found for the specified employee.
500 Internal Server Error: Server error.
Example Request:
sql
Copy code
GET /get?employeeName=Jane%20Doe
Example Response:
json
Copy code
[
  {
    "task": "Complete project report",
    "employeeName": "Jane Doe",
    "time": "2024-06-01T10:00:00Z",
    "priority": "High",
    "description": "Finish the annual project report.",
    "photo": "uploads/report.jpg"
  }
]
POST /create
Create a new task reference.

URL: /create
Method: POST
Headers:
Authorization: Bearer token
Content-Type: multipart/form-data
Body Parameters:
task (string, required): The task description.
employeeName (string, required): The name of the employee.
time (string, required): The time associated with the task.
priority (string, required): The priority of the task.
description (string, required): Detailed description of the task.
photo (file, optional): An image or document related to the task.
Responses:
201 Created: Task reference created successfully.
400 Bad Request: Validation error.
500 Internal Server Error: Server error.
Example Request:
json
Copy code
{
  "task": "Complete project report",
  "employeeName": "Jane Doe",
  "time": "2024-06-01T10:00:00Z",
  "priority": "High",
  "description": "Finish the annual project report."
}
Example Response:
json
Copy code
{
  "_id": "60d0fe4f5311236168a109ca",
  "task": "Complete project report",
  "employeeName": "Jane Doe",
  "time": "2024-06-01T10:00:00Z",
  "priority": "High",
  "description": "Finish the annual project report.",
  "photo": "uploads/report.jpg"
}
PUT /update
Update an existing task reference.

URL: /update
Method: PUT
Headers:
Authorization: Bearer token
Query Parameters:
employeeName (string, required): The name of the employee whose task is being updated.
Body Parameters:
task (string, optional): The updated task description.
description (string, optional): The updated detailed description of the task.
priority (string, optional): The updated priority of the task.
Responses:
200 OK: Task updated successfully.
400 Bad Request: Validation error.
500 Internal Server Error: Server error.
Example Request:
json
Copy code
{
  "task": "Review project report",
  "description": "Ensure the report is ready for submission.",
  "priority": "Medium"
}
Example Response:
json
Copy code
{
  "message": "Task updated successfully"
}
DELETE /delete
Delete a task reference by employee name.

URL: /delete
Method: DELETE
Headers:
Authorization: Bearer token
Query Parameters:
employeeName (string, required): The name of the employee whose task is being deleted.
Responses:
200 OK: Task deleted successfully.
404 Not Found: Task not found.
400 Bad Request: Validation error.
500 Internal Server Error: Server error.
Example Request:
perl
Copy code
DELETE /delete?employeeName=Jane%20Doe
Example Response:
json
Copy code
{
  "message": "Task deleted successfully"
}
Error Codes
400 Bad Request: The request was invalid or cannot be otherwise served.
401 Unauthorized: Authentication credentials were missing or incorrect.
404 Not Found: The requested resource could not be found.
500 Internal Server Error: An error occurred on the server.
Rate Limits
There are no specific rate limits applied to this API. However, the API maintains a fair usage policy to ensure availability for all users.

Versioning
This API is currently at version 1.0. Future versions will be introduced to accommodate new features and improvements.

Contact Information
For support or feedback, please contact us at support@yourapiurl.com.

This doc
                </p>
            </div>
        </body>
        </html>
    `);
});




router.post('/signup', registration);

// router.get('/login', login);

// router.use(Auth_middleware);

router.delete('/delete',Auth_middleware, deleteUser);



router.get('/allget', Auth_middleware,printAlltaskref);

router.get('/get',Auth_middleware, taskrefbyId);

router.post('/create',Auth_middleware,upload.single('photo'), createtaskref);

router.put('/update',Auth_middleware, updatetaskref);


module.exports = router;
