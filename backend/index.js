require("dotenv").config();

const express = require("express"),
  app = express(),
  nodemailer = require("nodemailer"),
  cron = require("node-cron"),
  PORT = process.env.PORT || 8000,
  cors = require("cors"),
  Email = require("./Schema/SendEmailSchema"), // Email Model
  Diary = require("./Schema/DiarySchema"), // Diary Model
  user = require("./Schema/userSchema"), // User Model
  Todo = require("./Schema/TodoSchema"), // Todo Model
  { verifyToken } = require("./Middlewares/Middlewares"), // Middleware
  mongoose = require("mongoose"), // Mogoose
  bodyParser = require("body-parser"),
  URL = process.env.MONGO_URL;

const { GoogleGenerativeAI } = require("@google/generative-ai"); // Ai

const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Use cookieParser

app.use(
  cors({
    origin: process.env.FRONTEND_LINK,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Required to parse JSON bodies

app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

function compareAsync(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

app.listen(PORT, () => {
  console.log("app is connected to the ", PORT);
  mongoose.connect(URL);
  console.log("Mongo DB is connected ");
});

app.get("/api/getEmail", verifyToken, async (req, res) => {
  console.log(req.user);
  let userEmails = await Email.find({ user: req.user.id });
  res.json(userEmails);
});

app.get("/api/getDiary", verifyToken, async (req, res) => {
  const Diarys = await Diary.find({ user: req.user.id });
  res.send(Diarys);
});

// Logout
app.post("/api/logout", verifyToken, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  res.send("you are logged out ");
});
// Login
app.post("/login", async (req, res) => {
  try {
    console.log("Enterd the Login verification route ");
    const data = req.body;
    console.log("the data that user sent ", data);
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

    const vivi = jwt.sign(
      { email: findUser.email, id: findUser._id, PNO: findUser.PNOO },
      "viviviviv"
    );

    res.cookie("token", vivi, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    console.log("Login was successful");
    res.status(200).json({
      success: true,
      message: "Login successful",
    });
    res.send("login successfullllll ");
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong during login.",
    });
  }
});
// SignUP
app.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    let UniqEmail = await user.findOne({ email: data.email });
    console.log(UniqEmail);
    if (UniqEmail) {
      console.log("the user Email is alredy Exist");
      throw Error("the User with this Email alredy exist Please SignUp");
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);

        const sampleuser = new user({
          username: data.username,
          email: data.email,
          password: hash,
          PNOO: data.PNO,
        });

        await sampleuser.save();
        console.log("User login details are stored");

        console.log("now checking the user and creating cookie for the user ");
        const findUser = await user.findOne({ email: data.email });
        console.log("the user that logged in just now : ", findUser);

        const vivi = jwt.sign(
          { email: findUser.email, id: findUser._id, PNO: findUser.PNOO },
          "viviviviv"
        );

        res.cookie("token", vivi, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          maxAge: 1000 * 60 * 60 * 24,
        });

        res.send(sampleuser);
      } catch (error) {
        console.error("Signup failed:", err);
        res.status(400).json({
          success: false,
          message: error.message,
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
app.post("/GetEmail", verifyToken, async (req, res) => {
  console.log(req.body);
  const token = req.cookies.token;
  const decode = jwt.verify(token, "viviviviv");
  const userId = decode.id;
  console.log("the user id from the token is ", userId);

  let sampleData = new Email({
    To: req.body.To,
    Subject: req.body.Subject,
    Text: req.body.Text,
    URL: req.body.URL,
    Date: req.body.Date,
    user: userId,
  });

  await sampleData.save().then(() => {
    console.log("the data has been stored !");
    res.status(200).json({ message: "Email data saved successfully!" });
  });
});
// My dieary data handler
app.post("/MyDiary", verifyToken, async (req, res) => {
  try {
    console.log("Diary data is received", req.body);
    const data = req.body;

    const sampleData = new Diary({
      date: data.date,
      heading: data.heading,
      text: data.text,
      user: req.user.id,
    });

    await sampleData.save();
    console.log("The Diary data has been stored");

    res.status(201).json({ message: "Data has been stored" });
    console.log("res sent ");
  } catch (error) {
    console.error("Error storing diary:", error);
    res.status(500).json({
      success: false,
      message: "The diary could not be stored due to a server issue.",
      error: error.message,
    });
  }
});
// Delete Data
app.get("/delete", async (req, res) => {
  let deleted = await Email.deleteMany({});
  console.log("deleted");
});
//DelteUser
app.get("/deleteUser", async (req, res) => {
  let deleted = await user.deleteMany({});
  console.log("user deleted");
});
// Cron Job-1
cron.schedule(" * * * * * ", async () => {
  console.log("🕒 Cron for Email fired at:", new Date().toISOString());

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
  if (Datas.length === 0) {
    console.log("No Email Schedule");
  } else {
    for (let data of Datas) {
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
            path: data.URL,
          },
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
    }
  }
});

// find user
app.get("/finduser", async (req, res) => {
  let finduser = await user.findById("68962ae3f3b6cff826937b87");
  console.log(finduser);
});

//delete Email
app.delete("/api/deleteEmail/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await Email.findOneAndDelete({ _id: id });
    res.send("the id is deleted");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The email could not be deleted due to a server issue.",
      error: error.message, // optional: include actual error for frontend debugging
    });
  }
});
//delete Diary
app.delete("/api/deleteDiary/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await Diary.findOneAndDelete({ _id: id });
    res.send("the id is deleted");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The Diary could not be deleted due to a server issue.",
      error: error.message,
    });
  }
});

// AI
app.post("/api/Ai", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const { prompt } = req.body;
    const result = await model.generateContent(prompt);

    const output = result.response.text();

    res.send(output);
    console.log(output);
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Something went wrong");
  }
});
// Email Safty check
app.post("/haveibeenpawned", verifyToken, async (req, res) => {
  const { email } = req.body;
  console.log("📩 Incoming email:", email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await axios.get(
      "https://breachdirectory.p.rapidapi.com/",
      {
        params: { func: "auto", term: email },
        headers: {
          "x-rapidapi-host": "breachdirectory.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    console.log("✅ RapidAPI response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ RapidAPI error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
});

app.post("/Settodo", verifyToken, async (req, res) => {
  const { PNO } = req.user;
  let data = req.body;
  let sampleTodo = new Todo({
    date: data.date,
    todo: data.todo,
    PNOO: PNO,
    user: req.user.id,
  });
  console.log(sampleTodo);
  await sampleTodo.save();
  return res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
  });
});

// Send Msg Job-2
cron.schedule(" * * * * * ", async (req, res) => {
  console.log("🕒 Cron for Msg is  fired at:", new Date().toISOString());
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
  let Datas = await Todo.find({ date: { $gte: start, $lt: end }, done: false });
  if (Datas.length === 0) {
    console.log("No Todo is  Schedule");
    return;
  }

  const accountSid = process.env.TWILLO_ACCOUNT_SID;
  const authToken = process.env.TWILLO_AUTH_CODE;
  const client = require("twilio")(accountSid, authToken);

  for (let data of Datas) {
    const P = data.PNOO;
    console.log("the value of Phone no is : ", P);
    const work = data.todo;
    const prompt = `
   Write a 4 to 5 line friendly reminder message to a user about their pending work.
   The work they need to complete is: "${work}".
   Make it encouraging, motivating, and positive (use emojis and with this msg also mention the website URL so that user can navigate their and complete their task first and tick the todo as done in the website  , the URL is ' nostalgia-theta.vercel.app '   ).
   `;

    const resp = await axios.post(`${process.env.BACKEND_LINK}/api/Ai`, {
      prompt,
    });

    try {
      const msg = await client.messages.create({
        from: "whatsapp:+14155238886",
        to: `whatsapp:${P}`,
        body: resp.data,
      });
      console.log("the mag has been sent to");

      await Todo.updateOne({ _id: data.id }, { $set: { done: true } });
      console.log("the todo is updated ");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
});

app.get("/deleteTodo", async (req, res) => {
  await Todo.deleteMany({});
  console.log("deleted everthing from Todo Model ");
});

app.delete("/todo/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findOneAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/todo/updateTodo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.updateOne({ _id: id }, { $set: { done: true } });
    return res.status(200).json({
      success: true,
      message: "Todo Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Update todo",
    });
  }
});

app.get("/getTodoList", verifyToken, async (req, res) => {
  const data = await Todo.find({ user: req.user.id });
  res.send(data);
});

// Schedule Msg's
app.post("/sendmsg", verifyToken, async (req, res) => {
  const { PNO } = req.user.PNO;
  const accountSid = process.env.TWILLO_ACCOUNT_SID;
  const authToken = process.env.TWILLO_AUTH_CODE;
  const client = require("twilio")(accountSid, authToken);
  const work = "complete your Project work";
  const prompt = `
   Write a 4 to 5 line congratulatory message to a user for completing their work.
   The work they completed is: "${work}".
   Make it friendly, encouraging, and motivating (use emojies ).
   `;
  const resp = await axios.post(
    "/api/Ai",
    { prompt },
    { withCredentials: true }
  );

  try {
    const msg = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${PNO}`,
      body: resp.data,
    });
    console.log("the mag has been sent to");
    res.send(msg);
  } catch (error) {
    console.error("Error sending message:", err);
    res.status(500).send("Failed to send message ");
  }
});
