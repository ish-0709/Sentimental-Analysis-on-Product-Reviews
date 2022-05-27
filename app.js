const express = require("express");
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const commentResult = (comment) => {
  return new Promise((resolve, reject) => {
    let result = "";
    let options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      args: [comment, ""], //An argument which can be accessed in the script using sys.argv[1]
    };
    PythonShell.run(
      "amazon_review_webappversion.py",
      options,
      function (err, result) {
        if (err) throw err;
        console.log("LINE 25 Result: ", result.toString());
        result = result.toString();
        console.log("finished");
        resolve(result);
      }
    );
  });
};

const urlResult = (url) => {
  return new Promise((resolve, reject) => {
    let result = "";
    let options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      args: ["", url], //An argument which can be accessed in the script using sys.argv[1]
    };
    PythonShell.run(
      "amazon_review_webappversion.py",
      options,
      function (err, result) {
        if (err) throw err;
        console.log("LINE 25 Result: ", result.toString());
        result = result.toString();
        console.log("finished");
        resolve(result);
      }
    );
  });
};

app.post("/", (req, res) => {
  console.log("COMMENT:", req.body.comment);
  let comment = req.body.comment;
  let url = req.body.url;
  let result;
  //for comment
  if (comment != "") {
    result = commentResult(comment);
  }
  //for url
  else {
    result = urlResult(url);
  }

  result.then((response) => {
    console.log("SERVER:" + response);
    res.send(response);
  });
});

app.listen(port, () => {
  console.log("SERVER STARTED.");
});
