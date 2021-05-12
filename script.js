// Author:

/*******************************************************************************
                          Global UI Variables

  canvasDiv, textDiv, buttonDiv
  In the project's HTML, the divs that will contain various elements that may
  be created in setup(). Useful for styling (e.g., keeping them all centered).

  canvas
  The p5.js canvas. This is where all the magic happens!

  textP
  This is where you will print any kind of text (e.g., the label of an image).

  buttons
  If included, these are for user interaction (e.g., training a model, inputting
  data).
*******************************************************************************/

let canvasDiv;
let canvas;
let textDiv;
let textP;

/*******************************************************************************
                            Global ML Variables

  featureExtractor
  An object that can extract the features from the MobileNet model.

  classifier
  The new model we have created from MobileNet's features.

  video
  A video loaded into the program for object detection.

  isCustomModelReady
  Initialized to false in setup(). Set to true when the custom model has been \
  loaded successfully
*******************************************************************************/

let featureExtractor;
let classifier;
let video;

/******************************************************************************
                                  setup()

  This is a built-in p5.js function that is automatically called when the
  program starts, just before draw(). This is used for initializing global
  variables, building the UI, and loading images, video, data, and models.
*******************************************************************************/

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
  // new code below

  video = createCapture(VIDEO, videoReady);
}

/******************************************************************************
                                  draw()

  This is a built-in p5.js function that is automatically called in a repeated
  loop, just after setup(). This is used for handling animations, or running
  anything over and over again throughout a program.
*******************************************************************************/

function draw() {

}

/******************************************************************************
                               videoReady()

  A callback function. Called after the video has been loaded. First, we'll
  hide the video (remember, there will be two videos if we don't do this) using:

  video.display("display", "none");

  Then, now that we have video, we extract the features from the MobileNet
  model with:

  featureExtractor = ml5.featureExtractor("MobileNet", featureExtractorLoaded);
*******************************************************************************/

function videoReady() {
  video.style("display", "none");
  featureExtractor = ml5.featureExtractor("MobileNet", featureExtractorLoaded);
}

/******************************************************************************
                               featureExtractorLoaded()

  A callback function. Called after the MobileNet model has been loaded and its
  feature extractor has been created. Here we load the new classification model
  based on the features of MobileNet. We'll simply call the model "classifier",
  and pass modelReady() as a callback for when the model has loaded.
*******************************************************************************/

function featureExtractorLoaded() {
  classifier = featureExtractor.classification(canvas, modelReady);
}

/******************************************************************************
                                  modelReady()

  A callback function. Called after the classifier model has been loaded. Here
  we set isModelReady to true, print some instructional text ("Add training
  data, then click train!"), then reveal the button div so users can interact
  with the app.
*******************************************************************************/

function modelReady() {

}

/******************************************************************************
                          gotResults(error, results)

  This function is a callback for classify(). In other words, after our new
  classifier model has classified the image, it should call this function next.

  parameters
  - error: If there was an error while running classify(), it should be brought
  up here and the function shouldn't do anything else.
  - results: The results of classify(). This will be an object we can use to
  get some useful information, such as the predicted label of the image, as
  well as how confident the model is about that assigned label.
*******************************************************************************/

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2);
    textP.html("Label: " + label + " - Confidence " + confidence);
  }
}
