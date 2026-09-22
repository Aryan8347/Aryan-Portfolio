// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- CYBERNETIC ANIMATED LOADER ---
    initCyberneticLoader(() => {
        // Trigger initial hero animations after loader exit
        initHeroAnimations();
    });

    // --- MAIN 3D BACKGROUND ---
    initMainBackground();

    // --- ABOUT SECTION 3D & TERMINAL TABS ---
    initAbout3D();
    initTerminalTabs();

    // --- CYBERNETIC 3D PROJECT REEL & INTERACTIVE MODAL SHOWCASE ---
    initCyberneticProjectReel();

    // --- TYPING EFFECT ---
    initTypingEffect();

    // --- SCROLL ANIMATIONS ---
    initScrollAnimations();

    // --- CONTACT FORM MAILTO INTEGRATION ---
    initContactForm();
});

// --- CONTACT FORM DIRECT EMAIL FORWARDING ---
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const responseMsg = document.getElementById('form-response-msg');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');

        const nameVal = nameInput ? nameInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const messageVal = messageInput ? messageInput.value.trim() : '';

        if (!nameVal || !emailVal || !messageVal) return;

        // UI Loading State
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending Message...`;
        }
        if (responseMsg) {
            responseMsg.className = 'form-response-msg';
            responseMsg.removeAttribute('style');
            responseMsg.style.display = 'block';
            responseMsg.innerHTML = 'Sending message...';
        }

        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch("https://formsubmit.co/ajax/patelaryanjayeshbhai@gmail.com", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            });

            const data = await response.json();

            if (data.success === "true" || data.success === true || (data.message && data.message.includes("Activation"))) {
                if (responseMsg) {
                    responseMsg.className = 'form-response-msg success';
                    responseMsg.removeAttribute('style');
                    responseMsg.innerHTML = `Message sent successfully!`;
                }
                contactForm.reset();
            } else {
                throw new Error(data.message || 'FormSubmit request failed');
            }
        } catch (err) {
            console.warn('FormSubmit fetch error, launching mailto fallback:', err);
            // Fallback: Mailto trigger
            const subject = encodeURIComponent(`Portfolio Inquiry from ${nameVal}`);
            const body = encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`);
            window.location.href = `mailto:patelaryanjayeshbhai@gmail.com?subject=${subject}&body=${body}`;

            if (responseMsg) {
                responseMsg.className = 'form-response-msg success';
                responseMsg.removeAttribute('style');
                responseMsg.innerHTML = `Opening email client to send message...`;
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `Send Message ↗`;
            }
        }
    });
}

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

// --- ABOUT SECTION 3D (Minimalist Vercel Core) ---
function initAbout3D() {
    const container = document.getElementById('about-canvas-container');
    if(!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00f2fe, 3, 50);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00ffcc, 3, 50);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    // Minimalist Outer Wireframe Geometry
    const outerGeom = new THREE.IcosahedronGeometry(1.4, 2);
    const wireMat = new THREE.MeshBasicMaterial({ 
        color: 0x00f2fe, 
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(outerGeom, wireMat);
    group.add(wireMesh);

    // Inner Metallic Core
    const innerGeom = new THREE.IcosahedronGeometry(0.9, 1);
    const innerMat = new THREE.MeshPhongMaterial({
        color: 0x041525,
        emissive: 0x002c3e,
        specular: 0x00ffcc,
        shininess: 100,
        flatShading: true
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    group.add(innerMesh);

    // Orbiting Ring
    const ringGeom = new THREE.TorusGeometry(1.9, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.5 });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // Mouse Interaction
    let mouseX = 0, mouseY = 0;
    const card = container.closest('.vercel-bento-card') || container;
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    card.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        wireMesh.rotation.x = elapsedTime * 0.2;
        wireMesh.rotation.y = elapsedTime * 0.25;

        innerMesh.rotation.x = -elapsedTime * 0.15;
        innerMesh.rotation.y = -elapsedTime * 0.2;

        ringMesh.rotation.z = elapsedTime * 0.3;

        group.rotation.y += (mouseX * 0.35 - group.rotation.y) * 0.05;
        group.rotation.x += (-mouseY * 0.35 - group.rotation.x) * 0.05;

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
            title: "AI-Powered DPR Quality & Risk System",
            category: "ai analytics",
            badge: "SIH 2025 Finalist • AI & RAG",
            impact: "98% Review Speedup & Risk Scoring",
            desc: "Automates the analysis and quality assessment of 300+ page Detailed Project Reports (DPRs) for roads, healthcare, and tourism infrastructure. Features text/BOQ extraction, red-flag detection, RAG document intelligence, and automated risk scoring.",
            features: [
                "RAG Document Intelligence engine parsing 300+ page Detailed Project Reports (DPRs) across road, healthcare, and tourism sectors.",
                "Dual OCR pipeline (PaddleOCR + Table Transformer) for precise tabular BOQ extraction and structural anomaly detection.",
                "Automated risk scoring engine evaluating cost overruns, safety compliance, and environmental regulations.",
                "Executive dashboard presenting high-risk flag alerts, confidence scores, and instant automated query responses.",
                "Firebase integration for secure cloud file storage and multi-user audit tracking."
            ],
            tech: ["Python", "FastAPI", "RAG Engine", "Ollama / Local AI", "PaddleOCR", "Table Transformer", "SQL", "Firebase"],
            color: 0x00f2fe,
            geomType: "torusKnot"
        },
        {
            id: 2,
            num: "02",
            title: "RetailSense-AI Analytics Copilot",
            category: "ai analytics",
            badge: "AI Business Intelligence",
            impact: "Sales & Revenue Forecasting",
            desc: "AI-driven retail intelligence platform converting raw CSV sales data into interactive analytics. Features automated data cleaning, outlier detection, customer clustering, 7-day revenue forecasting, and KPI dashboards.",
            features: [
                "Automated data ingestion & cleaning engine converting raw retail transactional CSVs into sanitized data models.",
                "Advanced exploratory data analysis (EDA) identifying revenue drivers, high-performing categories, and seasonal trends.",
                "Machine Learning clustering algorithms for RFM (Recency, Frequency, Monetary) customer segmentation.",
                "Predictive revenue forecasting engine generating 7-day automated sales projections and inventory stock recommendations.",
                "Interactive Streamlit dashboard with real-time dynamic charts and automated KPI metrics."
            ],
            tech: ["Python", "Streamlit", "Pandas", "NumPy", "Scikit-learn", "Machine Learning", "Data Visualization"],
            color: 0x00ffcc,
            geomType: "icosahedron"
        },
        {
            id: 3,
            num: "03",
            title: "AI Resume Analyzer — BreachBunny",
            category: "ai software",
            badge: "Talent Intelligence Platform",
            impact: "Automated HR Screening & RAG",
            desc: "AI-powered recruitment platform for resume PDF parsing, skill extraction, candidate experience evaluation, recruiter email integration, and Llama 3.2 local model scoring.",
            features: [
                "Multi-format PDF resume parser extracting candidate contact info, technical skills, work history, and education.",
                "Local Llama 3.2 AI model evaluation producing candidate match scores, strength summaries, and red-flag alerts.",
                "Automated recruiter email integration for bulk resume processing and notification workflows.",
                "Custom candidate dashboard comparing applicant skills against job descriptions in real-time.",
                "Role-Based Access Control (RBAC) with JWT authorization protecting recruiter candidate lists."
            ],
            tech: ["React 18", "Vite", "Tailwind CSS", "Python", "FastAPI", "RAG", "SQL", "JWT", "Ollama", "PyMuPDF"],
            color: 0x38bdf8,
            geomType: "octahedron"
        },
        {
            id: 4,
            num: "04",
            title: "CareerSetu – Internship Recommender",
            category: "ai analytics",
            badge: "NLP Recommendation Engine",
            impact: "Personalized Candidate Matching",
            desc: "Intelligent recommendation engine matching candidate profiles, technical skills, and academic qualifications with personalized internship opportunities.",
            features: [
                "Natural Language Processing (NLP) profile analyzer matching student skills with industry internship requirements.",
                "Automated candidate scoring matrix ranking applicants based on domain relevance, project history, and tech stack.",
                "Dynamic search & filter system for quick navigation across 100+ internship categories and skill sets.",
                "Enterprise admin panel for managing recruiter listings, application statuses, and candidate recommendations.",
                "High-performance Python backend handling REST API responses with zero latency."
            ],
            tech: ["Python", "SQL", "Recommendation System", "Data Processing", "Backend REST APIs"],
            color: 0x00e5ff,
            geomType: "dodecahedron"
        },
        {
            id: 5,
            num: "05",
            title: "Taranjot Resources ERP System",
            category: "software",
            badge: "Enterprise ERP Portal",
            impact: "Multi-Branch Supply Chain & Orders",
            desc: "Enterprise Resource Planning system for coal and industrial resource operations. Manages multi-branch orders, user roles, stored procedure workflows, and real-time operational dashboards.",
            features: [
                "Multi-branch order fulfillment pipeline for coal and industrial material trade operations.",
                "High-performance MS SQL stored procedures handling inventory balances, ledger entries, and tax calculations.",
                "Granular role-based access control (RBAC) securing financial records, sales orders, and customer master data.",
                "Executive analytics dashboard displaying real-time branch performance, daily dispatch totals, and pending payments.",
                "Production deployment on Windows Server IIS environment with high uptime reliability."
            ],
            tech: ["Python", "FastAPI", "REST APIs", "Microsoft SQL Server", "Stored Procedures", "IIS", "Windows Server"],
            color: 0x00f2fe,
            geomType: "cyberRing"
        },
        {
            id: 6,
            num: "06",
            title: "ERP App Textile — HRMS & Attendance",
            category: "software",
            badge: "Enterprise HRMS & Logistics",
            impact: "Geofenced Attendance & HR Control",
            desc: "Enterprise HRMS and employee attendance management platform featuring selfie/GPS check-in, geofencing validation, shift/leave regularization, and inventory order control.",
            features: [
                "Geofenced mobile selfie check-in with GPS validation preventing proxy attendance across multi-location textile units.",
                "Automated shift management, leave request workflows, overtime computation, and monthly payroll processing.",
                "Material order tracking system linking textile production inventory with dispatch logistics.",
                "Real-time HR analytics portal providing attendance heatmaps, late-mark flags, and workforce productivity metrics.",
                "Secure RESTful API architecture connecting mobile check-in apps with MS SQL database."
            ],
            tech: ["Python", "REST APIs", "Microsoft SQL Server", "Stored Procedures", "JWT", "IIS", "Geofencing"],
            color: 0x00ffcc,
            geomType: "crystal"
        },
        {
            id: 7,
            num: "07",
            title: "Branch Label Approval & Delivery System",
            category: "software",
            badge: "Secure Internal Logistics",
            impact: "Head-Office Approval Workflow",
            desc: "Secure multi-branch label delivery tracking system routing inter-city branch label requests through Head Office approval across 150+ branches and 250+ users.",
            features: [
                "Centralized approval workflow routing label request tickets from 150+ retail branches to Head Office.",
                "Multi-tier role permissions separating branch requesters, regional managers, and HO fulfillment officers.",
                "Live delivery tracking and dispatch status logs covering 250+ active enterprise users.",
                "Automated audit trail recording approval timestamps, printed label volumes, and branch dispatch receipts.",
                "Secure private server host architecture with encrypted MS SQL database connections."
            ],
            tech: ["Python", "REST APIs", "Microsoft SQL Server", "Role-Based Access", "Private Server Security"],
            color: 0x00d2c4,
            geomType: "hyperSphere"
        },
        {
            id: 8,
            num: "08",
            title: "Basilico Pizzeria – AI QR Review System",
            category: "ai software",
            badge: "Customer Engagement AI",
            impact: "AI Review Generator & Redirection",
            desc: "Mobile-first QR review collection system generating human-like customer feedback options and 1-click Google Review redirection for restaurants.",
            features: [
                "Mobile-optimized QR landing page allowing restaurant guests to select rating feedback in seconds.",
                "AI-assisted feedback text generator providing customers with pre-written, natural review suggestions.",
                "Smart 1-click redirection routing 4 & 5 star reviews directly to Google Business Profile for maximum rating boost.",
                "Internal management feedback capture for 1-3 star reviews enabling private resolution before online posting.",
                "Zero-dependency lightweight frontend deployed on Vercel for instant mobile page loading."
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Vercel", "QR Code Engine", "Google Review API"],
            color: 0x38bdf8,
            geomType: "coneRing"
        },
        {
            id: 9,
            num: "09",
            title: "Coal Company Order Dashboard & Portal",
            category: "analytics",
            badge: "Global Operations Portal",
            impact: "Multi-Origin Resource Tracking",
            desc: "Enterprise digital platform presenting coal supply origins (India, Indonesia, South Africa, Australia, Russia, China, Colombia), international suppliers, and energy solutions.",
            features: [
                "Multi-origin commodity showcase tracking coal imports across India, Indonesia, South Africa, Australia, Russia, China & Colombia.",
                "Live international supplier directory detailing gross calorific value (GCV), moisture content, and ash percentage specs.",
                "Interactive buyer inquiry portal connecting industrial clients directly with regional sales representatives.",
                "High-contrast responsive web UI built with dark glassmorphism styling and smooth CSS micro-interactions.",
                "Fast edge-network hosting deployed on Vercel for instant international client access."
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Web UI", "Vercel"],
            color: 0x00f2fe,
            geomType: "meshCube"
        },
        {
            id: 10,
            num: "10",
            title: "Order Analytics Environment Dashboard",
            category: "analytics software",
            badge: "Real-Time P&L & Port Logistics",
            impact: "Live Activity Ticker & Stock Clearance",
            desc: "Real-time bulk commodity analytics dashboard tracking live sales orders, delivery orders (DO), lifting progress, regional profit margins, vessel tracking, and port stock clearance.",
            features: [
                "Real-time P&L tracking dashboard visualizing live sales orders, delivery orders (DO), and lifting progress.",
                "Regional profit margin analyzer computing gross margins across different discharge ports and customer tiers.",
                "Port stock clearance monitor tracking vessel laytime, demurrage risks, and warehouse storage status.",
                "Automated live activity ticker displaying real-time order bookings, payments, and dispatch notifications.",
                "Cloudflare Worker proxy integration securing backend API endpoints and data feeds."
            ],
            tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Python", "FastAPI", "Cloudflare Worker Proxy", "Vercel"],
            color: 0x00ffcc,
            geomType: "multiSphere"
        },
        {
            id: 11,
            num: "11",
            title: "Fuel Reconciliation & Variance Dashboard",
            category: "analytics software",
            badge: "Automated Fleet Audit Engine",
            impact: "Zero-Loss Fuel Theft Detection",
            desc: "Automated dual-engine fuel reconciliation system unifying internal fleet refuel logs with HP Petroleum vendor statements to catch theft, overbilling, and liter mismatches.",
            features: [
                "Dual-engine audit software comparing internal fleet refuel logs with HP Petroleum vendor statements.",
                "Automated Excel/CSV data normalization handling varied multi-sheet format inputs from multiple transporters.",
                "Intelligent variance detection flagging fuel volume discrepancies, unrecorded fill-ups, and price per liter mismatches.",
                "Executive audit report generator producing zero-loss fuel audit summaries with instant CSV exports.",
                "Browser-based SheetJS data processing engine executing audit logic with zero client installation."
            ],
            tech: ["Python (Pandas)", "JavaScript (ES6+)", "HTML5/CSS3", "SheetJS (XLSX)", "OpenPyXL", "CSV Export"],
            color: 0x00e5ff,
            geomType: "torusKnot"
        },
        {
            id: 12,
            num: "12",
            title: "Field Employee Tracking & Management",
            category: "software",
            badge: "Bitcodify Internship Project",
            impact: "Live GPS Tracking & Flutter App",
            desc: "Full-stack workforce management platform (developed at Bitcodify Solutions) with Flutter mobile app and Web Admin Portal featuring selfie + GPS check-in, 2-min live tracking, and order/payment collections.",
            features: [
                "Cross-platform Flutter mobile application equipped with background GPS location tracking (2-min interval updates).",
                "Selfie + GPS attendance check-in ensuring verified field employee location validation.",
                "On-field order capture & payment collection recording real-time customer transactions during client visits.",
                "Web admin portal rendering real-time employee movement paths, visit logs, and daily route histories.",
                "High-speed FastAPI backend handling location telemetry streams and MS SQL procedure updates."
            ],
            tech: ["Python", "FastAPI", "Microsoft SQL Server", "Stored Procedures", "JWT", "Flutter/Dart", "Postman", "Git"],
            color: 0x38bdf8,
            geomType: "icosahedron"
        },
        {
            id: 13,
            num: "13",
            title: "Enterprise IT Asset Management Dashboard",
            category: "analytics software",
            badge: "IT Infrastructure & Compliance",
            impact: "Sophos XDR & Asset Audit Logs",
            desc: "Centralized IT asset management portal tracking hardware lifecycle, software licenses, Sophos XDR security compliance, USB blocking, printer inventories, and automated Excel data pipelines.",
            features: [
                "Centralized hardware & software asset inventory tracking laptops, servers, printers, and peripheral devices.",
                "Sophos XDR security compliance monitoring flagging unauthorized USB usage, out-of-date antivirus, and vulnerabilities.",
                "Automated Excel data processing pipeline consolidating asset audit sheets from multiple branch locations.",
                "License expiration and warranty reminder dashboard preventing software downtime and compliance penalties.",
                "Interactive Flask web interface with dynamic Chart.js reporting and automated data export capabilities."
            ],
            tech: ["Python 3.x", "Flask", "Microsoft SQL Server", "pyodbc / pymssql", "Pandas", "OpenPyXL", "JavaScript", "Chart.js"],
            color: 0x00d2c4,
            geomType: "dodecahedron"
        },
        {
            id: 14,
            num: "14",
            title: "Taranjot Web ERP — Enterprise System",
            category: "software",
            badge: "Taranjot Resources ERP v2.0",
            impact: "Desktop-Class Multi-Tab ERP",
            desc: "Multi-tenant enterprise Web ERP for Taranjot Resources & Taranjot Ceramics. Features real-time stock valuation analytics, price list master catalogs, dynamic ribbon permissions, and order fulfillment.",
            features: [
                "Multi-tenant web ERP application serving Taranjot Resources and Taranjot Ceramics operations.",
                "Desktop-class tabbed user interface supporting concurrent multi-document navigation without page reloads.",
                "Real-time stock valuation engine updating FIFO inventory costs, warehouse stock levels, and item price lists.",
                "Dynamic permission matrix restricting tab views, action buttons, and financial data per user role.",
                "Modern React 19 architecture backed by Python FastAPI services and Microsoft SQL Server procedures."
            ],
            tech: ["React 19", "Vite", "Python (FastAPI)", "Vanilla CSS", "Lucide React", "Microsoft SQL Server", "REST APIs", "IIS"],
            color: 0x00ffcc,
            geomType: "octahedron"
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

// --- INTERACTIVE PROJECT DETAIL MODAL HANDLER ---
function initProjectModal() {
    const modalEl = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const numEl = document.getElementById('modal-num');
    const badgeEl = document.getElementById('modal-badge');
    const titleEl = document.getElementById('modal-title');
    const impactEl = document.getElementById('modal-impact');
    const impactTextEl = document.getElementById('modal-impact-text');
    const descEl = document.getElementById('modal-desc');
    const techContainer = document.getElementById('modal-tech-tags');
    const featuresGrid = document.getElementById('modal-features-grid');

    if (!modalEl) return { openModal: () => {} };

    // Open Modal Function
    function openModal(projData, totalCount) {
        if (numEl) numEl.textContent = `${projData.num} / ${String(totalCount).padStart(2, '0')}`;
        if (badgeEl) badgeEl.textContent = projData.badge;
        if (titleEl) titleEl.textContent = projData.title;
        
        if (impactTextEl) {
            impactTextEl.textContent = projData.impact;
        } else if (impactEl) {
            impactEl.textContent = projData.impact;
        }

        // SVG Mapping for Tech Stack Logos (Only Logos, No Text, No Background Boxes)
        const techSvgMap = {
            "Python": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M11.87 2c-5.18 0-4.84 2.25-4.84 2.25l.01 2.33h4.9v.7H5.15S2 6.91 2 12.12c0 5.21 2.76 5.03 2.76 5.03h1.64v-2.34s-.09-2.76 2.72-2.76h4.68s2.59.04 2.59-2.52V4.8s.35-2.8-4.52-2.8zM9.44 3.56a.91.91 0 1 1 0 1.82.91.91 0 0 1 0-1.82z" fill="#3776AB"/><path d="M12.13 22c5.18 0 4.84-2.25 4.84-2.25l-.01-2.33h-4.9v-.7h6.79s3.15.37 3.15-4.84c0-5.21-2.76-5.03-2.76-5.03h-1.64v2.34s.09 2.76-2.72 2.76h-4.68s-2.59-.04-2.59 2.52v4.73s-.35 2.8 4.52 2.8zm2.43-1.56a.91.91 0 1 1 0-1.82.91.91 0 0 1 0 1.82z" fill="#FFD43B"/></svg>`,
            "Pandas": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="3" height="18" rx="1.5" fill="#00f2fe"/><rect x="9" y="7" width="3" height="10" rx="1.5" fill="#00ffcc"/><rect x="14" y="10" width="3" height="11" rx="1.5" fill="#38bdf8"/><rect x="19" y="5" width="2" height="6" rx="1" fill="#00f2fe"/></svg>`,
            "NumPy": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4DABCF"/><path d="M2 17l10 5 10-5" stroke="#00ffcc" stroke-width="1.5"/><path d="M2 12l10 5 10-5" stroke="#4DABCF" stroke-width="1.5"/></svg>`,
            "Scikit-learn": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F7931E" stroke-width="2"/><path d="M7 12a5 5 0 0 1 10 0" stroke="#3499CC" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="#F7931E"/></svg>`,
            "PyTorch": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M14.5 4.5a7 7 0 1 0 3 11.5l2 2a9.5 9.5 0 1 1-3.5-15.5l-1.5 2z" fill="#EE4C2C"/><circle cx="16.5" cy="5.5" r="1.5" fill="#EE4C2C"/></svg>`,
            "FastAPI": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#059669" fill-opacity="0.25" stroke="#10B981" stroke-width="1.5"/><path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            "React": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" stroke-width="1.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" stroke-width="1.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" stroke-width="1.5" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>`,
            "React 18": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" stroke-width="1.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" stroke-width="1.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" stroke-width="1.5" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>`,
            "Streamlit": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><polygon points="12 2 22 20 2 20" fill="#FF4B4B"/><polygon points="12 8 18 19 6 19" fill="#FFFFFF" fill-opacity="0.3"/></svg>`,
            "Git": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M21.7 10.7l-8.4-8.4c-.4-.4-1-.4-1.4 0l-1.9 1.9 2.4 2.4c.4-.1.9 0 1.2.3.5.5.5 1.3 0 1.8-.4.4-1.1.5-1.6.2l-2.3 2.3v3.1c.3.2.5.5.5.9 0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3 0-.4.2-.7.5-.9v-3.7c-.3-.2-.5-.5-.5-.9 0-.4.2-.7.5-.9l2.2-2.2v-2.7c-.3-.2-.5-.5-.5-.9 0-.7.6-1.3 1.3-1.3.4 0 .7.2.9.5l1.9-1.9L2.3 10.7c-.4.4-.4 1 0 1.4l8.4 8.4c.4.4 1 .4 1.4 0l9.6-9.6c.4-.4.4-1.1 0-1.5z" fill="#F05032"/></svg>`,
            "Microsoft SQL Server": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#CC292B" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>`,
            "SQL": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#CC292B" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>`,
            "PostgreSQL": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>`,
            "RAG Engine": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
            "RAG": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
            "Ollama / Local AI": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
            "Ollama": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
            "Tailwind CSS": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8"/></svg>`,
            "Vite": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M21.75 3.75L12 21 2.25 3.75h19.5z" fill="#BD34FE"/><path d="M16.5 3.75L12 12 7.5 3.75h9z" fill="#FFC400"/></svg>`,
            "Firebase": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M3.89 15.67L6.8 2.37a.64.64 0 0 1 1.22-.05l2.4 4.54L3.89 15.67z" fill="#FFC107"/><path d="M13.47 8.35l2.09-3.95a.64.64 0 0 1 1.14.07l3.41 11.2-6.64-7.32z" fill="#FFA000"/><path d="M3.89 15.67l8.28 4.67a1.64 1.64 0 0 0 1.6 0l6.34-3.57-6.64-7.32-9.58 6.22z" fill="#FFCA28"/></svg>`,
            "JWT": `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
        };

        if (descEl) descEl.textContent = projData.desc;
        if (techContainer) {
            techContainer.innerHTML = projData.tech.map(t => {
                const svg = techSvgMap[t] || `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>`;
                return `<div class="modal-tech-logo-item" title="${t}">${svg}</div>`;
            }).join('');
        }

        // Render point-by-point features
        if (featuresGrid && projData.features) {
            featuresGrid.innerHTML = projData.features.map(feat => `
                <div class="modal-feature-item">
                    <div class="feature-icon-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <div class="feature-text">${feat}</div>
                </div>
            `).join('');
        }

        modalEl.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close Modal Function
    function closeModal() {
        modalEl.classList.remove('active');
        document.body.style.overflow = '';
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

// --- HERO ANIMATIONS ---
function initHeroAnimations() {
    if (typeof gsap !== 'undefined') {
        gsap.from('.hero-content > *', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }
}

// --- TERMINAL TABS ---
function initTerminalTabs() {
    const tabs = document.querySelectorAll('.terminal-tab');
    const panes = document.querySelectorAll('.tab-pane');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}
