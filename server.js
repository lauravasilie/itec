const app = require(__dirname + "/app.js")
const PORT = 8000;
require('./database.js');
var User = require("./models/User.js");

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});

var user = new User({
  name: {
    first: "Laura",
    last: "Vasilie"
  },
  phone: "+40773743463",
  email: "vasilielaura@gmail.com",
  address: "Timisoara, Romania",
  company: true,
  isBuyer: false,
  password: "admin"
});

// User.create(user);

app.use(async (req, res) => {
  res.status(404).json({ message: 'Invalid route' });
})