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
    let course;
    console.log(req.body.name.length);
    if (req.body.name.length > 3) {
        course = {
            id: courses.length +1,
            name:req.body.name
        }
        courses.push(course);
        res.send(course);
        console.log(courses); 
    } else {
        res.status(404).send("Name is required and it should be a minimum of 4 characters");
    }
    });

// HTTP PUT Requests
app.put('/api/courses/:id', (req, res) => {
    console.log(courses);
    originalCourse = courses[req.body.id - 1];
    if (originalCourse !== undefined) {
        newCourse = {
            id: req.body.id,
            name: req.body.name
        }
        courses[req.body.id - 1] = newCourse;
        res.send(newCourse);
        console.log(courses);
    } else {
        res.status(404).send("Course does not exist");
    }
});

// HTTP DELETE Requests
app.delete('/api/courses/:id', (req, res) => {
    originalCourse = courses[req.body.id - 1];
    index = courses.indexOf(originalCourse);
    if (originalCourse !== undefined) {
        courses.splice(index, 1);
        res.send(originalCourse);
    } else {
        res.status(404).send("Course does not exist");
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})

// By using backend HTTP requests, different programs can communicate 
// with each other by relaying information that is sent to one another. 
// Each program can then utilize this type of information in order to 
// perform their respective tasks. For example, in a music app, by clicking a 
// button that adds a song to a playlist, it gets the array for that specific playlist 
// and adds the song to it. Then, you can go to the playlist and when you press the play 
// button, you are sending a request for the array of songs and ask it to play each song.
