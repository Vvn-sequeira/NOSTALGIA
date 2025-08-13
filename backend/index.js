require("dotenv").config();

const express = require("express"),
  app = express(),
  nodemailer = require("nodemailer"),
  cron = require("node-cron"),
  PORT = 8000,
  cors = require("cors"),
  Email = require("./Schema/SendEmailSchema"), // Email Schema
  Diary = require("./Schema/DiarySchema"),  // Diary Schema
  user = require("./Schema/userSchema") ,  // User Schema
  {verifyToken} = require("./Middlewares/Middlewares"), 
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  URL = process.env.MONGO_URL;

  app.use(cors({
    origin: "https://nostalgia-theta.vercel.app",
    credentials: true
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Required to parse JSON bodies 


const cookieParser = require("cookie-parser")
app.use(cookieParser()); // Use cookieParser
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function compareAsync(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}


app.listen(process.env.PORT, () => {
  console.log("app is connected to the ", process.env.PORT);
  mongoose.connect(URL);
  console.log("Mongo DB is connected ");
});

app.get("/api/getEmail", verifyToken , async(req, res) => {
   
    console.log(req.user);
    let userEmails = await Email.find({user : req.user.id});
    res.json(userEmails)

});

app.get("/api/getDiary" , verifyToken , async(req , res)=> {
     const Diarys = await Diary.find({user : req.user.id});
     res.send(Diarys);
})

// Logout
app.post("/api/logout"   , verifyToken , (req, res)=> {
   
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  
     res.send("you are logged out ")
})
// Login
app.post("/login",  async (req, res) => {
  try {
    const data = req.body;
    const findUser = await user.findOne({ email: data.email });
     console.log("this is the user that is trying to Log in : ", findUser);
    if (!findUser || findUser === null) {
      console.log("not allowed to log in ");
       res.status(401).json({
        success: false,
        message: "User not found. Please sign up.",
      });
      return; 
    }

    const isMatch = await compareAsync(data.password, findUser.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect.",
      });
    }

    const token = jwt.sign(
      { username: findUser.email, id: findUser._id },
      "viviviviv"
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      path: "/", // send cookie with all requests to your domain
    });

    console.log("Login was successful");
    res.status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong during login.",
    });
  }
});
// SignUP
app.post("/signup" , async (req, res) => {

  try {
    const data = req.body;
  
    let UniqEmail = await user.findOne({email : data.email })
    if(UniqEmail)
    {
      console.log("the user Email is alredy Exist");
     throw Error("the User with this Email alredy exist Please SignUp");
    }else{
    try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const sampleuser = new user({
      username: data.username,
      email: data.email,
      password: hash
    });

    await sampleuser.save();
    console.log("User login details are stored");

    const findUser = await user.findOne({email : data.email })
    console.log("the user that logged in just now : " , findUser);
    const vivi = jwt.sign({ email: findUser.email , id: findUser._id  }, "viviviviv");

    res.cookie("token", vivi, {
      httpOnly: true,
      secure:true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24, 
    });

    res.send(sampleuser);
  } catch (error) {
    console.error("Signup failed:", err);
    res.status(400).json({
      success: false,
      message: error.message ,
      error: error.message, 
    });
  }
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message || "Somthing went wrong", 
    });
  }
    
});
// Get all the email data
app.post("/GetEmail", verifyToken , async (req, res) => {
  console.log(req.body);
  const token = req.cookies.token;
  const decode = jwt.verify(token , "viviviviv");
  const userId = decode.id ;
  console.log("the user id from the token is " , userId);

  let sampleData = new Email({
    To: req.body.To,
    Subject: req.body.Subject,
    Text: req.body.Text,
    URL: req.body.URL,
    Date: req.body.Date,
    user: userId
  });

  await sampleData.save().then(() => {
    console.log("the data has been stored !");
    res.status(200).json({ message: "Email data saved successfully!" });

  });
});
// My dieary data handler 
app.post("/MyDiary" , verifyToken , async (req , res)=> {
  
   console.log("Diary data is recieved",req.body);
   data = req.body;  
   let sampleData = new Diary(
    { 
      date : data.date,
      heading : data.heading ,
      text : data.text,
      user: req.user.id,
    }
   )
   await sampleData.save().then( ()=> {
    console.log("the Diary data has been stored ")
   })
   .catch( (error)=> {
    res.status(500).json({
      success: false,
      message: "The email could not be deleted due to a server issue.",
      error: error.message, // optional: include actual error for frontend debugging
    });
   })
  }
)
// Delete Data
app.get("/delete" , async(req , res)=> {
    
  let deleted = await Email.deleteMany({});
  console.log("deleted");
})
//DelteUser
app.get("/deleteUser" , async(req , res)=> {
    
  let deleted = await user.deleteMany({});
  console.log("user deleted");
})
// Cron
cron.schedule(" * * * * * ", async () => {
  console.log("🕒 Cron fired at:", new Date().toISOString());

  let now = new Date();
  let start = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours() + 5,
    now.getUTCMinutes() + 30,
    now.getUTCSeconds() - 40 // ← backs up by 40 seconds
  );
  
  let end = new Date(start.getTime() + 60000);
//   console.log("Query Start:", start.toISOString());
//  console.log("Query End:", end.toISOString());
  
  let Datas = await Email.find({ Date: { $gte: start, $lt: end } });

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
   if(Datas.length === 0){
    console.log("No Email Schedule")
   }else{
    for(let data of Datas) {
    
    const emailData = {
      from: "vvnsequeira925@gmail.com",
      to: data.To,
      subject: data.Subject,
      html: data.Text,
    };

    if (data.URL && data.URL.trim() !== "") {
      emailData.attachments = [
        {
          filename: "image.jpg",
          path: data.URL
        }
      ];
    }
    

    console.log("Attempting to send email...");

    try {
      const info = await transporter.sendMail(emailData);
      console.log("✅ Email sent:", info.response);
      await Email.updateOne({ _id: data._id }, { $set: { sent: true } });
      console.log("📬 Marked as sent:", data._id);
  
    } catch (err) {
      console.error("❌ Email send error:", err);
    }

    
  };
   }
});

// find user 
app.get("/finduser" , async(req , res)=> {
    let finduser = await user.findById("68962ae3f3b6cff826937b87")
    console.log(finduser);
})

//delete Email
app.delete("/api/deleteEmail/:id" , verifyToken ,  async(req, res)=> {
   
      const id = req.params.id;
    try {
      await Email.findOneAndDelete({_id : id});
      res.send("the id is deleted");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "The email could not be deleted due to a server issue.",
        error: error.message, // optional: include actual error for frontend debugging
      });
    
    }

})
//delete Diary
app.delete("/api/deleteDiary/:id" , verifyToken ,  async(req, res)=> {
   
      const id = req.params.id;
    try {
      await Diary.findOneAndDelete({_id : id});
      res.send("the id is deleted");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "The Diary could not be deleted due to a server issue.",
        error: error.message, 
      });
    
    }

})


