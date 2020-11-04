//Practice with Express and RESTful compliance with adding comments to a nameless app
const express = require('express'); 
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
uuid();

app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded( {extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//Example comments to use as list, will normall pull from database
let comments = [
    {
        id: uuid(),
        username: 'Jake',
        comment: 'This is the best!'
    },
    {
        id: uuid(),
        username: 'Phil',
        comment: 'Hey, I am not racist!'
    },
    {
        id: uuid(),
        username: 'Jeremiah',
        comment: 'I had  a bullfrog once...'
    },
    {
        id: uuid(),
        username: 'Sally',
        comment: 'I stole the bullfrog... shhh...'
    }
]

//Display the comments following the language of index.ejs
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})


app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
//redirect to the main comments page once a comment is submitted
    res.redirect('/comments');
})

//Get a specific comment by ID
app.get('/comments/:id', (req, res) =>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

//Make an update to a specific comment
app.patch('/comments/:id', (req, res) =>{
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})


//Edit a specific comment from the index page
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

//Delete a specific comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})


//TEST ROUTES, only used for testing
app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos.`)
})


//Listen on localhost:3000
app.listen(3000, () => {
    console.log("ON PORT 3000!")
})