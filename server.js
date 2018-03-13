var CryptoJS = require('crypto-js');
var mysql = require('mysql');
var express = require('express')
var bodyParser = require('body-parser');
require('dotenv').config();
var app = express();

var multer = require('multer');
var path = "src/assets/addPictures/";
const upload = multer({dest: path});
var token = require('crypto-token');
var moment = require('moment');

app.listen(3030, function () {
  console.log('Express server is online on port 3030!');
});

//#region Connection to DB and App-use
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

connection.connect(function(err) {
  console.log(err);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({uploadDir: "src/assets/addPictures/"}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//#endregion

//#region Get methods
app.get('/GetRoadGroupsMembers', function(req,res){
  connection.query('SELECT * FROM RoadGroupMembers', 
  function(error,result)
  {
    res.send({members: result});
  });
});

app.get('/GetMarkedWeeksForSpecificUsers', function(req,res){
  connection.query('SELECT * FROM RoadGroupMembersXMarkedWeeks', 
  function(error,result)
  {
    res.send({markedWeeks: result});
  });
});

app.get('/GetGroupNumbers', function(req,res){
  connection.query('SELECT * FROM RoadGroups', 
  function(error,result)
  {
    res.send({groupNumbers: result});
  });
});

app.get('/GetSalesItems', function(req,res){
  connection.query('SELECT * FROM SalesItems', 
  function(error,result)
  {
    res.send({items: result});
  });
});
//#endregion
//#region Post

//#region Road work 
app.post('/RoadBookForPerson', function(req, res) {
  const user = {userId: req.body.userId, markedWeekId: req.body.markedWeek, markedOrNot: req.body.markedOrNot};
  if (user.markedOrNot == 0)
  {
    connection.query('DELETE FROM RoadGroupMembersXMarkedWeeks WHERE PersonId = ' + "'" + user.userId +  "'" + ' AND MarkedWeeksId = ' + "'" + user.markedWeekId +  "'",
    function(error, result){
      if (result == 0)
      {
        res.send({result: false});
      }
      else
      {
        res.send({result: "borttagen tid"});
      }
    });
  }
  else 
  {
    connection.query('INSERT INTO RoadGroupMembersXMarkedWeeks (PersonId, MarkedWeeksId) VALUES (' + user.userId + "," + user.markedWeekId +  ')',
    function(error, result){
      if (result == 0)
      {
        res.send({result: false});
      }
      else
      {
        res.send({result: "bokad tid"});
      }
    });
  }
});
//#endregion Road work

//#region  Sign in
app.post('/SignIn', function(req, res) {
  const user = {usermail: req.body.email, userpassword: req.body.password};
  connection.query('SELECT * FROM Login WHERE Email = "' + user.usermail + '" AND Password = "' + user.userpassword + '"', 
  function(error,result)
  {
    let hashResult = "";
    let sendResult = "";
    if (result != 0)
    {
      let tokenInsertedOrNot = setToken(2);
      console.log(tokenInsertedOrNot);
      if (tokenInsertedOrNot == true)
      {
        hashResult = CryptoJS.SHA256("klm234YiP?").toString(CryptoJS.enc.Hex);
        res.send({result: hashResult});
      }    
    }
    else 
    {
      hashResult = CryptoJS.SHA256("YiaZ2710?!B").toString(CryptoJS.enc.Hex);
      res.send({result: hashResult});
    }
  });
});
//#endregion Sign in

//#region Update user
app.post('/ChangeEmail', function(req, res) {
  const newCredentials = {newEmail: req.body.newEmail};  
  connection.query('UPDATE Login SET Email = "' + newCredentials.newEmail + '"',
  function(error, result){
    if (result == 0)
    {
      res.send({result: "Något gick fel, vänligen försök igen"});
    }
    else
    {
      res.send({result: "Email uppdaterad"});
    }
  });
});

app.post('/ChangePassword', function(req, res) {
  const newCredentials = {newPassword: req.body.newPassword};  
  connection.query('UPDATE Login SET Password = "' + newCredentials.newPassword + '"',
  function(error, result){
    if (result == 0)
    {
      res.send({result: "Något gick fel, vänligen försök igen"});
    }
    else
    {
      res.send({result: "Lösenordet uppdaterat"});
    }
  });
});
//#endregion Update user

//#region Sales items


app.post('/NewAdd', upload.single('image'), function(req, res) {
  const add = {heading: req.body.heading, text: req.body.text};
  var file = {file: req.body.file, filename: req.body.filename};
  console.log(req.file);
  req.file.filename = req.file.originalname;
  req.file.path = req.file.destination + req.file.filename;
  console.log(req.file);
  let subheading = "";
  const loginId = 2;
  let picSavedOrNot = false;
  let addAddedOrNot = false;
  let latestId;

  res.send({hej: "hej"});
  //Save file to folder



  /* 
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/assets/addPictures/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()) //Appending .jpg
    }
  })

  // var upload = multer({ storage: storage }).single(file.file);

  upload(req,res,function(err){
    if(err)
    {
      console.log(err);
      res.send(err);
    }
    res.send("File uploaded");
  });
  
  
  */

  /*
  // If file is added to this folder wihtout error. Insert a new sales item in the db
  if (picSavedOrNot == true)
  {
    connection.query('INSERT INTO SalesItems (Heading,Category,Text,LoginId) VALUES ('+add.heading+","+subheading+","+add.text+","+loginId+")",
    function(error, result){
      if (result == 0)
      {
        addAddedOrNot = false;
        res.send("Gick fel vid infogande av salesItem");
      }
      else
      {
        addAddedOrNot = true;
      }
    });
  }

  //If the add is added without any errors, select the id for that row
  if (addAddedOrNot == true)
  {
    connection.query('SELECT Id FROM SalesItems ORDER BY ID DESC LIMIT 1',
    function(error, result){
      if (result == 0)
      {
        console.log("Hittade inget id");
        res.send("Gick fel vid hämtande av senaste salesItem id");
      }
      else
      {
        latestId = result[0].Id;
      }
    });
  }

  //When the id for the latest row is found we can the insert the pathway to the file that has been saved
  if (latestId != undefined)
  {
    connection.query('INSERT INTO SalesItemPic (Pathway, Filename, SalesItemId) VALUES ('+path+file.file+","+file.filename+","+latestId+")",
    function(error, result){
      if (result == 0)
      {
        res.send("Funkade inte att infoga ny salesItemPic");
      }
      else
      {
        res.send("Annons skapad");
      }
    });
  }
  */
});

app.post('/ChangeAdd', function(req, res) {
  const addToUpdate = {changeId: req.body.changeId, changeHeading: req.body.changeHeading, changeText: req.body.changeText};
  connection.query('UPDATE SalesItems SET Heading = "' + addToUpdate.changeHeading + '", Text = "' + addToUpdate.changeText + '" WHERE Id = ' + addToUpdate.changeId,
  function(error, result){
    if (result == 0)
    {
      res.send({result: "Något gick fel, vänligen försök igen"});
    }
    else
    {
      res.send({result: "Annons uppdaterad"});
    }
  });  
});

app.post('/RemoveAdd', function(req, res) {
  const addToDelete = {deleteId: req.body.deleteId};
  connection.query('DELETE FROM SalesItems WHERE Id = ' + addToDelete.deleteId,
  function(error, result){
    if (result == 0)
    {
      res.send({result: "Något gick fel, vänligen försök igen"});
    }
    else
    {
      res.send({result: "Annons borttagen"});
    }
  });
});
//#endregion Sales items

//#endregion Post

//#region Handle token
function setToken(loginId)
{
  let tokenToSet = token(32);
  const tokenCreatedAt = new Date().toLocaleString();
  let tokenExpiresAt = new Date();
  tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 3);
  let tokenExpiresAt2 = tokenExpiresAt.toLocaleString();
  let tokenCreatedOrNot = false;

  
  connection.query('INSERT INTO TokenTable (Value, LoginId, CreatedAt, ExpiresAt, Valid) VALUES ("' + tokenToSet + '", ' + loginId + ', "' + tokenCreatedAt + '", "' + tokenExpiresAt2 + '", ' + 1 + ")",
  function(error, result){
    if (result == 0)
    {
      tokenCreatedOrNot = false;
      console.log(tokenCreatedOrNot);
      return tokenCreatedOrNot;
    }
    else
    {
      tokenCreatedOrNot = true;
      console.log(tokenCreatedOrNot);
      return tokenCreatedOrNot;
    }
  });
}




function validateToken(token)
{
  
}
//#endregion

