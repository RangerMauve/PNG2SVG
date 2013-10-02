var PNG = require("png.js"), fs = require("fs");

function fromFileToFile(from, to, options, callback){
	if(options instanceof Function)callback=options,options={};
	options = options || {};
	
	fromFile(from,options,function(err,data){
		if(err){
			if(callback)return callback(err);
			else throw err;
		}
		fs.writeFile(to, data, callback);
	});
}

function fromFile(filename,options,callback){
	if(options instanceof Function)callback=options,options={};
	options = options || {};
	
	fs.readFile(filename,function(err,data){
		if(err){
			if(callback)return callback(err);
			else throw err;
		}
		fromBuffer(data,options,callback);
	});
}

function fromBuffer(buffer,options,callback){
	if(options instanceof Function)callback=options,options={};
	options = options || {};
	
	var reader = new PNG(buffer);
	reader.parse(function(err,png){
		if(err){
			if(callback)return callback(err);
			else throw err;
		}
		makeSvg(png,options,callback);
	});
}

function makeSvg(png, options, callback){
	if(options instanceof Function)callback=options,options={};
	options = options || {};
	
	// The alpha threshold for which pixels to convert to SVG rects
	var threshold = options.threshold||64;
	
	var result = '<svg viewbox="0 0 '+png.width+''+png.height+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\n';
	result+= '<!-- Made with PNG2SVG by RangerMauve -->'
	
	for(var x = png.width-1;x;--x)
		for(var y=png.height-1;y;--y){
			var pixel = png.getPixel(x,y);
			if(pixel[3] >= threshold)
				result+=
					'\t<rect x="'+x+
					'" y="'+y+
					'" fill="rgba('+
					pixel[0]+','+
					pixel[1]+','+
					pixel[2]+','+
					pixel[3]/255+
					')" width="1" height="1"/>\n';
		}
	
	result += "\n</svg>";
	callback(null,result);
}

module.exports = {
	fromFileToFile:fromFileToFile,
	fromFile:fromFile,
	fromBuffer:fromBuffer
};