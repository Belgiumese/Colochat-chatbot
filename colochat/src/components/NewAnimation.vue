<template>
  <div 
    id="animation_container" 
    style="background-color:rgba(66, 66, 66, 0.00); width:360px; height:240px">
    <canvas 
      id="canvas" 
      width="360" 
      height="240" 
      style="position: absolute; display: block; background-color:rgba(66, 66, 66, 0.00);"/>
    <div 
      id="dom_overlay_container" 
      style="pointer-events:none; overflow:hidden; width:360px; height:240px; position: absolute; left: 0px; top: 0px; display: block;"/>
  </div>
</template>

<script>
import * as createjs from 'createjs-module';
import AdobeAn from '../../public/sleeping/sleeping';

var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;

export default {
  name: 'Animation',
  props: {
    src: {
      default: '',
      type: String
    },
  },

  methods: {
    init() {
      canvas = document.getElementById('canvas');
      anim_container = document.getElementById('animation_container');
      dom_overlay_container = document.getElementById('dom_overlay_container');
      var comp=AdobeAn.getComposition('E8E0A367517AF948B589FC3D00FA1881');
      var lib=comp.getLibrary();

      var loader = new createjs.LoadQueue();
      loader.on('fileload', (evt) => {
        console.log('filre');
        this.handleFileLoad(evt,comp);
      }, this);
      loader.on('complete', (evt) => {
        console.log('Awfwfa');
        this.handleComplete(evt,comp);
      }, this);
      loader.on('error', () => console.log('ERRRR'), this);
      // lib=comp.getLibrary();
      console.log('HLEOEOFOEEF');
      const img = require('../assets/animations/sleep.png');
      console.log(img);
    },

    handleFileLoad(evt, comp) {
      console.log('aaa');
      var images=comp.getImages();	
      if (evt && (evt.item.type == 'image')) { images[evt.item.id] = evt.result; }	
    },

    handleComplete(evt,comp) {
      console.log('triggered!');
      //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
      var lib=comp.getLibrary();
      var ss=comp.getSpriteSheet();
      var queue = evt.target;
      var ssMetadata = lib.ssMetadata;
      for(let i=0; i<ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet( {'images': [queue.getResult(ssMetadata[i].name)], 'frames': ssMetadata[i].frames} );
      }
      exportRoot = new lib.newsleeping();
      stage = new lib.Stage(canvas);	
      //Registers the "tick" event listener.
      fnStartAnimation = function() {
        stage.addChild(exportRoot);
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener('tick', stage);
      };	    
      //Code to support hidpi screens and responsive scaling.
      function makeResponsive(isResp, respDim, isScale, scaleType) {		
        var lastW, lastH, lastS=1;		
        window.addEventListener('resize', resizeCanvas);		
        resizeCanvas();		
        function resizeCanvas() {			
          var w = lib.properties.width, h = lib.properties.height;			
          var iw = window.innerWidth, ih=window.innerHeight;			
          var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
          if(isResp) {                
            if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
              sRatio = lastS;                
            }				
            else if(!isScale) {					
              if(iw<w || ih<h)						
                sRatio = Math.min(xRatio, yRatio);				
            }				
            else if(scaleType==1) {					
              sRatio = Math.min(xRatio, yRatio);				
            }				
            else if(scaleType==2) {					
              sRatio = Math.max(xRatio, yRatio);				
            }			
          }			
          canvas.width = w*pRatio*sRatio;			
          canvas.height = h*pRatio*sRatio;
          canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*sRatio+'px';				
          canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
          stage.scaleX = pRatio*sRatio;			
          stage.scaleY = pRatio*sRatio;			
          lastW = iw; lastH = ih; lastS = sRatio;            
          stage.tickOnUpdate = false;            
          stage.update();            
          stage.tickOnUpdate = true;		
        }
      }
      makeResponsive(false,'both',false,1);	
      AdobeAn.compositionLoaded(lib.properties.id);
      fnStartAnimation();
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.animation {
  iframe {
    overflow: hidden;
  }
}
</style>

