require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/usersRoutes');
const articleRouter = require('./routes/articlesRoutes');

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.listen(PORT, console.log(`server is running on port ${PORT}`));
