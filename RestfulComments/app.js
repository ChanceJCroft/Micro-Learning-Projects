//Practice with Express and RESTful compliance with adding comments to a nameless app
const express = require('express');
const app = express();
const path = require('path')

app.use(express.json())
app.use(express.urlencoded( {extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Example comments to use as list, will normall pull from database
const comments = [
    {
        username: 'Jake',
        comment: 'This is the best!'
    },
    {
        username: 'Phil',
        comment: 'Hey, I am not racist!'
    },
    {
        username: 'Jeremiah',
        comment: 'I had  a bullfrog once...'
    },
    {
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
    comments.push({username, comment});
//redirect to the main comments page once a comment is submitted
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