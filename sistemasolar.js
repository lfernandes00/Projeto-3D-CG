var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000000);
var renderer = new THREE.WebGLRenderer();
var sol, mercurio, venus, tierra, tierraNubes, tierraNodo, luna, marte, marteNodo, phobos, deimos, jupiter, jupiterGas, jupiterNodo, io, europa, ganimedes, calisto, saturno, saturnoNodo1, saturnoNodo2, anillo1, anillo2, anillo3, urano, uranoNodo, miranda, ariel, umbriel, titania, oberon, neptuno, neptunoNodo, triton, container, controls, stats;
var step=0;
var t = 0;
var l = 0;
var rotarLuna = true;
let mousePos = { x: 0, y: 0 };
let plane;
main();

function createPlane() {
    plane = new THREE.Object3D();

    
    const materialWhite = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const materialRed = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    

    //cubo
    const geometry = new THREE.BoxGeometry(30, 23, 23);
    const cubo = new THREE.Mesh(geometry, materialWhite);
    cubo.position.x = -40;
    scene.add(cubo);
    plane.add(cubo);

    //cubo pequeno1
    const small = new THREE.BoxGeometry(15, 8, 8);
    const smallCube = new THREE.Mesh(small, materialRed);
    smallCube.position.x = -40;
    smallCube.position.z = 13;
    scene.add(smallCube);
    plane.add(smallCube);

    //cubo pequeno1
    const small2 = new THREE.BoxGeometry(15, 8, 8);
    const smallCube2 = new THREE.Mesh(small2, materialRed);
    smallCube2.position.x = -40;
    smallCube2.position.z = -13;
    scene.add(smallCube2);
    plane.add(smallCube2);

   

    //Fim do foguetao 
    let fim = new THREE.CylinderGeometry(10, 6, 13, 28);
    let fim2 = new THREE.Mesh(fim, materialRed);
    fim2.rotateZ(Math.PI / 2);
    fim2.position.x = -62;
    plane.add(fim2);


    //Meio do foguetao
    let geomCockpit = new THREE.CylinderGeometry(9, 9, 53, 28);
    let cockpit = new THREE.Mesh(geomCockpit, materialWhite);
    cockpit.rotateZ(Math.PI / 2);
    plane.add(cockpit);



    // Frente do foguetao
    let geomEngine = new THREE.ConeGeometry(9, 25, 60);
    let engine = new THREE.Mesh(geomEngine, materialWhite);
    engine.position.x = 39;
    engine.rotateZ(3 * Math.PI / 2);
    plane.add(engine);

    console.log("Plane created")
    scene.add(plane);

    // Create the wing
    // let geomSideWing = new THREE.BoxGeometry(40, 8, 150);
    // let sideWing = new THREE.Mesh(geomSideWing, materialRed);
    // plane.add(sideWing);

    // propeller
    // let geomPropeller = new THREE.BoxGeometry(20, 10, 10);
    // // access a specific vertex of a shape through the vertices array, and then move its x, y and z property
    // geomPropeller.vertices[4].y -= 5;
    // geomPropeller.vertices[4].z += 5;
    // geomPropeller.vertices[5].y -= 5;
    // geomPropeller.vertices[5].z -= 5;
    // geomPropeller.vertices[6].y += 5;
    // geomPropeller.vertices[6].z += 5;
    // geomPropeller.vertices[7].y += 5;
    // geomPropeller.vertices[7].z -= 5;
    // propeller = new THREE.Mesh(geomPropeller, materialBrown);

    // blades
    // let geomBlade = new THREE.BoxGeometry(1, 100, 20);
    // let blade = new THREE.Mesh(geomBlade, materialDarkBrown);
    // blade.position.set(8, 0, 0);

    // SECOND propeller
    // let blade2 = blade.clone();
    // blade2.rotation.x = Math.PI / 2;

    // propeller.add(blade);
    // propeller.add(blade2);

    // propeller.position.set(50, 0, 0);
    // plane.add(propeller);

    // plane.scale.set(0.25, 0.25, 0.25);
    // plane.position.y = 100;

    plane.position.x=100;
    plane.position.y=100;

    /*****************************
    * SHADOWS 
    ****************************/
    // Plane meshes must cast and receive shadows
    plane.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });


}

function handleMouseMove(event) {
    let tx = -1 + (event.clientX / window.innerWidth) * 2;
    let ty = 1 - (event.clientY / window.innerHeight) * 2;
    mousePos = { x: tx, y: ty };
}

function updatePlane() {
    //let targetX = mousePos.x * 100;
    let targetY = mousePos.y * 100;

    // // update the airplane's position
    // plane.position.x = targetX;
    // plane.position.y = targetY + 100;

    // update the airplane's position SMOOTHLY
    plane.position.y += (targetY - plane.position.y + 100) * 0.1;
    plane.rotation.z = (targetY - plane.position.y + 100) * 0.013;

}


function animate() {
    step+=0.1;
    sol.rotation.y += 0.001;
    capaSolar.rotation.y += 0.001;
    
    mercurio.rotation.y += 0.06;
    mercurio.position.x = Math.sin(t*0.8)*60;
    mercurio.position.z = Math.cos(t*0.8)*60;
    
    venus.rotation.y += 0.04;
    venus.rotation.z = degToRad(177.36);
    venus.position.x = Math.sin(t*0.5)*100;
    venus.position.z = Math.cos(t*0.5)*100;
    
    tierra.rotation.y += 0.02;
    tierraNubes.rotation.y += 0.01;
    tierraNodo.rotation.z = degToRad(23.4);
    tierraNodo.position.x = Math.sin(t*0.3)*180;
    tierraNodo.position.z = Math.cos(t*0.3)*180;
    
    luna.position.x = Math.sin(l*2)*20;
    luna.position.z = Math.cos(l*2)*20;
    
    marte.rotation.y += 0.015;
    marteNodo.rotation.z = degToRad(25.19);
    marteNodo.position.x = Math.sin(t*0.33)*350;
    marteNodo.position.z = Math.cos(t*0.33)*350;
    
    phobos.position.x = Math.sin(t*1.5)*13.5;
    phobos.position.y = Math.sin(t*1.5)*6;
    phobos.position.z = Math.cos(t*1.5)*13.5;
    
    deimos.position.x = -Math.sin(t*1.9)*18;
    deimos.position.y = Math.cos(t*1.9)*8;
    deimos.position.z = Math.cos(t*1.9)*18;
    
    jupiter.rotation.y += 0.018;
    jupiterGas.rotation.y += 0.1;
    jupiterNodo.rotation.z = degToRad(3.12);
    jupiterNodo.position.x = Math.sin(t*0.15)*550;
    jupiterNodo.position.z = Math.cos(t*0.15)*550;
    
    io.position.x = Math.sin(t*0.5)*25;
    io.position.y = Math.cos(t*0.5)*10;
    io.position.z = Math.cos(t*0.5)*25;
   
    europa.position.x = -Math.sin(t*0.8)*35;
    europa.position.y = Math.sin(t*0.8)*15;
    europa.position.z = Math.cos(t*0.8)*35;
    
    ganimedes.position.x = Math.sin(t*0.6)*45;
    ganimedes.position.y = Math.cos(t*0.6)*20;
    ganimedes.position.z = Math.cos(t*0.6)*45;
    
    calisto.position.x = Math.sin(t*0.4)*55;
    calisto.position.y = Math.cos(t*0.4)*25;
    calisto.position.z = Math.cos(t*0.4)*55;

    saturno.rotation.y += 0.01;
    saturnoNodo1.rotation.x = degToRad(90);
    saturnoNodo2.rotation.z = degToRad(26.73);
    saturnoNodo2.position.x = Math.sin(t*0.1)*950;
    saturnoNodo2.position.z = Math.cos(t*0.1)*950;
    
    urano.rotation.y += 0.014;
    uranoNodo.rotation.z = degToRad(97.77);
    uranoNodo.position.x = Math.sin(t*0.09)*1750;
    uranoNodo.position.z = Math.cos(t*0.09)*1750;
    
    miranda.position.x = Math.sin(t*0.3)*6;
    miranda.position.z = Math.cos(t*0.3)*6;
    
    ariel.position.x = Math.sin(t*0.5)*8.8;
    ariel.position.y = Math.sin(t*0.5)*1.3;
    ariel.position.z = Math.cos(t*0.5)*8.8;
    
    umbriel.position.x = -Math.sin(t*0.2)*11.1;
    umbriel.position.y = Math.cos(t*0.2)*2.5;
    umbriel.position.z = Math.cos(t*0.2)*11.1;
    
    titania.position.x = Math.sin(t*0.6)*12.5;
    titania.position.y = Math.cos(t*0.6)*6.5;
    titania.position.z = Math.cos(t*0.6)*12.5;
    
    oberon.position.x = -Math.sin(t*0.67)*13.5;
    oberon.position.y = Math.sin(t*0.67)*9;
    oberon.position.z = Math.cos(t*0.67)*13.5;
    
    neptuno.rotation.y += 0.016;
    neptunoNodo.rotation.z = degToRad(28.32);
    neptunoNodo.position.x = Math.sin(t*0.08)*2450;
    neptunoNodo.position.z = Math.cos(t*0.08)*2450;
    
    triton.position.x = Math.sin(t*0.5)*7;
    triton.position.y = Math.sin(t*0.5)*7;
    triton.position.z = Math.cos(t*0.5)*7;
    
    t += Math.PI/180*0.5;
    
    if(rotarLuna)
    {
        l += Math.PI/180*0.5;
    }
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
    controls.update();
}


function degToRad (degrees) {
        return degrees * Math.PI / 180;
};

// FunciÃ³n para cuando se hace click con el raton
function mouseDown(e) {
    if(rotarLuna)
        rotarLuna = false;
    else
        rotarLuna = true;
        
    e.preventDefault();
    return false;
}

function render() {
    renderer.render( scene, camera );
}

function main() {
    // Fondo negro
    renderer.setClearColor(0x000000,1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);
    
    // Controles del raton en la camara
    controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;
    controls.addEventListener('change', render);

    // Fondo estrellado
    var estrellas_geometria = new THREE.Geometry();
    var estrellas_material = new THREE.ParticleBasicMaterial({
        color:0xbbbbbb, 
        size:1, 
        sizeAttenuation:false
    });
    var estrellas;
            
    for(var i=0;i<5000;i++)
    {
        var vertices = new THREE.Vector3();
        vertices.set(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1);
        vertices.multiplyScalar(6000);
        estrellas_geometria.vertices.push(vertices);
    }
    estrellas = new THREE.ParticleSystem(estrellas_geometria, estrellas_material);
    estrellas.scale.set(1.5,1.5,1.5);
    scene.add(estrellas);
    
    //Foco de luz
    var pointLight = new THREE.PointLight( 0xfbdf5a,1,100000 );
    pointLight.position.set( 0, 0, 0 );
    pointLight.scale.set(55,55,55);
    pointLight.castShadow = true;
    scene.add( pointLight );
    
    // AÃ±adir Sol
    var solGeometry	= new THREE.SphereGeometry(50, 64, 64); 
	var solMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/sol.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/solBump.jpg'),
		bumpScale : 8,
        emissive  : 0x333333,
	});
    sol = new THREE.Mesh(solGeometry,solMaterial);
    sol.castShadow = false;
    sol.receiveShadow = false;
    scene.add(sol);
    
    //AÃ±adir nubes independientes al sol para poder rotarlas con mas o menos velocidad ke el sol
    var canvasResultSol	= document.createElement('canvas')
	canvasResultSol.width = 720
	canvasResultSol.height = 360
	var contextResultSol = canvasResultSol.getContext('2d')		

	// Cargar el soldMap.jpg
	var imageMapSol = new Image();
	imageMapSol.addEventListener("load", function() {
		
		// Crear el dataMap ImageData para el solMap.jpg
		var canvasMap = document.createElement('canvas')
		canvasMap.width	= imageMapSol.width
		canvasMap.height = imageMapSol.height
		var contextMap = canvasMap.getContext('2d')
		contextMap.drawImage(imageMapSol, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// Cargar solMapTrans.jpg
		var imageTrans = new Image();
		imageTrans.addEventListener("load", function(){
			// Crear dataTrans ImageData para solMapTrans.pjg
			var canvasTrans = document.createElement('canvas')
			canvasTrans.width = imageTrans.width
			canvasTrans.height = imageTrans.height
			var contextTrans = canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// dataMap + dataTrans dentro de dataResult
			var dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMapSol.height; y++){
				for(var x = 0; x < imageMapSol.width; x++, offset += 4){
					dataResult.data[offset+0] = dataMap.data[offset+0]
					dataResult.data[offset+1] = dataMap.data[offset+1]
					dataResult.data[offset+2] = dataMap.data[offset+2]
					dataResult.data[offset+3] = 255 - dataTrans.data[offset+0]
				}
			}
			// Actualizar la textura 'capaSolarMaterial' con el resultado
			contextResultSol.putImageData(dataResult,0,0)	
			capaSolarMaterial.map.needsUpdate = true;
		})
		imageTrans.src = 'images/solMapTrans.jpg';
	}, false);
	imageMapSol.src	= 'images/solMap.jpg';
	
	var capaSolarGeometry = new THREE.SphereGeometry(50.5, 64, 64)
	var capaSolarMaterial = new THREE.MeshPhongMaterial({
		map		    : new THREE.Texture(canvasResultSol),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
        depthWrite  : false,
	});
	capaSolar = new THREE.Mesh(capaSolarGeometry, capaSolarMaterial);
    capaSolar.castShadow = false;
    capaSolar.receiveShadow = false;
    sol.add(capaSolar);
    
    // AÃ±adir Mercurio
    var mercurioGeometry	= new THREE.SphereGeometry(4, 64, 64); 
	var mercurioMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/mercurio.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/mercurioBump.jpg'),
		bumpScale : 8,
	});
    mercurio = new THREE.Mesh(mercurioGeometry,mercurioMaterial);
    mercurio.castShadow = true;
    mercurio.receiveShadow = true;
    scene.add(mercurio);

    // AÃ±adir Venus
    var venusGeometry	= new THREE.SphereGeometry(5, 64, 64); 
	var venusMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/venus.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/venusBump.jpg'),
		bumpScale : 8,
	});
    venus = new THREE.Mesh(venusGeometry,venusMaterial);
    venus.castShadow = true;
    venus.receiveShadow = true;
    scene.add(venus);
    
    tierraNodo = new THREE.Group();
    // AÃ±adir Tierra
    var tierraGeometry = new THREE.SphereGeometry(15, 64, 64)
	var tierraMaterial = new THREE.MeshPhongMaterial({
		map		    : THREE.ImageUtils.loadTexture('images/tierra.jpg'),
		bumpMap		: THREE.ImageUtils.loadTexture('images/tierraBump.jpg'),
		bumpScale	: 0.8,
		specularMap	: THREE.ImageUtils.loadTexture('images/tierraSpecular.jpg'),
		specular	: new THREE.Color('grey'),
	});
	tierra = new THREE.Mesh(tierraGeometry, tierraMaterial);
    tierra.castShadow = true;
    tierra.receiveShadow = true;
    tierraNodo.add(tierra);
    scene.add(tierraNodo);
    
    //AÃ±adir nubes independientes a la tierra para poder rotarlas con mas o menos velocidad ke la tierra
    var canvasResult = document.createElement('canvas')
	canvasResult.width = 1024
	canvasResult.height	= 512
	var contextResult = canvasResult.getContext('2d')		

	// Cargar el tierraCloudMap.jpg
	var imageMap = new Image();
	imageMap.addEventListener("load", function() {
		
		// Crear el dataMap ImageData para el tierraCloudMap.jpg
		var canvasMap = document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height = imageMap.height
		var contextMap = canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// Cargar tierraCloudMapTrans.jpg
		var imageTrans = new Image();
		imageTrans.addEventListener("load", function(){
			// Crear dataTrans ImageData para etierraCloudMapTrans.pjg
			var canvasTrans = document.createElement('canvas')
			canvasTrans.width = imageTrans.width
			canvasTrans.height = imageTrans.height
			var contextTrans = canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// dataMap + dataTrans dentro de dataResult
			var dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0] = dataMap.data[offset+0]
					dataResult.data[offset+1] = dataMap.data[offset+1]
					dataResult.data[offset+2] = dataMap.data[offset+2]
					dataResult.data[offset+3] = 255 - dataTrans.data[offset+0]
				}
			}
			// Actualizar la textura 'tierraNubesMaterial' con el resultado
			contextResult.putImageData(dataResult,0,0)	
			tierraNubesMaterial.map.needsUpdate = true;
		})
		imageTrans.src = 'images/tierraCloudMapTrans.jpg';
	}, false);
	imageMap.src = 'images/tierraCloudMap.jpg';
	
	var tierraNubesGeometry	= new THREE.SphereGeometry(15.5, 64, 64)
	var tierraNubesMaterial	= new THREE.MeshPhongMaterial({
		map		    : new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
        depthWrite  : false,
	});
	tierraNubes	= new THREE.Mesh(tierraNubesGeometry, tierraNubesMaterial)
    tierraNubes.castShadow = true;
    tierraNubes.receiveShadow = true;
    tierra.add(tierraNubes);
    
    // AÃ±adir luna
    var lunaGeometry = new THREE.SphereGeometry(3,64,64);
    var lunaTextura = THREE
    var lunaMaterial = new THREE.MeshPhongMaterial({
		map		    : THREE.ImageUtils.loadTexture('images/luna.jpg'),
		bumpMap		: THREE.ImageUtils.loadTexture('images/lunaBump.jpg'),
		bumpScale	: 0.8,
	});
    luna = new THREE.Mesh(lunaGeometry,lunaMaterial);
    luna.position.x = (Math.sin(0)*20);
    luna.position.z = (Math.cos(0)*20);
    luna.position.y = 3;
    luna.castShadow = true;
    luna.receiveShadow = true;
    tierraNodo.add(luna);

    // AÃ±adir Marte
    marteNodo = new THREE.Group();
    var marteGeometry	= new THREE.SphereGeometry(11, 64, 64); 
	var marteMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/marte.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/marteBump.jpg'),
		bumpScale : 5,
	});
    marte = new THREE.Mesh(marteGeometry,marteMaterial);
    marte.castShadow = true;
    marte.receiveShadow = true;
    marteNodo.add(marte);
    scene.add(marteNodo);
    
    // AÃ±adir Phobos
    var phobosGeometry	= new THREE.SphereGeometry(2, 64, 64); 
	var phobosMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/phobos.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/phobosBump.jpg'),
		bumpScale : 8,
	});
    phobos = new THREE.Mesh(phobosGeometry,phobosMaterial);
    phobos.castShadow = true;
    phobos.receiveShadow = true;
    marteNodo.add(phobos);

    // AÃ±adir Deimos
    var deimosGeometry	= new THREE.SphereGeometry(2, 64, 64); 
	var deimosMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/deimos.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/deimosBump.jpg'),
		bumpScale : 8,
	});
    deimos = new THREE.Mesh(deimosGeometry,deimosMaterial);
    deimos.castShadow = true;
    deimos.receiveShadow = true;
    marteNodo.add(deimos);
    
    // AÃ±adir Jupiter
    jupiterNodo = new THREE.Group();
    var jupiterGeometry	= new THREE.SphereGeometry(20, 64, 64); 
	var jupiterMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/jupiter.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/jupiterBump.jpg'),
		bumpScale : 2,
	});
    jupiter = new THREE.Mesh(jupiterGeometry,jupiterMaterial);
    jupiter.castShadow = true;
    jupiter.receiveShadow = true;
    jupiterNodo.add(jupiter);
    scene.add(jupiterNodo);
    
    //AÃ±adir atmosfera gaseosa a Jupiter
    var canvasResultJupiter	= document.createElement('canvas')
	canvasResultJupiter.width = 720
	canvasResultJupiter.height = 360
	var contextResultJupiter = canvasResultJupiter.getContext('2d')		

	// Cargar el jupiterMap.jpg
	var imageMapJupiter = new Image();
	imageMapJupiter.addEventListener("load", function() {
		
		// Crear el dataMap ImageData para el jupiterMap.jpg
		var canvasMap = document.createElement('canvas')
		canvasMap.width	= imageMapJupiter.width
		canvasMap.height = imageMapJupiter.height
		var contextMap = canvasMap.getContext('2d')
		contextMap.drawImage(imageMapJupiter, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// Cargar jupiterMapTrans.jpg
		var imageTrans = new Image();
		imageTrans.addEventListener("load", function(){
			// Crear dataTrans ImageData para jupiterMapTrans.pjg
			var canvasTrans = document.createElement('canvas')
			canvasTrans.width = imageTrans.width
			canvasTrans.height = imageTrans.height
			var contextTrans = canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// dataMap + dataTrans dentro de dataResult
			var dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMapJupiter.height; y++){
				for(var x = 0; x < imageMapJupiter.width; x++, offset += 4){
					dataResult.data[offset+0] = dataMap.data[offset+0]
					dataResult.data[offset+1] = dataMap.data[offset+1]
					dataResult.data[offset+2] = dataMap.data[offset+2]
					dataResult.data[offset+3] = 255 - dataTrans.data[offset+0]
				}
			}
			// Actualizar la textura 'saturnoGasMaterial' con el resultado
			contextResultSaturno.putImageData(dataResult,0,0)	
			jupiterGasMaterial.map.needsUpdate = true;
		})
		imageTrans.src = 'images/jupiterMapTrans.jpg';
	}, false);
	imageMapJupiter.src	= 'images/jupiterMap.jpg';
	
	var jupiterGasGeometry = new THREE.SphereGeometry(20.1, 64, 64)
	var jupiterGasMaterial = new THREE.MeshPhongMaterial({
		map		    : new THREE.Texture(canvasResultJupiter),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.26,
        depthWrite  : true,
	});
	jupiterGas = new THREE.Mesh(jupiterGasGeometry, jupiterGasMaterial);
    jupiterGas.castShadow = true;
    jupiterGas.receiveShadow = true;
    jupiter.add(jupiterGas);
    
    // AÃ±adir Io
    var ioGeometry	= new THREE.SphereGeometry(4, 64, 64); 
	var ioMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/io.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/ioBump.jpg'),
		bumpScale : 3,
	});
    io = new THREE.Mesh(ioGeometry,ioMaterial);
    io.castShadow = true;
    io.receiveShadow = true;
    jupiterNodo.add(io);
    
    // AÃ±adir Europa
    var europaGeometry	= new THREE.SphereGeometry(4.1, 64, 64); 
	var europaMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/europa.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/europaBump.jpg'),
		bumpScale : 3,
	});
    europa = new THREE.Mesh(europaGeometry,europaMaterial);
    europa.castShadow = true;
    europa.receiveShadow = true;
    jupiterNodo.add(europa);
    
    // AÃ±adir Ganimedes
    var ganimedesGeometry	= new THREE.SphereGeometry(3.7, 64, 64); 
	var ganimedesMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/ganimedes.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/ganimedesBump.jpg'),
		bumpScale : 3,
	});
    ganimedes = new THREE.Mesh(ganimedesGeometry,ganimedesMaterial);
    ganimedes.castShadow = true;
    ganimedes.receiveShadow = true;
    jupiterNodo.add(ganimedes);
    
    // AÃ±adir Calisto
    var calistoGeometry	= new THREE.SphereGeometry(3.2, 64, 64); 
	var calistoMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/calisto.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/calistoBump.jpg'),
		bumpScale : 3,
	});
    calisto = new THREE.Mesh(calistoGeometry,calistoMaterial);
    calisto.castShadow = true;
    calisto.receiveShadow = true;
    jupiterNodo.add(calisto);

    // AÃ±adir Saturno
    saturnoNodo1 = new THREE.Group();
    saturnoNodo2 = new THREE.Group();
    var saturnoGeometry	= new THREE.SphereGeometry(30, 64, 64); 
	var saturnoMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/saturno.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/saturnoBump.jpg'),
		bumpScale : 3,
	});
    saturno = new THREE.Mesh(saturnoGeometry,saturnoMaterial);
    saturno.castShadow = true;
    saturno.receiveShadow = true;
    saturnoNodo2.add(saturno);
    saturnoNodo2.add(saturnoNodo1);
    scene.add(saturnoNodo2);
    
    //AÃ±adir Anillo 1
    var anillo1Geometry = new THREE.TorusGeometry(36, 4, 2, 64, Math.PI*2);
    var anillo1Material = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/anillo1.jpg'),
	});
    anillo1 = new THREE.Mesh(anillo1Geometry, anillo1Material);
    saturnoNodo1.add(anillo1);
    
    //AÃ±adir Anillo 2
    var anillo2Geometry = new THREE.TorusGeometry(46, 5, 2, 64, Math.PI*2);
    var anillo2Material = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/anillo2.jpg'),
	});
    anillo2 = new THREE.Mesh(anillo2Geometry, anillo2Material);
    saturnoNodo1.add(anillo2);
    
    //AÃ±adir Anillo 3
    var anillo3Geometry = new THREE.TorusGeometry(58, 6, 2, 64, Math.PI*2);
    var anillo3Material = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/anillo3.jpg'),
	});
    anillo3 = new THREE.Mesh(anillo3Geometry, anillo3Material);
    saturnoNodo1.add(anillo3);
    
    // AÃ±adir Urano
    uranoNodo = new THREE.Group();
    var uranoGeometry	= new THREE.SphereGeometry(4.3, 64, 64); 
	var uranoMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/urano.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/uranoBump.jpg'),
		bumpScale : 3,
	});
    urano = new THREE.Mesh(uranoGeometry,uranoMaterial);
    urano.castShadow = true;
    uranoreceiveShadow = true;
    uranoNodo.add(urano);
    scene.add(uranoNodo);
    
    // AÃ±adir Miranda
    var mirandaGeometry	= new THREE.SphereGeometry(1.4, 64, 64); 
	var mirandaMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/miranda.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/mirandaBump.jpg'),
		bumpScale : 3,
	});
    miranda = new THREE.Mesh(mirandaGeometry,mirandaMaterial);
    miranda.castShadow = true;
    miranda.receiveShadow = true;
    uranoNodo.add(miranda);
    
    // AÃ±adir Ariel
    var arielGeometry	= new THREE.SphereGeometry(1, 64, 64); 
	var arielMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/ariel.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/arielBump.jpg'),
		bumpScale : 3,
	});
    ariel = new THREE.Mesh(arielGeometry,arielMaterial);
    ariel.castShadow = true;
    ariel.receiveShadow = true;
    uranoNodo.add(ariel);
    
    // AÃ±adir Umbriel
    var umbrielGeometry	= new THREE.SphereGeometry(0.8, 64, 64); 
	var umbrielMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/umbriel.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/umbrielumbrielBump.jpg'),
		bumpScale : 3,
	});
    umbriel = new THREE.Mesh(umbrielGeometry,umbrielMaterial);
    umbriel.castShadow = true;
    umbriel.receiveShadow = true;
    uranoNodo.add(umbriel);
    
    // AÃ±adir Titania
    var titaniaGeometry	= new THREE.SphereGeometry(0.5, 64, 64); 
	var titaniaMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/titania.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/titaniaBump.jpg'),
		bumpScale : 3,
	});
    titania = new THREE.Mesh(titaniaGeometry,titaniaMaterial);
    titania.castShadow = true;
    titania.receiveShadow = true;
    uranoNodo.add(titania);
    
    // AÃ±adir Oberon
    var oberonGeometry	= new THREE.SphereGeometry(0.3, 64, 64); 
	var oberonMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/oberon.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/oberonBump.jpg'),
		bumpScale : 3,
	});
    oberon = new THREE.Mesh(oberonGeometry,oberonMaterial);
    oberon.castShadow = true;
    oberon.receiveShadow = true;
    uranoNodo.add(oberon);
    
    // AÃ±adir Neptuno
    neptunoNodo = new THREE.Group();
    var neptunoGeometry	= new THREE.SphereGeometry(4.3, 64, 64); 
	var neptunoMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/neptuno.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/neptunoBump.jpg'),
		bumpScale : 3,
	});
    neptuno = new THREE.Mesh(neptunoGeometry,neptunoMaterial);
    neptuno.castShadow = true;
    neptuno.receiveShadow = true;
    neptunoNodo.add(neptuno);
    scene.add(neptunoNodo);
    
    // AÃ±adir Triton
    var tritonGeometry	= new THREE.SphereGeometry(1.2, 64, 64); 
	var tritonMaterial = new THREE.MeshPhongMaterial({
		map       : THREE.ImageUtils.loadTexture('images/triton.jpg'),
		bumpMap   : THREE.ImageUtils.loadTexture('images/tritonBump.jpg'),
		bumpScale : 3,
	});
    triton = new THREE.Mesh(tritonGeometry,tritonMaterial);
    triton.castShadow = true;
    triton.receiveShadow = true;
    neptunoNodo.add(triton);
    
    //Luz Ambiente
    var luzAmbiente = new THREE.AmbientLight({color: 0x000000});
    scene.add(luzAmbiente);
    
    // AÃ±adir cÃ¡mara
    camera.position.y = 300;
    camera.position.z = 500;
    camera.lookAt(scene.position);

    $("#canvas").append(renderer.domElement);
    document.addEventListener("dblclick", mouseDown, false);

    createPlane();

    document.addEventListener('mousemove', handleMouseMove, false);

    updatePlane();

    animate();
}
