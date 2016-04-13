
$(document).ready(function(){
  $('img').addClass('imgClass');
  $('img').parent('p').addClass('paragraphClass');
  $('br').remove();
  $('p').removeAttr( 'style' );
  $('iframe').parent('p').addClass('videoClass');

});

/*span.content p.videoClass{
  padding: 0;
}
p.videoClass {
    width: 100% !important;
    height: auto !important;
    padding: 0;
}*/


// var styles = {
//  backgroundColor: pink,
//  font-weight: “bold”
// };
//
// $(#special”).css(styles);


// var iframeStyle = {
//   padding:0,
//   width: 100,
//   height: 'auto'
// };
//
// $('p.videoClass').css(iframeStyle);


$(function() {
    var $allVideos = $('iframe,object, embed'),
    $mainwrapper = $('.side-body');

	$allVideos.each(function() {

	  $(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');

	});

	$(window).resize(function() {

	  var newWidth = $mainwrapper.width();
	  $allVideos.each(function() {

	    var $el = $(this);
	    $el
	        .width(newWidth)
	        .height(newWidth * $el.attr('data-aspectRatio'));

	  });

	}).resize();

});
