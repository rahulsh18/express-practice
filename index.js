const express = require('express');
const members = require('./Members');
const app = express();
const path = require('path');
const logger = require('./middleware/logger');
const { urlencoded } = require('express');
const exphbs = require('express-handlebars');


// Handlebars Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//init middleware
//app.use(logger);




//body parser middleware
app.use(express.json());
app.use(express.urlencoded( { extended:false } ));

//homepage route
app.get('/', (req,res) => res.render('index', {
    title: 'Member App',
    members
}));


//members API routes
app.use('/api/members', require('./routes/members'));



//set static folder
app.use(express.static(path.join(__dirname,'public')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
