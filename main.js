// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- CYBERNETIC ANIMATED LOADER ---
    initCyberneticLoader(() => {
        // Trigger initial hero animations after loader exit
        initHeroAnimations();
    });

    // --- MAIN 3D BACKGROUND ---
    initMainBackground();

    // --- ABOUT SECTION 3D ---
    initAbout3D();

    // --- CYBERNETIC 3D PROJECT REEL & INTERACTIVE MODAL SHOWCASE ---
    initCyberneticProjectReel();

    // --- TYPING EFFECT ---
    initTypingEffect();

    // --- SCROLL ANIMATIONS ---
    initScrollAnimations();
});

// --- CYBERNETIC ANIMATED LOADER ---
function initCyberneticLoader(onComplete) {
    const loader = document.getElementById('loader');
    const percentEl = document.getElementById('loader-percent');
    const barFillEl = document.getElementById('loader-bar-fill');
    const statusTextEl = document.getElementById('loader-status-text');
    const fpsTextEl = document.getElementById('loader-fps-text');
    const particleCanvas = document.getElementById('loader-particle-canvas');

    if (!loader) {
        if (onComplete) onComplete();
        return;
    }

    // --- WebGL 3D Particle Galaxy Scene for Loader ---
    let animationFrameId;
    let particleMesh;

    if (particleCanvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create Particle Cloud
        const particleCount = 1200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color(0x00f2fe);
        const color2 = new THREE.Color(0x00ffcc);

        for (let i = 0; i < particleCount; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 12 + Math.random() * 18;

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.25,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        particleMesh = new THREE.Points(geometry, material);
        scene.add(particleMesh);

        function renderParticles() {
            animationFrameId = requestAnimationFrame(renderParticles);
            if (particleMesh) {
                particleMesh.rotation.y += 0.004;
                particleMesh.rotation.x += 0.002;
            }
            renderer.render(scene, camera);
        }
        renderParticles();

        window.addEventListener('resize', () => {
            if (!particleCanvas) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    const logs = [
        { pct: 0, text: "INITIALIZING QUANTUM NEURAL MATRIX..." },
        { pct: 25, text: "LOADING 3D GRAPHICS ENGINE..." },
        { pct: 50, text: "DEPLOYING CYBERNETIC PROJECT DECK..." },
        { pct: 75, text: "SYNCHRONIZING REAL-TIME TELEMETRY..." },
        { pct: 100, text: "SYSTEM ONLINE &bull; ACCESS GRANTED" }
    ];

    let currentPercent = 0;
    const duration = 1800;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
        currentPercent += step + (Math.random() * 1.5);
        if (currentPercent >= 100) {
            currentPercent = 100;
            clearInterval(timer);
        }

        const rounded = Math.floor(currentPercent);
        if (percentEl) percentEl.textContent = `${rounded}%`;
        if (barFillEl) barFillEl.style.width = `${rounded}%`;

        // Update live simulated FPS
        if (fpsTextEl) {
            const liveFps = (58.5 + Math.random() * 3.0).toFixed(1);
            fpsTextEl.textContent = liveFps;
        }

        if (statusTextEl) {
            for (let i = logs.length - 1; i >= 0; i--) {
                if (rounded >= logs[i].pct) {
                    statusTextEl.innerHTML = logs[i].text;
                    break;
                }
            }
        }

        if (rounded >= 100) {
            setTimeout(() => {
                if (particleMesh) {
                    gsap.to(particleMesh.scale, { x: 3, y: 3, z: 3, duration: 0.8, ease: "power2.in" });
                }

                gsap.to(loader, {
                    opacity: 0,
                    scale: 1.15,
                    filter: "blur(20px)",
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (animationFrameId) cancelAnimationFrame(animationFrameId);
                        loader.remove();
                        if (onComplete) onComplete();
                    }
                });
            }, 300);
        }
    }, intervalTime);
}

// --- TYPING EFFECT ---
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const phrases = [
        "Machine Learning Engineer",
        "Data Analysis",
        "AI",
        "Software Development"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

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
        color: 0x00f2fe, 
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
        color: 0x00ffcc,
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
    
    const pointLight = new THREE.PointLight(0x00f2fe, 2, 50);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00ffcc, 2, 50);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Geometry
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    
    // Wireframe Outer
    const wireMat = new THREE.MeshBasicMaterial({ 
        color: 0x00f2fe, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.scale.set(1.2, 1.2, 1.2);
    scene.add(wireMesh);

    // Solid Inner
    const solidMat = new THREE.MeshPhongMaterial({
        color: 0x050f15,
        emissive: 0x002233,
        specular: 0x00f2fe,
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
    else if(type === 'octahedron') geometry = new THREE.OctahedronGeometry(1, 0);
    else if(type === 'dodecahedron') geometry = new THREE.DodecahedronGeometry(1, 0);
    else if(type === 'torus') geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
    else if(type === 'box') geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    else if(type === 'cone') geometry = new THREE.ConeGeometry(0.9, 1.5, 16);
    else if(type === 'sphere') geometry = new THREE.SphereGeometry(1, 16, 16);
    else if(type === 'cylinder') geometry = new THREE.CylinderGeometry(0.8, 0.8, 1.4, 16);
    else geometry = new THREE.TetrahedronGeometry(1.2, 0);

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

// --- CYBERNETIC 3D PROJECT REEL & INTERACTIVE MODAL SHOWCASE ---
function initCyberneticProjectReel() {
    const streamContainer = document.getElementById('ticket-dispenser-viewport');
    const issuingCounter = document.getElementById('reel-issuing-counter');
    const filterBtns = document.querySelectorAll('.reel-filter-btn');

    if (!streamContainer) return;

    const projectsData = [
        {
            id: 1,
            num: "01",
            title: "SIH AI DPR Evaluator System",
            category: "ai",
            badge: "SIH 2025 Finalist",
            impact: "⚡ 98% Review Speedup",
            desc: "National-level AI evaluation system checking enterprise DPR compliance with RAG, NLP semantic chunking, and FastAPI backend.",
            tech: ["Python", "NLP", "RAG Engine", "FastAPI", "Data Science"],
            color: 0x00f2fe,
            geomType: "torusKnot",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 2,
            num: "02",
            title: "RetailSense AI Copilot",
            category: "ai analytics",
            badge: "Featured AI System",
            impact: "📈 Sales & Demand Forecast",
            desc: "AI-driven retail intelligence platform featuring Prophet sales demand forecasting, pricing insights, and Streamlit Copilot.",
            tech: ["Python", "Streamlit", "Prophet", "Pandas"],
            color: 0x00ffcc,
            geomType: "icosahedron",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 3,
            num: "03",
            title: "AI Internship Recommender",
            category: "ai",
            badge: "NLP Recommendation",
            impact: "🎯 Personalized Matching",
            desc: "Intelligent recommendation engine matching student profiles with internships using skill extraction and resume scoring.",
            tech: ["Python", "NLP", "Scikit-learn", "FastAPI"],
            color: 0x00e5ff,
            geomType: "dodecahedron",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 4,
            num: "04",
            title: "AI Resume Analyzer & Engine",
            category: "ai software",
            badge: "Talent Intelligence",
            impact: "🔍 Automated HR Screening",
            desc: "Automated HR resume analytics system extracting skills, calculating candidate fit scores, and identifying skill gaps.",
            tech: ["React", "FastAPI", "NLP", "Tailwind"],
            color: 0x38bdf8,
            geomType: "octahedron",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 5,
            num: "05",
            title: "NLP Text-to-SQL Assistant",
            category: "ai analytics",
            badge: "Wizcoder AI Project",
            impact: "💬 Natural Language Query",
            desc: "Conversational business intelligence assistant converting plain natural language questions into database SQL queries.",
            tech: ["Python", "NLP", "FastAPI", "PostgreSQL"],
            color: 0x00ffcc,
            geomType: "cyberRing",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 6,
            num: "06",
            title: "Market Analytics Forecaster",
            category: "analytics",
            badge: "Predictive Analytics",
            impact: "📊 Elasticity Modeling",
            desc: "Predictive analytics platform analyzing multi-variate market datasets for demand forecasting and inventory alerts.",
            tech: ["Python", "Pandas", "Scikit-Learn", "Seaborn"],
            color: 0x00d2c4,
            geomType: "crystal",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 7,
            num: "07",
            title: "Enterprise Document OCR Engine",
            category: "software",
            badge: "Document AI",
            impact: "📄 Scanned PDF Extraction",
            desc: "Multilingual document text extraction pipeline parsing unstructured scanned enterprise PDFs into clean JSON schemas.",
            tech: ["Python", "OpenCV", "PyTesseract", "FastAPI"],
            color: 0x00f2fe,
            geomType: "hyperSphere",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 8,
            num: "08",
            title: "Customer Churn Classifier",
            category: "ai analytics",
            badge: "Machine Learning",
            impact: "🛡️ Attrition Risk Alert",
            desc: "ML classification pipeline evaluating customer behavioral signals to predict attrition risk with high precision.",
            tech: ["Python", "Scikit-learn", "NumPy", "Streamlit"],
            color: 0x00ffcc,
            geomType: "coneRing",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 9,
            num: "09",
            title: "Automated HR Talent Dashboard",
            category: "software",
            badge: "Full-Stack Web App",
            impact: "📊 Real-time HR Metrics",
            desc: "Interactive web dashboard rendering candidate rankings, skill heatmaps, and recruitment decision metrics.",
            tech: ["JavaScript", "React", "Chart.js", "PostgreSQL"],
            color: 0x38bdf8,
            geomType: "meshCube",
            link: "https://github.com/Aryan8347"
        },
        {
            id: 10,
            num: "10",
            title: "Enterprise ETL Data Pipeline",
            category: "analytics software",
            badge: "Data Engineering",
            impact: "⚡ Automated Data Marts",
            desc: "Automated Python ETL framework converting raw heterogeneous data sources into normalized analytical data marts.",
            tech: ["Python", "PostgreSQL", "Pandas", "SQL"],
            color: 0x00f2fe,
            geomType: "multiSphere",
            link: "https://github.com/Aryan8347"
        }
    ];

    let filteredProjects = [...projectsData];
    let mainScrollTimeline = null;

    // Initialize Detail Modal Handler
    const modalHandler = initProjectModal();

    // Render Ticket Cards
    function renderReelCards() {
        streamContainer.innerHTML = '';

        filteredProjects.forEach((proj, idx) => {
            const card = document.createElement('div');
            card.className = 'project-ticket-card';
            card.setAttribute('data-idx', idx);

            card.innerHTML = `
                <div class="ticket-corner-notch top-left"></div>
                <div class="ticket-corner-notch bottom-right"></div>

                <div class="ticket-main-col">
                    <div class="ticket-top-meta">
                        <span class="ticket-num">${proj.num} / ${String(filteredProjects.length).padStart(2, '0')}</span>
                        <span class="ticket-badge">${proj.badge}</span>
                        <span class="ticket-impact">${proj.impact}</span>
                    </div>
                    <h3 class="ticket-title">${proj.title}</h3>
                    <p class="ticket-desc">${proj.desc}</p>
                    <div class="ticket-tech-tags">
                        ${proj.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>

                <div class="ticket-graphic-col">
                    <div class="ticket-cyber-glyph">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                    </div>
                </div>

                <div class="ticket-side-tab">
                    <span>EXPLORE DETAILS</span>
                    <span class="side-tab-arrow">↗</span>
                </div>
            `;

            // Click listener to open modal with full details
            card.addEventListener('click', () => {
                modalHandler.openModal(proj, filteredProjects.length);
            });

            streamContainer.appendChild(card);
        });

        // Trigger GSAP Scroll Pinning & Replacement Timeline
        setupScrollPinning();
    }

    // GSAP ScrollTrigger Pinned Timeline for Card Replacement
    function setupScrollPinning() {
        gsap.registerPlugin(ScrollTrigger);

        if (mainScrollTimeline) {
            mainScrollTimeline.scrollTrigger.kill();
            mainScrollTimeline.kill();
            mainScrollTimeline = null;
        }

        const cards = streamContainer.querySelectorAll('.project-ticket-card');
        if (!cards.length) return;

        // Set initial card states
        cards.forEach((card, idx) => {
            if (idx === 0) {
                card.classList.add('active-card');
                gsap.set(card, { opacity: 1, y: 0, rotationX: 0, scale: 1 });
            } else {
                card.classList.remove('active-card');
                gsap.set(card, { opacity: 0, y: 60, rotationX: -20, scale: 0.92 });
            }
        });

        if (issuingCounter && filteredProjects[0]) {
            issuingCounter.textContent = `ISSUING ${filteredProjects[0].num} / ${String(filteredProjects.length).padStart(2, '0')}`;
        }

        if (filteredProjects.length <= 1) return;

        const totalSteps = filteredProjects.length - 1;
        
        mainScrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#projects",
                start: "top top",
                end: `+=${totalSteps * 650}`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const rawIdx = Math.min(Math.floor(self.progress * filteredProjects.length), filteredProjects.length - 1);
                    
                    cards.forEach((card, i) => {
                        if (i === rawIdx) {
                            card.classList.add('active-card');
                        } else {
                            card.classList.remove('active-card');
                        }
                    });

                    if (issuingCounter && filteredProjects[rawIdx]) {
                        issuingCounter.textContent = `ISSUING ${filteredProjects[rawIdx].num} / ${String(filteredProjects.length).padStart(2, '0')}`;
                    }
                }
            }
        });

        for (let i = 0; i < totalSteps; i++) {
            const currentCard = cards[i];
            const nextCard = cards[i + 1];

            mainScrollTimeline
                .to(currentCard, {
                    opacity: 0,
                    y: -60,
                    rotationX: 20,
                    scale: 0.92,
                    duration: 1,
                    ease: "power2.inOut"
                }, i * 2)
                .fromTo(nextCard, 
                    { opacity: 0, y: 60, rotationX: -20, scale: 0.92 },
                    { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1, ease: "power2.inOut" },
                    i * 2 + 0.6
                );
        }
    }

    // Filter Buttons Listener
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            if (filter === 'all') {
                filteredProjects = [...projectsData];
            } else {
                filteredProjects = projectsData.filter(p => p.category.includes(filter));
            }

            renderReelCards();
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        });
    });

    // Initial Render
    renderReelCards();
}

// --- INTERACTIVE 3D PROJECT DETAIL MODAL HANDLER ---
function initProjectModal() {
    const modalEl = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const numEl = document.getElementById('modal-num');
    const badgeEl = document.getElementById('modal-badge');
    const titleEl = document.getElementById('modal-title');
    const impactEl = document.getElementById('modal-impact');
    const descEl = document.getElementById('modal-desc');
    const techContainer = document.getElementById('modal-tech-tags');
    const githubLink = document.getElementById('modal-github-link');
    const canvasContainer = document.getElementById('modal-3d-canvas');

    if (!modalEl || !canvasContainer) return { openModal: () => {} };

    // --- THREE.JS MODAL 3D STAGE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x00f2fe, 3, 50);
    light1.position.set(3, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00ffcc, 2, 50);
    light2.position.set(-3, -3, 3);
    scene.add(light2);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Build 3D Hologram Geometry
    function createModal3DGeometry(type, colorHex) {
        while (mainGroup.children.length > 0) {
            const child = mainGroup.children[0];
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
            mainGroup.remove(child);
        }

        let geom;
        if (type === 'torusKnot') geom = new THREE.TorusKnotGeometry(1.1, 0.35, 120, 16);
        else if (type === 'icosahedron') geom = new THREE.IcosahedronGeometry(1.4, 1);
        else if (type === 'dodecahedron') geom = new THREE.DodecahedronGeometry(1.3, 0);
        else if (type === 'octahedron') geom = new THREE.OctahedronGeometry(1.4, 0);
        else if (type === 'cyberRing') geom = new THREE.TorusGeometry(1.2, 0.3, 16, 100);
        else if (type === 'crystal') geom = new THREE.ConeGeometry(1.2, 2.2, 5);
        else if (type === 'hyperSphere') geom = new THREE.SphereGeometry(1.3, 24, 24);
        else if (type === 'coneRing') geom = new THREE.CylinderGeometry(0.2, 1.4, 2, 16);
        else if (type === 'meshCube') geom = new THREE.BoxGeometry(1.4, 1.4, 1.4);
        else geom = new THREE.IcosahedronGeometry(1.3, 2);

        // Outer Wireframe Mesh
        const wireMat = new THREE.MeshBasicMaterial({
            color: colorHex,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        const wireMesh = new THREE.Mesh(geom, wireMat);
        mainGroup.add(wireMesh);

        // Inner Glowing Core
        const innerMat = new THREE.MeshPhongMaterial({
            color: 0x061018,
            emissive: colorHex,
            emissiveIntensity: 0.3,
            specular: colorHex,
            shininess: 90,
            flatShading: true
        });
        const innerMesh = new THREE.Mesh(geom, innerMat);
        innerMesh.scale.set(0.85, 0.85, 0.85);
        mainGroup.add(innerMesh);

        // Particle Ring
        const pGeom = new THREE.BufferGeometry();
        const pCount = 250;
        const pos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i += 3) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.8 + Math.random() * 0.5;
            pos[i] = Math.cos(angle) * radius;
            pos[i + 1] = (Math.random() - 0.5) * 0.8;
            pos[i + 2] = Math.sin(angle) * radius;
        }
        pGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const pMat = new THREE.PointsMaterial({
            size: 0.04,
            color: colorHex,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const pMesh = new THREE.Points(pGeom, pMat);
        mainGroup.add(pMesh);
    }

    // Mouse Tilt Interaction
    let mouseX = 0, mouseY = 0;
    canvasContainer.addEventListener('mousemove', (e) => {
        const rect = canvasContainer.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    let animId = null;
    function animateModal3D() {
        animId = requestAnimationFrame(animateModal3D);
        mainGroup.rotation.x += 0.007;
        mainGroup.rotation.y += 0.01;

        mainGroup.rotation.z += (mouseX * 0.25 - mainGroup.rotation.z) * 0.06;
        mainGroup.rotation.x += (-mouseY * 0.25 - mainGroup.rotation.x) * 0.06;

        renderer.render(scene, camera);
    }

    function resizeModalCanvas() {
        if (!canvasContainer) return;
        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    // Open Modal Function
    function openModal(projData, totalCount) {
        numEl.textContent = `${projData.num} / ${String(totalCount).padStart(2, '0')}`;
        badgeEl.textContent = projData.badge;
        titleEl.textContent = projData.title;
        impactEl.textContent = projData.impact;
        descEl.textContent = projData.desc;
        githubLink.href = projData.link;
        techContainer.innerHTML = projData.tech.map(t => `<span>${t}</span>`).join('');

        // Build 3D Model & Lights
        createModal3DGeometry(projData.geomType, projData.color);
        light1.color.setHex(projData.color);
        light2.color.setHex(projData.color === 0x00f2fe ? 0x00ffcc : 0x00f2fe);

        modalEl.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            resizeModalCanvas();
            if (!animId) animateModal3D();
        }, 50);
    }

    // Close Modal Function
    function closeModal() {
        modalEl.classList.remove('active');
        document.body.style.overflow = '';
        if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
        }
    }

    // Close listeners
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) closeModal();
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl.classList.contains('active')) closeModal();
    });

    return { openModal, closeModal };
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

    // Experience Section Line & Card Animations
    gsap.to('.timeline-progress', {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1
        },
        height: '100%',
        ease: 'none'
    });

    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 70%'
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.25,
        ease: 'power3.out'
    });

    // Spotlight cursor glow tracking on experience cards
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Projects Section Command Center
    gsap.from('.cmd-container', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
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
