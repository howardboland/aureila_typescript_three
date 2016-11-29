//TODO :: Add mechanism for loading modules from Aurelia.json
export class DynamicCube {
    public camera : THREE.Camera;
    public scene : THREE.Scene;
    public renderer : THREE.Renderer;
    public cssrenderer : THREE.CSS3DRenderer;
    public mesh : THREE.Mesh;
    public cssObject : THREE.CSS3DObject;
    public light : THREE.DirectionalLight;
    public container : HTMLDivElement;

    constructor() {
    }

    public attached() {
      this.init();
      this.animate();
    }

    public init = () => {

      //Basic scene setup
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(46, this.container.offsetWidth/this.container.offsetHeight, 1, 1000);
      this.camera.position.z = 600;
      this.light = new THREE.DirectionalLight(0xff);
      this.light.position.set(0, 10, 1).normalize();
      this.scene.add(this.light);

      // this.mesh.position.z = -50;

      this.addObjectToShowCanvasMethod();
      this.addObjectToShowCSS3DMethod();

      // We will use another type of renderer for dynamic
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.cssrenderer = new THREE.CSS3DRenderer();
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
      this.cssrenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);


      this.container.appendChild(this.renderer.domElement);
      this.container.appendChild(this.cssrenderer.domElement);
      this.cssrenderer.domElement.style.position = 'absolute';
      this.cssrenderer.domElement.style.top = '0px';
    }
    public addObjectToShowCanvasMethod = () => {

      //Let's create a canvas object3d
      var h = 150;
      var w = 300;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      ctx.font = '20pt Arial';
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'green';
      ctx.fillRect(w*.05, h*.05, w*.90, h*.90);
      ctx.fillStyle = 'black';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Hello World", w / 2, h / 2);
      let texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;

      // Add the box geometry
      var geometry = new THREE.BoxGeometry(100, 100, 100);
      var material = new THREE.MeshBasicMaterial({map: texture});
      // var material = new THREE.MeshMap
      // material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.x = -250;
      this.mesh.position.y = 50;
      this.scene.add(this.mesh);
    }

    public addObjectToShowCSS3DMethod = () => {
      this.cssObject = new THREE.CSS3DObject( document.getElementById("dynamicBox") );
      this.scene.add(this.cssObject);
    }
    public spin = () => {
      TweenMax.killTweensOf(this.cssObject.rotation);
      this.cssObject.rotation.y = 0;
      TweenMax.to(this.cssObject.rotation, 1, { y: Math.PI*2 });

    }
    public animate = () => {
            this.mesh.rotation.x += .01;
            this.mesh.rotation.y += .005;
            // this.cssObject.rotation.x += .01;
            // this.cssObject.rotation.y += .005;

            this.render();
            requestAnimationFrame(this.animate);
    }

    public render = () => {
        this.renderer.render(this.scene, this.camera);
        this.cssrenderer.render(this.scene, this.camera);
    }


}
