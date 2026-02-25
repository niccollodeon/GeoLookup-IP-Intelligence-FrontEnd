const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const JWT_SECRET = 'geolookup_secret_key_2024';
const DB_FILE = path.join(__dirname, 'db.json');

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// ── Tiny JSON "database" (pure JS — no native modules, works on any OS) ───────
function readDB() {
  if (!fs.existsSync(DB_FILE)) return { users: [] };
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
  catch { return { users: [] }; }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ── Seeder ────────────────────────────────────────────────────────────────────
function seedUsers() {
  const db = readDB();
  const exists = db.users.find(u => u.email === 'admin@example.com');
  if (exists) return;

  db.users.push(
    { id: 1, name: 'Admin User', email: 'admin@example.com', password: bcrypt.hashSync('password123', 10) },
    { id: 2, name: 'John Doe',   email: 'john@example.com',  password: bcrypt.hashSync('secret456',   10) }
  );
  writeDB(db);

  console.log('Users seeded successfully');
  console.log('   admin@example.com / password123');
  console.log('   john@example.com  / secret456');
}

seedUsers();

// ── Auth middleware ───────────────────────────────────────────────────────────
function authenticate(req, res, next) {
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────

// POST /api/login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  const db   = readDB();
  const user = db.users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// GET /api/me
app.get('/api/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// POST /api/logout
app.post('/api/logout', authenticate, (_req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\nServer running on port ${PORT}`);
});