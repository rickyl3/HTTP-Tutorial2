const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello there');
});

const courses = [
    {id: 1, name: 'Web Development'},
    {id: 2, name: 'IT'},
    {id: 3, name: 'Cybersecurity'},
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course);
    if (!course) {
        res.status(404).send("The course with the given ID was not found");
        return
        // Return to stop the process before it can send an undefined course
    }
    res.send(course);
})


// HTTP POST Requests
app.post('/api/courses', (req,res) => {
    // you write the if code here
    //add an if statement so that the name of the course you post is .min(3) character
    let course;
    console.log(req.body.name.length);
    if (req.body.name.length > 3) {
        course = {
            //we assign an ID and a name property
            id: courses.length +1,
            name:req.body.name
        }
    }
    res.status(404).send("Name is required and it should be a minimum of 3 characters");
    console.log(course);
            //YOU WRITE THE NEXT LINES OF code
          //next step: push it to the array
            //next step: the server should return the new resource to the client in the body of the response
    courses.push(course);
    res.send(course);  
    });

    

app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})