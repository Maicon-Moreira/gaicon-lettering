const wx = window.innerWidth
const wy = window.innerHeight
const sizes = [15, 3]
const desiredLineHeight = 75
const numLines = Math.floor(wy / desiredLineHeight)
const margin = 40
const buttonRadius = 50
let lastPos = null
let _color = randomColor()
let mouseWasPressed = false
let changeColorPos = null
let cleanPos = null
let lastColorChange = 0

function setup() {
  createCanvas(wx, wy);
  textAlign(CENTER, CENTER)
  lastPos = [mouseX, mouseY]

  clean()
}

function draw() {
  if (dist(mouseX, mouseY, ...changeColorPos) > buttonRadius &&
    dist(mouseX, mouseY, ...cleanPos) > buttonRadius) {

    let size
    if (lastPos[1] < mouseY) size = sizes[0]
    else size = sizes[1]

    if (mouseWasPressed && mouseIsPressed)
      _line(...lastPos, mouseX, mouseY, size)

    lastPos = [mouseX, mouseY]
    mouseWasPressed = mouseIsPressed
  }

  noStroke()
  fill(_color)
  rect(0, 0, wx, 10)
  rect(0, wy, wx, -10)
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

function mousePressed() {
  if (dist(mouseX, mouseY, ...changeColorPos) < buttonRadius) {
    if (abs(lastColorChange - frameCount) > 20){
      _color = randomColor()
      lastColorChange = frameCount
    }
  }
  else if (dist(mouseX, mouseY, ...cleanPos) < buttonRadius) {
    clean()
  }
}

function clean() {
  background(220);

  const usefulSpace = wy - 2 * margin
  const lineSize = usefulSpace / numLines

  for (let i = 0; i <= numLines; i++) {
    stroke(0)
    strokeWeight(2)
    line(margin, margin + i * lineSize, wx - margin, margin + i * lineSize)

    if (i == numLines - 1) {
      noStroke()
      fill(0)
      textSize(25)

      changeColorPos = [wx / 4, margin + i * lineSize + lineSize / 2]
      cleanPos = [3 * wx / 4, margin + i * lineSize + lineSize / 2]

      text('Mudar cor', ...changeColorPos)
      text('Limpar', ...cleanPos)
    }
  }
}