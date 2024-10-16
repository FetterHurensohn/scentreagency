"use client";

import { useRef, useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedContent({children}:{children:React.ReactNode}) {
    const container = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Registriere ScrollTrigger nur einmal (außerhalb von useGSAP)
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (prefersReducedMotion) {
            gsap.set(container.current, { y: 0 });
            return;
        }

        // Animation
        const anim = gsap.fromTo(
            container.current,
            { y: 100,},
            {
                y: 0,
                ease: "power2.inOut",
                duration: 1,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom-=40%",
                    toggleActions: "play pause resume reverse",
                },
            }
        );

        return () => {
            // Clean up ScrollTrigger when component is unmounted
            if (anim) anim.kill();
        };
    }, [prefersReducedMotion]);

    return (
        <div ref={container}>
            {children}
        </div>
    );
}
