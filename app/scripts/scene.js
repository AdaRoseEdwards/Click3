/*global define, THREE, $*/
define(['jquery', 'three', 'libs/store', 'libs/tile'], function($, three, Store, Tile) {
    'use strict';
    var store = new Store();
    store.addCategory('globals');
    store.addCategory('render');
    var render = store.data.render;

    var scene = new THREE.Scene();
    var bigPlane = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
        transparent: true,
        opacity: 0
    }));
    bigPlane.rotation.x = -Math.PI / 2;
    scene.add(bigPlane);
    var WIDTH = 480;
    var HEIGHT = WIDTH * document.documentElement.clientHeight / document.documentElement.clientWidth;
    var VIEW_ANGLE = 45;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 0.1;
    var FAR = 10000;
    var sceneObjects = [];
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    //var camera = new THREE.OrthographicCamera( WIDTH / - 1, WIDTH / 1, HEIGHT / 1, HEIGHT / - 1, NEAR, FAR );
    
    render.set('sceneObjects', sceneObjects);
    render.set('renderer', renderer);
    render.set('scene', scene);
    render.set('camera', camera);
    render.set('bigPlane', bigPlane);

    function addObject(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                scene.add(obj[key]);
                sceneObjects.push(obj[key]);
            }
        }
    }
    camera.position.z = 300;
    camera.position.y = 300;
    camera.lookAt({x: 500, y: 0, z: 500});

    var c = [];
    var obj = {};
    for (var i = 0; i < 10; i++) {
        c[i] = [];
        for (var j = 0; j < 10; j++) {
            obj['cubex' + i + 'y' + j] = (new Tile({position: {x: i * 100, y: 0, z: j * 100}})).getModel(0);
        }
    }
    addObject(obj);

    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position = {x: 10, y: 500, z: 130};

    // add to the scene
    addObject({
        camera: camera,
        light: pointLight
    });
    
    render.set('objects', sceneObjects);
    render.set('clickables', sceneObjects);
    
    return renderer.domElement;
});