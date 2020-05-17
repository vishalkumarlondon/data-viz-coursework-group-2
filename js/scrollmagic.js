if($(window).width() >1000) {
    //init ScrollMagic
  var controller = new ScrollMagic.Controller();
  // Pin Element
  var pinCardScene = new ScrollMagic.Scene ({
    triggerElement: '#card-section',
    triggerHook: 0,
    duration: '2400',
  })
  .setPin('#card-section')
  .addTo(controller);
  //First Card
  var OurScene = new ScrollMagic.Scene({
    triggerElement: '#card-section',
    triggerHook: 0,
    duration: '600',
  })
  .setClassToggle('#pop-this', 'pop') // Add class to element #pop-this
  //.addIndicators({
  //  	name: 'start animate'
  //  })
  .addTo(controller);
  //Build a Scene
  var OurScene2 = new ScrollMagic.Scene({
    triggerElement: '#trig-2',
    duration: '600',
    triggerHook: 0.5,
  })
  .setClassToggle('#pop-this-2', 'pop') // Add class to element #pop-this
  //.addIndicators({
  //  	name: 'start animate'
  //  })
  .addTo(controller);
  //Build a Scene
  var OurScene3 = new ScrollMagic.Scene({
    triggerElement: '#trig-3',
    duration: '600',
    triggerHook: 0,
  })
  .setClassToggle('#pop-this-3', 'pop') // Add class to element #pop-this
  //.addIndicators({
  //  	name: 'start animate'
  //  })
  .addTo(controller);
}