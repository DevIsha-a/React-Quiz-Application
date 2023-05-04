const express = require('express');
let Subject = require("./models/subject");
let batches = require("./models/batches");
let Quizes = require('./models/exam')
let user = require('./models/user')
let examResults = require("./models/examResults")
const { MongoClient } = require('mongodb');
let mongoose = require('mongoose');
const subject = require('./models/subject');
let jwt= require("jsonwebtoken")
// const uri = "mongodb://0.0.0.0:27017/";
// const client = new MongoClient(uri);
const uri = 'mongodb://0.0.0.0:27017/naturalDB';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(express.json());


const middleWare= (req, res, next)=>{
  // console.log(req.headers)
  let token= req.headers.authorization
 if (!token)
 {
  // render('/')
  return res.status(401).send('Unauthorized');
  
 }
 else {
  try {
    let decoded= jwt.verify(token, 'randomsecretkey')

  next()
    
  } catch (error) {
    
  }

 }
  

}

//signup the new user
app.post('/signup', (req, res) => {
  let myuserdata = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type
  }
  let newUser = new user(myuserdata)
  newUser.save()
})

//signing in the existing user 
app.post('/signin', async (req, res) => {
  let mytoken = jwt.sign(req.body.name, 'randomsecretkey',)
  // console.log(mytoken)
  console.log(req.body)
  let currentUser = await user.find({ name: req.body.name })

  if (!(currentUser.length===0)) {
    res.send({currentUser,mytoken})
    console.log(currentUser)
  }
  else  {
    res.send("ni mila")
    console.log('ni mila')
  }

})

//fetch the existing batches data
app.get('/batches',middleWare, (req, res) => {
  batches.find({}, (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching data');
    } else {
      res.send(data)
    }
  });
});


//fetch the subjects of a particular batch
app.post('/subjects', middleWare, (req, res) => {
  subject.find({ b_name: req.body.batch }, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      res.send(data)
    }
  });
});


//add new subjects
app.post('/subjects/add',middleWare,  async (req, res) => {

  let subs = await subject.countDocuments();

  let data = {
    subId: subs + 1,
    b_name: req.body.b_name,
    title: req.body.title,

  };
  let newsubject = new Subject(data)
  newsubject.save();
  subject.find({ b_name: req.body.b_name }, async (error, data) => {
    res.send(data)
  });

});


//fetch exams of a particular subjects

app.post('/fetchExams',middleWare, async (req, res) => {

  try {
    let quiz = await Quizes.find({ sub_name: req.body.sub })
    let results = await examResults.find({ sub_name: req.body.sub, user_id: req.body.stu_id })

    res.send({ quiz, results })

  } catch (error) {
    // console.log(error)

  }
})




//saving new quiz responses from user 
app.post('/saveAnswers', async (req, res) => {

  
  try {
    let aData = {
      ex_id: req.body.e_id,
      sub_name: req.body.sub,
      user_id: req.body.stu_id,
      total_marks: req.body.l,
      obt_marks: req.body.result
    }
    let resp =await examResults.find({ex_id:req.body.e_id, user_id:req.body.stu_id})
    // console.log(resp.length)
   if(resp.length===0) {
      let newResult = new examResults(aData)
      newResult.save()
    }
    else
    res.send('already added')


  } catch (error) {

  }

})


//add new quiz, just for staff
app.post('/saveQuiz', async (req, res) => {
  let count = await Quizes.countDocuments()
  let quizd = Quizes.find({})
  const quizdata = {
    sub_name: req.body.sub_name,
    Question: req.body.exam

  };
  const updatedObject = {
    ...quizdata,
    ex_id: count + 1,
  };
  // console.log(quizdata)
  let newQuiz = new Quizes(updatedObject)
  newQuiz.save()

})






mongoose.connect("mongodb://0.0.0.0:27017/naturalDB", (err, conn) => {
  console.log(err || conn)
});
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
