var array=$(".img-square").toArray();
var square=function(){
    array.forEach(element => {
        element.height=element.width;
    });
}
$(document).ready(function(){
    var array=$(".img-square").toArray();
    square();
    $(".square-2x").width(2*$(".square-2x").height());
    window.addEventListener("resize", function() {
        square();
        $(".square-2x").width(2*$(".square-2x").height());
    }, false);
});
module.exports = {
    square: square
};