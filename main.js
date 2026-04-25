// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // Remove loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 1000);
        
        // Trigger initial animations
        initHeroAnimations();
    }, 500);

    // --- MAIN 3D BACKGROUND ---
    initMainBackground();

    // --- ABOUT SECTION 3D ---
    initAbout3D();

    // --- PROJECTS 3D PREVIEWS ---
    initProject3D('proj-1-3d', 0xff3366, 'torusKnot');
    initProject3D('proj-2-3d', 0xff9933, 'icosahedron');
    initProject3D('proj-3-3d', 0x33ccff, 'octahedron');

    // --- SCROLL ANIMATIONS ---
    initScrollAnimations();
});

// --- MAIN BACKGROUND (Particles + Wireframe Terrain) ---
function initMainBackground() {
    const canvas = document.getElementById('webgl-canvas');
    const scene = new THREE.Scene();
    
    // Add subtle fog for depth
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 1. Terrain Grid
    const planeGeom = new THREE.PlaneGeometry(200, 200, 40, 40);
    // Displace vertices to create terrain
    const vertices = planeGeom.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        // z represents height in plane geometry before rotation
        vertices[i+2] = Math.sin(vertices[i]/10) * Math.cos(vertices[i+1]/10) * 5; 
    }
    planeGeom.computeVertexNormals();

    const planeMat = new THREE.MeshBasicMaterial({ 
        color: 0xff3366, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.1 
    });
    const plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    scene.add(plane);

    // 2. Floating Particles
    const particlesGeom = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMat = new THREE.PointsMaterial({
        size: 0.2,
        color: 0xff9933,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2);
        mouseY = (event.clientY - window.innerHeight / 2);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Animate Terrain
        plane.position.z = (elapsedTime * 2) % 10;

        // Animate Particles
        particlesMesh.rotation.y = elapsedTime * 0.05;

        // Mouse Parallax
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        camera.position.x += (targetX * 10 - camera.position.x) * 0.02;
        camera.position.y += (-targetY * 10 + 10 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- ABOUT SECTION 3D (Abstract Core) ---
function initAbout3D() {
    const container = document.getElementById('about-canvas-container');
    if(!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff3366, 2, 50);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff9933, 2, 50);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Geometry
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    
    // Wireframe Outer
    const wireMat = new THREE.MeshBasicMaterial({ 
        color: 0xff3366, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.scale.set(1.2, 1.2, 1.2);
    scene.add(wireMesh);

    // Solid Inner
    const solidMat = new THREE.MeshPhongMaterial({
        color: 0x111111,
        emissive: 0x220011,
        specular: 0xff3366,
        shininess: 100,
        flatShading: true
    });
    const solidMesh = new THREE.Mesh(geometry, solidMat);
    scene.add(solidMesh);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        wireMesh.rotation.x += 0.005;
        wireMesh.rotation.y += 0.01;
        
        solidMesh.rotation.x -= 0.005;
        solidMesh.rotation.y -= 0.008;
        
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- PROJECT PREVIEWS 3D ---
function initProject3D(containerId, colorHex, type) {
    const container = document.getElementById(containerId);
    if(!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.PointLight(colorHex, 2, 100);
    light.position.set(0, 0, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x222222));

    let geometry;
    if(type === 'torusKnot') geometry = new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16);
    else if(type === 'icosahedron') geometry = new THREE.IcosahedronGeometry(1, 0);
    else geometry = new THREE.OctahedronGeometry(1, 0);

    const material = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.2,
        metalness: 0.8,
        emissive: colorHex,
        emissiveIntensity: 0.2,
        wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Hover effect variables
    let isHovered = false;
    
    container.parentElement.addEventListener('mouseenter', () => isHovered = true);
    container.parentElement.addEventListener('mouseleave', () => isHovered = false);

    function animate() {
        requestAnimationFrame(animate);
        
        if(isHovered) {
            mesh.rotation.x += 0.02;
            mesh.rotation.y += 0.02;
            material.emissiveIntensity = 0.6;
        } else {
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;
            material.emissiveIntensity = 0.2;
        }

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- GSAP ANIMATIONS ---
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.from('nav', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.tagline', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.glitch-text', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .from('.hero h2', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero p', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.btn-group', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
}

function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // About Section
    gsap.from('.about-text > *', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    gsap.from('.about-3d', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Projects Section
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Contact Section
    gsap.from('.contact-box', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });
}
