"use client"

import { useRef, useEffect } from 'react';
import gsap from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import {FaTiktok, FaInstagram, FaGithub, FaFigma, FaWebflow, FaNpm} from "react-icons/fa6"


import React from 'react'
import { Content } from '@prismicio/client';
import StylizedLogoMark from './StylizedLogoMark';
import clsx from 'clsx';
import { GiDuration } from 'react-icons/gi';

export default function AnimatedContent({slice}:{slice: Content.IntegrationsSlice}) {
    const container = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion()
    const icons = {
        TikTok: <FaTiktok />,
        Instagram: <FaInstagram />,
        Github: <FaGithub />,
        Figma: <FaFigma />,
        Webflow: <FaWebflow />,
        Npm: <FaNpm />,
      }

      useEffect(() => {

        const tl = gsap.timeline({
            repeat:-1,
            defaults: {ease: "power2.inOut"}
        });

        tl.to(".pulsing-logo", {
            keyframes: [
                {
                    filter: "brightness(2)",
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.inOut"
                },{
                    filter: "brightness(1)",
                    opacity: 0.7,
                    duration: 0.9,
                },

            ]
        });

        tl.to(".signal-line", {
            keyframes:[
                {backgroundPosition: "0% 0%"},
                {
                backgroundPosition: "100% 100%",
                stagger: {from: "center", each: 0.3},
                duration: 1
                },
            ]
        },
        "-=1.4",
      );


    tl.to(".pulsing-icon", {
        keyframes:[
            {
                opacity: 1,
                stagger: {
                    from: "center",
                    each: 0.3
                  },
                  duration: 1,
            },
            {
                opacity: 0.4,
                duration: 1,
                stagger: {
                    from: "center",
                    each: 0.3
                },
                
            }
        ]
    },"-=2")
    },)  

 
  return (
    <div className="mt-20 flex flex-col items-center md:flex-row">
          {slice.primary.nahbro.map((item, index)=>(
            <React.Fragment key={index}>
              {index == Math.floor(slice.primary.nahbro.length / 2) && (
                <>
                <StylizedLogoMark />
                  <div className="signal-line rotate-180 bg-gradient-to-t" />
                </>
              )}


                
                <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-purple-50/30
                bg-purple-50/25 p-3 text-3xl text-purple-100 opacity-40 md:text-4xl lg:text-5xl">
                 {item.icon && icons[item.icon]}
              </div>

              {index !== slice.primary.nahbro.length -1 &&(

                <div className={clsx("signal-line", index >= Math.floor(slice.primary.nahbro.length / 2)
                ? "rotate-180" : "rotate-0",)} />
              )}

            </React.Fragment>
             ))} 
        </div>
  )
}

