img="";
var status_modelo="";

objects=[];

function preload(){
    img=loadImage("aire.png");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();

    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Estatus: detectando objetos"
}

function modelLoaded(){
    console.log("Modelo cargado");
    status_modelo= true;
    objectDetector.detect(img, gotResult);
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status_modelo!="") {
        for (i =0;i < objects.length;i++) {
            document.getElementById("status").innerHTML="Estatus: objeto detectado";
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+"  "+percent+ "%",objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
        }           
        document.getElementById("objetos_detectados").innerHTML="Hay 2 objetos grandes en la imagen, de los cuales el modelo cocossd detectó "+objects.length;
    }
  }

  function pagina_Principal(){
        window.location="index.html";
  }

  function gotResult(error, results){
    if (error) {
      console.error(error);
    }else{
        console.log(results);
        objects=results;
    }
}