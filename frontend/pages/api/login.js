import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  // Check that the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get the username and password from the request body
  const { username, password } = req.body;

  // Replace this with real authentication logic
  if (username === 'admin' && password === 'password123') {
    // Generate a JWT token for session management
    const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });

    // Return the token in the response
    return res.status(200).json({ message: 'Login successful', token });
  } else {
    // If credentials are incorrect, return 401 error
    return res.status(401).json({ message: 'Invalid username or password' });
  }
}
