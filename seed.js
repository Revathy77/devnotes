import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Note from "./models/Note.js";

dotenv.config();

const demoUser = {
  name : "Test User",
  email: "test@devnotes.com",
  password: "demo1234"
};

const sampleNotes = [
  {
    title: "MongoDB connection string format",
    content: "mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/dbName?retryWrites=true&w=majority. Remember to whitelist the IP in Atlas Network Access, and never commit the real string to GitHub.",
    category: "Learning", favorite: true, daysAgo: 12
  },
  {
    title: "Standup notes - Monday",
    content: "Finished the note edit modal. Blocked on category dropdown styling. Plan to start the search/filter API today.",
    category: "Work", favorite: false, daysAgo: 9
  },
  {
    title: "Client meeting follow-up",
    content: "Client wants a due-date field on notes and a weekly email digest. Not in current scope - added to backlog for v2. Send updated timeline by Friday.",
    category: "Work", favorite: false, daysAgo: 7
  },
  {
    title: "JWT vs session auth",
    content: "JWT is stateless - server doesn't store session data, token itself holds the user id and expiry, verified with a secret key on each request. Good fit for small APIs without needing a session store.",
    category: "Learning", favorite: true, daysAgo: 6
  },
  {
    title: "Weekend trip planning",
    content: "Shortlisted Wayanad for long weekend. Need to book homestay by Thursday to get the early-bird rate. Check bus timings from the city.",
    category: "Personal", favorite: false, daysAgo: 4
  },
  {
    title: "Habit tracker app idea",
    content: "A minimal habit tracker: daily checklist, streak counter, and a calendar heatmap view. Could reuse the DevNotes auth/backend structure as a starting point.",
    category: "Ideas", favorite: true, daysAgo: 3
  },
  {
    title: "Bootstrap 5 modal without jQuery",
    content: "Bootstrap 5 dropped the jQuery dependency. For React apps, it's simpler to control modal visibility with your own state (show/hide) than to use the bootstrap.Modal JS API directly.",
    category: "Learning", favorite: false, daysAgo: 2
  },
  {
    title: "Books to read this month",
    content: "The Pragmatic Programmer, Clean Architecture, and Designing Data-Intensive Applications. Starting with the first one since it's the shortest.",
    category: "Personal", favorite: false, daysAgo: 1
  }
];

const seed = async () => {
  await connectDB();

  const existing = await User.findOne({ email: demoUser.email });
  if (existing) {
    await Note.deleteMany({ user: existing._id });
    await User.deleteOne({ _id: existing._id });
  }

  const hashedPassword = await bcrypt.hash(demoUser.password, 10);
  const user = await User.create({ ...demoUser, password: hashedPassword });

  const notesWithUser = sampleNotes.map(({ daysAgo, ...note }) => ({
    ...note,
    user: user._id,
    createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
  }));
  await Note.insertMany(notesWithUser);

  console.log("Demo data seeded successfully!");
  console.log(`Login with -> email: ${demoUser.email}  password: ${demoUser.password}`);
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
