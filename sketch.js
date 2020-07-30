const ws = 600
const sizes = [15, 3]
const numLines = 5
const margin = 40
let lastPos = null
let _color = randomColor()

function setup() {
  createCanvas(ws, ws);
  background(220);

  const usefulSpace = ws - 2 * margin
  const lineSize = usefulSpace / numLines
  
  stroke(0)
  strokeWeight(2)

  for (let i = 0; i <= numLines; i ++){
    line(margin, margin + i*lineSize, ws-margin, margin + i*lineSize)
  }

  lastPos = [mouseX, mouseY]
}

function draw() {
  let size
  if (lastPos[1] < mouseY) size = sizes[0]
  else size = sizes[1]

  if (mouseIsPressed)
    _line(...lastPos, mouseX, mouseY, size)

  lastPos = [mouseX, mouseY]
  
  noStroke()
  fill(_color)
  rect(0, 0, ws, 10)
  rect(0, ws, ws, -10)
}

function _line(x1, y1, x2, y2, size) {
  const deltaX = x2 - x1
  const deltaY = y2 - y1

  stroke(_color)

  for (let i = 0; i < 1; i += 0.001) {
    line(
      x1 + deltaX * i - size / 2,
      y1 + deltaY * i,
      x1 + deltaX * i + size / 2,
      y1 + deltaY * i
    )
  }
}

function randomColor() {
  return [
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255
  ]
}

function keyPressed() {
  if (key == 'c') {
    _color = randomColor()
  }
}