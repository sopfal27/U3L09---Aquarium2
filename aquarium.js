let fishX, fishY, fishSize;
let fishColor;
let fish2X, fish2Y, fish2Size;
let fish2Color;
let aquariumName = "My Aquarium";
let foodX, foodY;
let foodDropped = false;
let bubbles = [];


function setup() {
  createCanvas(800, 600);
  
  //fish1 
  fishX = width / 2;
  fishY = height / 2;
  fishSize = 50;
  fish2Color = color(200, 100, 100);

  //fish 2
  fish2X = width / 3;
  fish2Y = height / 4;
  fish2Size = 35;
  fishColor = color(0, 128, 156);


  // Initialize bubbles
  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(5, 15)
    });
  }
}


function draw() {
  background(50, 150, 200);
 
  // Display aquarium name
  textSize(24);
  fill(255);
  text(aquariumName, 10, 30);
 
  // Draw fish1
  fill(fishColor);
  ellipse(fishX, fishY, fishSize, fishSize / 2);
  triangle(fishX - fishSize / 2, fishY, fishX - fishSize, fishY - fishSize / 4, fishX - fishSize, fishY + fishSize / 4);
  
  // Draw fish2
  fill(fish2Color);
  ellipse(fish2X, fish2Y, fish2Size, fish2Size / 2);
  triangle(fish2X - fish2Size / 2, fish2Y, fish2X - fish2Size, fish2Y - fish2Size / 4, fish2X - fish2Size, fish2Y + fish2Size / 4);

  // Fish1 follows mouse
  fishX = lerp(fishX, mouseX, 0.05);
  fishY = lerp(fishY, mouseY, 0.05);

  // Fish2 moves with arrow keys
  if (keyIsDown(RIGHT_ARROW)){
    fish2X += 2
  }
  if (keyIsDown(LEFT_ARROW)){
    fish2X -= 2
  }
  if (keyIsDown(UP_ARROW)){
    fish2Y -= 2
  }
  if (keyIsDown(DOWN_ARROW)){
    fish2Y += 2
  }


  // Draw bubbles
  for (let i = 0; i < bubbles.length; i++) {
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].size);
    bubbles[i].y -= 1;


    // Reset bubble to bottom if it goes off the top
    if (bubbles[i].y < 0) {
      bubbles[i].y = height;
    }
  }
 
  // Draw food
  if (foodDropped) {
    fill(255, 204, 0);
    ellipse(foodX, foodY, 10, 10);
    foodY += 2;
    if (foodY > height) {
      foodDropped = false;
    }
  }
 
  // Check if fish1 is near food
  if (dist(fishX, fishY, foodX, foodY) < fishSize / 2 && foodDropped) {
    fishColor = color(100, 200, 100);
    foodDropped = false;
  } else {
    fishColor = color(200, 100, 100);
  }

  // Check if fish2 is near food
  if (dist(fish2X, fish2Y, foodX, foodY) < fish2Size / 2 && foodDropped) {
    fish2Color = color(100, 200, 100);
    foodDropped = false;
  } else {
    fish2Color = color(0, 128, 156);
  }
}


function keyPressed() {
  // Drop food
  if (key === 'F' || key === 'f') {
    foodX = random(width);
    foodY = 0;
    foodDropped = true;
  }
}


