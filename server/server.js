const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.json([
    { id: 1, name: 'Eric', role: 'Primary Planner', age: 66 },
    { id: 2, name: 'Sue', role: 'Spouse', age: 61 },
    { id: 3, name: 'Karl', role: 'Child', age: 25 },
    { id: 4, name: 'Bennett', role: 'Child', age: 23 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Evimero API server running at http://localhost:${PORT}`);
});