// Some  necessary modules
const path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer');

// Configure app
module.exports = (app)=>{
	app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: (timestamp)=>{
                console.log(timestamp);
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    app.use(morgan('dev'));
	// parse application/x-www-form-urlencoded 
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json 
    app.use(bodyParser.json())

	app.use(multer({ dest: path.join(__dirname, 'public/upload/temp')}));

	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));
	routes(app);
	
	app.use('/public/', express.static(path.join(__dirname, '../public')));

	if ('development' === app.get('env')) {
	   app.use(errorHandler());
	}

  	return app;
};

