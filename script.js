// creates variable representing the canvas using the id that was assigned by us
const canvas = document.getElementById('canvas1');
// creates an instance of CanvasRenderingContext2D object
// allows default 2d canvas methods to be used.
const ctx = canvas.getContext('2d');
// sets canvas size, needs to be same size as in the css styling.
// it is reccommended that the size be updated automatically in the future.
canvas.width = 800;
canvas.height = 400;
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
    // prints the array to inspect element console
    console.log(scannedImage);
})