const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

//MongoDB DATABASE 
const MONGODB_URI ='mongodb+srv://lemanou7:admin1234@mernapp.w6uyw.mongodb.net/mernapp?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI || 'mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('connected', ()=>{
    console.log("Mongoose is connected!")
})

//Schema
const Schema = mongoose.Schema;

const myBlogPostSchema = new Schema({
    title: String,
    body: String,
    date:{
        type: String,
        default: Date.now()
    }
});

//Model
const BlogPost = mongoose.model('BlogPost', myBlogPostSchema);

//Save Data to our Mongo Database
const data={
    title: "Welcome to my Channel",
    body: "I help folks become a fullstack web developer,and vlog about my sofware engineering"
};
//saving database
const newBlogpost = new BlogPost(data); // instance of the Model

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

  
//HTTP request logger
app.use(morgan('tiny'));

app.get('/api',(req,res)=>{
    BlogPost.find({})
        .then(data=>{
            res.json(data);
        })
        .catch((err)=>{
            console.log(`oops somethings hapened! ${err}`)
        })

});

app.get('/api/title',(req,res)=>{
    BlogPost.find({})
        .then(data=>{
            res.json(data[0].title);
        })
        .catch((err)=>{
            console.log(`oops somethings hapened! ${err}`)
        })

});


app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})

