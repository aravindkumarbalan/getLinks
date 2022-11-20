const http = require('http');
var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
const server = http.createServer();
var arrLinks = []
arrLinks.push('http://entrepreneur.com/');
var crawledUrl = {'/':arrLinks};
console.log(crawledUrl);

server.on('request', async (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	res.setHeader('Content-Type', 'text/json');
	var mainUrl = false;

		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		if(url_parts.query.url != null) {
		 
		  
			  
				   try {
				
					  let response_body = await getPromise(query);
					  res.end(JSON.stringify(response_body));
				   }catch (err) {
					 let response_body = [];
					 res.end(JSON.stringify(response_body));
				  }
		
		
	 
		}
	//});
	
  
});

function someAsyncFunc() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({data: 1});
        }, 1000);
    });
}
var webLinks = [];
function getPromise(websiteLink) {
	console.log(websiteLink);
	return new Promise((resolve, reject) => {
		request(websiteLink, function(err, resp, body){
			if (err) reject(err);
            if (resp.statusCode != 200) {
                reject('Invalid status code <' + resp.statusCode + '>');
            }
			$ = cheerio.load(body);
			  links = $('a');
			  $(links).each(function(i, link){
				var href = $(link).attr('href');
				webLinks.push(href);
			  });

            resolve(webLinks);
			  
		});
	});
}

//server.listen(3000);

server.listen('3000', 'localhost', () => {
		  console.log(`Server running at http://localhost:3000/`);
		});