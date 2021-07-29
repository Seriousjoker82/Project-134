function setup() {
    canvas = createCanvas(380, 380);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
  }
function preload(){
    alarm=loadSound("alert.mp3")
}

objects=[]
status=""

function draw(){
    image(video, 0, 0 ,380,380)
    if(status != ""){
        r=random(255)
        g=random(255)
        b=random(255)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Object Detected"
            document.getElementById("num_objects").innerHTML=objects.length
            fill(r,g,b)
            percent=floor(objects[i].confidence*100)
            text(
                objects[i].label + " " + percent + "%",
                objects[i].x + 15,
                objects[i].y + 15
              );
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
       
        if(objects.label=="person"){
            document.getElementById("status").innerHTML="Baby Detected"
            alarm.stop()
        }
        else{
            document.getElementById("status").innerHTML="Baby Not Detected"
alarm.play()
        }
        if(objects.length<0){
            document.getElementById("status").innerHTML="Baby Not Detected"
alarm.play()
        }
    }   
}
  
 


function modelLoaded(){
    console.log("model is loaded")
    status=true
      objectDetector.detect(video,gotResult)
}
    
function gotResult(error, results){
    if(error){
        console.error()
    } 
    else{
        console.log(results)
    objects=results
    }

}

