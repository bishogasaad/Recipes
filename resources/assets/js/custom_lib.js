var array=$(".img-square").toArray();
var square=function(){
    array.forEach(element => {
        element.height=element.width;
    });
}
$(document).ready(function(){
    var array=$(".img-square").toArray();
    square();
    window.addEventListener("resize", function() {
        square();
    }, false);
});
module.exports = {
    square: square
};