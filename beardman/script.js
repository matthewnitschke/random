var c = document.getElementById("canvas");
var ctx=c.getContext("2d");

window.onload = function(){
  redraw();
}

var getPoint = function(shapes){
  while(true){
    var point = [rand(66, 251), rand(215, 352)];
    for(var i = 0; i < shapes.length; i ++){
        if (inside(point, shapes[i].points)){
          return point;
        }
    }
  }
}

var drawShape = function(shape, ctx){
  ctx.beginPath();

  var points = shape.points;

  ctx.moveTo(points[0][0], points[0][1]);

  for(var i = 1; i < shape.points.length; i ++){
    ctx.lineTo(points[i][0], points[i][1]);
  }

  ctx.closePath();
  ctx.fill();
}

var shapes = [{
  points: [[148,253],[175,253], [175,272], [150,272]] //stash top
},
{
  points: [[147,253],[150,272], [123,281],[116,273]] // diag stash left
},
{
  points: [[175,253],[175,272], [201,280],[206,273]] // diag stash right
},
{
  points: [[116, 273], [123, 281], [123, 299], [116, 299]] // vert left stash
},
{
  points: [[201, 280], [206, 273], [206, 297], [201, 301]] // vert right stash
},
{
  points: [[65, 217], [90, 284], [78, 282]] // upper left cheek
},
{
  points: [[90, 284], [116, 300], [89, 305], [78, 282]] // mid left cheek
},
{
  points: [[116, 300], [123, 300], [114, 330], [89, 303]] // lower mid left cheek
},
{
  points: [[124, 301], [141, 313], [140, 347], [114, 330]] // lowest left cheek
},
{
  points: [[141, 312], [150, 304], [176, 304], [187, 312], [190, 345], [164, 400], [141,348]] // chin
},
{
  points: [[188, 312], [235, 266], [237, 295], [189, 345]]
},
{
  points: [[234, 268], [254, 202], [248, 256], [236, 295]]
}];


function drawBounds(ctx){

  for(var i = 0; i < shapes.length; i ++){
    drawShape(shapes[i], ctx);
  }

}

function drawPoints(ctx, amount, minLength, maxLength){
  ctx.beginPath();
  for(var i = 0; i < amount; i ++){
    var pt = getPoint(shapes);

    var length = rand(minLength, maxLength);

    ctx.rect(pt[0], pt[1], 1, length);
  }
  ctx.stroke();
  console.log("done");
}



function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

var redrawButton = document.getElementById('redraw');
redrawButton.addEventListener('click', function(){
  redraw();
});

function redraw(){
  var amt = document.getElementById('amount').value;
  var minLength = document.getElementById('minLength').value;
  var maxLength = document.getElementById('maxLength').value;


  clearCanvas();

  var img = document.getElementById("face");
  ctx.drawImage(img,0,0);

  drawPoints(ctx, amt, minLength, maxLength);
}

function clearCanvas() {

  ctx.clearRect(0, 0, c.width, c.height);
};
