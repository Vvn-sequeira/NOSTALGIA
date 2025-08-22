


🌐 Frontend
Technologies Used:
- HTML, CSS, JavaScript – Core web technologies for structure, styling, and interactivity.
- React.js – Component-based frontend framework for building dynamic UIs.
- React Bootstrap – UI library for responsive design and pre-styled components.
- Ulverse.io – Used for integrating 3D components and visual enhancements.
Implementation:
- Built reusable React components for forms, navigation, and modals.
- Styled with custom CSS and Bootstrap classes.
- Integrated Ulverse.io for interactive 3D elements in the UI.

🧠 AI Integration
Tool Used:
- Google AI API (Free Key)
Source:
- Obtained from Google’s public AI API offerings (e.g., Gemini, PaLM, or similar).
Implementation:
- Used for generating dynamic responses or enhancing user experience with AI-powered features.
- Integrated via POST requests from the frontend to the backend.
[8/21/2025 3:55 PM] V V N: 🔐 Authentication & Authorization
Technologies Used:
- JWT (JSON Web Tokens) – For secure user session management.
- bcrypt – For hashing passwords before storing them in the database.
Implementation:
- Signup/login flow built with Express.js and MongoDB.
- JWT tokens stored in HTTP-only cookies.
- bcrypt used to hash passwords during registration and verify during login.

📧 Email Scheduling
Tools Used:
- Nodemailer – For sending emails.
- Cron (node-cron) – For scheduling email reminders.
Implementation:
- Configured Nodemailer with SMTP settings to send confirmation and reminder emails.
- Used Cron to schedule periodic tasks (e.g., daily reminders, event alerts).
[8/21/2025 3:55 PM] V V N: 📱 Todo Reminder System
Service Used:
- Twilio Web Service
Source:
- Registered on Twilio and obtained Account SID and Auth Token.
Implementation:
- Used Twilio’s SMS API to send task reminders to users.
- Integrated with backend logic and cron jobs to trigger messages at scheduled times.

🛡 Security Check: “Am I Safe” Feature
API Used:
- Breach Directory API via RapidAPI
Source:
- Accessed through RapidAPI, using a free API key.
Implementation:
- Users can input their email to check if it has appeared in known data breaches.
- Backend sends requests to the Breach Directory API and returns results securely.
[8/21/2025 3:56 PM] V V N: 🧰 Backend
Technologies Used:
- Node.js – JavaScript runtime for server-side logic.
- Express.js – Web framework for routing and middleware.
Implementation:
- Built RESTful APIs for authentication, reminders, and AI prompt handling.
- Connected to MongoDB Atlas for data storage.
- Configured CORS and cookie settings for secure frontend-backend communication.

🗃 Deployment
Platforms Used:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
Implementation:
- Deployed frontend and backend separately.
- Ensured CORS and cookie settings allowed cross-origin requests.
- Environment variables used for API keys and secrets.





















# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
