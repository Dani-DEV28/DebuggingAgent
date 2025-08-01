const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Medical consultation backend is running' });
});

// Main symptom analysis endpoint
app.post('/api/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms, followupAnswers } = req.body;

    if (!symptoms || typeof symptoms !== 'string') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Symptoms must be provided as a string'
      });
    }

    // Call the Python GoodFire agent
    const pythonProcess = spawn('python3', [
      path.join(__dirname, 'goodfire_ember_agent.py'),
      JSON.stringify({ symptoms, followupAnswers })
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python process error:', error);
        return res.status(500).json({
          error: 'Analysis failed',
          message: 'Unable to process symptoms at this time'
        });
      }

      try {
        const analysis = JSON.parse(result);
        res.json({
          success: true,
          analysis: analysis.text,
          followupQuestions: analysis.followup_questions || [],
          requiresFollowup: analysis.requires_followup || false
        });
      } catch (parseError) {
        console.error('Failed to parse Python response:', parseError);
        res.status(500).json({
          error: 'Parse error',
          message: 'Unable to process analysis results'
        });
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Internal server error occurred'
    });
  }
});

// Follow-up questions endpoint
app.post('/api/followup', async (req, res) => {
  try {
    const { symptoms, answers } = req.body;

    const pythonProcess = spawn('python3', [
      path.join(__dirname, 'goodfire_ember_agent.py'),
      JSON.stringify({ symptoms, followupAnswers: answers })
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({
          error: 'Analysis failed',
          message: 'Unable to process follow-up responses'
        });
      }

      try {
        const analysis = JSON.parse(result);
        res.json({
          success: true,
          analysis: analysis.text,
          followupQuestions: analysis.followup_questions || [],
          requiresFollowup: analysis.requires_followup || false
        });
      } catch (parseError) {
        res.status(500).json({
          error: 'Parse error',
          message: 'Unable to process analysis results'
        });
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Internal server error occurred'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Medical consultation backend running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});