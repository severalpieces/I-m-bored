import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try{
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
    const result = response.data[Math.floor(Math.random()*response.data.length)];
    res.render("index.ejs", {data: result});
  } catch(error){
    let errorMessage = error.message;
    if(error.response.status===404){
      errorMessage = "No activities that match your criteria."
    }
    console.error("Failed to filter activity: ", errorMessage);
    res.render("index.ejs", {error: errorMessage});
  }


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
