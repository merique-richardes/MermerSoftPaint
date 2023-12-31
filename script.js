// creates variable representing the canvas using the id that was assigned by us
const canvas = document.getElementById('canvas1');
// creates an instance of CanvasRenderingContext2D object
// allows default 2d canvas methods to be used.
const ctx = canvas.getContext('2d');
// sets canvas size, needs to be same size as in the css styling.
// it is reccommended that the size be updated automatically in the future.
canvas.width = 800;
canvas.height = 450;
// constructs image object
const image1 = new Image()
// adds path of sample image to image object
image1.src = "./singer_small.png";
// the below line executes when the png image is finished loading.
// this allows drawImage to execute after the image is loaded, instead of before.
image1.addEventListener("load", function() {
    // renders image
    ctx.drawImage(image1, 0, 0, image1.width, image1.height);
    // creates an array of values representing the RGBA values of each pixel
    // from top to bottom, left to right.
    // in format [R, G, B, A, R2, G2, B2, A2, R3... 
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scannedData = scannedImage.data;
    // prints the array to inspect element console
    console.log(scannedImage);

    // creates mouse dictionary with x y coordinates as well as a radius
    const mouse = {
        x: null,
        y: null,
        state: "up",
        radius: 3
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
        return pen
    }

    pen = makeCirclePen(mouse.radius);
    console.log(pen)

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

    function convertXYtoIndex(x, y) {
        col = Math.round(x)
        row = Math.round(y -1)*(canvas.width)
        index = Math.round((col+row)*4)
        return index
    }
    
    function drawInk(event) { 
        index = convertXYtoIndex(mouse.x, mouse.y)
        scannedData[index] = 0;
        scannedData[index + 1] = 0;
        scannedData[index + 2] = 0;
        scannedData[index + 3] = 255;
        scannedImage.data = scannedData;
        ctx.putImageData(scannedImage, 0, 0);
    }

    // keeps track of the mouse state
    window.addEventListener('mousedown', function(event) {
        mouse.state = "down"
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
            drawInk(event)
        }
    })

});