$(document).ready(function(){
  prettyPrint();
  // directly taken from bootstrap 
  // fix sub nav on scroll
  var $win = $(window)
    , $nav = $('.subnav')
    , navTop = $('.subnav').length && $('.subnav').offset().top - 40
    , isFixed = 0

  processScroll()

  // hack sad times - holdover until rewrite for 2.1
  $nav.on('click', function () {
    if (!isFixed) setTimeout(function () {  $win.scrollTop($win.scrollTop() - 47) }, 10)
  })

  $win.on('scroll', processScroll)

  function processScroll() {
    var i, scrollTop = $win.scrollTop()
    if (scrollTop >= navTop && !isFixed) {
      isFixed = 1
      $nav.addClass('subnav-fixed')
    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0
      $nav.removeClass('subnav-fixed')
    }
  }

  $('body').append('<div class="modal hide fade" id="poppop-modal"><div class="modal-header"><button class="close" data-dismiss="modal">×</button><h3>Pop, Pop!</h3></div><div class="modal-body"></div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">Get Back to Work</a></div></div>');
  $('#poppop-modal').modal({show: false});
  $('#poppop-modal').on('hidden', function(){
    $('#poppop-modal .modal-body iframe').remove();
  });
  var kkeys = [], kcode = "38,38,40,40,37,39,37,39,66,65";
  $(document).keydown(function(e) {
    kkeys.push( e.keyCode );
    if ( kkeys.toString().indexOf( kcode ) >= 0 ){
      kkeys = [];
      $('#poppop-modal .modal-body').append('<iframe width="530" height="299" src="http://www.youtube.com/embed/q-_4mcYsQdE?fs=1&autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>')
      $('#poppop-modal').modal('show');
    }
  });
});