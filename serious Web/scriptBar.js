var renderer, scene, camera,
			ww     = window.innerWidth,
			wh     = window.innerHeight
			amount = 150,
			mouse  = {x:0,y:0};

		var pngs = [];
		var renderers = [],
			cameras = [],
			canvas = [],
			scenes = [],
			leaves = [];
		texture = new THREE.TextureLoader;
		for(var i=0;i<9;i++){
      texture.setCrossOrigin('');
			//texture.load('https://cdn2.mhpbooks.com/2017/05/'+i+'.png', function(texture)
//texture.load('http://mamboleoo.be/lab/leaves/'+i+'.png', function(texture)   
 texture.load('http://mamboleoo.be/lab/leaves/0.png', function(texture) 
                   {
				pngs.push(texture);
				if(pngs.length===9){

					for(var i=0;i<2;i++){
						var newScene = init("scene"+i);
						renderers.push(newScene.renderer);
						cameras.push(newScene.camera);
						scenes.push(newScene.scene);
						leaves.push(newScene.leaves);
					}

					requestAnimationFrame(render);
				}
			});
		}

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("resize", onWindowResize );


		function init(scene){
			var canvas = document.getElementById(scene);
			var renderer = new THREE.WebGLRenderer({canvas:canvas, alpha: true});
			renderer.setSize(ww, wh);

			var scene = new THREE.Scene();

			var leaves = new THREE.Object3D()
			for(var i=0;i<amount;i++){
				var leave = new Leave(renderers.length);
				leaves.add(leave);
			}

			scene.add(leaves);

			var camera = new THREE.PerspectiveCamera(50,ww/wh, 1, 10000 );
			camera.position.set(0,0,400);
			scene.add(camera);


			var light = new THREE.HemisphereLight( 0x00174a,0x384257,.5 );
			scene.add( light );


			return {
				canvas : canvas,
				renderer : renderer,
				scene : scene,
				camera :camera,
				leaves :leaves
			};
		}

		function onWindowResize(){

			ww     = window.innerWidth;
			wh     = window.innerHeight;

			for(var i=0;i<2;i++){
				cameras[i].aspect = ww / wh;
				cameras[i].updateProjectionMatrix();

				renderers[i].setSize(ww, wh);
			}

		}

		function onMouseMove(e){
			mouse.x = (e.clientX - ww/2)/(ww/15);
			mouse.y = (e.clientY/wh)*3;
		};

		function Leave(depth){

			var x = (Math.random()-0.5)*ww;
			var y = (Math.random()-0.5)*wh;
			var z = - Math.random()*500 * (depth/6) + (Math.random()*250);
			var rX = Math.random()*(Math.PI);
			var rY = Math.random()*(Math.PI);
			var rZ = Math.random()*(Math.PI);

			var randomMap = pngs[Math.floor(Math.random()*9)];

			var geometry = new THREE.PlaneGeometry( 20, 20, 3 );
			var material = new THREE.MeshLambertMaterial( {
				side: THREE.DoubleSide,
				map: randomMap,
				transparent: true,
				alphaTest: 0.8
			} );
			var leave = new THREE.Mesh( geometry, material );
			leave.position.set(x,y,z);
			leave.rotation.set(rX,rY,rZ);

			leave.speed = {
				x : Math.random()/30+0.2,
				y : Math.random()/20+0.4,
				rX : Math.random()/100,
				rY : Math.random()/100,
				rZ : Math.random()/100
			};

			return leave;
		};

		var render = function (a) {
			requestAnimationFrame(render);

			for(var i=0;i<2;i++){

				for(var j=0;j<amount;j++){
					var leave = leaves[i].children[j];
					leave.position.x += leave.speed.x + mouse.x; 
					leave.position.y -= leave.speed.y + mouse.y; 
					leave.rotation.x += leave.speed.rX + (mouse.x/80);
					leave.rotation.y += leave.speed.rY + (mouse.y/40);
					leave.rotation.z += leave.speed.rZ;

					if(leave.position.y <= -(wh/2)){
						leave.position.y = (wh/2);
						leave.position.x = (Math.random()-0.5)*ww;;
					}
				}

				renderers[i].render(scenes[i], cameras[i]);
			}


		};

$(function() {
  // This will select everything with the class smoothScroll
  // This should prevent problems with carousel, scrollspy, etc...
  $('.smoothScroll').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('section').animate({
          scrollTop: target.offset().top
        }, 1000); // The number here represents the speed of the scroll in milliseconds
        return false;
      }
    }
  });
});

// Change the speed to whatever you want
// Personally i think 1000 is too much
// Try 800 or below, it seems not too much but it will make a difference