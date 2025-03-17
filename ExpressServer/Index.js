// Index.js

import  express  from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import Express Routes
import  studentRoute from './Student/student.router.js';

// Load environment variables from .env file
//const { MONGODB_URI, PORT } = process.env;
const MONGODB_URI = '';
const PORT = 3000;

// Connecting to MongoDB Database
mongoose.connect('mongodb+srv://mydbuser:mydbuser@cluster0.hfu9n.mongodb.net/Student?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Database successfully connected!');
    })
    .catch((error) => {
        console.log('Could not connect to database: ' + error);
    });

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/students', studentRoute);

// Define the PORT
const port = PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log('Connected to port ' + port);
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Error 404: Not Found!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.statusCode || 500;
    res.status(status).send(err.message);
});

