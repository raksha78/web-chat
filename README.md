# Chat Application SPA

* Welcome to the Chat Application SPA project! This single-page application (SPA) is a simple chat forum where all users see the same list of messages, similar to channels in popular messaging platforms like Slack.

### Running Requirements

* To run the project, ensure you have Node.js installed on your machine. Then, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project directory in your terminal.
- Run npm install to install the project dependencies.
- Run npm run build to build the project.
- Finally, run npm start to start the server.

### Learning Goals

- Writing RESTful services using Express
- Calling RESTful services in the frontend using fetch
- Maintaining persistent state on the server and using services to load and update client state
- Updating client state using browser-based JavaScript
- Implementing authentication/authorization using RESTful services
- Implementing basic polling for updates

### Requirement Overview

- Implements an Express server to serve static assets and RESTful services
- Loads a single static HTML page as the SPA
- Requires user authentication to access the chat
- Provides a list of messages and logged-in users
- Implements polling for updates every 5 seconds
- Allows users to log out and return to the login screen
- Supports multiple simultaneous user sessions

### Visual Requirements

- Provides CSS styling for a visually appealing interface
- Ensures no horizontal scrolling at normal desktop screen sizes
- Utilizes whitespace, colors, and legibility for usability
- Implements loading indicators for various states
- Displays error messages for unexpected service responses

### Security Requirements

- Implements user authentication without passwords
- Rejects unauthorized users with appropriate error codes
- Sanitizes usernames to prevent injection attacks
- Ensures all service calls requiring authorization are authenticated
- Uses session identifiers (sid) to identify users for sending messages

### Quality Requirements

- Follows best practices for JavaScript, CSS, HTML, and file structures
- Ensures RESTful services follow specified requirements
- Uses semantic HTML and CSS class names
- Incorporates feedback from code reviews
