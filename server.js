const express=require("express");
const dotenv=require("dotenv");
const userRoutes=require("./routes/userRoutes")
const connectDB = require("./config/db.js")
const {notFound,errorHandler}=require("./error/errorHandler")
const User = require("./models/userModel")
// const bodyParser = require('body-parser');
const cors = require('cors');



dotenv.config();
connectDB();
const app = express();

app.use(express.json());

// app.use(bodyParser.json());
app.use(cors());


// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://instahow.up.railway.app/');
  next();
});


app.get('/', (req,res)=>
{
    res.send("API is running")
})

app.post('/api/login/', async (req, res) => {
  try {
    const { loginid, password } = req.body;
    const user = await User.create({
      loginid,
      password,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 3000

app.listen(PORT,console.log(`Server is up and running port:${PORT}`))