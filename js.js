/** OBJET CANVAS **/
$(function() {

var Canvas = function (pencil){
    this.canvas = document.getElementById('drawing');
    this.context = this.canvas.getContext("2d");
    this.effacer = document.getElementById('effacer');
    this.pos = { x: 0, y: 0};
    this.posA = { x: 0, y: 0};
    this.paint = null;
    this.pencil = pencil;

    $(this.canvas).on('mousedown', this.onMouseDown.bind(this));

    $(this.canvas).on('mousemove', this.onMouseMoove.bind(this));

    $(this.canvas).on('mouseup', this.onMouseUp.bind(this));

    $(this.canvas).on('mouseleave', this.onMouseLeave.bind(this));

    $(this.effacer).on('mousedown', this.onEffacer.bind(this));

}

Canvas.prototype.onMouseDown = function(event) {
  this.pos.x = event.pageX - this.canvas.offsetLeft;
  this.pos.y = event.pageY - this.canvas.offsetTop;
  this.paint = true;
};

Canvas.prototype.dessiner = function (){
  this.context.strokeStyle = this.pencil.couleur;
  this.context.lineJoin = "round";
  this.context.lineWidth = this.pencil.width;
  this.context.beginPath();
  this.context.moveTo(this.pos.x -5  , this.pos.y -5 );
  this.context.lineTo(this.posA.x -5 , this.posA.y -5);
  this.context.closePath();
  this.context.stroke();
};

Canvas.prototype.onMouseMoove = function(event){
if(this.paint){
  this.posA.x = event.pageX - this.canvas.offsetLeft;
  this.posA.y = event.pageY - this.canvas.offsetTop;
  this.dessiner();
  this.pos.x = this.posA.x;
  this.pos.y = this.posA.y;
}
};

Canvas.prototype.onMouseLeave = function(e){
this.paint = false;
};

Canvas.prototype.onMouseUp = function(e){
this.paint = false;
};

Canvas.prototype.onEffacer = function(){
this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

/** OBJET PENCIL **/

var pencil = function() {
this.couleur = "black";
this.width = 1;

$('.crayon').on('mousedown', this.setColor.bind(this));
$('.epaisseur').on('mousedown', this.setWidth.bind(this));
}

pencil.prototype.setColor = function(event) {
this.couleur = $(event.target).attr("value");
}

pencil.prototype.setWidth = function(event) {
this.width = $(event.target).attr("value");
}

/** CODE PRINCIPAL **/

var c2 = new pencil();
var c1 = new Canvas(c2);

/** RESPONSIVE CANVAS **/


})
