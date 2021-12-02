$('document').ready(
  function(){

    $('.unhide.bowls0').on('click', function() {
      console.log('clicked')
      $('.bowls0').toggleClass('hide')
    });
    $('.unhide.bowls1').on('click', function () {
      $('.bowls1').toggleClass('hide')
    })
    $('.unhide.bowls2').on('click', function() {
      $('.bowls2').toggleClass('hide')
    })
    $('.unhide.bowls3').on('click', function() {
      $('.bowls3').toggleClass('hide')
    })
    $('.unhide.bowls4').on('click', function() {
      $('.bowls4').toggleClass('hide')
    })
    $('.unhide.bowls5').on('click', function() {
      $('.bowls5').toggleClass('hide')
    })
    $('.unhide.salads0').on('click', function() {
      $('.salads0').toggleClass('hide')
    })
    $('.unhide.salads1').on('click', function() {
      $('.salads1').toggleClass('hide')
    })
    $('.unhide.salads2').on('click', function() {
      $('.salads2').toggleClass('hide')
    })
    $('.unhide.drinks1').on('click', function() {
      $('.drinks1').toggleClass('hide')
    })
    $('.unhide.drinks2').on('click', function() {
      $('.drinks2').toggleClass('hide')
    })
    $('.unhide.drinks0').on('click', function() {
      $('.drinks0').toggleClass('hide')
    })

    $('#submitOrder').on('click', function() {
      $.alert('Order has been submitted')
    })
  }
  
);