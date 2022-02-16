Webcam.set(
    {
        width: 250,
        height: 250,
        image_format: "jpeg",
        jpeg_quality: 90
    });

camera = document.getElementById('#camera');
Webcam.attach("#camera");

function cap(){
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML = "<img id='captured_img' src='"+ data_uri + "'>";
    })
}

console.log("ml5 version is", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TjXZ_EKtf/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model is loaded");
}

function speak(){
    var s = window.SpeechSynthesis;

    sd1 = "the first prediction is" + pd1;
    sd2 = "and the second prediction is" + pd2;

    utterthis = new SpeechSynthesisUtterance(sd1+sd2);

    s.speak(utterthis);
}

function res(){
    var i = document.getElementById("captured_img");
    classifier.classify(i, gotResults);
}

function gotResults(error, results){
if(error){
    console.error(error);

}
else{
    console.log(results);
    document.getElementById("p1lab").innerHTML = results[0].label;
    pd1 = results[0].label;
    document.getElementById("p2lab").innerHTML = results[1].label;
    pd2 = results[1].label;

    if(results[0].label == "Thumbs Up"){
        document.getElementById("p1spa").innerHTML = "&#128077;";
    }
    else if(results[0].label == "Awesome"){
        document.getElementById("p1spa").innerHTML = "&#128076;";
    }
    else if(results[0].label == "Up"){
        document.getElementById("p1spa").innerHTML = "&#128070;";
    }



    if(results[1].label == "Thumbs Up"){
        document.getElementById("p2spa").innerHTML = "&#128077;";
    }
    else if(results[1].label == "Awesome"){
        document.getElementById("p2spa").innerHTML = "&#128076;";
    }
    else if(results[1].label == "Up"){
        document.getElementById("p2spa").innerHTML = "&#128070;";
    }
}
}