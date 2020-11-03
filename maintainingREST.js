//Example of how to maintain RESTful compliance. Maintain standardization

username
text

GET /allcomments
GET /all
GET /showmeallcomments


POST /newcomment
POST /makecomment

//All comments
GET /comments - list all comments
POST /comments - create a new comment

//One specific comment
GET /comments/:id - Get one comment (using ID)
PATCH /comments/:id - Update one comment
DELETE /comments/:id - Destroy one comment

//Using Ruby syntex - Index, New, Create, Show, Edit, Update, Destroy - should be standardization within.