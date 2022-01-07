// Code in the api route will never be served to the client
// This will run on the server and be run by node,
// so we can use node functions

import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
  const currentFileContents = fs.readFileSync(filePath);
  return JSON.parse(currentFileContents);
}

export default function handler(req, res) {
  // Receive request from front end
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    // Save request as object
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };

    // Store object in file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'SUCCESS', feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}
