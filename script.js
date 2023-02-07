var audio, context, analyser,myElements, src, array, logo, num, array;

num = 32;

array = new Uint8Array(num*2);

audio = document.getElementById("audio");

window.onclick = function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
    }else{
        audio.pause();
    }
}

function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaStreamSource(stream);
    src.connect(analyser);
    analyser.connect(context.destination);
    for(var i = 0 ; i < num ; i++){
        logo = document.createElement('div');
        logo.className = 'logo';
        logo.style.background = 'red';
        logo.style.minWidth = width+'px';
        body.appendChild(logo);
    }
    myElements = document.getElementsByClassName('logo');
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    analyser.getByteFrequencyData(array);
    for(var i = 0 ; i < num ; i++){
        height = array[i+num];
        myElements[i].style.minHeight = height+'px';
        myElements[i].style.opacity = 0.008*height;
    }
}
