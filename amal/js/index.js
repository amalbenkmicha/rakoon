var $layer_0 = $('.layer-0'),
    $layer_1 = $('.layer-1'),
    $layer_2 = $('.layer-2'),
    $layer_3 = $('.layer-3'),
    $x_axis  = $('#x-axis'),
    $y_axis  = $('#y-axis'),
    $container = $('body'),
    container_w = $container.width(),
    container_h = $container.height();

$(window).on('mousemove.parallax', function(event) {
  var pos_x = event.pageX,
      pos_y = event.pageY,
      left  = 0,
      top   = 0;

  left = container_w / 2 - pos_x;
  top  = container_h / 2 - pos_y;
  
  TweenMax.to(
    $x_axis, 
    1, 
    { 
      css: { 
        transform: 'translateX(' + (left * -1) + 'px)' 
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });
  
  TweenMax.to(
    $y_axis, 
    1, 
    { 
      css: { 
        transform: 'translateY(' + (top * -1) + 'px)' 
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });
  
  TweenMax.to(
    $layer_2, 
    1, 
    { 
      css: { 
        transform: 'translateX(' + left / 50 + 'px) translateY(' + top / 6 + 'px)'
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });
    TweenMax.to(
        $layer_3,
        1,
        {
            css: {
                transform: 'translateX(' + left / 80 + 'px) translateY(' + top / 10 + 'px)'
            },
            ease:Expo.easeOut,
            overwrite: 'all'
        });

  TweenMax.to(
    $layer_1, 
    1, 
    { 
      css: { 
        transform: 'translateX(' + left / 20 + 'px) translateY(' + top / 20 + 'px)'
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });
  
  TweenMax.to(
    $layer_0,
    10,
    {
      css: {
        transform: 'rotate(' + left / 200 + 'deg)'
      },
      ease: Expo.easeOut,
      overwrite: 'none'
    }
  )
});







var video = document.getElementById('video'),
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'), fps = 25,
    lastTime = Date.now();

//

function loop() {
    ctx.drawImage(video,0,0,640,360);
    if(!video.paused)
        requestAnimationFrame(loop);
}
btn1.addEventListener('click', function(){
    countAndPlay(5, true);
    video.load();
    video.addEventListener('playing', loop);
})


//For IOS8 - IOS9 devices
btn2.addEventListener('click', function(){
    countAndPlay(5, false);
    video.load();
});
function IOSloop() {
    var time = Date.now(),
        elapsed = (time-lastTime)/1000;

    if(elapsed >= (1000/fps)/1000 ) {
        console.log(elapsed)
        video.currentTime = video.currentTime + elapsed;
        ctx.drawImage(video,0,0,640,360);
        lastTime = time;
    }

    requestAnimationFrame(IOSloop);

}


function countAndPlay(count, play) {
    counter.style.display = 'block';
    counter.innerHTML = count;
    if(count < 1) {
        counter.style.display = '';
        play && video.play();
        play || IOSloop();
    } else {
        setTimeout(function(){
            countAndPlay(--count, play);
        }, 1000);
    }
}