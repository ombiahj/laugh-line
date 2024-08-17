import express from "express";
import axios from "axios";
// Create an Express application instance
const app = express();
// Set the port number for the server to listen on.
const PORT = 3000;
const SINGLE_JOKE_API_URL = "https://v2.jokeapi.dev/joke/Any?type=single";
const TWO_PART_JOKE_API_URL = "https://v2.jokeapi.dev/joke/Any?type=twopart";
const JOKE_FILTER = "blacklistFlags=racist,sexist,explicit"; // Set the filter for the JokeAPI - remove or add as you wish

app.use(express.static("public")); // Serve static files from the "public" directory
app.set("view engine", "ejs"); // Set the view engine to EJS.
app.use(express.json()); // For parsing application/json

// Render the index page with no joke.
app.get("/", (req, res) => {
  res.render("index", { joke: null });
});

// Fetch a single joke from the JokeAPI and render it on the index page.
app.get("/single-joke", async (req, res) => {
  try {
    const response = await axios.get(`${SINGLE_JOKE_API_URL}&${JOKE_FILTER}`);
    const result = response.data;
    res.render("index", { joke: result.joke, category: result.category });
  } catch (error) {
    console.error("Error fetching joke:", error);
    res.render("index", { joke: null });
  }
});

// Fetch a two-part joke from the JokeAPI and render it on the index page.
app.get("/two-part-joke", async (req, res) => {
  try {
    const response = await axios.get(`${TWO_PART_JOKE_API_URL}&${JOKE_FILTER}`);
    const result = response.data;
    res.render("index", {
      joke: result.setup,
      punchline: result.delivery,
      category: result.category,
    });
  } catch (error) {
    console.error("Error fetching joke:", error);
    res.render("index", { joke: null });
  }
});

app.post("/rate-joke", (req, res) => {
  const { jokeId, rating } = req.body;
  // console.log("Received Rating:", rating); // Debugging line to check the rating value in the backend
  if (!jokeId || !rating) {
    return res.status(400).json({ error: "Missing jokeId or rating" });
  }
  // Logic to save the rating but no database for now
  res.json({ success: true, message: "Rating submitted successfully!" }); // send a message to the browser console
});

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
