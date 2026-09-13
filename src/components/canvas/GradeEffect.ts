import { Effect } from "postprocessing";
import { Uniform } from "three";

/**
 * The final grade: AgX in the dark acts, a straight linear map on paper.
 *
 * AgX earns its place against black — glows roll off instead of clipping. But
 * on paper the whole frame sits on its highlight shoulder, where the curve is
 * nearly flat: a card, its text and its shadow all compress into the last few
 * code values and a screen full of UI reads as a pale smudge. So the grade
 * crossfades to linear as the page turns light, and the light acts are
 * authored in display values (the paper is its hex colour, a white card is
 * white). The crossfade only ever passes through its midpoint during the
 * light/dark swap, when the content has already dipped out.
 */
const fragment = /* glsl */ `
#include <tonemapping_pars_fragment>
uniform float uLinear;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 agx = AgXToneMapping(inputColor.rgb);
  vec3 lin = clamp(inputColor.rgb, 0.0, 1.0);
  outputColor = vec4(mix(agx, lin, uLinear), inputColor.a);
}
`;

export class GradeEffect extends Effect {
  constructor() {
    super("GradeEffect", fragment, {
      uniforms: new Map([["uLinear", new Uniform(1)]]),
    });
  }

  get linear(): number {
    return this.uniforms.get("uLinear")!.value as number;
  }

  set linear(v: number) {
    this.uniforms.get("uLinear")!.value = v;
  }
}
