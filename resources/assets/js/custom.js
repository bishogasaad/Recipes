require('./animate');
var custom = require('./custom_lib');

var fix_row_at=function(br,element_id){
    if($( window ).width()>br)
    {                
        while($("."+element_id+">.item").length>0){
            $( "."+element_id+">.item:eq(0),."+element_id+">.item:eq(1)" ).wrapAll( "<div/>");
        };
    }
}
$(document).ready(function(){
    $("#main_sec").parallax({
        imageSrc: './images/alternate.jpg',
        speed:0.5,
        positionX:"left",
        positionY:"top",
        bleed:50
        });
    $("#product_sec").parallax({
        imageSrc: './images/products_sec.jpg',
        speed:0.1,
        bleed:100
    });
});
/*if(document.getElementById("featured")!==null)
    document.getElementById("featured").addEventListener("wheel", scroll_slide);
if(document.getElementById("products")!==null)
    document.getElementById("products").addEventListener("wheel", scroll_slide);
if(document.getElementById("search")!==null)
    document.getElementById("search").addEventListener("wheel", scroll_slide);
function scroll_slide(e) {
    if(window.innerWidth>767)
    if(
        !($(e.currentTarget).find(".slick-slide:last-child").hasClass("slick-active")&&e.deltaY>0)
        &&
        !($(e.currentTarget).find(".slick-slide:first-child").hasClass("slick-active")&&e.deltaY<0)
        )
    {e.preventDefault();
    var e = window.event;
    if(e.deltaY>0){$(e.currentTarget).slick("slickNext");}
    else {$(e.currentTarget).slick("slickPrev");}}
}*/