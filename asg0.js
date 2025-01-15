import { Vector3 } from './lib/cuon-matrix-cse160.js'

let canvas, ctx;

// DrawRectangle.js

function main() {
    // Retrieve <canvas> element

    canvas = document.getElementById('example');

    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2D graphics

    ctx = canvas.getContext('2d');

    // Draw a black rectangle

    ctx.fillStyle = 'black'; // Set a black color
    ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

    // const v1 = new Vector3([2.25,2.25,0]); //Making the vector
    
    //drawVector(ctx, v1,'red'); //Drawing the red line

    console.log("Canvas and context are good");


}


function drawVector(ctx, v1, color){

    const originX = 200; //Start in the middle

    const originY = 200; //Start in the middle

    const endX = originX + (v1.elements[0] * 20) //Scaling

    const endY = originY - (v1.elements[1] * 20)//Scaling

    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(endX ,endY); //Drawing right here
    ctx.strokeStyle = color;
    ctx.stroke();


}

function handleDrawEvent() {

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Get user input
    const v1_x = document.getElementById("x1").value; //Getting v1 x input

    const v1_y = document.getElementById("y1").value; //Getting v1 y input

    const new_v1_x = v1_x.split(",").map(Number)
    const new_v1_y = v1_y.split(",").map(Number)

    const v2_x = document.getElementById("x2").value; //Getting v2 x input

    const v2_y = document.getElementById("y2").value; //Getting v2 x input

    const new_v2_x = v2_x.split(",").map(Number)

    const new_v2_y = v2_y.split(",").map(Number)

    if (new_v1_x.length === 1 && new_v1_y.length == 1 && !new_v1_x.some(isNaN) && !new_v1_y.some(isNaN)) {

        const v1 = new Vector3([new_v1_x, new_v1_y, 0]);
        drawVector(ctx, v1, 'red'); // Drawing v1
    } else {
        alert('Please enter valid x,y values');
    }

    if (new_v2_x.length === 1 && new_v2_y.length == 1 && !new_v2_x.some(isNaN) && !new_v2_y.some(isNaN)) {

        const v2 = new Vector3([new_v2_x, new_v2_y, 0]);
        drawVector(ctx, v2, 'blue'); // Drawing v1
    } else {
        alert('Please enter valid x,y values');
    }
}


function handleDrawOperationEvent() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Initialize v1 and v2
    let v1, v2;

    // Get user input
    const v1_x = document.getElementById("x1").value; //Getting v1 x input
    const v1_y = document.getElementById("y1").value; //Getting v1 y input

    const new_v1_x = v1_x.split(",").map(Number);
    const new_v1_y = v1_y.split(",").map(Number);

    const v2_x = document.getElementById("x2").value; //Getting v2 x input
    const v2_y = document.getElementById("y2").value; //Getting v2 y input

    const new_v2_x = v2_x.split(",").map(Number);
    const new_v2_y = v2_y.split(",").map(Number);

    if (new_v1_x.length === 1 && new_v1_y.length == 1 && !new_v1_x.some(isNaN) && !new_v1_y.some(isNaN)) {

        v1 = new Vector3([new_v1_x[0], new_v1_y[0], 0]);//Making v1

        drawVector(ctx, v1, 'red'); // Drawing v1
    } else {
        alert('Please enter valid x,y values for v1');
        return; // Exit if v1 is invalid
    }

    if (new_v2_x.length === 1 && new_v2_y.length == 1 && !new_v2_x.some(isNaN) && !new_v2_y.some(isNaN)) {

        v2 = new Vector3([new_v2_x[0], new_v2_y[0], 0]);//Making v2

        drawVector(ctx, v2, 'blue'); // Drawing v2

    } else {
        alert('Please enter valid x,y values for v2');
        return;
    }

    const scalar = document.getElementById("scalar").value; //Getting scalar input

    const new_scalar = parseFloat(scalar); // Parse scalar as a single number

    // if (isNaN(new_scalar)) {
    //     alert('Please enter a valid scalar value');
    //     return; // Exit if scalar is invalid
    // }

    const selected_op = document.getElementById("Op").value;

    if (selected_op === "add") {
        const v3 = v1.add(v2); // Adding v1 and v2
        drawVector(ctx, v3, "green"); // Drawing v3
    }

    if (selected_op === "sub") {
        const v3 = v1.sub(v2); // Subtracting v1 and v2
        drawVector(ctx, v3, "green"); // Drawing v3
    }

    if (selected_op === "multiply") {
        const v3 = v1.mul(new_scalar); //Multpyling by scalar
        const v4 = v2.mul(new_scalar); //Multypling by scalar
        drawVector(ctx, v3, "green"); //Drawing v3
        drawVector(ctx, v4, "green"); //Drawing v4
    }

    if (selected_op === "divide") {
        if (new_scalar === 0) {
            alert('Division by zero is not allowed');
            return;
        }
        const v3 = v1.div(new_scalar); //Dividing by scalar
        const v4 = v2.div(new_scalar);//Dividing by scalar
        drawVector(ctx, v3, "green");//Drawing v3
        drawVector(ctx, v4, "green");//Drawing v4
    }

    if (selected_op === "mag"){

        const result1 = v1.magnitude();

        const result2 = v2.magnitude();

        console.log("Magnitude v1:", result1);
        console.log("Magnitude v2:",result2);
        

    }

    if (selected_op === "norm"){

        const result1 = v1.normalize();

        const result2 = v2.normalize();

        drawVector(ctx,result1,"green");
        drawVector(ctx,result2,"green");     

    }

    if (selected_op === "angle") {
        const angle = angleBetween(); // Call angleBetween function
        console.log("Angle:", (angle * 180) / Math.PI);
    }

    if (selected_op === "area") {
        const area = areaTriangle(); // Call angleBetween function
        console.log("Area:", area);
    } 

}

function angleBetween() {
    // Get user inputs for v1 and v2 components
    const v1_x = parseFloat(document.getElementById("x1").value);
    const v1_y = parseFloat(document.getElementById("y1").value);
    const v2_x = parseFloat(document.getElementById("x2").value);
    const v2_y = parseFloat(document.getElementById("y2").value);

    // Validate inputs for NaN
    if (isNaN(v1_x) || isNaN(v1_y)) {
        alert("Please enter valid numeric values for vector v1");
        return;
    }

    if (isNaN(v2_x) || isNaN(v2_y)) {
        alert("Please enter valid numeric values for vector v2");
        return;
    }

    const v1 = new Vector3([v1_x, v1_y, 0]);
    const v2 = new Vector3([v2_x, v2_y, 0]);

    // Get selected operation
    const selected_op = document.getElementById("Op").value;

    if (selected_op === "angle") {
        // Calculate dot product
        const product = Vector3.dot(v1.elements, v2.elements);

        // Calculate magnitudes of the vectors
        const magv1 = v1.magnitude();
        const magv2 = v2.magnitude();

        // Validate magnitudes (prevent division by zero)
        if (magv1 === 0 || magv2 === 0) {
            alert("Cannot calculate angle with a zero vector");
            return;
        }

        // Calculate cosine of the angle
        const cosTheta = product / (magv1 * magv2);

        // Calculate and return the angle in radians
        const angle = Math.acos(cosTheta);

        return angle; // Angle in radians
    } else {
        alert("Invalid operation. Please select 'angle' from the dropdown.");
    }
}

function areaTriangle(){

    const v1_x = parseFloat(document.getElementById("x1").value);
    const v1_y = parseFloat(document.getElementById("y1").value);
    const v2_x = parseFloat(document.getElementById("x2").value);
    const v2_y = parseFloat(document.getElementById("y2").value);

    // Validate inputs for NaN
    if (isNaN(v1_x) || isNaN(v1_y)) {
        alert("Please enter valid numeric values for vector v1");
        return;
    }

    if (isNaN(v2_x) || isNaN(v2_y)) {
        alert("Please enter valid numeric values for vector v2");
        return;
    }

    const v1 = new Vector3([v1_x, v1_y, 0]);

    const v2 = new Vector3([v2_x, v2_y, 0]);

    // Get selected operation
    const selected_op = document.getElementById("Op").value;

    if (selected_op === "area") {
        // Calculate dot product
        const cross = Vector3.cross(v1, v2);

        const magnitude = Math.sqrt(
            cross.elements[0] ** 2 +
            cross.elements[1] ** 2 +
            cross.elements[2] ** 2
        );

        const area = 0.5 * magnitude;

        return area;


    }

}





window.handleDrawEvent = handleDrawEvent;

window.handleDrawOperationEvent = handleDrawOperationEvent;

main();

