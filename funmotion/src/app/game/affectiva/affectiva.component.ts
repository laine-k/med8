import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
declare var affdex;
@Component({
  selector: 'app-affectiva',
  templateUrl: './affectiva.component.html',
  styleUrls: ['./affectiva.component.scss'],
})
export class AffectivaComponent implements OnInit {
  detector;
  constructor() {
    //console.log(affdex);
   }
  ngOnInit() {
        /*
      SDK Needs to create video and canvas nodes in the DOM in order to function
      Here we are adding those nodes a predefined div.
        */
    //var divRoot = this.affdexElements[0];
    var divRoot = $('#affdexElements')[0];

    // The captured frame's width in pixels
    var width = 640;

    // The captured frame's height in pixels
    var height = 480;

    /*
      Face detector configuration - If not specified, defaults to
      affdex.FaceDetectorMode.LARGE_FACES
      affdex.FaceDetectorMode.LARGE_FACES=Faces occupying large portions of the frame
      affdex.FaceDetectorMode.SMALL_FACES=Faces occupying small portions of the frame
    */
    var faceMode = affdex.FaceDetectorMode.LARGE_FACES;

    //Construct a CameraDetector and specify the image width / height and face detector mode.
    this.detector = new affdex.CameraDetector(divRoot, width, height, faceMode);
    this.detector.addEventListener("onInitializeSuccess", function() {
      console.log('onInitializeSuccess listener');
    });
    this.detector.addEventListener("onInitializeFailure", function() {
      console.log('onInitializeFailure listener');
    });
    this.detector.addEventListener("onWebcamConnectSuccess", function() {
      console.log("I was able to connect to the camera successfully.");
    });
    
    this.detector.addEventListener("onWebcamConnectFailure", function() {
      console.log("I've failed to connect to the camera :(");
    });
    this.detector.detectAllEmotions();

  }
  startDetection(){
    console.log('start', this.detector);
    this.detector.start();
  }
  changeTextColor(){
    $('#myButton').text('pink');
  }

}
