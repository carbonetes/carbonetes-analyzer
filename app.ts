import       express         from 'express';
import       cors            from 'cors';
import       request         from "./service/request";
import * as  http            from 'http';
import * as  winston         from 'winston';
import * as  expressWinston  from 'express-winston';
import       { Common }      from './common/contants';


const {
        CARBONETES_PASSWORD,
        CARBONETES_USERNAME,
      }                                  = process.env;
const YAML                               = require('json-to-pretty-yaml');
const app:          express.Application  = express();
const port                               = 3000;
const server:       http.Server          = http.createServer(app);


////////////////////////////////////////
// Parse all incoming requests as JSON 
////////////////////////////////////////
app.use(express.json());

////////////////////////////////////////
// Allow cross-origin requests
////////////////////////////////////////
app.use(cors());


////////////////////////////////////////////////////////////////////////////////
// Preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
////////////////////////////////////////////////////////////////////////////////
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (process.env.DEBUG === "false") {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

///////////////////////////////////////////////////////////
// initialize the logger with the above configuration
///////////////////////////////////////////////////////////
app.use(expressWinston.logger(loggerOptions));

/////////////////////////////////////////////////////////////////
// simple route to make sure everything is working properly
/////////////////////////////////////////////////////////////////
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage);
});

///////////////////////////////////////
// POST request to analyze an image
///////////////////////////////////////
app.post('/analyze', (req: express.Request, res: express.Response) => {
    /////////////////////////////////////////////
    // validate required environment variables
    /////////////////////////////////////////////
    if (CARBONETES_PASSWORD === null || CARBONETES_PASSWORD === undefined) {
        console.log(Common.ERROR + Common.MISSING_PASSWORD);
        res.send(Common.ERROR + Common.MISSING_PASSWORD);
    } else if (CARBONETES_USERNAME === null || CARBONETES_USERNAME === undefined) {
        console.log(Common.ERROR + Common.MISSING_USERNAME);
        res.send(Common.ERROR + Common.MISSING_USERNAME);
    } else {
        runAnalysis(req, res);
    }
});

/////////////////////////////////////////////////
// Server running at http://localhost:${PORT}
/////////////////////////////////////////////////
server.listen(port, () => {
    console.log(Common.NOTES);
});

///////////////////
// Analysis...
///////////////////
async function runAnalysis(req: express.Request, res: express.Response) {

    ////////////////////
    // Request Body
    ////////////////////
    const   username                  = CARBONETES_USERNAME;
    const   password                  = CARBONETES_PASSWORD;
    const   registryUri               = req.body.registryUri;
    const   repoImageTag              = req.body.repoImageTag;
    let     output                    = req.body.output;
    let     analysisCheckerData : any = '';
    let     analysisResults     : any = '';
    
    console.log("Analyzing: " + repoImageTag + " ...");
    ////////////////////////
    // Sending workloads
    ////////////////////////
    request.analyzeImage({
        username : username,
        password : password,
        registryUri : registryUri,
        repoImageTag : repoImageTag,
        timeout : 500,
        policyBundleUUID : ''
    }).then(response => {
        if (response.data !== undefined) {
            analysisCheckerData = response.data;

            console.log("Getting the results of the analysis...");
            ///////////////////////////////
            // Getting the results
            ///////////////////////////////
            request.getAnalysisResult({
                ...analysisCheckerData
            }).then(response => {
                if (response.data !== undefined) {
                    analysisResults = response.data;
                    
                    ///////////////////////////////
                    // Getting the output type
                    ///////////////////////////////
                    if (output == "yaml" || output == "YAML") {
                        analysisResults = YAML.stringify(analysisResults);
                        output = "YAML";
                    } else {
                        output = "JSON";
                    }
        
                    console.log(Common.SUCCESS                      +
                                repoImageTag                        +
                                " has been analyzed successfully!"  +
                                Common.NEXTLINE                     +
                                "REGISTRY URI: "                    +
                                registryUri                         +
                                Common.NEXTLINE                     +
                                "OUTPUT TYPE: "                     +
                                output);
        
                    return res.status(200).send(analysisResults);
                } else {
                    console.log("There's an error while sending the request.");
                    res.send("There's an error while sending the request.");
                }
            }).catch(error => {
                analysisResults = error.respose.data;
                console.log(Common.ERROR + analysisResults);
                return res.send(Common.ERROR + analysisResults);
            });
        } else {
            console.log("There's an error while sending request.");
            return res.send("There's an error while sending the request.");
        }
    }).catch(error => {
        analysisCheckerData = error.response.data;
        console.log(Common.ERROR + analysisCheckerData);
        return res.send(Common.ERROR + analysisCheckerData);
    });

}