const Joi = require('joi');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const courses =[
    {id:1 , name:'course1'},
    {id:2 , name:'course2'},
    {id:3 , name:'course3'}]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(findid => findid.id == parseInt(req.params.id));
    if(!course) res.status(404).send(`course with id : ${req.params.id} does not exist`);
    res.send(course);
});

app.post('/api/courses', (req, res)=>{
   // object validation 
   /* 1) make a schema 
   2) decides the shape of our object 
   3) type of each property 
   4) additional checks */

   const schema = Joi.object({
    name: Joi.string().min(3).required(),
  }).required();

   const validation = schema.validate(req.body);
   console.log(validation)
   //res.send(validation);
   
    // make a whole new object 
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
     
});

app.put('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('record not found');

    const schema = Joi.object({
        name : Joi.string().min(3).required(),
    }).required();

    const validate =  schema.validate(res.body)

    course.name = req.body.name;

    res.send(course);


});


app.listen(PORT, () => console.log(`Listen on port ${PORT}`));