const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/storyLetters', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer');
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a author, receiver, date, tag, p).
const itemSchema = new mongoose.Schema({
  author: String,
  receiver: String,
  dateSent: Date,
  tag: String,
  text: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Create a new item in the museum: a author, receiver, date, tag, p1
app.post('/api/items', async (req, res) => {
  const item = new Item({
    author: req.body.author,
    receiver: req.body.receiver,
    dateSent: req.body.dateSent,
    tag: req.body.tag,
    text: req.body.text,
    // letID: makeID(req.body.author, req.body.receiver, p1
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async(req, res) => {
  try {
    await Item.deleteOne({_id: req.params.id});
    res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.put('/api/items/:id', async(req, res) => {
  try {
    let item = await Item.findOne({_id: req.params.id});
    item.author = req.body.author;
    item.receiver = req.body.receiver;
    item.dateSent = req.body.dateSent;
    item.tag = req.body.tag;
    item.text = req.body.text;
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})


app.listen(3001, () => console.log('Server listening on port 3001!'));
