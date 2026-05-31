app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,      // ← Fix for ZAP finding #4
    secure: false,       // Set true when HTTPS enabled
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60  // 1 hour
  }
}));
