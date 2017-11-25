// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var algoliasearch = require('algoliasearch');
const ogs = require('open-graph-scraper');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static('public'));

var client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_KEY);
var index = client.initIndex('coolthings');



app.post('/post', function(req, res) {
    var title = req.body.title;
    var url = req.body.url;
    var text = req.body.text;

    var object = {
      title: title,
      url: url,
      text: text,
      meta: {
        createdAt: + new Date(),
      },
      karma: 0
    };
  
  
    if(url) {
      ogs({url: url, timeout: 4000}, function (error, results) {
        if(!error){
          object['og'] = results.data
        }
        
        
        index.addObject(object, function(err, content) {
        console.log(content);
      
        if(!err) {
          res.sendFile(__dirname + '/views/success.html');
        } else {
          res.status(500).send({ error: err })
        }
        
      });

    });
      
    }

  
});

app.post('/upvote', function(req, res) {
  const {id} = req.body;
  
  index.partialUpdateObject({
      karma: {
        value: 1,
        _operation: 'Increment'
      },
    objectID: id
  }, function(err, content) {
    console.log(content + err);
    res.status(200).send(content + err)
  });
  
  
})




app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/success", function (request, response) {
  response.sendFile(__dirname + '/views/success.html');
});


app.get("/submit", function (request, response) {
  response.sendFile(__dirname + '/views/submit.html');
});

app.get("/about", function(req,res) {
  res.sendFile(__dirname +'/views/about.html')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
