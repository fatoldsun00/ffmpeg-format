const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const formDataReader = multer();
const { sLogConsoleError, sDebugError, sendResError } = require('./src/Services/errorHandler')
const { mode, corsAllowURL } = require('./src/config');
const port = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true })); 
app.use(formDataReader.array()); 
app.use(morgan('combined'));

app.use(cors({
	credentials: true,
  	origin: corsAllowURL,
  	optionsSuccessStatus: 204
}))



//Front routes
app.use('/api',require( './src/Routes/index' ))
app.use('/demo', require( './src/Routes/demo' ))

app.listen(port,'127.0.0.1', (err) => {
	console.log( `Running on PORT: ${port}` );
	console.log( `Mode: ${mode}` );
});

//Gestionnaire d'erreur
app.use(sDebugError)
//if (mode == 'dev') app.use(sLogConsoleError)

//Error send
app.use(sendResError)

/****************Uncaught execption fallback*****************/
process.on('uncaughtException', function(err) {  
	console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!uncaught exception:!!!!!!!!!!!!!!!!!!!!!!!!!!!', err.stack || err);
  });

/****************Fermeture *****************/
process.on('SIGINT', async function() {
	try{
	 //TODO
	}catch(err){
	  console.log("Erreur de fermeture \n",err);
	}finally{
	  console.log("Comme l'a si bien dit Giscard : Au revoir");
	  process.exit();
	}
  });

  module.exports = app