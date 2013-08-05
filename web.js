var express = require("express"),
  http = require("http"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  CONF = require('./conf');

var app = express();

mongoose.connect(CONF.mongo_uri);

// ##### Configure ###########################
app.configure(function() {
  app.use(express.static(__dirname + '/static'));
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
});

// ##### Page Schema ######################

var pageSchema = new Schema({
  content: String,
  viewed: Boolean
});

var Page = mongoose.model('Page', pageSchema);

// ##### Views ############################
app.get('/', function(req, res){
  res.render('index.jade');
});

app.post('/create', function(req, res){
  var page = new Page({
    content : req.body.page,
    viewed : false
  });

  var url = page.save(function (err, page) {
    if (err) {
      console.log("error on posting page");
      res.redirect("/");
    }
    var url = CONF.root_url + "/b/" + page.id;
    res.render('created.jade', {"url": url});
  });
});

app.get("/b/:id", function(req, res){
  Page.findById(req.params.id, function (err, page) {
    if (err) {
      res.send(404);
    } else {
      if (page.viewed) {
        res.render('burned.jade');
      } else {
        page.viewed = true;
        page.save();
        res.render('burner.jade', {"page" : page.content});
      }
    }
  });
});

// ##### Server ###########################
var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log("Listening on " + port);
});
