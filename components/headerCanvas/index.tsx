import React, { useRef, useEffect } from 'react';
import { clamp, rand } from '../../utils/functions';
import Particle from './Particle';

const NUM_PARTICLES = 1000;
const COLORS = ['teal', 'magenta', 'cyan'];
const BRAKE_FACTOR = 5;
const MOUSE_ACTION_RADIUS = 125;
const DRAW_MOUSE_ACTION_RANGE = false;

const Canvas: React.FC = () => {

    const cnv = useRef<HTMLCanvasElement>();
    const particles = useRef<Particle[]>([]);
    const velocities = useRef<[number, number][]>([]);
    const mousePosition = useRef<[number, number] | null>(null);

    useEffect(() => {
        const canvas = cnv.current;
        const ctx = canvas.getContext('2d');

        function setCanvasDimensions() {
            const w = window.innerWidth,
                  h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        }
        
        function initParticles() {
            particles.current = new Array(NUM_PARTICLES).fill(null).map(_ => new Particle(
                COLORS[rand(COLORS.length, 0)],
                { x: rand(canvas.width, 0), y: rand(canvas.height, 0) },
                rand(3, 10)
            ));
            velocities.current = new Array(NUM_PARTICLES).fill(null).map(_ => [rand(.5, .1, true), rand(.5, .1, true)]);
        }

        function drawMouseRange() {
            ctx.beginPath();
            ctx.rect(mousePosition.current[0] - MOUSE_ACTION_RADIUS, mousePosition.current[1] - MOUSE_ACTION_RADIUS, MOUSE_ACTION_RADIUS * 2, MOUSE_ACTION_RADIUS * 2);
            ctx.strokeStyle = 'red';
            ctx.stroke();
            ctx.closePath();
        }

        function draw() {
            const parts = particles.current;
            const originalVels = velocities.current;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let particlesInRadius: [Particle, number][] = [];
            let particlesOutsideRadius: [Particle, number][] = [];

            if (mousePosition.current !== null) {

                if (DRAW_MOUSE_ACTION_RANGE) drawMouseRange();

                particlesInRadius = parts
                    .map<[Particle, number]>((part, idx) => ([ part, idx ]))
                    .filter(p => {
                        const rad = MOUSE_ACTION_RADIUS;
                        const inX = p[0].center.x >= mousePosition.current[0] - rad && p[0].center.x <= mousePosition.current[0] + rad;
                        const inY = p[0].center.y >= mousePosition.current[1] - rad && p[0].center.y <= mousePosition.current[1] + rad;
                        return inX && inY;
                    });
                particlesOutsideRadius = parts
                    .map<[Particle, number]>((part, idx) => ([ part, idx ]))
                    .filter(p => {
                        const rad = MOUSE_ACTION_RADIUS;
                        const inX = p[0].center.x >= mousePosition.current[0] - rad && p[0].center.x <= mousePosition.current[0] + rad;
                        const inY = p[0].center.y >= mousePosition.current[1] - rad && p[0].center.y <= mousePosition.current[1] + rad;
                        return !(inX && inY);
                    });
            } else {
                particlesInRadius = [];
                particlesOutsideRadius = parts.map((p, i) => [p, i]);
            }
            particlesOutsideRadius.forEach(([part, idx]) => {
                part.center.x += originalVels[idx][0];
                part.center.y += originalVels[idx][1];
                if (part.center.x >= canvas.width || part.center.x <= 0) {
                    originalVels[idx][0] *= -1;
                }
                if (part.center.y >= canvas.height || part.center.y <= 0) {
                    originalVels[idx][1] *= -1;
                }
                part.radius = clamp(part.radius - 1, part.maxRadius, part.minRadius);
                part.draw(ctx);
            });
            particlesInRadius.forEach(([part, idx]) => {
                part.center.x += originalVels[idx][0] / BRAKE_FACTOR;
                part.center.y += originalVels[idx][1] / BRAKE_FACTOR;
                part.radius = clamp(part.radius + .3, part.maxRadius, part.minRadius);
                if (part.center.x >= canvas.width || part.center.x <= 0) {
                    originalVels[idx][0] *= -1;
                }
                if (part.center.y >= canvas.height || part.center.y <= 0) {
                    originalVels[idx][1] *= -1;
                }
                part.draw(ctx);
            });
            requestAnimationFrame(draw);
        }

        setCanvasDimensions();
        initParticles();
        draw();

        window.addEventListener('resize', setCanvasDimensions);

        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
        }

        
    }, [cnv]);
    
    function updateMousePosition(evt: React.MouseEvent) {
        const { x, y } = cnv.current.getBoundingClientRect();
        const { clientX, clientY } = evt;
        const canvasX = clientX - x;
        const canvasY = clientY - y;
        mousePosition.current = [canvasX, canvasY];
    }

    function resetMousePosition() {
        mousePosition.current = null;
    }

    return (
        <>
            <canvas
                ref={cnv} 
                onMouseMove={updateMousePosition}
                onMouseOut={resetMousePosition}
            />
            <style jsx>{`
                canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    background-color: var(--canvas-bg)
                }
            `}</style>
        </>
    );
}

export default Canvas;