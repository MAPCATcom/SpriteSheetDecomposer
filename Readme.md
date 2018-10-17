# Mapbox sprite sheet decomposer
This tool can be used to decompose Mapbox sprite sheets into separate png images.

## How to build
```console
npm install
```

## Usage
```console
npm start -- {sprite sheet name}
```

### Example

You have a sprite sheet named _sprites_, so you have __sprites.png__ and __sprites.json__.
You should put the 2 files into the __assets__ folder.
Then you would run:
```console
npm start -- sprites 
```

The generated files are put in the __assets/output__ directory, which should already exist.
