Turn PNG sprites into SVG files and keep that blocky look at any resolution! 

# Use:

## Via code:
```javascript
var PNG2SVG = require("PNG2SVG");
PNG2SVG.fromFile("sprite.png",function(err, svg){
 // SVG looks like "<svg><rect><rect><rect></svg>"
}
```

## Via command line: (once up on NPM)
```bash
$ png2svg input.png output.svg
```
