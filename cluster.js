var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    for(var i = 0 ; i<numCPUs   ; i++){
        cluster.fork();
    }
    
    cluster.on('death',function(worker){
        console.log('worker'+worker.pid + ' died');
               });
    
}else{
    http.Server(function(req,res){
                res.writeHead(200);
                res.end("hello wolrd\n");
                }).listen(8000);
}
