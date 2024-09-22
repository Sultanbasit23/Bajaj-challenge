const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestLowercase = alphabets.filter((char) => char.length === 1 && char === char.toLowerCase()).sort((a, b) => b.localeCompare(a))[0] || [];

  const fileValid = !!file_b64;
  const fileMimeType = fileValid ? "application/octet-stream" : undefined;
  const fileSizeKb = fileValid ? Math.round((file_b64.length * 0.75) / 1024) : undefined;

  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
