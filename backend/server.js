const express = require('express');
const next = require('next');
const httpProxy = require('http-proxy');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');  // Ensure bcrypt is required if you're using it
const socketIo = require('socket.io');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

//const proxy = httpProxy.createProxyServer({ target: 'http://localhost:5000', ws: true });
const PORT = 5000;

// Initialize Express app
const server = express(); 

// Middleware
server.use(cors()); // CORS middleware
server.use(express.json()); // For parsing JSON request bodies
// Ensure the 'uploads' folder exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Files will be saved in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });
  const upload = multer({ storage });
  
// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'haya',
    database: 'project',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Inside server.js

// Make sure the Socket.IO is properly initialized and set up for handling rooms
const httpServer = require('http').createServer(server); // Existing code
const io = socketIo(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

// Socket.IO Event: Handle user joining the meeting and messaging
// Inside your Socket.IO connection logic in server.js
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    socket.on('create-room', (roomId) => {
      socket.join(roomId);
      console.log('Room created:', roomId);
    });
  
    socket.on('join-room', (roomId, role) => {
      socket.join(roomId);
      console.log(`${role} joined room:`, roomId);
    });
  
    socket.on('send-media', (roomId, stream) => {
      io.to(roomId).emit('receive-media', stream);
    });
  
    socket.on('send-offer', (roomId, offer) => {
      socket.to(roomId).emit('receive-offer', offer);
    });
  
    socket.on('send-answer', (roomId, answer) => {
      socket.to(roomId).emit('receive-answer', answer);
    });
  
    socket.on('send-ice-candidate', (roomId, candidate) => {
      socket.to(roomId).emit('receive-ice-candidate', candidate);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  


// Route to get cities
server.get('/cities', (req, res) => {
    db.query('SELECT * FROM cities', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Route to get specialties
server.get('/specialties', (req, res) => {
    db.query('SELECT * FROM specialties', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Route to get emergency services based on city
server.get('/emergency', (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const query = 'SELECT * FROM emergencies WHERE city = ?';
    db.query(query, [city], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Route to search doctors by name
server.get('/search-doctors', (req, res) => {
    const { doctorName } = req.query;

    if (!doctorName) {
        return res.status(400).json({ error: 'Doctor name is required.' });
    }

    const query = "SELECT d.name, d.gender, d.email, d.phone, d.specialty FROM doctors d WHERE d.name LIKE ?";
    
    db.query(query, [`%${doctorName}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

server.post('/consultations', (req, res) => {
    const { patient_id, doctor_id, date_time, status } = req.body;

    const query = 'INSERT INTO consultations (patient_id, doctor_id, date_time, status) VALUES (?, ?, ?, ?)';
    const statusValue = status || 'pending';  // Default to 'pending' if no status is provided

    db.query(query, [patient_id, doctor_id, date_time, statusValue], (err, results) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ success: false, message: 'Error booking consultation.' });
        }
        res.json({ success: true, message: 'Consultation booked successfully!' });
    });
});


// POST for home visits
server.post('/home-visits', (req, res) => {
    const { patient_id, doctor_id, address, visit_date, status } = req.body;
    const query = 'INSERT INTO home_visits (patient_id, doctor_id, address, visit_date, status) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [patient_id, doctor_id, address, visit_date, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Home visit scheduled successfully!' });
    });
});

// Emergency POST
server.post('/emergencies', (req, res) => {
    const { patient_id, request_time, location, status } = req.body;
    const query = 'INSERT INTO emergencies (patient_id, request_time, location, status) VALUES (?, ?, ?, ?)';
    const statusValue = status || 'requested';  // Default to 'requested' if no status is provided

    db.query(query, [patient_id, request_time, location, statusValue], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Emergency request created successfully' });
    });
});

server.get('/medical-history', (req, res) => {
    const { user_id } = req.query;
    const query = 'SELECT * FROM medical_history WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Hash password for signup
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Route for sign-up
server.post('/signup', (req, res) => {
    const { fullName, gender, email, phoneNumber, password, dateOfBirth, city } = req.body;
    const query = 'INSERT INTO users (name, gender, email, phone, password, dob, city) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [fullName, gender, email, phoneNumber, password, dateOfBirth, city], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

// Route for login
server.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length > 0) {
            res.status(200).json({ message: 'Login successful', user: result[0] });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});


// Route for doctor signup with file upload
server.post(
    "/signupfordoctor",
    upload.fields([{ name: "license" }, { name: "id" }]),
    (req, res) => {
      const { fullName, gender, email, phone, password, dob, city, specialty } =
        req.body;
  
      // Check if all fields are provided
      if (!fullName || !gender || !email || !phone || !password || !dob || !city || !specialty) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      // Check if both files are provided
      if (!req.files || !req.files.license || !req.files.id) {
        return res
          .status(400)
          .json({ error: "Both license and ID proof are required." });
      }
  
      // Get file paths
      const licensePath = `http://localhost:5000/uploads/${req.files.license[0].filename}`;
      const idPath = `http://localhost:5000/uploads/${req.files.id[0].filename}`;
  
      // SQL query
      const query = `
        INSERT INTO doctors (name, gender, email, phone, password, dob, city, specialty, id_photo_link, certificate_photo_link) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      db.query(
        query,
        [fullName, gender, email, phone, password, dob, city, specialty, idPath, licensePath],
        (err, result) => {
          if (err) {
            console.error("Database Error:", err);
            return res
              .status(500)
              .json({ error: "Failed to register doctor. Please try again." });
          }
          res.status(201).json({ message: "Doctor registered successfully!" });
        }
      );
    }
  );


// Start the server
server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
});
