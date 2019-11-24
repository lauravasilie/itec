const app = require(__dirname + "/app.js")
const PORT = 8000;
require('./database.js');

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});

app.use(async (req, res) => {
  res.status(404).json({ message: 'Invalid route' });
})