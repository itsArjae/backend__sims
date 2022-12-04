const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json()); // so json data will work
app.use(cors()); // whitelist your computer
require("dotenv").config();

const db = require('./models');
const adminRouter = require('./routes/Admin');
app.use('/admin',adminRouter);
const scholarshipRouter = require('./routes/Scholarship');
app.use('/scholarship',scholarshipRouter);
const batchRouter = require('./routes/Batches');
app.use('/batches',batchRouter);
const scholarsRouter = require('./routes/Scholars');
app.use('/scholars',scholarsRouter);
const announcementsRouter = require('./routes/Announcements');
app.use('/announcements',announcementsRouter);
const userRouter = require('./routes/User');
app.use('/users',userRouter);

db.sequelize.sync().then(()=>{
  app.listen(process.env.PORT || 3001 , ()=> {
    console.log("Server running port "+ 3001);
  });
})

