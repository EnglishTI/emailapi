
const express = require("express");
const app = express();
const port=process.env.PORT ? Number(process.env.PORT) : 3000;
app.use(
    express.urlencoded({
        extended:true,
    }),
)
app.use(express.json())
app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
 });
const { sendTestEmail } = require("./Email");

app.get("/", (req, res) => {
  res.send("Aviso: Run /send-email to send test email ");
});

app.post("/send", async (req,res) => {
  try {
    const info = await sendTestEmail(req.body);
    res.send(info);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});