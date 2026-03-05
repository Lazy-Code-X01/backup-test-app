import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = './uploads';

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Write test data — creates a file in /uploads each time you hit this endpoint
app.get('/write', (req, res) => {
  const filename = `test-${Date.now()}.txt`;
  const content = `backup-test-${Date.now()}\nCreated at: ${new Date().toISOString()}\nThis file proves the backup captured real user data.`;

  fs.writeFileSync(path.join(UPLOADS_DIR, filename), content);

  res.json({
    message: 'File created',
    filename,
    path: path.join(UPLOADS_DIR, filename),
  });
});

// List all uploaded files
app.get('/files', (req, res) => {
  const files = fs.readdirSync(UPLOADS_DIR);
  res.json({ files, count: files.length });
});

app.listen(PORT, () => {
  // Write an initial file on startup
  const initFile = path.join(UPLOADS_DIR, 'init.txt');
  fs.writeFileSync(
    initFile,
    `App started at ${new Date().toISOString()}\nThis is persistent data.`
  );

  console.log(`Backup test app running on port ${PORT}`);
  console.log(`Hit /write to create test data`);
  console.log(`Hit /files to list uploads`);
  console.log(`Hit /health for health check`);
});
