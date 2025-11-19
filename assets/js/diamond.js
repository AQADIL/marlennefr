class DiamondScene {
    constructor() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.canvas = document.getElementById('diamond-canvas');
        if (!this.canvas) {
            console.error('Canvas not found');
            return;
        }

        if (typeof THREE === 'undefined') {
            console.error('THREE.js not loaded');
            return;
        }

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            50,
            1,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });

        this.setupRenderer();
        this.setupCamera();
        this.createDiamond();
        this.addLights();
        this.addParticles();
        this.initInteraction();
        this.animate();
        this.handleResize();
    }

    setupRenderer() {
        const size = Math.min(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setSize(size, size);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    setupCamera() {
        this.camera.position.z = 5;
        this.camera.position.y = 0.5;
    }

    createDiamond() {
        const geometry = new THREE.OctahedronGeometry(1.5, 2);

        const material = new THREE.MeshPhysicalMaterial({
            color: 0x00ffaa,
            metalness: 0.25,
            roughness: 0.05,
            transparent: true,
            opacity: 0.95,
            transmission: 0.95,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            ior: 2.4,
            reflectivity: 1,
            envMapIntensity: 1.5,
            side: THREE.DoubleSide
        });

        this.diamond = new THREE.Mesh(geometry, material);
        this.scene.add(this.diamond);

        const wireframeGeometry = new THREE.EdgesGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.5,
            linewidth: 2
        });
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        this.diamond.add(wireframe);

        const coreGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.8
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        this.diamond.add(core);
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00ff88, 2, 100);
        pointLight1.position.set(3, 3, 3);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x0066ff, 2, 100);
        pointLight2.position.set(-3, -3, 2);
        this.scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0xff0088, 1.5, 100);
        pointLight3.position.set(0, 3, -3);
        this.scene.add(pointLight3);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    addParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 200;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x00ff88,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    initInteraction() {
        this.rotationX = 0.4;
        this.rotationY = 0.8;
        this.targetRotationX = this.rotationX;
        this.targetRotationY = this.rotationY;
        this.isDragging = false;
        this.hoverActive = false;
        this.lastPointerX = 0;
        this.lastPointerY = 0;

        const onPointerMove = event => {
            if (!this.canvas) return;
            const rect = this.canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            if (this.isDragging) {
                const dx = event.clientX - this.lastPointerX;
                const dy = event.clientY - this.lastPointerY;
                this.targetRotationY += dx * 0.01;
                this.targetRotationX += dy * 0.01;
                this.lastPointerX = event.clientX;
                this.lastPointerY = event.clientY;
            } else {
                this.targetRotationY = x * 1.2;
                this.targetRotationX = -y * 1.2;
            }

            this.hoverActive = true;
        };

        this.canvas.addEventListener('pointerdown', event => {
            this.isDragging = true;
            this.lastPointerX = event.clientX;
            this.lastPointerY = event.clientY;
            try {
                this.canvas.setPointerCapture(event.pointerId);
            } catch (e) {}
        });

        this.canvas.addEventListener('pointerup', event => {
            this.isDragging = false;
            try {
                this.canvas.releasePointerCapture(event.pointerId);
            } catch (e) {}
        });

        this.canvas.addEventListener('pointercancel', () => {
            this.isDragging = false;
        });

        this.canvas.addEventListener('pointermove', onPointerMove);

        this.canvas.addEventListener('pointerleave', () => {
            this.hoverActive = false;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.diamond) {
            this.targetRotationY += 0.002;
            this.rotationX += (this.targetRotationX - this.rotationX) * 0.08;
            this.rotationY += (this.targetRotationY - this.rotationY) * 0.08;

            this.diamond.rotation.x = this.rotationX;
            this.diamond.rotation.y = this.rotationY;

            const pulse = this.hoverActive ? 1.05 : 1.0;
            const scale = pulse + 0.02 * Math.sin(Date.now() * 0.003);
            this.diamond.scale.set(scale, scale, scale);
        }

        if (this.particles) {
            this.particles.rotation.y -= 0.002;
        }

        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            if (!this.canvas) return;

            const size = Math.min(this.canvas.clientWidth, this.canvas.clientHeight);
            this.camera.aspect = 1;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(size, size);
        });
    }
}

new DiamondScene();
