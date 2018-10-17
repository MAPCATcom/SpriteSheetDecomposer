var fs = require('fs');
var PNG = require('node-png').PNG;

if (process.argv.length <= 2) {
    throw('sprite sheet name not specified');
}
var spriteSheetName = process.argv[2];
console.log('Sprite sheet name: ' + spriteSheetName);

var spriteSheetJsonFileName = 'assets/' + spriteSheetName + '.json';
console.log('Reading sprite sheet json file from: ' + spriteSheetJsonFileName);
var jsonFile = fs.readFileSync(spriteSheetJsonFileName, 'utf8');
var spriteSheet = JSON.parse(jsonFile);

var spriteSheetPngFileName = 'assets/' + spriteSheetName + '.png';
console.log('Reading sprite sheet png file from: ' + spriteSheetPngFileName);
fs.createReadStream(spriteSheetPngFileName)
    .pipe(new PNG({filterType: 4})).on('parsed', function() {
        console.log('png width: ' + this.width);
        console.log('png height: ' + this.height);
        for (var iconName in spriteSheet) {
            var icon = spriteSheet[iconName];
            console.log(iconName + ' width: ' + icon.width + ', height: ' + icon.height);        
            var sprite = new PNG({width: icon.width, height: icon.height});
            this.bitblt(sprite, icon.x, icon.y, icon.width, icon.height, 0, 0);
            var spriteFileName = iconName + '.png';
            sprite.pack().pipe(fs.createWriteStream('assets/output/' + spriteFileName));
            console.log('Written png: ' + spriteFileName);
        }
    });