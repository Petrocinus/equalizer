var audio, context, analyser,myElements, src, array, logo, num;

num = 32;

logo = document.getElementById("logo").style;

audio = document.getElementById("audio");

myElements = document.getElementsByClassName('logo');

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
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    for(var i = 0 ; i < num ; i++){
        height = array[i+num];
        myElements[i].minHeight = height+'px';
        myElements[i].opacity = 0.008*height;
    }
}
