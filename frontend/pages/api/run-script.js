// pages/api/run-script.js
import { exec } from 'child_process';

export default function handler(req, res) {
  // Define the command to run your Python script
  const command = 'python3 /Users/ananya/Documents/flow-sync/backend/automate.py --verbose'; // Adjust the path

  // Execute the command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).json({ error: 'Failed to execute script' });
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    return res.status(200).json({ message: 'Script executed successfully', output: stdout });
  });
}