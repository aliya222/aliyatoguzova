var http = require("http")
var fs = require("fs");

function serveStaticFile(messageType, path, contentType, responseCode){
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err) {
            messageType.writeHead(500, {"Content-Type":"text/plain"})
            messageType.end("500 - Internal error")
        }
        else{
            messageType.writeHead(responseCode, {"Content-Type": contentType});
            messageType.end(data)
        }
    })
}
http.createServer(function(req,res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/,"").toLowerCase();
   switch(path) {
       case "":
           serveStaticFile(res, "/index.html","text/html")
           break;
       case "/about":
           serveStaticFile(res, "/about.html","text/html")
           break; 
       case "/img/about":
           serveStaticFile(res, "/img/about.jpg","image/jpeg")
           break;
        case "/img/welcome":
           serveStaticFile(res, "/img/welcome.jpg","image/jpeg")
           break;
        case "/img/cry":
            serveStaticFile(res, "/img/cry.jpg","image/jpeg")
            break;
        case "/style":
            serveStaticFile(res, "/style.css","text/css")
            break;
       default :
           serveStaticFile(res, "/error.html","text/html", 404)
           break;
   }
   }).listen(3000)
console.log("The server has started")