require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const globalErrorHandlerMw = require("./middlewares/globalErrorHandler.mw.js");
const app = express();
const port = process.env.port || 5000;
app.use(express.json());
app.use(cors());
// DB Connection
connectDB();

const models = path.join(__dirname, "/models");
fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(path.join(models, file)));

// app.use('/auth', require("./routes/auth.rt.js"));
// app.use('/admin', require("./routes/admin.rt.js"));

fs.readdirSync("./routes").forEach((file) => {
  if (file.substr(-3) == ".js") {
    let route = require(`./routes/${file}`);
    let routeName = file.slice(0, -6);
    app.use(`/${routeName}`, route);
    route.stack.forEach((route) => {
      if (route.route) {
        let routePath = route.route.path;
        let routeMethod = route.route.methods;
        console.log(
          `Route: ${JSON.stringify(routeMethod)}, ${routeName}${routePath}`
        );
      }
    });
  }
});

app.use(globalErrorHandlerMw);

app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
