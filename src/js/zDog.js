import Zdog from 'zdog'
import Zfont from 'zfont'

document.addEventListener("DOMContentLoaded", function(){

    const TAU = Zdog.TAU;
    var sceneStartRotation = { y: -TAU/8, x:-TAU/38 };
    let isSpinning = true;


    const illo = new Zdog.Illustration({
        element: '.zdog-canvas',
        zoom: 5,
        rotate: sceneStartRotation,
        dragRotate: true,
        // stop spinning when drag starts
        onDragStart: function() {
            isSpinning = false;
        },
    });

    let hipX = 3;

    let hips = new Zdog.Shape({
        addTo: illo,
        path: [ { x: -hipX }, { x: hipX } ],
        stroke: 7,
        translate: { y: -1 },
        color: '#F8FDF5',
    });

    let spine = new Zdog.Anchor({
        addTo: hips,
        translate: { y: -6, z: -5 },
        rotate: { x: TAU/8 },
    });

    let leg = new Zdog.Shape({
        addTo: hips,
        path: [ { y: 0 }, { y: 5 } ],
        translate: { x: -hipX },
        rotate: { x: TAU/4 },
        color: '#F8FDF5',
        stroke: 7,
    });

    let standLeg = leg.copy({
        translate: { x: hipX },
        rotate: { x: 0 },
        color: '#FFE2AA',
        
    });



    let Bottomlegs = new Zdog.Shape({
        addTo: leg,
        path: [ { y: 0 }, { y: 2 } ],
        translate: { x: 0, y: 8 },
        rotate: { x: -TAU/32 },
        stroke: 4,
        color: '#FFF0E4',
    });
    
    let BottomLegRight =Bottomlegs.copy({
        addTo: standLeg,
        color: '#FDE5D1',
    //     rotate: { x: -TAU/8 },
    })

    

    // foot
    let foot = new Zdog.RoundedRect({
        addTo: Bottomlegs,
        width: 2,
        height: 3,
        cornerRadius: 1,
        // y: past leg end, z: scootch toward front
        translate: { y: 5, z: 1 },
        color: '#F8F6E7',
        fill: true,
        stroke: 4,
        rotate: { x: TAU/5 }
    });

   

    foot.copy({
        addTo: BottomLegRight,
        translate: { y: 4, z: 1 },
        rotate: { x: TAU/4 },
        color: '#FFE2AA',
    });

    let chest = new Zdog.Rect({
        addTo: spine,   
        width: 5,
        height: 3,
        stroke: 10,
        color: '#BBE1FF',
        fill:true,
    });

    
    var armSize = 4;

    // left arm
    let upperArm = new Zdog.Rect({
        addTo: chest,
        translate: { x: -6, y: -1, z: -3 },
        width: 1,
        height: 4,
        stroke: 6,
        rotate: { x: -TAU/8,z: TAU/12 },
        fill:true,
        color: '#BBE1FF',
    });


    // copy to right arm
    upperArm.copyGraph({
        translate: { x: 6, y: -0.5, z: 2 },
        rotate: { x: TAU/32,z : -TAU/12 },
        color: '#8ACBFF',
        
        
    });

    let forearm = new Zdog.Shape({
        addTo: upperArm,
        path: [ { y: 8 }, { y: armSize } ],
        translate: {  y: armSize, z: -3 },
        rotate: { x: TAU/4 },
        color: '#FFF0E4',
        stroke: 4,
    });

    forearm.copyGraph({
        path: [ { y: 7 }, { y: 4 }],
        translate: { x: 12, y: -8 ,z : 4},
        rotate: { x: TAU/3 , z: TAU/12 },
        color: '#FDE5D1'
    });

    // hand
    let hand = new Zdog.Shape({
        addTo: forearm,
        // connect to end of forearm
        // scootch toward front a bit
        translate: { y: 10, z: 0 },
        stroke: 5,
        color: '#FFF0E4',
    });

    hand.copyGraph({
        translate: { x: 8,y: 13, z: 15.5 },
        color: '#FDE5D1'
    });





    let head = new Zdog.Hemisphere({
        addTo: chest,
        diameter: 12,
        stroke: false,
        // position above chest
        translate: { y: -11, z: 1 },
        rotate: { y: TAU/8, x: -TAU/32 },
        color: '#FFE8DB',
        backface: '#412'
    });

    let bang = new Zdog.Ellipse({
        addTo: head,
        diameter: 10,
        quarters: 2,
        stroke: 1,
        color: '#111',
        fill: true,
        backface: true,
        translate: { z: 5, y: -3 },
        rotate: { z: TAU/-4, x: TAU/9 },
    });

    let hair = new Zdog.Hemisphere({
        addTo: head,
        diameter: 14,
        // fill enabled by default
        // disable stroke for crisp edge
        stroke: false,
        backface: true,
        color: '#111',
        rotate: { z: TAU/-4, x: TAU/2,},
      });

      let roundedRect = new Zdog.RoundedRect({
        addTo: head,
        width: 6,
        height: 15,
        stroke: 9,
        cornerRadius: 30,
        rotate: {  x: -TAU/12, z: TAU/32 },
        translate: { z: -6, y: 4, x: -1 },
        color: '#111',
        fill: true
      });

    // -- eyes --- //
    let eye = new Zdog.Shape({
        addTo: head,
        path: [
            { x: -3.5, z: 4.5, y: -1.5 }, // start at top left
            { x: -1.5, z: 4.5, y: -.5 }, // line to top right
            { x: -3.5, z:  4.5, y: .5 }, // line to bottom left
        ],
        closed: false,
        stroke: .7,
        color: "#333",
    });

    eye.copy({
        translate: { x: 0, y: -1, z: 0 },
        rotate: { z: TAU/2 },
    });
    // -- eyes --- //

    let semicircle = new Zdog.Ellipse({
        addTo: head,
        diameter: 1,
        quarters: 2,
        stroke: .5,
        translate: { y: 0, z: 4.5 },
        rotate: { z: TAU/1 },
    });

    // -- smile --- //
    new Zdog.Ellipse({
        addTo: head,
        diameter: 4,
        quarters: 2,
        translate: { y: 1.5, z: 4.5 },
        rotate: { z: TAU/4 },
        closed: true,
        color: '#fff',
        stroke: .5,
        fill: true,
        backface: false,
    });
    // -- smile --- //

    let mydog = new Zdog.Anchor({
        addTo: illo,
        translate: {
            x: -5,
            y: -2,
            z: 0
        },
    });

    let dogbody = new Zdog.Shape({
        addTo: mydog,
        color: '#fff',
        stroke: 8,
        translate: {
            x: -9,
            y: 8,
            z: -7
        },
        rotate: {
            y: TAU/4
        },
    });


    let doglegs = new Zdog.Group({
        addTo: dogbody,
        // rotate: { x: TAU/8 },
    });


    let dogleg = new Zdog.Shape({
        addTo: doglegs,
        path: [
          { z:1.5, x: 3, y:1 }, // start at 1st point
          { z:1.5, x: 3 , y:7}, // line to 2nd point
        ],
        stroke: 2,
        color: '#fff',
        rotate: {
            z: TAU/-20
        },
      });

    let dogfoot = new Zdog.RoundedRect({
        addTo: doglegs,
        width: 2,
        height: 1,
        cornerRadius: 3,
        stroke: 2,
        color: '#fff',
        translate: {
            x: 6,
            y: 7,
            z: 1.5
        },
        rotate: {
            x: TAU/4
        },
        
    });

    dogleg.copy({
        translate: {
            z: -3,
            y: -2
        },
        rotate: {
            z: TAU/20
        },
        color:"#F0F0F0"
    })

    dogleg.copy({
        translate: {
            x: -9,
            y: -1
        },
        rotate: {
            z: TAU/20
        },
        color:"#fff"
    })

    dogleg.copy({
        translate: {
            x: -10,
            z: -3,
            y: 0
        },
        rotate: {
            z: TAU/-20
        },
        color:"#F0F0F0"
    })


    dogfoot.copy({
        translate: {
            x: 1.5,
            y: 7,
            z: -1.5
        },
        color:"#F0F0F0"
    });

    dogfoot.copy({
        translate: {
            x: -4,
            y: 7,
            z: -1.5
        },
        color:"#F0F0F0"
    });

    dogfoot.copy({
        translate: {
            x: -7.5,
            y: 7,
            z: 1.5
        },
        // rotate: {
        //     z: TAU/20
        // },
        color:"#fff"
    });


    let dogbody2 = new Zdog.Shape({
        addTo: mydog,
        color: '#fff',
        stroke: 8,
        translate: {
            x: -9,
            y: 8,
            z: -12
        },
        rotate: {
            y: TAU/4
        },
    });

    let dogHead = new Zdog.Shape({
        addTo: mydog,
        color: '#fff',
        stroke: 7,
        translate: {
            x: -9,
            y: 2,
            z: -4
        },
        rotate: {
            y: TAU/12,
            // x: TAU/3
        },
    });

    let dogEye = new Zdog.Hemisphere({
        addTo: dogHead,
        diameter: 1,
        // fill enabled by default
        // disable stroke for crisp edge
        stroke: false,
        color: '#333',
        backface: '#333',
        translate: { x:1.5 ,y:-1 ,z: 3 }, 
    });

    dogEye.copy({
        translate: { x:-1.5 ,y:-1 ,z: 3 }, 
    });

    //tail
    new Zdog.Shape({
        addTo: mydog,
        path: [
          { x: -9, y: 6, z: -15 },   // start
           { bezier: [
            { x: -9, y: 4, z: -16 }, // start control point
            { x: -9, y: 1, z: -13 }, // end control point
            { x: -9, y: 1, z: -12 }, // end point
           ]},
        ],
        closed: false,
        stroke: 4,
        color: '#fff'
    });

    //ear
    let dogear = new Zdog.Shape({
        addTo: dogHead,
        path: [
          { x:   -12, y: 0 , z:-3},
          { x:  -11.5,y:  -2.5 , z:-3},
          { x: -10, y:  0 , z:-3},
        ],
        translate: { x: 9.7, y: 0, z: 7.7 },  
        closed: false, // unclosed
        stroke: 1,
        color: '#fff',
        fill: true,
        rotate: {
            y: TAU/12,   
            z: TAU/28
        },
    });

    dogear.copy({
        translate: { x: 9, y: -5, z: -3 },  
        path: [
            { x:   -12, y: 0 , z:-3},
            { x:  -10.5,y:  -2.5 , z:-3},
            { x: -10, y:  0 , z:-3},
          ],   
        rotate: {
            y: TAU/-12,   
            z: -TAU/28
        },
    });

    let mouse = new Zdog.Cylinder({
        addTo: dogHead,
        diameter: 4,
        length: 5,
        stroke: false,
        color: '#fff',
        backface: '#fff',
        translate: { x: 0, y: 1.3, z: 1 }, 
      });


    let mouseEnd = new Zdog.Hemisphere({
        addTo: mouse,
        diameter: 4,
        // fill enabled by default
        // disable stroke for crisp edge
        stroke: false,
        color: '#fff',
        backface: '#fff',
        translate: { z: 2 }, 
    });


    let nose = new Zdog.Hemisphere({
        addTo: mouseEnd,
        diameter: 1,
        // fill enabled by default
        // disable stroke for crisp edge
        stroke: false,
        color: '#333',
        backface: '#333',
        translate: { y:-1 ,z: 1.5 }, 
        
    });
    
    var beigeLight = '#FC9';
    var white = 'white';

    ( function() {


        // big puff
        var cloud = new Zdog.Shape({
          addTo: illo,
          translate: { x: 34, y: -26, z: -20 },
          rotate: { y: -sceneStartRotation.y },
          stroke: 16,
          color: white,
        });
      
        // left small puff
        var smallPuff = new Zdog.Shape({
          addTo: cloud,
          translate: { x: -9, y: 4, z: 4 },
          stroke: 8,
          color: white,
        });
        smallPuff.copy({
          translate: { x: 9, y: 5, z: 6 },
          stroke: 10,
        });
      
        var disk = new Zdog.RoundedRect({
          addTo: cloud,
          width: 26,
          height: 12,
          cornerRadius: 6,
          translate: { x: -6, y: 7, z: 4 },
          rotate: { x: TAU/4 },
          stroke: 3,
          color: white,
          fill: true,
        });
        disk.copy({
          translate: { x: 6, y: 9, z: 8 },
        });
      
        // sun
        new Zdog.Shape({
          addTo: cloud,
          translate: { x: -13, y: 0, z: -14 },
          stroke: 8,
          color: beigeLight,
        });
      
      })();


    // -- animate --- //

    var ticker = 0;
    var cycleCount = 240;
    
    function animate() {
      // update
      if ( isSpinning ) {
        var progress = ticker / cycleCount;
        var theta = Zdog.easeInOut( progress % 1 ) * TAU;
        illo.rotate.y = -theta + sceneStartRotation.y;
        ticker++;
      }
    
      illo.updateRenderGraph();
      requestAnimationFrame( animate );
    }
    
    animate();





    Zfont.init(Zdog);


    let myFont = new Zdog.Font({
        src: 'https://cdn.jsdelivr.net/gh/jaames/zfont/demo/fredokaone.ttf'
    });
    
    var text = new Zdog.TextGroup({
        addTo: illo,
        font: myFont,
        value: [
            "FE Developer",
            "Heizel Park's",
            "Portfolio",
        ],
        textAlign: 'center',
        color: '#fff',
        stroke: .1,
        fontSize: 8,
        textAlign: 'left',
        translate: { x: 19 , z: 8,y: -5 },
        rotate: { y: TAU/6 },
        fill: true
    })

    var shadow = text.copy({
        addTo: illo,
        stroke: 1.3,
        translate: { x: 22 , z: 6,y: -4.7 },
        color: '#8ACBFF',
      });

});