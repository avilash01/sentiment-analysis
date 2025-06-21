const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');

const app = express();
const sentiment = new Sentiment();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Sentiment Analyzer API is running.');
});

app.post('/analyze-sentiment', (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string.' });
  }

  const result = sentiment.analyze(text);

  let sentimentLabel = 'Neutral';
  if (result.score > 0) sentimentLabel = 'Positive';
  else if (result.score < 0) sentimentLabel = 'Negative';

  res.json({
    sentiment: sentimentLabel,
    explanation: `Score: ${result.score}. Words analyzed: ${result.words.join(', ') || 'none'}.`
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
