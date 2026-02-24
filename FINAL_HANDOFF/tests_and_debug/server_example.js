# Server Integration Example(Node.js / Express)

This guide shows how to run the `tuvi-api-engine-linux` binary on a Linux server(e.g., Ubuntu, CentOS) using Node.js and Express.

## Prerequisites

1. ** Linux Server **: Ensure you have a Linux server running.
2. ** Binary **: Upload `bin/tuvi-api-engine-linux` to your server(e.g., to`/var/www/tuvi-app/bin/`).
3. ** Permissions **: Make the binary executable:
```bash
    chmod +x /var/www/tuvi-app/bin/tuvi-api-engine-linux
    ```
4. ** Environment **: Ensure `GEMINI_API_KEY` is set in your server's environment variables or `.env` file.

## Example Code(`server.js`)

    ```javascript
const express = require('express');
const { execFile } = require('child_process');
const path = require('path');
const app = express();

app.use(express.json());

// Path to your binary
const ENGINE_PATH = path.join(__dirname, 'bin', 'tuvi-api-engine-linux');

app.post('/api/generate-report', (req, res) => {
    const userData = req.body;

    // Validate input
    if (!userData.name || !userData.year) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Default mode to 'full' if not provided
    if (!userData.mode) {
        userData.mode = 'full';
    }

    // Prepare JSON string for CLI argument
    const jsonInput = JSON.stringify(userData);

    console.log(`Running engine for: ${ userData.name } (Mode: ${ userData.mode })`);

    // Execute the binary
    execFile(ENGINE_PATH, [jsonInput], {
        env: { ...process.env } // Pass environment variables (important for GEMINI_API_KEY)
    }, (error, stdout, stderr) => {
        if (error) {
            console.error('Execution error:', error);
            return res.status(500).json({ error: 'Engine execution failed' });
        }

        try {
            // Parse the JSON output from stdout
            const result = JSON.parse(stdout);
            
            if (result.success) {
                res.json(result);
            } else {
                res.status(500).json(result);
            }
        } catch (e) {
            console.error('JSON Parse error:', e);
            console.error('Raw stdout:', stdout);
            res.status(500).json({ error: 'Invalid response from engine' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT } `);
});
```

## How to Run

1.  Initialize project: `npm init -y`
2.  Install express: `npm install express`
3.  Run server: `node server.js`
4.  Test with curl:
```bash
    curl -X POST http://localhost:3000/api/generate-report \
         -H "Content-Type: application/json" \
         -d '{"name": "Nguyen Van A", "year": 1995, "month": 5, "day": 20, "hour": 8}'
    ```
