// creates variable representing the canvas using the id that was assigned by us
const canvas = document.getElementById('canvas1');
// creates an instance of CanvasRenderingContext2D, allowing methods to be used.
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
// sets canvas size, needs to be same size as in the css styling.
// it is reccommended that the size be updated automatically in the future.
canvas.width = 800;
canvas.height = 450;
// constructs image object
const image1 = new Image()
// adds path of sample image to image object
image1.src = "./singer_small.png";

// saves image from ImageData object
function save() {
    // creates an html link tag
    a = document.createElement('a');
    // gives link the download attribute (downloads file upon click)
    a.download = 'painting.png';
    // sets the href to a URL representing the canvas data.
    a.href = canvas.toDataURL('image/png')
    // clicks the href
    a.click();
}

// creates an array representing the shape of the pen
function makeCirclePen(radius) {
    pen = []
    // loops through every element in a matrix of size m*n 
    // to check if the pixel is contained in the circle
    // if it does, the coordinate is added to the array.
    for (let m = 0; m < radius*2 + 1; m++) {
        for (let n = 0; n < radius*2 + 1; n++) {
            // center circle in the middle of array
            x = m - radius
            y = n - radius
            if (Math.sqrt(x**2 + y**2) <= radius) {
                coordinate = [x,y]
                pen.push(coordinate)
            }
        }
    }
    console.log(pen)
    return pen
}

// creates mouse object
const mouse = {
    x: null,
    y: null,
    // these store the previous values of x and y to apply line alogrithms.
    pastX: null,
    pastY: null,
    state: "up",
    radius: document.querySelector('#radius input').value,
    pen: makeCirclePen(document.querySelector('#radius input').value),
    tool: "pen",
    color: {r: 0, g: 0, b: 0, a: 255}
}

function setPen() {
    mouse.tool = "pen"
}

function setEraser() {
    mouse.tool = "eraser"
}

function radiusChange() {
    mouse.radius = document.querySelector('#radius input').value
    mouse.pen = makeCirclePen(mouse.radius)
    console.log("changed! ", mouse.radius)
}

function HextoDec(hex) {
    hexToDecTable = {
        '0':0,
        '1':1,
        '2':2,
        '3':3,
        '4':4,
        '5':5,
        '6':6,
        '7':7,
        '8':8,
        '9':9,
        'a':10,
        'b':11,
        'c':12,
        'd':13,
        'e':14,
        'f':15
    }
    dec = 0
    //start at 
    for (let i = 0; i < hex.length; i++) {
        unitDecimalValue = hexToDecTable[hex[i]] // get decimal value, left to right
        dec += unitDecimalValue*(16**(hex.length - i - 1))
    }
    return dec
}

function colorChange() {
    var hex = document.querySelector('#colorPickerContainer input').value
    console.log("changed to: ", hex)
    // gets string of hex values for each colour channel
    r = hex[1].concat(hex[2])
    g = hex[3].concat(hex[4])
    b = hex[5].concat(hex[6])
    mouse.color.r = HextoDec(r)
    mouse.color.g = HextoDec(g)
    mouse.color.b = HextoDec(b)
}

// the below line executes when the png image is finished loading.
// this allows drawImage to execute after the image is loaded, instead of before.
image1.addEventListener("load", function() {

    // adapted from https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
    function getCursorPosition(canvas, event) {
        // gets the bounding rectangle of the canvas
        const canvasRectangle = canvas.getBoundingClientRect();
        // calculates the x/y coordinates relative to the canvas' coordinates
        mouse.x = event.pageX - canvasRectangle.left;
        mouse.y = event.pageY - canvasRectangle.top;
        // prints to console
        console.log(canvasRectangle.left, canvasRectangle.top, event.pageX, event.pageY, mouse.x, mouse.y);
    }

    // converts cartesian coordinates to an index value.
    function convertXYtoIndex(x, y) {
        col = Math.round(x) -1
        row = Math.round(y -1)*(canvas.width)
        index = Math.round((col+row)*4)
        return index
    }

    // changes the colour of an individual pixel at an index in image array
    function changePixelColor(index, r, g, b, a) {
        scannedData[index] = r;
        scannedData[index + 1] = g;
        scannedData[index + 2] = b;
        scannedData[index + 3] = a;
    }
    
    // draws mark on image at specified position
    function drawInk(event, X, Y, r, g, b, a) { 
        for (let coordinate = 0; coordinate < mouse.pen.length; coordinate++) {
            x = X + mouse.pen[coordinate][0]
            y = Y + mouse.pen[coordinate][1]
            // prevents edge pixels from bleeding onto opposite side of canvas.
            if (x < canvas.width && x > 0) {
            index = convertXYtoIndex(x,y)
            changePixelColor(index, r,g,b,a);
            }
        }
        scannedImage.data = scannedData;
        ctx.putImageData(scannedImage, 0, 0);
    }

    // executes bresenham's algorithm for slopes in between -1 and 1
    function smallSlope(x0, y0, x1, y1) {
        path = [] // initializes array to store values

        dx = x1 - x0;
        dy = y1 - y0;
        yi = 1
        if (dy < 0) {
            yi *= -1
            dy *= -1
        }
        d = 2*dy - dx
        y = y0
        
        for (let x = x0; x < x1; x++) {
            path.push([x, y])
            if (d > 0) {
                y += yi
                d += 2 * (dy - dx)
            }
            else {
                d += 2*dy
            }
        }

        return path
    }
    // executes bresenham's algorithm for slopes greater than 1 or less than -1.
    function steepSlope(x0, y0, x1, y1) {
        path = []

        dx = x1 - x0;
        dy = y1 - y0;
        xi = 1
        if (dx < 0) {
            xi *= -1
            dx *= -1
        }
        d = 2*dx - dy
        x = x0
        
        for (let y = y0; y < y1; y++) {
            path.push([x, y])
            if (d > 0) {
                x += xi
                d += 2 * (dx - dy)
            }
            else {
                d += 2*dx
            }
        }

        return path
    }
    // this is an implementation of bresenham's line algorithm
    // adapted from https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm#
    function bresenhamLine(x0, y0, x1, y1) {
        if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
            if (x0 < x1) { // checks if line goes backwards or forwards
                return smallSlope(x0,y0,x1,y1)
            }
            else {
                return smallSlope(x1,y1,x0,y0)
            }
        }
        else {
            if (y0 < y1) { // checks if line goes backwards or forwards
                return steepSlope(x0,y0,x1,y1)
            }
            else {
                return steepSlope(x1,y1,x0,y0)
            }
        }
    }

    // renders image
    ctx.drawImage(image1, 0, 0, image1.width, image1.height);
    // creates an array of values representing the RGBA values of each pixel
    // from top to bottom, left to right.
    // in format [R, G, B, A, R1, G1, B1, A1, R2... 
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scannedData = scannedImage.data;
    // prints the array to inspect element console
    console.log(scannedImage);
    console.log(mouse.pen)

    // keeps track of the mouse state
    window.addEventListener('mousedown', function(event) {
        getCursorPosition(canvas, event)
        mouse.state = "down"
        // initialize past x and y
        mouse.pastX = mouse.x
        mouse.pastY = mouse.y
        console.log(mouse.state)
    })
    window.addEventListener('mouseup', function(event) {
        mouse.state = "up"
        console.log(mouse.state)
    })

    // records path of pen stroke
    canvas.addEventListener('mousemove', function(event) {
        if (mouse.state == "down"){
            getCursorPosition(canvas, event)
            path = bresenhamLine(mouse.pastX, mouse.pastY, mouse.x, mouse.y)
            if (mouse.tool == "pen") {
                r = mouse.color.r;
                g = mouse.color.g;
                b = mouse.color.b;
                a = 255;
            }
            else {
                r = 255;
                g = 255;
                b = 255;
                a = 255;
            }

            for (let i = 0; i < path.length; i++) {
                drawInk(event, path[i][0], path[i][1], r, g, b, a)
            }
            mouse.pastX = mouse.x
            mouse.pastY = mouse.y
        }
    })

});