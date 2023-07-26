const express = require('express');
const { OpenAIApi, Configuration } = require('openai');

const app = express();
app.use(express.json());

// Set up your OpenAI API key
const api_key = "Your api key here ...... ";
const configuration = new Configuration({ apiKey: api_key });
const openai = new OpenAIApi(configuration);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/review', async (req, res) => {
  const codeReview = req.body.codeReview;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: ` Use code review practices and provide a detailed review of the following code:\n${codeReview}`,
      temperature: 0,
      max_tokens: 1024,
      n: 1,
      stop: '?'
    });

    const review = response.data.choices[0].text;
    res.json({ review });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during code review.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
