(function (cjs, an) {

  var p; // shortcut to reference prototypes
  var lib = {}; var ss = {}; var img = {};
  lib.ssMetadata = [];


  // symbols:



  (lib.ColoStandardnoshadow = function () {
    this.initialize(img.ColoStandardnoshadow);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 4235, 3267);


  (lib.Tween4 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.text = new cjs.Text('Z', '48px \'Times New Roman\'');
    this.text.lineHeight = 55;
    this.text.lineWidth = 30;
    this.text.parent = this;
    this.text.setTransform(6.2, -48.1);

    this.text_1 = new cjs.Text('Z', '48px \'Times New Roman\'');
    this.text_1.lineHeight = 55;
    this.text_1.lineWidth = 30;
    this.text_1.parent = this;
    this.text_1.setTransform(-36.6, -5);

    this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_1 }, { t: this.text }] }).wait(1));

  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-38.6, -50.1, 77.2, 100.2);


  (lib.Tween3 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.text = new cjs.Text('Z', '48px \'Times New Roman\'');
    this.text.lineHeight = 55;
    this.text.lineWidth = 30;
    this.text.parent = this;
    this.text.setTransform(6.2, -48.1);

    this.text_1 = new cjs.Text('Z', '48px \'Times New Roman\'');
    this.text_1.lineHeight = 55;
    this.text_1.lineWidth = 30;
    this.text_1.parent = this;
    this.text_1.setTransform(-36.6, -5);

    this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.text_1 }, { t: this.text }] }).wait(1));

  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-38.6, -50.1, 77.2, 100.2);


  // stage content:
  (lib.sleeping = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_3
    this.instance = new lib.Tween3('synched', 0);
    this.instance.parent = this;
    this.instance.setTransform(375.3, 65.2);

    this.instance_1 = new lib.Tween4('synched', 0);
    this.instance_1.parent = this;
    this.instance_1.setTransform(400.3, 32.1);

    this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance }] }).to({ state: [{ t: this.instance_1 }] }, 39).to({ state: [] }, 1).wait(5));
    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true, x: 400.3, y: 32.1 }, 39).wait(6));

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics.f().s('#000000').ss(5, 1, 1).p('APhhMQjIC2jhg8QgbgIgcgLQg0gUg2ghAvgg7QDLC4DlhBQBhgcBmhI');
    this.shape.setTransform(296, 294.4);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.bf(img.ColoStandardnoshadow, null, new cjs.Matrix2D(0.1, 0, 0, 0.1, -211.7, -163.3)).s().p('EghEAZhMAAAgzBMBCJAAAMAAAAzBgAIPKfQAFAcgBAdIAaA4QA0AvAwA1QAFAFAHACIAGAQQDGCjDRidQAUgPAYgMQB0jAg3jmQgvjHjmgOIgUAAQg6gUhHALQgXAEgWAAIgfAPIgfAfIgPAFIgzBhIBRhMQgVAdgaAZIgOAMIgPAVIAAAUIgVAfIAAAaIgUAUIAAAaIgFAJQgJAQgFASIgFASQgcgHgbgLQg1gVg1ghQA1AhA1AVQAbALAcAHQgIAnAHArgAvtE4IgKAVIgfAPQg/BAgXBHQgkBtA4B/QATAsALAvQAIAHAEAKQADAFAAAIIAVAfIAAAPIAkAuIAUAAQAcAXAsgHIAaAAQAUgQAaAAIAPAAQBTguAyhMIAAgQIAVgPQAzhVAahaIAAgBIAFgTIAKgPIBUhCIiwizQgLgPgPgMIgPAAQhGg5hegZQhPgUhAAgQgGADgFAGIgFBSIBNgkgApYJbQBhgbBmhJQhmBJhhAbgAIQJNIAAAAg');
    this.shape_1.setTransform(300, 240);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f('#FFFFFF').s().p('AKGE0IgFgQQgIgCgEgFQgxg1g0gvIgZg4QAAgdgEgcQgIgrAIgmIAFgSQAFgSAJgQIAFgJIAAgaIAVgUIAAgaIAUgfIAAgUIAPgVIAOgMQAagZAWgdIhSBMIAzhhIAQgFIAegfIAfgPQAXAAAXgEQBHgLA5AUIAVAAQDlAOAvDHQA3Dlh0DAQgXAMgVAPQhmBNhkAAQhoAAhlhTgAJhAFQCjAACViGIADgCIgDACQiVCGijAAIAAAAIAAAAQg2AAg4gOQA4AOA2AAIAAAAIAAAAgAv6FNIgVAAIgkguIAAgPIgUgfQAAgIgDgFQgFgKgHgHQgLgvgTgsQg4h+AjhtQAYhHA+hAIAfgPIAKgVIApgeIhMAkIAFhSQAFgGAGgDQA/ggBPAUQBeAZBGA5IAQAAQAOAMAMAPICvCzIhTBCIgLAPIgFASIgEABQg6AQg4AAIAAAAIAAAAQiiAAiUiEIgBgBIgBgBIgCgCIACACIABABIABABQCUCECiAAIAAAAIAAAAQA4AAA6gQIAEgBIAAABQgaBagzBVIgUAPIAAAQQgzBMhSAuIgQAAQgZAAgVAQIgZAAQgLACgKAAQgfAAgUgSg');
    this.shape_2.setTransform(302.9, 299.9);

    this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_2 }, { t: this.shape_1 }, { t: this.shape }] }).wait(45));

  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(388.3, 255.1, 423.5, 388.3);
  // library properties:
  lib.properties = {
    id: '234571FCED1B7D429C22EE9755FF3CEE',
    width: 600,
    height: 480,
    fps: 22,
    color: '#424242',
    opacity: 0.00,
    manifest: [
      { src: 'images/ColoStandardnoshadow.png?1539662817782', id: 'ColoStandardnoshadow' }
    ],
    preloads: []
  };



  // bootstrap callback support:

  (lib.Stage = function (canvas) {
    createjs.Stage.call(this, canvas);
  }).prototype = p = new createjs.Stage();

  p.setAutoPlay = function (autoPlay) {
    this.tickEnabled = autoPlay;
  };
  p.play = function () { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()); };
  p.stop = function (ms) { if (ms) this.seek(ms); this.tickEnabled = false; };
  p.seek = function (ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); };
  p.getDuration = function () { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; };

  p.getTimelinePosition = function () { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; };

  an.bootcompsLoaded = an.bootcompsLoaded || [];
  if (!an.bootstrapListeners) {
    an.bootstrapListeners = [];
  }

  an.bootstrapCallback = function (fnCallback) {
    an.bootstrapListeners.push(fnCallback);
    if (an.bootcompsLoaded.length > 0) {
      for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
        fnCallback(an.bootcompsLoaded[i]);
      }
    }
  };

  an.compositions = an.compositions || {};
  an.compositions['234571FCED1B7D429C22EE9755FF3CEE'] = {
    getStage: function () { return exportRoot.getStage(); },
    getLibrary: function () { return lib; },
    getSpriteSheet: function () { return ss; },
    getImages: function () { return img; }
  };

  an.compositionLoaded = function (id) {
    an.bootcompsLoaded.push(id);
    for (var j = 0; j < an.bootstrapListeners.length; j++) {
      an.bootstrapListeners[j](id);
    }
  };

  an.getComposition = function (id) {
    return an.compositions[id];
  };



})(createjs = createjs || {}, AdobeAn = AdobeAn || {});
var createjs, AdobeAn;