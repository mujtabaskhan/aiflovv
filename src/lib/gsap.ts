"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, Flip, CustomEase);
  // The house curve: a fast start that settles softly, like data locking into place.
  CustomEase.create("flow", "0.19, 1, 0.22, 1");
  CustomEase.create("snap", "0.76, 0, 0.24, 1");
  gsap.defaults({ ease: "flow", duration: 1 });
}

export { gsap, ScrollTrigger, SplitText, Flip };

/** Characters used whenever text "decodes" into place. */
export const GLYPHS = "▪▫■□01/<>{}_-+=";
