require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms-demo';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('Mongo connected'))
  .catch(err=>console.error('Mongo connect err', err));

app.use('/api/courses', require('./routes/courses'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/summarize', require('./routes/summarize'));
app.use('/api/payment', require('./routes/payment'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req,res) => res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html')));
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=> console.log('Server started on', PORT));
