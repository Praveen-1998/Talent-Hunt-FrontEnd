
var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var fs = require('fs');
var http = require('http')


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
      console.log(file);
    callback(null, Date.now()+file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});


app.get('/display',(req,res,next)=>{
    fs.readdir('uploads', (err, files) => {
        files.forEach(file => {
          console.log(file);  
        //   res.sendFile(__dirname + "/display.html");

           res.end(file)
        });
    
      });
    
})



app.listen(3000,function(){
    console.log("Working on port 3000");
});