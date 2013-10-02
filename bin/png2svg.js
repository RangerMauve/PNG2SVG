#!/usr/bin/env node
var PNG2SVG = require("../");

var args = process.argv;

if(args.length === 0){
	console.log("Use: png2svg input.png [output.png]");
} else if(args.length == 1){
	PNG2SVG.fromFile(args[0],function(err,svg){
		console.log(svg||"");
	});
} else if(args.length == 2){
	PNG2SVG.fromFileToFile(args[0],args[1],function(err){
		if(err)console.err(err);
		else console.log("Image converted Successfully");
	});
} else {
	console.log("Too many arguments");
}