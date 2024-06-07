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
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                h1, h2 {
                    color: red;
                    margin-top: 40px;
                }
                p {
                    margin: 10px 0;
                }
                .section {
                    margin-bottom: 30px;
                }
                pre {
                    background-color: #333;
                    padding: 10px;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to the Employment Task Management API</h1>
                <p>Your one-stop solution for managing employee tasks efficiently and effectively.</p>

                <div class="section">
                    <h2>Overview</h2>
                    <p>The Employment Task Management API is designed to help manage tasks associated with employees in an organization. It provides functionalities to create, update, delete, and retrieve task references for employees. This API ensures secure access through authentication mechanisms and supports file uploads for task-related documents.</p>
                </div>

                <div class="section">
                    <h2>Base URL</h2>
                    <pre>http://yourapiurl.com/api</pre>
                </div>

                <div class="section">
                    <h2>Authentication</h2>
                    <p>This API uses a middleware-based authentication mechanism. Users must include a valid token in the request headers to access protected endpoints.</p>
                </div>

                <div class="section">
                    <h2>Endpoints</h2>
                    <h3>User Registration</h3>
                    <h4>POST /signup</h4>
                    <p>Register a new user in the system.</p>
                    <pre>
URL: /signup
Method: POST
Body Parameters:
- username (string, required): The username of the new user.
- email (string, required): The email address of the new user.
- password (string, required): The password for the new user.
Responses:
- 200 OK: Registration successful.
- 400 Bad Request: User already exists.
- 500 Internal Server Error: Server error.
Example Request:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
Example Response:
{
  "message": "registration done"
}
                    </pre>

                    <h3>Task Management</h3>
                    <h4>GET /</h4>
                    <p>Retrieve all task references.</p>
                    <pre>
URL: /
Method: GET
Headers:
- Authorization: Bearer token
Responses:
- 200 OK: List of task references.
- 500 Internal Server Error: Server error.
Example Response:
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
                    </pre>

                    <h4>GET /get</h4>
                    <p>Retrieve task references by employee name.</p>
                    <pre>
URL: /get
Method: GET
Headers:
- Authorization: Bearer token
Query Parameters:
- employeeName (string, required): The name of the employee whose tasks are being retrieved.
Responses:
- 200 OK: Task references for the specified employee.
- 404 Not Found: No task references found for the specified employee.
- 500 Internal Server Error: Server error.
Example Request:
GET /get?employeeName=Jane%20Doe
Example Response:
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
                    </pre>

                    <h4>POST /create</h4>
                    <p>Create a new task reference.</p>
                    <pre>
URL: /create
Method: POST
Headers:
- Authorization: Bearer token
- Content-Type: multipart/form-data
Body Parameters:
- task (string, required): The task description.
- employeeName (string, required): The name of the employee.
- time (string, required): The time associated with the task.
- priority (string, required): The priority of the task.
- description (string, required): Detailed description of the task.
- photo (file, optional): An image or document related to the task.
Responses:
- 201 Created: Task reference created successfully.
- 400 Bad Request: Validation error.
- 500 Internal Server Error: Server error.
Example Request:
{
  "task": "Complete project report",
  "employeeName": "Jane Doe",
  "time": "2024-06-01T10:00:00Z",
  "priority": "High",
  "description": "Finish the annual project report."
}
Example Response:
{
  "_id": "60d0fe4f5311236168a109ca",
  "task": "Complete project report",
  "employeeName": "Jane Doe",
  "time": "2024-06-01T10:00:00Z",
  "priority": "High",
  "description": "Finish the annual project report.",
  "photo": "uploads/report.jpg"
}
                    </pre>

                    <h4>PUT /update</h4>
                    <p>Update an existing task reference.</p>
                    <pre>
URL: /update
Method: PUT
Headers:
- Authorization: Bearer token
Query Parameters:
- employeeName (string, required): The name of the employee whose task is being updated.
Body Parameters:
- task (string, optional): The updated task description.
- description (string, optional): The updated detailed description of the task.
- priority (string, optional): The updated priority of the task.
Responses:
- 200 OK: Task updated successfully.
- 400 Bad Request: Validation error.
- 500 Internal Server Error: Server error.
Example Request:
{
  "task": "Review project report",
  "description": "Ensure the report is ready for submission.",
  "priority": "Medium"
}
Example Response:
{
  "message": "Task updated successfully"
}
                    </pre>

                    <h4>DELETE /delete</h4>
                    <p>Delete a task reference by employee name.</p>
                    <pre>
URL: /delete
Method: DELETE
Headers:
- Authorization: Bearer token
Query Parameters:
- employeeName (string, required): The name of the employee whose task is being deleted.
Responses:
- 200 OK: Task deleted successfully.
- 404 Not Found: Task not found.
- 400 Bad Request: Validation error.
- 500 Internal Server Error: Server error.
Example Request:
DELETE /delete?employeeName=Jane%20Doe
Example Response:
{
  "message": "Task deleted successfully"
}
                    </pre>
                </div>

                <div class="section">
                    <h2>Error Codes</h2>
                    <pre>
- 400 Bad Request: The request was invalid or cannot be otherwise served.
- 401 Unauthorized: Authentication credentials were missing or incorrect.
- 404 Not Found: The requested resource could not be found.
- 500 Internal Server Error: An error occurred on the server.
                    </pre>
                </div>

                <div class="section">
                    <h2>Rate Limits</h2>
                    <p>There are no specific rate limits applied to this API. However, the API maintains a fair usage policy to ensure availability for all users.</p>
                </div>

                <div class="section">
                    <h2>Versioning</h2>
                    <p>This API is currently at version 1.0. Future versions will be introduced to accommodate new features and improvements.</p>
                </div>

                <div class="section">
                    <h2>Contact Information</h2>
                    <p>For support or feedback, please contact us at <a href="mailto:support@yourapiurl.com" style="color: red;">support@yourapiurl.com</a>.</p>
                </div>
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
