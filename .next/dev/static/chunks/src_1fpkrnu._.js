(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/canvas/Atmosphere.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Atmosphere",
    ()=>Atmosphere
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$atmosphere$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/atmosphere.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/palette.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
/** Dark-environment sky, held separately so the frame loop can lerp from it. */ const DARK_SKY = {
    low: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].void.clone(),
    mid: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].carbon.clone().multiplyScalar(1.5),
    high: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionDeep.clone().multiplyScalar(0.09),
    glow: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone().multiplyScalar(0.06)
};
function Atmosphere() {
    _s();
    const domeMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Atmosphere.useMemo[domeMaterial]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$atmosphere$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atmosphereVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$atmosphere$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atmosphereFragment"],
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"],
                depthWrite: false,
                depthTest: false,
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uStage: {
                        value: 0
                    },
                    uLight: {
                        value: 0
                    },
                    uGlowStrength: {
                        value: 0.5
                    },
                    uVoid: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].void.clone()
                    },
                    uHorizon: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].carbon.clone().multiplyScalar(1.5)
                    },
                    uZenith: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionDeep.clone().multiplyScalar(0.09)
                    },
                    uGlow: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone().multiplyScalar(0.06)
                    }
                }
            })
    }["Atmosphere.useMemo[domeMaterial]"], []);
    const glowMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Atmosphere.useMemo[glowMaterial]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$atmosphere$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["glowVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$atmosphere$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["glowFragment"],
                transparent: true,
                depthWrite: false,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uColor: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                    },
                    uIntensity: {
                        value: 0.1
                    },
                    uFalloff: {
                        value: 3.4
                    }
                }
            })
    }["Atmosphere.useMemo[glowMaterial]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Atmosphere.useEffect": ()=>({
                "Atmosphere.useEffect": ()=>{
                    domeMaterial.dispose();
                    glowMaterial.dispose();
                }
            })["Atmosphere.useEffect"]
    }["Atmosphere.useEffect"], [
        domeMaterial,
        glowMaterial
    ]);
    const glowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Atmosphere.useFrame": (state, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const t = state.clock.elapsedTime;
            const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeAt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage);
            domeMaterial.uniforms.uTime.value = t;
            domeMaterial.uniforms.uStage.value = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            domeMaterial.uniforms.uLight.value = theme;
            glowMaterial.uniforms.uTime.value = t;
            // The dome is the page background. Everything else in the scene is graded
            // against whichever environment it resolves to.
            const u = domeMaterial.uniforms;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixColor"])(u.uVoid.value, DARK_SKY.low, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].skyLow, theme);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixColor"])(u.uHorizon.value, DARK_SKY.mid, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].skyMid, theme);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixColor"])(u.uZenith.value, DARK_SKY.high, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].skyHigh, theme);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixColor"])(u.uGlow.value, DARK_SKY.glow, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].skyGlow, theme);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixColor"])(glowMaterial.uniforms.uColor.value, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].ionSoft, theme);
            // The backdrop lifts at the two climaxes — the hero and the closing CTA.
            const heat = Math.max(1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageOf"])("hero")) / 1.4), 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageOf"])("cta")) / 1.2)) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro;
            domeMaterial.uniforms.uGlowStrength.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(domeMaterial.uniforms.uGlowStrength.value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.42 + heat * 0.75, 0.035, theme), 2, d);
            glowMaterial.uniforms.uIntensity.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(glowMaterial.uniforms.uIntensity.value, (0.04 + heat * 0.14) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro * (1 - theme), 2.2, d);
            // Keep the glow card facing the camera without a full Billboard component.
            if (glowRef.current) {
                glowRef.current.quaternion.copy(state.camera.quaternion);
            }
        }
    }["Atmosphere.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                material: domeMaterial,
                renderOrder: -100,
                frustumCulled: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                    args: [
                        60,
                        32,
                        24
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/canvas/Atmosphere.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Atmosphere.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: glowRef,
                material: glowMaterial,
                position: [
                    0,
                    0,
                    -3.2
                ],
                renderOrder: -50,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                    args: [
                        22,
                        22
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/canvas/Atmosphere.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Atmosphere.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Atmosphere.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(Atmosphere, "j/oMPN3bEvibB/+hij+AC3soU8g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Atmosphere;
var _c;
__turbopack_context__.k.register(_c, "Atmosphere");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/Effects.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Effects",
    ()=>Effects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postprocessing/build/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$GradeEffect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/GradeEffect.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAppStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interaction.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function Effects() {
    _s();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "Effects.useAppStore[quality]": (s)=>s.quality
    }["Effects.useAppStore[quality]"]);
    const bloom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vignette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chroma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const grade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Effects.useMemo[grade]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$GradeEffect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GradeEffect"]()
    }["Effects.useMemo[grade]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Effects.useFrame": (_, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            const climax = Math.max(1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(stage - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageOf"])("hero")) / 1.3), 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(stage - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageOf"])("cta")) / 1.1));
            // Bloom, aberration and a heavy vignette are all dark-environment devices.
            // On paper they read as haze and dirt, so the grade opens right up — bloom
            // goes to nothing, since on a white card it only fogs the text.
            const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeAt"])(stage);
            grade.linear = theme;
            if (bloom.current) {
                const dark = (0.34 + climax * 0.2 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].energy * 0.35) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro;
                bloom.current.intensity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(bloom.current.intensity, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(dark, 0, theme), 3, d);
            }
            if (vignette.current) {
                vignette.current.darkness = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(vignette.current.darkness, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.82, 0.16, theme), 3, d);
            }
            if (chroma.current) {
                // Radial modulation keeps the centre of frame clean and pushes the
                // fringing to the edges, which is where a real lens puts it.
                chroma.current.radialModulation = true;
                chroma.current.modulationOffset = 0.3;
                const o = (0.00035 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].energy * 0.0038) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(1, 0.15, theme);
                chroma.current.offset.set(o, o * 0.62);
            }
        }
    }["Effects.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
        multisampling: 0,
        enableNormalPass: false,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bloom"], {
                ref: bloom,
                intensity: 0.4,
                luminanceThreshold: 0.32,
                luminanceSmoothing: 0.35,
                kernelSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KernelSize"].MEDIUM,
                mipmapBlur: true,
                radius: 0.72
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            quality.chromaticAberration ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChromaticAberration"], {
                ref: chroma,
                offset: [
                    0.0004,
                    0.00025
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vignette"], {
                ref: vignette,
                offset: 0.24,
                darkness: 0.82,
                blendFunction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlendFunction"].NORMAL
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: grade
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Effects.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(Effects, "fwCtFmWIPwLm7PpucVOvLU0t/n0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Effects;
var _c;
__turbopack_context__.k.register(_c, "Effects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/GradeEffect.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GradeEffect",
    ()=>GradeEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postprocessing/build/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
;
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
 */ const fragment = /* glsl */ `
#include <tonemapping_pars_fragment>
uniform float uLinear;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 agx = AgXToneMapping(inputColor.rgb);
  vec3 lin = clamp(inputColor.rgb, 0.0, 1.0);
  outputColor = vec4(mix(agx, lin, uLinear), inputColor.a);
}
`;
class GradeEffect extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Effect"] {
    constructor(){
        super("GradeEffect", fragment, {
            uniforms: new Map([
                [
                    "uLinear",
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](1)
                ]
            ])
        });
    }
    get linear() {
        return this.uniforms.get("uLinear").value;
    }
    set linear(v) {
        this.uniforms.get("uLinear").value = v;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/Interface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Interface",
    ()=>Interface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/panels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interfaceAtlas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interfaceAtlas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/panels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interaction.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAppStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/palette.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
/** Room around each card for its shadow / halo, world units. */ const MARGIN = 0.22;
function Interface() {
    _s();
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "Interface.useThree[size]": (s)=>s.size
    }["Interface.useThree[size]"]);
    const gl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "Interface.useThree[gl]": (s)=>s.gl
    }["Interface.useThree[gl]"]);
    const anisotropy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "Interface.useAppStore[anisotropy]": (s)=>s.quality.anisotropy
    }["Interface.useAppStore[anisotropy]"]);
    const mesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const atlas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interface.useMemo[atlas]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interfaceAtlas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAtlas"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROSTER"].map({
                "Interface.useMemo[atlas]": (r)=>r.kind
            }["Interface.useMemo[atlas]"]))
    }["Interface.useMemo[atlas]"], []);
    const texture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interface.useMemo[texture]": ()=>{
            const t = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](atlas.canvas);
            t.generateMipmaps = true;
            t.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearMipmapLinearFilter"];
            t.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            return t;
        }
    }["Interface.useMemo[texture]"], [
        atlas
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Interface.useEffect": ()=>{
            texture.anisotropy = Math.min(anisotropy, gl.capabilities.getMaxAnisotropy());
            texture.needsUpdate = true;
        }
    }["Interface.useEffect"], [
        texture,
        anisotropy,
        gl
    ]);
    // The first paint may use fallback faces; repaint once the web fonts land.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Interface.useEffect": ()=>{
            let alive = true;
            document.fonts?.ready.then({
                "Interface.useEffect": ()=>{
                    if (!alive) return;
                    atlas.redraw();
                    texture.needsUpdate = true;
                }
            }["Interface.useEffect"]);
            return ({
                "Interface.useEffect": ()=>{
                    alive = false;
                }
            })["Interface.useEffect"];
        }
    }["Interface.useEffect"], [
        atlas,
        texture
    ]);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interface.useMemo[geometry]": ()=>{
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](1, 1);
            const attr = {
                "Interface.useMemo[geometry].attr": (n)=>{
                    const a = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedBufferAttribute"](new Float32Array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANEL_COUNT"] * n), n);
                    a.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
                    return a;
                }
            }["Interface.useMemo[geometry].attr"];
            g.setAttribute("aRect", attr(4));
            g.setAttribute("aSize", attr(2));
            g.setAttribute("aState", attr(4));
            return g;
        }
    }["Interface.useMemo[geometry]"], []);
    const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interface.useMemo[material]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["panelVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["panelFragment"],
                transparent: true,
                premultipliedAlpha: true,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NormalBlending"],
                depthWrite: false,
                depthTest: true,
                uniforms: {
                    uAtlas: {
                        value: texture
                    },
                    uLight: {
                        value: 1
                    },
                    uTime: {
                        value: 0
                    },
                    uMargin: {
                        value: MARGIN
                    },
                    uSweep: {
                        value: -2
                    },
                    uSweepGain: {
                        value: 0
                    },
                    uViewport: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1, 1)
                    },
                    uSurfaceL: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].surfaceL
                    },
                    uSurfaceD: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].surfaceD
                    },
                    uFillL: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].fillL
                    },
                    uFillD: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].fillD
                    },
                    uInkL: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].inkL
                    },
                    uInkD: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].inkD
                    },
                    uAccentL: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].accentL
                    },
                    uAccentD: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].accentD
                    },
                    uShadowL: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].shadowL
                    },
                    uHaloD: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].haloD
                    },
                    uEdgeL: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].edgeL
                    },
                    uEdgeD: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_PANEL"].edgeD
                    }
                }
            })
    }["Interface.useMemo[material]"], [
        texture
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Interface.useEffect": ()=>({
                "Interface.useEffect": ()=>{
                    geometry.dispose();
                    material.dispose();
                    texture.dispose();
                }
            })["Interface.useEffect"]
    }["Interface.useEffect"], [
        geometry,
        material,
        texture
    ]);
    // Frame-loop scratch — allocated once.
    const scratch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Interface.useMemo[scratch]": ()=>{
            const ctx = {
                t: 0,
                portrait: false,
                service: new Float32Array(4),
                tech: new Float32Array(10),
                pillar: new Float32Array(4),
                step: 0,
                work: 0,
                ctaHover: 0,
                intro: 0,
                pointer: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer,
                engage: 0,
                hover: new Float32Array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANEL_COUNT"]),
                hoverAny: 0
            };
            return {
                ctx,
                a: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeBuf"])(),
                b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeBuf"])(),
                out: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeBuf"])(),
                depth: new Float32Array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANEL_COUNT"]),
                order: Array.from({
                    length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANEL_COUNT"]
                }, {
                    "Interface.useMemo[scratch]": (_, i)=>i
                }["Interface.useMemo[scratch]"]),
                m: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](),
                q: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](),
                p: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                s: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                fwd: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                prevK: 0,
                prevStage: 0,
                energy: 0,
                // Hover picking against the drawn panels.
                mats: Array.from({
                    length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANEL_COUNT"]
                }, {
                    "Interface.useMemo[scratch]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]()
                }["Interface.useMemo[scratch]"]),
                vis: new Float32Array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANEL_COUNT"]),
                inv: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](),
                ray: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"](),
                ndc: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](),
                ro: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                rd: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                anchor: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                hovered: -1,
                probe: -1,
                pointerSeen: false,
                canHover: false,
                // Light sweep: first pass as the product lands, then every few seconds.
                introAt: -1,
                viewport: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]()
            };
        }
    }["Interface.useMemo[scratch]"], []);
    // Hover only means something with a real pointer, and only once it has
    // actually moved — until then it sits at the centre of the frame.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Interface.useEffect": ()=>{
            scratch.canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            const seen = {
                "Interface.useEffect.seen": ()=>{
                    scratch.pointerSeen = true;
                }
            }["Interface.useEffect.seen"];
            const gone = {
                "Interface.useEffect.gone": ()=>{
                    scratch.pointerSeen = false;
                }
            }["Interface.useEffect.gone"];
            window.addEventListener("pointermove", seen, {
                passive: true
            });
            document.documentElement.addEventListener("pointerleave", gone);
            return ({
                "Interface.useEffect": ()=>{
                    window.removeEventListener("pointermove", seen);
                    document.documentElement.removeEventListener("pointerleave", gone);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].cursorHover = 0;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].heroProbe.active = 0;
                }
            })["Interface.useEffect"];
        }
    }["Interface.useEffect"], [
        scratch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Interface.useFrame": (state, dt)=>{
            const im = mesh.current;
            if (!im) return;
            const d = Math.min(dt, 1 / 30);
            const S = scratch;
            const ctx = S.ctx;
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            const t = state.clock.elapsedTime;
            // Focus state, read transiently so highlighting never re-renders React.
            const app = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"].getState();
            for(let i = 0; i < 4; i++){
                ctx.service[i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(ctx.service[i], app.activeService === i ? 1 : 0, 4.5, d);
                ctx.pillar[i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(ctx.pillar[i], app.activePillar === i ? 1 : 0, 5, d);
            }
            for(let i = 0; i < 10; i++){
                ctx.tech[i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(ctx.tech[i], app.activeTech === i ? 1 : 0, 6, d);
            }
            ctx.step = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(ctx.step, app.activeStep, 3.2, d);
            ctx.work = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(stage - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageOf"])("work"));
            ctx.ctaHover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(ctx.ctaHover, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].ctaHover, 4, d);
            ctx.t = t;
            ctx.portrait = size.width < size.height * 0.9;
            ctx.intro = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro;
            // The hero product responds to the pointer only while the hero is on
            // screen: its layers spread as the pointer moves over the right half.
            const heroW = 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(0.25, 0.7, stage);
            const live = S.canHover && S.pointerSeen && heroW > 0.5;
            ctx.engage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(ctx.engage, live ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smoothstep"])(-0.2, 0.3, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].pointer.x) : 0, 3, d);
            let hoverAny = 0;
            for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_MEMBERS"]){
                ctx.hover[id] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(ctx.hover[id], live && id === S.hovered ? 1 : 0, 8, d);
                hoverAny = Math.max(hoverAny, ctx.hover[id]);
            }
            ctx.hoverAny = hoverAny;
            // Current section's layout → next section's, held for the first part of
            // the section and then reorganised.
            const last = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_IDS"].length - 1;
            const st = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(stage, 0, last);
            const i = Math.min(last - 1, Math.floor(st));
            const idA = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_IDS"][i];
            const idB = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_IDS"][i + 1];
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAYOUTS"][idA](S.a, ctx);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAYOUTS"][idB](S.b, ctx);
            const hold = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAYOUT_HOLD"][idA] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_HOLD"];
            const k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((st - i - hold) / (1 - hold));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blend"])(S.out, S.a, S.b, k, 0.6);
            // The post chain reacts while the interface is reorganising.
            const rate = i === Math.floor(S.prevStage) ? Math.abs(k - S.prevK) / Math.max(d, 1e-4) : 0;
            S.prevK = k;
            S.prevStage = st;
            S.energy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(S.energy, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(rate * 0.3 + Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].velocity) * 0.0005), 5, d);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].energy = S.energy;
            // Environment: the whole interface dips out through the midpoint of a
            // light/dark swap, exactly as the DOM does.
            const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeAt"])(stage);
            const swap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swapAt"])(theme);
            // The hero stages its own entrance from `intro`; nothing else is on
            // screen while it runs.
            const master = 1 - swap * 0.9;
            material.uniforms.uLight.value = theme;
            material.uniforms.uTime.value = t;
            if (S.introAt < 0 && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro > 0.6) S.introAt = t;
            let sweep = -2;
            let sweepGain = 0;
            if (S.introAt >= 0) {
                const since = t - S.introAt;
                const cycle = since < 7 ? since : (since - 7) % 8;
                sweep = -0.35 + cycle * 0.8;
                sweepGain = (since < 7 ? 1 : 0.6) * heroW;
            }
            material.uniforms.uSweep.value = sweep;
            material.uniforms.uSweepGain.value = sweepGain;
            material.uniforms.uViewport.value.copy(state.gl.getDrawingBufferSize(S.viewport));
            // Depth sort, far to near, so the glass composites in order.
            const cam = state.camera;
            cam.getWorldDirection(S.fwd);
            const out = S.out;
            for(let n = 0; n < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANEL_COUNT"]; n++){
                const b = n * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STRIDE"];
                S.depth[n] = (out[b] - cam.position.x) * S.fwd.x + (out[b + 1] - cam.position.y) * S.fwd.y + (out[b + 2] - cam.position.z) * S.fwd.z;
            }
            S.order.sort({
                "Interface.useFrame": (x, y)=>S.depth[y] - S.depth[x]
            }["Interface.useFrame"]);
            const rect = geometry.getAttribute("aRect");
            const sz = geometry.getAttribute("aSize");
            const stt = geometry.getAttribute("aState");
            const R = rect.array;
            const Z = sz.array;
            const A = stt.array;
            S.vis.fill(0);
            let count = 0;
            for (const n of S.order){
                const b = n * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STRIDE"];
                const o = out[b + 8] * master;
                if (o < 0.003 || S.depth[n] < 0.3) continue;
                S.vis[n] = o;
                // Idle float keeps a held layout breathing.
                S.p.set(out[b], out[b + 1] + Math.sin(t * 0.55 + n * 1.3) * 0.028, out[b + 2]);
                S.q.set(out[b + 3], out[b + 4], out[b + 5], out[b + 6]);
                const sc = out[b + 7];
                S.s.set(sc, sc, sc);
                S.m.compose(S.p, S.q, S.s);
                im.setMatrixAt(count, S.m);
                S.mats[n].copy(S.m);
                const spec = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROSTER"][n];
                const r = atlas.rects.get(spec.kind);
                R[count * 4] = r.u;
                R[count * 4 + 1] = r.v;
                R[count * 4 + 2] = r.w;
                R[count * 4 + 3] = r.h;
                Z[count * 2] = spec.w;
                Z[count * 2 + 1] = spec.h;
                A[count * 4] = o;
                A[count * 4 + 1] = out[b + 9];
                A[count * 4 + 2] = out[b + 10];
                A[count * 4 + 3] = spec.r;
                count++;
            }
            im.count = count;
            im.instanceMatrix.needsUpdate = true;
            rect.needsUpdate = true;
            sz.needsUpdate = true;
            stt.needsUpdate = true;
            // Hover: cast the pointer against each hero layer's plane, nearest wins.
            S.hovered = -1;
            if (live) {
                S.ndc.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].pointer.x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].pointer.y);
                S.ray.setFromCamera(S.ndc, cam);
                let bestT = Infinity;
                for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_MEMBERS"]){
                    if (S.vis[id] < 0.35) continue;
                    S.inv.copy(S.mats[id]).invert();
                    S.ro.copy(S.ray.ray.origin).applyMatrix4(S.inv);
                    S.rd.copy(S.ray.ray.origin).add(S.ray.ray.direction).applyMatrix4(S.inv).sub(S.ro);
                    if (Math.abs(S.rd.z) < 1e-6) continue;
                    const hitT = -S.ro.z / S.rd.z;
                    if (hitT <= 0 || hitT >= bestT) continue;
                    const spec = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROSTER"][id];
                    const hx = S.ro.x + S.rd.x * hitT;
                    const hy = S.ro.y + S.rd.y * hitT;
                    if (Math.abs(hx) <= spec.w / 2 && Math.abs(hy) <= spec.h / 2) {
                        S.hovered = id;
                        bestT = hitT;
                    }
                }
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].cursorHover = S.hovered >= 0 ? 1 : 0;
            // Label anchor: the hovered layer's top-left corner, in CSS pixels. The
            // last layer is kept while the label fades out.
            if (S.hovered >= 0) S.probe = S.hovered;
            const probe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].heroProbe;
            probe.active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(probe.active, S.hovered >= 0 ? 1 : 0, 10, d);
            if (S.probe >= 0 && probe.active > 0.002) {
                const spec = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROSTER"][S.probe];
                S.anchor.set(-spec.w / 2, spec.h / 2, 0).applyMatrix4(S.mats[S.probe]).project(cam);
                probe.kind = spec.kind;
                probe.x = (S.anchor.x * 0.5 + 0.5) * size.width;
                probe.y = (-S.anchor.y * 0.5 + 0.5) * size.height;
            }
        }
    }["Interface.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
        ref: mesh,
        args: [
            geometry,
            material,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$panels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANEL_COUNT"]
        ],
        frustumCulled: false,
        renderOrder: 1
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Interface.tsx",
        lineNumber: 390,
        columnNumber: 5
    }, this);
}
_s(Interface, "9YgwXEh8hmCUKjyec6dd7N6XErU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Interface;
var _c;
__turbopack_context__.k.register(_c, "Interface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/Portal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Portal",
    ()=>Portal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$portal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/portal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/projects.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interaction.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAppStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/palette.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
const WIDTH = 6.2;
const HEIGHT = 3.5;
function Portal() {
    _s();
    const mesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "Portal.useThree[size]": (s)=>s.size
    }["Portal.useThree[size]"]);
    const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Portal.useMemo[material]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$portal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$portal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portalFragment"],
                transparent: true,
                depthWrite: false,
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    // Seeded from the first project, not hard-coded to 0: the change
                    // handler below only fires on a *change*, so project 0 would
                    // otherwise render whatever variant this was initialised to.
                    uVariant: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROJECTS"][0].variant
                    },
                    uPrevVariant: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROJECTS"][0].variant
                    },
                    uTransition: {
                        value: 0
                    },
                    uHover: {
                        value: 0
                    },
                    uOpacity: {
                        value: 0
                    },
                    uAspect: {
                        value: WIDTH / HEIGHT
                    },
                    uPointer: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]()
                    },
                    uInk: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].carbon.clone()
                    },
                    uIon: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                    },
                    uIonSoft: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionSoft.clone()
                    },
                    uEmber: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ember.clone()
                    }
                }
            })
    }["Portal.useMemo[material]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Portal.useEffect": ()=>({
                "Portal.useEffect": ()=>material.dispose()
            })["Portal.useEffect"]
    }["Portal.useEffect"], [
        material
    ]);
    const shown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Portal.useFrame": (state, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const t = state.clock.elapsedTime;
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            const u = material.uniforms;
            u.uTime.value = t;
            const w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageOf"])("work");
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(w - 0.55, w + 0.02, stage) * (1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(w + 0.72, w + 1.15, stage));
            shown.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(shown.current, target, 4.5, d);
            u.uOpacity.value = shown.current;
            const m = mesh.current;
            if (m) {
                m.visible = shown.current > 0.005;
                if (!m.visible) return;
                // Slight lean toward the pointer keeps the plane from feeling like a slide.
                m.rotation.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(m.rotation.y, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x * 0.1, 3, d);
                m.rotation.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(m.rotation.x, -__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y * 0.07, 3, d);
                // A 16:9 plane is wider than a portrait frame. Scale it to a screen the
                // viewport can actually contain, and lift it clear of the copy below.
                const aspect = size.width / Math.max(1, size.height);
                const fit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRange"])(aspect, 0.5, 1.35, 0.6, 1), 0.55, 1);
                m.scale.setScalar(fit);
                m.position.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(m.position.y, (1 - fit) * 3.4, 3, d);
            }
            const active = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"].getState().activeProject;
            if (active !== lastProject.current) {
                u.uPrevVariant.value = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROJECTS"][lastProject.current].variant;
                u.uVariant.value = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROJECTS"][active].variant;
                u.uTransition.value = 1;
                lastProject.current = active;
            }
            u.uTransition.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uTransition.value, 0, 3.4, d);
            u.uHover.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uHover.value, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].portalHover, 6, d);
            u.uPointer.value.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uPointer.value.x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].portalPointer.x, 5, d), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uPointer.value.y, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].portalPointer.y, 5, d));
        }
    }["Portal.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: mesh,
        material: material,
        position: [
            0,
            0,
            -3.1
        ],
        renderOrder: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
            args: [
                WIDTH,
                HEIGHT,
                48,
                28
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/canvas/Portal.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Portal.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s(Portal, "egOfiRazqD48C7++Q/5DSWu3AqI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Portal;
var _c;
__turbopack_context__.k.register(_c, "Portal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/Rig.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Rig",
    ()=>Rig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cameraPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/cameraPath.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Rig() {
    _s();
    const camera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "Rig.useThree[camera]": (s)=>s.camera
    }["Rig.useThree[camera]"]);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "Rig.useThree[size]": (s)=>s.size
    }["Rig.useThree[size]"]);
    const pose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        px: 0,
        py: 0,
        pz: 7.4,
        lx: 0,
        ly: 0,
        lz: 0,
        fov: 42,
        roll: 0
    });
    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Rig.useMemo[target]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
    }["Rig.useMemo[target]"], []);
    const lookAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Rig.useMemo[lookAt]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
    }["Rig.useMemo[lookAt]"], []);
    const smoothLook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
    const fovRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(42);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Rig.useFrame": (state, dt)=>{
            const d = Math.min(dt, 1 / 30);
            // Smooth the pointer here so every consumer reads the same damped value.
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].pointer.x, 3.2, d);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].pointer.y, 3.2, d);
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cameraPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["poseAt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage, pose.current);
            // Portrait and small viewports need the camera further back to keep the
            // same composition — the scene is authored for a wide frame.
            const fit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRange"])(size.width / Math.max(1, size.height), 0.5, 1.8, 1.42, 1.0);
            target.set(p.px, p.py, p.pz * fit);
            // Pointer parallax, damped and scaled down on touch devices.
            target.x += __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x * 0.62;
            target.y += __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y * 0.4;
            // Idle drift so the frame is never completely static.
            const t = state.clock.elapsedTime;
            target.x += Math.sin(t * 0.17) * 0.06;
            target.y += Math.cos(t * 0.21) * 0.05;
            // Entrance: the camera pulls in from further out as the intro resolves.
            target.z += (1 - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro) * 5.2;
            camera.position.lerp(target, 1 - Math.exp(-5.5 * d));
            lookAt.set(p.lx + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x * 0.16, p.ly, p.lz);
            smoothLook.current.lerp(lookAt, 1 - Math.exp(-5 * d));
            camera.lookAt(smoothLook.current);
            camera.rotation.z += p.roll + Math.sin(t * 0.11) * 0.004;
            const targetFov = p.fov * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRange"])(size.width / Math.max(1, size.height), 0.5, 1.8, 1.12, 1.0);
            const nextFov = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(fovRef.current, targetFov, 4, d);
            if (Math.abs(nextFov - fovRef.current) > 0.0005) {
                fovRef.current = nextFov;
                camera.fov = nextFov;
                camera.updateProjectionMatrix();
            }
        }
    }["Rig.useFrame"], -1);
    return null;
}
_s(Rig, "xriCDB8Ba+zHVhJwjyvG+HZzAb8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Rig;
;
var _c;
__turbopack_context__.k.register(_c, "Rig");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/Scene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Scene",
    ()=>Scene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerformanceMonitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/PerformanceMonitor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAppStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Rig$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/canvas/Rig.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Atmosphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Atmosphere.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Interface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Interface.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Portal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Portal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Effects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Effects.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function Scene() {
    _s();
    const downgrade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "Scene.useAppStore[downgrade]": (s)=>s.downgrade
    }["Scene.useAppStore[downgrade]"]);
    const declined = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerformanceMonitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerformanceMonitor"], {
                // Integrated GPUs sit in the high-30s on a scene like this and look
                // fine; only drop a tier when the frame budget is genuinely blown.
                bounds: ()=>[
                        34,
                        58
                    ],
                flipflops: 3,
                onFallback: ()=>{
                    if (declined.current) return;
                    declined.current = true;
                    downgrade();
                }
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    "#04050a"
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Rig$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Rig"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Atmosphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Atmosphere"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Interface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Interface"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Portal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Effects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Effects"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Scene.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Scene, "qvFMg6IkhZZZw1NdvnQCe6QopL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"]
    ];
});
_c = Scene;
var _c;
__turbopack_context__.k.register(_c, "Scene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/SceneCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SceneCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAppStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Scene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Scene.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SceneCanvas() {
    _s();
    const dpr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "SceneCanvas.useAppStore[dpr]": (s)=>s.quality.dpr
    }["SceneCanvas.useAppStore[dpr]"]);
    const antialias = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "SceneCanvas.useAppStore[antialias]": (s)=>s.quality.antialias
    }["SceneCanvas.useAppStore[antialias]"]);
    const setReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "SceneCanvas.useAppStore[setReady]": (s)=>s.setReady
    }["SceneCanvas.useAppStore[setReady]"]);
    const onCreated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SceneCanvas.useCallback[onCreated]": (state)=>{
            if ("TURBOPACK compile-time truthy", 1) {
                window.__three = state;
            }
            // One frame of headroom so the first render is never the intro frame.
            requestAnimationFrame({
                "SceneCanvas.useCallback[onCreated]": ()=>requestAnimationFrame({
                        "SceneCanvas.useCallback[onCreated]": ()=>setReady(true)
                    }["SceneCanvas.useCallback[onCreated]"])
            }["SceneCanvas.useCallback[onCreated]"]);
        }
    }["SceneCanvas.useCallback[onCreated]"], [
        setReady
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none fixed inset-0 z-0",
        "aria-hidden": "true",
        "data-canvas-root": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            dpr: dpr,
            flat: true,
            gl: {
                antialias,
                alpha: false,
                stencil: false,
                depth: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: false
            },
            camera: {
                fov: 42,
                near: 0.1,
                far: 160,
                position: [
                    0,
                    0,
                    13
                ]
            },
            onCreated: onCreated,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Scene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"], {}, void 0, false, {
                    fileName: "[project]/src/components/canvas/SceneCanvas.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/SceneCanvas.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/canvas/SceneCanvas.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/SceneCanvas.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(SceneCanvas, "zAeHWv5gDUr2TbKnvxmKsuKlLTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"]
    ];
});
_c = SceneCanvas;
var _c;
__turbopack_context__.k.register(_c, "SceneCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/SceneCanvas.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/canvas/SceneCanvas.tsx [app-client] (ecmascript)"));
}),
"[project]/src/lib/cameraPath.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "poseAt",
    ()=>poseAt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
;
;
/**
 * Camera choreography, one keyframe per journey stage.
 *
 * Per-axis keyframes rather than a spline: a spline through these points
 * overshoots badly on the big z swings (the work section flies inside the
 * corridor, the next pulls right back out), and monotonic interpolation is
 * far easier to art-direct.
 */ //              hero clients manifesto services tech  work  process about insights cta
const POS_X = [
    0.0,
    0.0,
    1.15,
    0.0,
    -0.45,
    0.0,
    0.15,
    -0.7,
    0.5,
    0.0
];
const POS_Y = [
    0.0,
    0.3,
    0.55,
    0.8,
    0.1,
    0.05,
    1.05,
    0.25,
    0.5,
    0.0
];
const POS_Z = [
    7.4,
    9.5,
    8.7,
    8.4,
    7.1,
    4.1,
    10.4,
    8.5,
    9.4,
    6.35
];
// Framing is set by the look target, not the camera position: with lookAt
// pinned to the subject, moving the camera only changes the angle. Pushing the
// target left slides the subject to the right of frame, which is how the
// manifesto and studio beats clear space for left-aligned copy. The work and
// CTA targets sit deep in -z: both look down a corridor of screens.
const LOOK_X = [
    0.0,
    0.0,
    -1.95,
    0.0,
    0.0,
    0.0,
    0.0,
    -1.15,
    0.0,
    0.0
];
const LOOK_Y = [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.6,
    0.0,
    0.0,
    -0.2
];
const LOOK_Z = [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    -7.0,
    0.0,
    0.0,
    0.0,
    -6.0
];
const FOV = [
    42,
    42,
    44,
    46,
    42,
    58,
    45,
    42,
    43,
    40
];
const ROLL = [
    0,
    0,
    0.012,
    -0.01,
    0.008,
    0,
    -0.012,
    0.01,
    -0.006,
    0
];
/** How much of a section holds its pose before easing to the next. */ const CAMERA_HOLD = 0.14;
function sampleHeld(table, stage, hold) {
    const last = table.length - 1;
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(stage, 0, last);
    const i = Math.min(last - 1, Math.floor(s));
    if (s >= last) return table[last];
    const local = s - i;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(table[i], table[i + 1], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(hold, 1, local));
}
function poseAt(stage, out) {
    out.px = sampleHeld(POS_X, stage, CAMERA_HOLD);
    out.py = sampleHeld(POS_Y, stage, CAMERA_HOLD);
    out.pz = sampleHeld(POS_Z, stage, CAMERA_HOLD);
    out.lx = sampleHeld(LOOK_X, stage, CAMERA_HOLD);
    out.ly = sampleHeld(LOOK_Y, stage, CAMERA_HOLD);
    out.lz = sampleHeld(LOOK_Z, stage, CAMERA_HOLD);
    out.fov = sampleHeld(FOV, stage, CAMERA_HOLD);
    out.roll = sampleHeld(ROLL, stage, CAMERA_HOLD);
    return out;
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/interfaceAtlas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ATLAS_SIZE",
    ()=>ATLAS_SIZE,
    "TECH_LAYERS",
    ()=>TECH_LAYERS,
    "createAtlas",
    ()=>createAtlas,
    "kindPixels",
    ()=>kindPixels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/technologies.ts [app-client] (ecmascript)");
;
;
const TECH_LAYERS = [
    {
        name: "Interface",
        techs: [
            "nextjs",
            "react",
            "typescript"
        ]
    },
    {
        name: "Services & APIs",
        techs: [
            "node",
            "python"
        ]
    },
    {
        name: "Data",
        techs: [
            "postgres",
            "mongodb"
        ]
    },
    {
        name: "Cloud & DevOps",
        techs: [
            "aws",
            "docker",
            "github"
        ]
    }
];
const BASE_KINDS = {
    browser: [
        720,
        450
    ],
    dashboard: [
        720,
        450
    ],
    terminal: [
        512,
        320
    ],
    code: [
        512,
        384
    ],
    design: [
        512,
        384
    ],
    image: [
        384,
        256
    ],
    card: [
        384,
        288
    ],
    chart: [
        384,
        288
    ],
    table: [
        384,
        288
    ],
    form: [
        288,
        384
    ],
    phone: [
        240,
        520
    ],
    phone2: [
        240,
        520
    ],
    toast: [
        384,
        128
    ],
    palette: [
        384,
        216
    ],
    type: [
        288,
        216
    ],
    buttons: [
        384,
        216
    ],
    input: [
        704,
        160
    ]
};
const CHIP_PX = [
    320,
    100
];
const LAYER_PX = [
    480,
    300
];
function kindPixels(kind) {
    if (kind.startsWith("chip")) return CHIP_PX;
    if (kind.startsWith("layer")) return LAYER_PX;
    const [w, h] = BASE_KINDS[kind];
    return [
        w,
        h
    ];
}
const ATLAS_SIZE = 2048;
const PAD = 16;
/** Shelf-pack every kind, tallest first. Deterministic, so rects are stable. */ function pack(kinds) {
    const items = kinds.map((kind)=>{
        const [w, h] = kindPixels(kind);
        return {
            kind,
            w,
            h
        };
    }).sort((a, b)=>b.h - a.h);
    const placed = [];
    let x = PAD;
    let y = PAD;
    let row = 0;
    for (const it of items){
        if (x + it.w + PAD > ATLAS_SIZE) {
            x = PAD;
            y += row + PAD;
            row = 0;
        }
        placed.push({
            kind: it.kind,
            x,
            y,
            w: it.w,
            h: it.h
        });
        x += it.w + PAD;
        row = Math.max(row, it.h);
    }
    if (y + row + PAD > ATLAS_SIZE && ("TURBOPACK compile-time value", "development") === "development") {
        console.warn("[interfaceAtlas] atlas overflow — shrink a kind");
    }
    return placed;
}
const CH = {
    ink: "255,0,0",
    accent: "0,255,0",
    fill: "0,0,255",
    caret: "255,255,255"
};
class Painter {
    ctx;
    fonts;
    constructor(ctx, fonts){
        this.ctx = ctx;
        this.fonts = fonts;
    }
    style(ch, a) {
        const c = `rgba(${CH[ch]},${a})`;
        this.ctx.fillStyle = c;
        this.ctx.strokeStyle = c;
    }
    path(x, y, w, h, r) {
        const c = this.ctx;
        const rr = Math.max(0, Math.min(r, w / 2, h / 2));
        c.beginPath();
        c.roundRect(x, y, w, h, rr);
    }
    /** Filled rounded rect; `r` defaults to a pill. */ bar(x, y, w, h, ch, a, r = h / 2) {
        this.style(ch, a);
        this.path(x, y, w, h, r);
        this.ctx.fill();
    }
    box(x, y, w, h, ch, a, r, lw = 1.5) {
        this.style(ch, a);
        this.ctx.lineWidth = lw;
        this.path(x + lw / 2, y + lw / 2, w - lw, h - lw, r);
        this.ctx.stroke();
    }
    dot(x, y, r, ch, a) {
        this.style(ch, a);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fill();
    }
    ring(x, y, r, lw, ch, a, from = 0, to = Math.PI * 2) {
        this.style(ch, a);
        this.ctx.lineWidth = lw;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, from, to);
        this.ctx.stroke();
    }
    line(pts, ch, a, lw = 2) {
        this.style(ch, a);
        this.ctx.lineWidth = lw;
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        pts.forEach(([px, py], i)=>i ? this.ctx.lineTo(px, py) : this.ctx.moveTo(px, py));
        this.ctx.stroke();
    }
    area(pts, base, ch, a) {
        this.style(ch, a);
        const c = this.ctx;
        c.beginPath();
        c.moveTo(pts[0][0], base);
        pts.forEach(([px, py])=>c.lineTo(px, py));
        c.lineTo(pts[pts.length - 1][0], base);
        c.closePath();
        c.fill();
    }
    poly(pts, ch, a) {
        this.style(ch, a);
        const c = this.ctx;
        c.beginPath();
        pts.forEach(([px, py], i)=>i ? c.lineTo(px, py) : c.moveTo(px, py));
        c.closePath();
        c.fill();
    }
    text(s, x, y, px, ch, a, { mono = false, weight = 500, align = "left", spacing = 0 } = {}) {
        const c = this.ctx;
        this.style(ch, a);
        c.font = `${weight} ${px}px ${mono ? this.fonts.mono : this.fonts.sans}`;
        c.textAlign = align;
        c.textBaseline = "alphabetic";
        c.letterSpacing = `${spacing}px`;
        c.fillText(s, x, y);
        c.letterSpacing = "0px";
        return c.measureText(s).width;
    }
    /** Coloured runs on one baseline — syntax highlighting, prompts. */ runs(parts, x, y, px, mono = true) {
        let cx = x;
        for (const [s, ch, a] of parts){
            cx += this.text(s, cx, y, px, ch, a, {
                mono
            });
        }
        return cx;
    }
    /** Knock content out to black so the panel surface shows through. */ knock(draw) {
        const c = this.ctx;
        c.save();
        c.globalCompositeOperation = "source-over";
        const fill = c.fillStyle;
        const stroke = c.strokeStyle;
        // Every primitive sets its own style, so override the channel colour by
        // temporarily routing all channels to black.
        const saved = {
            ...CH
        };
        CH.ink = CH.accent = CH.fill = CH.caret = "0,0,0";
        draw();
        Object.assign(CH, saved);
        c.fillStyle = fill;
        c.strokeStyle = stroke;
        c.restore();
    }
}
const chrome = (p, W, label)=>{
    p.dot(18, 17, 5, "ink", 0.3);
    p.dot(34, 17, 5, "ink", 0.22);
    p.dot(50, 17, 5, "ink", 0.16);
    p.bar(W * 0.3, 8, W * 0.4, 18, "fill", 1);
    p.text(label, W * 0.5, 21, 10, "ink", 0.42, {
        mono: true,
        align: "center"
    });
    p.bar(0, 34, W, 1.5, "ink", 0.1, 0);
};
const wave = (x0, x1, yMid, amp, seed, n = 24)=>{
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeRng"])(seed);
    const pts = [];
    let v = 0;
    for(let i = 0; i <= n; i++){
        v = v * 0.55 + (rng() - 0.5) * 1.4;
        const t = i / n;
        pts.push([
            x0 + (x1 - x0) * t,
            yMid - (Math.sin(t * 3.2 + seed) * 0.45 + v * 0.35 + t * 0.6) * amp
        ]);
    }
    return pts;
};
const DRAW = {
    browser: (p, W)=>{
        chrome(p, W, "studio.app");
        p.bar(28, 52, 70, 13, "ink", 0.85, 3);
        for(let i = 0; i < 4; i++)p.bar(W - 370 + i * 64, 56, 44, 7, "ink", 0.32);
        p.bar(W - 112, 47, 84, 26, "accent", 1, 13);
        p.knock(()=>p.bar(W - 95, 57, 50, 6, "ink", 1));
        p.bar(28, 112, 300, 28, "ink", 0.9, 6);
        p.bar(28, 148, 244, 28, "ink", 0.9, 6);
        p.bar(28, 194, 280, 8, "ink", 0.32);
        p.bar(28, 210, 244, 8, "ink", 0.32);
        p.bar(28, 226, 188, 8, "ink", 0.32);
        p.bar(28, 256, 112, 34, "accent", 1, 17);
        p.knock(()=>p.bar(50, 270, 68, 6, "ink", 1));
        p.box(152, 256, 112, 34, "ink", 0.35, 17);
        p.bar(174, 270, 68, 6, "ink", 0.45);
        const ix = W * 0.52;
        const iw = W * 0.44;
        p.bar(ix, 94, iw, 202, "fill", 1, 14);
        p.dot(ix + iw * 0.66, 168, 58, "accent", 0.55);
        p.area(wave(ix, ix + iw, 262, 34, 3), 296, "accent", 0.3);
        p.area(wave(ix, ix + iw, 280, 22, 9), 296, "ink", 0.12);
        const cw = (W - 56 - 32) / 3;
        for(let i = 0; i < 3; i++){
            const x = 28 + i * (cw + 16);
            p.bar(x, 320, cw, 106, "fill", 0.7, 12);
            p.bar(x + 14, 336, 30, 30, "accent", i === 1 ? 1 : 0.55, 9);
            p.bar(x + 56, 340, cw * 0.46, 8, "ink", 0.75);
            p.bar(x + 56, 354, cw * 0.3, 6, "ink", 0.3);
            p.bar(x + 14, 384, cw - 28, 6, "ink", 0.22);
            p.bar(x + 14, 398, cw * 0.62, 6, "ink", 0.22);
        }
    },
    dashboard: (p, W, H)=>{
        p.bar(0, 0, 150, H, "fill", 0.55, 0);
        p.bar(18, 22, 62, 12, "ink", 0.85, 3);
        for(let i = 0; i < 7; i++){
            const y = 66 + i * 32;
            if (i === 1) p.bar(10, y - 9, 130, 26, "accent", 0.2, 8);
            p.dot(27, y + 4, 5, i === 1 ? "accent" : "ink", i === 1 ? 1 : 0.32);
            p.bar(40, y, 70 - i % 3 * 12, 8, i === 1 ? "accent" : "ink", i === 1 ? 0.9 : 0.32);
        }
        p.bar(172, 22, 150, 14, "ink", 0.85, 4);
        p.bar(W - 226, 15, 150, 28, "fill", 0.9);
        p.dot(W - 40, 29, 13, "accent", 0.7);
        const tw = (W - 172 - 20 - 24) / 3;
        const nums = [
            "12.4k",
            "98.2%",
            "3.1s"
        ];
        for(let i = 0; i < 3; i++){
            const x = 172 + i * (tw + 12);
            p.bar(x, 62, tw, 80, "fill", 0.6, 12);
            p.bar(x + 14, 76, 60, 7, "ink", 0.32);
            p.text(nums[i], x + 14, 124, 26, "ink", 0.9, {
                weight: 600
            });
            p.bar(x + tw - 58, 72, 44, 16, "accent", 0.85);
        }
        const cx = 172;
        const cy = 158;
        const cw = W - 172 - 20 - 206;
        const ch = 268;
        p.bar(cx, cy, cw, ch, "fill", 0.42, 12);
        for(let i = 1; i < 5; i++)p.bar(cx + 16, cy + i * 52, cw - 32, 1.2, "ink", 0.08, 0);
        const pts = wave(cx + 18, cx + cw - 18, cy + ch - 60, 120, 21, 28);
        p.area(pts, cy + ch - 18, "accent", 0.16);
        p.line(pts, "accent", 1, 3);
        const last = pts[pts.length - 1];
        p.dot(last[0], last[1], 6, "accent", 1);
        const bx = W - 206;
        p.bar(bx, cy, 186, ch, "fill", 0.42, 12);
        p.bar(bx + 16, cy + 18, 70, 8, "ink", 0.4);
        const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeRng"])(5);
        for(let i = 0; i < 7; i++){
            const h = 50 + rng() * 150;
            const on = i === 4;
            p.bar(bx + 18 + i * 23, cy + ch - 20 - h, 14, h, on ? "accent" : "ink", on ? 1 : 0.4, 4);
        }
    },
    terminal: (p, W)=>{
        p.dot(18, 17, 5, "ink", 0.3);
        p.dot(34, 17, 5, "ink", 0.22);
        p.dot(50, 17, 5, "ink", 0.16);
        p.text("zsh — deploy", W / 2, 22, 11, "ink", 0.4, {
            mono: true,
            align: "center"
        });
        p.bar(0, 34, W, 1.5, "ink", 0.1, 0);
        const L = 15;
        const y0 = 66;
        const lh = 34;
        p.runs([
            [
                "$ ",
                "accent",
                1
            ],
            [
                "npm run build",
                "ink",
                0.88
            ]
        ], 22, y0, L);
        p.runs([
            [
                "  ▲ Next.js · compiling…",
                "ink",
                0.42
            ]
        ], 22, y0 + lh, L);
        p.runs([
            [
                "  ✓ ",
                "accent",
                1
            ],
            [
                "Compiled in 3.7s",
                "ink",
                0.7
            ]
        ], 22, y0 + lh * 2, L);
        p.runs([
            [
                "  ✓ ",
                "accent",
                1
            ],
            [
                "42 routes · 0 errors",
                "ink",
                0.7
            ]
        ], 22, y0 + lh * 3, L);
        p.runs([
            [
                "$ ",
                "accent",
                1
            ],
            [
                "git push origin main",
                "ink",
                0.88
            ]
        ], 22, y0 + lh * 4, L);
        p.runs([
            [
                "  → ",
                "accent",
                1
            ],
            [
                "deployed to production",
                "ink",
                0.7
            ]
        ], 22, y0 + lh * 5, L);
        const end = p.runs([
            [
                "$ ",
                "accent",
                1
            ]
        ], 22, y0 + lh * 6, L);
        p.bar(end + 2, y0 + lh * 6 - 15, 9, 19, "caret", 1, 1);
    },
    code: (p, W)=>{
        p.bar(12, 8, 104, 26, "fill", 0.7, 7);
        p.text("launch.ts", 26, 26, 11, "ink", 0.72, {
            mono: true
        });
        p.text("design.ts", 138, 26, 11, "ink", 0.32, {
            mono: true
        });
        p.bar(0, 40, W, 1.5, "ink", 0.1, 0);
        const KW = new Set([
            "import",
            "from",
            "export",
            "async",
            "function",
            "const",
            "await",
            "return",
            "true"
        ]);
        const lines = [
            'import { createApp } from "./core";',
            "",
            "export async function launch(brief) {",
            "  const product = await design(brief);",
            "  const build = await engineer(product, {",
            '    scale: "global",',
            "    secure: true,",
            "  });",
            "  return ship(build);",
            "}"
        ];
        const lh = 30;
        const y0 = 70;
        p.bar(0, y0 + lh * 4 - 20, W, 28, "fill", 0.55, 0);
        lines.forEach((ln, i)=>{
            const y = y0 + i * lh;
            p.text(String(i + 1), 34, y, 12, "ink", 0.22, {
                mono: true,
                align: "right"
            });
            const parts = [];
            for (const tok of ln.split(/(\s+|"[^"]*"|[{}(),;.:])/).filter(Boolean)){
                if (KW.has(tok)) parts.push([
                    tok,
                    "accent",
                    1
                ]);
                else if (tok.startsWith('"')) parts.push([
                    tok,
                    "ink",
                    0.45
                ]);
                else parts.push([
                    tok,
                    "ink",
                    0.86
                ]);
            }
            const end = p.runs(parts, 50, y, 13.5);
            if (i === 8) p.bar(end + 3, y - 14, 2.5, 18, "caret", 1, 0);
        });
    },
    design: (p, W, H)=>{
        p.bar(0, 0, W, 34, "fill", 0.5, 0);
        for(let i = 0; i < 6; i++){
            p.bar(14 + i * 26, 10, 14, 14, i === 1 ? "accent" : "ink", i === 1 ? 1 : 0.32, 4);
        }
        p.bar(0, 34, 104, H - 34, "fill", 0.32, 0);
        for(let i = 0; i < 8; i++){
            const y = 52 + i * 26;
            if (i === 3) p.bar(6, y - 8, 92, 22, "accent", 0.18, 5);
            p.bar(14 + (i % 3 === 2 ? 12 : 0), y, 56 - i % 2 * 14, 6, i === 3 ? "accent" : "ink", i === 3 ? 0.9 : 0.3);
        }
        p.bar(W - 104, 34, 104, H - 34, "fill", 0.32, 0);
        [
            "accent",
            "ink",
            "fill"
        ].forEach((c, i)=>p.dot(W - 84 + i * 26, 60, 9, c, c === "fill" ? 1 : 0.85));
        for(let i = 0; i < 5; i++)p.bar(W - 88, 90 + i * 22, 70 - i % 2 * 22, 6, "ink", 0.28);
        const fx = 136;
        const fy = 64;
        p.text("Frame · Home", fx, fy - 8, 10, "ink", 0.4, {
            mono: true
        });
        p.box(fx, fy, 240, 292, "ink", 0.22, 6);
        p.bar(fx + 18, fy + 22, 124, 14, "ink", 0.82, 4);
        p.bar(fx + 18, fy + 44, 92, 8, "ink", 0.3);
        p.bar(fx + 18, fy + 64, 204, 100, "fill", 0.85, 10);
        p.dot(fx + 160, fy + 106, 30, "accent", 0.5);
        p.area(wave(fx + 18, fx + 222, fy + 146, 18, 4), fy + 164, "accent", 0.3);
        p.bar(fx + 18, fy + 184, 84, 24, "accent", 1, 12);
        p.box(fx + 112, fy + 184, 84, 24, "ink", 0.35, 12);
        p.bar(fx + 18, fy + 226, 204, 6, "ink", 0.2);
        p.bar(fx + 18, fy + 240, 160, 6, "ink", 0.2);
        // Selection on the image block, with handles and a size readout.
        const sx = fx + 16;
        const sy = fy + 62;
        const sw = 208;
        const sh = 104;
        p.box(sx, sy, sw, sh, "accent", 1, 0, 1.6);
        for (const [hx, hy] of [
            [
                sx,
                sy
            ],
            [
                sx + sw / 2,
                sy
            ],
            [
                sx + sw,
                sy
            ],
            [
                sx,
                sy + sh / 2
            ],
            [
                sx + sw,
                sy + sh / 2
            ],
            [
                sx,
                sy + sh
            ],
            [
                sx + sw / 2,
                sy + sh
            ],
            [
                sx + sw,
                sy + sh
            ]
        ]){
            p.knock(()=>p.bar(hx - 4, hy - 4, 8, 8, "ink", 1, 1));
            p.box(hx - 4.5, hy - 4.5, 9, 9, "accent", 1, 1, 1.4);
        }
        p.bar(sx + sw / 2 - 32, sy + sh + 10, 64, 17, "accent", 1, 8);
        p.knock(()=>p.text("208 × 104", sx + sw / 2, sy + sh + 22, 9, "ink", 1, {
                mono: true,
                align: "center"
            }));
        const cx = sx + sw - 30;
        const cy = sy + sh - 22;
        p.poly([
            [
                cx,
                cy
            ],
            [
                cx,
                cy + 22
            ],
            [
                cx + 6,
                cy + 16
            ],
            [
                cx + 11,
                cy + 26
            ],
            [
                cx + 15,
                cy + 24
            ],
            [
                cx + 10,
                cy + 14
            ],
            [
                cx + 18,
                cy + 14
            ]
        ], "ink", 0.92);
    },
    image: (p, W, H)=>{
        p.bar(0, 0, W, H, "fill", 1, 0);
        p.dot(W * 0.66, H * 0.36, 62, "accent", 0.6);
        p.area(wave(0, W, H * 0.72, 46, 12), H, "accent", 0.32);
        p.area(wave(0, W, H * 0.84, 30, 17), H, "ink", 0.14);
        p.dot(W * 0.22, H * 0.28, 10, "ink", 0.18);
    },
    card: (p, W)=>{
        p.dot(42, 44, 20, "accent", 0.85);
        p.knock(()=>p.text("AK", 42, 50, 15, "ink", 1, {
                weight: 700,
                align: "center"
            }));
        p.bar(74, 32, 120, 12, "ink", 0.85, 4);
        p.bar(74, 51, 80, 8, "ink", 0.32);
        for(let i = 0; i < 3; i++)p.dot(W - 44 + i * 10, 42, 2.6, "ink", 0.4);
        p.bar(22, 90, 330, 7, "ink", 0.26);
        p.bar(22, 106, 300, 7, "ink", 0.26);
        p.bar(22, 122, 210, 7, "ink", 0.26);
        p.bar(22, 146, W - 44, 80, "fill", 0.7, 10);
        p.area(wave(22, W - 22, 204, 26, 31), 226, "accent", 0.35);
        p.bar(22, 244, 98, 28, "accent", 1, 14);
        p.knock(()=>p.bar(42, 255, 58, 6, "ink", 1));
        p.dot(W - 80, 258, 9, "ink", 0.3);
        p.dot(W - 50, 258, 9, "ink", 0.3);
    },
    chart: (p, W, H)=>{
        p.bar(22, 26, 92, 8, "ink", 0.4);
        p.text("$84.2k", 22, 84, 40, "ink", 0.92, {
            weight: 600
        });
        p.bar(W - 112, 52, 90, 26, "accent", 1, 13);
        p.knock(()=>p.text("+12.4%", W - 67, 70, 13, "ink", 1, {
                weight: 600,
                align: "center"
            }));
        const pts = wave(22, W - 22, H - 60, 88, 44, 26);
        p.area(pts, H - 22, "accent", 0.16);
        p.line(pts, "accent", 1, 3);
        for(let i = 0; i < 6; i++)p.bar(22 + i * ((W - 44) / 5) - 1, H - 16, 2, 6, "ink", 0.2, 0);
    },
    table: (p, W)=>{
        p.bar(14, 16, W - 28, 30, "fill", 0.6, 8);
        [
            26,
            128,
            210,
            290
        ].forEach((x, i)=>p.bar(x, 28, [
                52,
                40,
                36,
                42
            ][i], 7, "ink", 0.42));
        for(let r = 0; r < 6; r++){
            const y = 60 + r * 37;
            const on = r === 1 || r === 4;
            p.dot(34, y + 12, 6, on ? "accent" : "ink", on ? 1 : 0.28);
            p.bar(50, y + 8, 64, 8, "ink", 0.75);
            p.bar(128, y + 8, 56, 8, "ink", 0.32);
            p.bar(210, y + 4, 54, 16, on ? "accent" : "fill", on ? 0.3 : 0.9);
            p.bar(290, y + 8, 60, 8, "ink", 0.28);
            p.bar(14, y + 30, W - 28, 1.2, "ink", 0.07, 0);
        }
    },
    form: (p, W)=>{
        p.bar(22, 28, 140, 14, "ink", 0.85, 4);
        p.bar(22, 50, 190, 8, "ink", 0.3);
        for(let i = 0; i < 3; i++){
            const y = 84 + i * 62;
            p.bar(22, y, 62, 7, "ink", 0.45);
            p.box(22, y + 14, W - 44, 36, "ink", 0.25, 9);
            p.bar(36, y + 29, 112 - i * 22, 7, "ink", 0.2);
        }
        p.bar(22, 284, 120, 8, "ink", 0.45);
        p.bar(W - 78, 274, 56, 28, "accent", 1, 14);
        p.knock(()=>p.dot(W - 36, 288, 10, "ink", 1));
        p.bar(22, 322, W - 44, 42, "accent", 1, 11);
        p.knock(()=>p.text("Continue", W / 2, 348, 15, "ink", 1, {
                weight: 600,
                align: "center"
            }));
    },
    phone: (p, W)=>{
        p.text("9:41", 22, 28, 13, "ink", 0.85, {
            weight: 600
        });
        p.bar(W - 64, 19, 18, 8, "ink", 0.6, 2);
        p.bar(W - 40, 19, 20, 8, "ink", 0.6, 2);
        p.bar(20, 58, 112, 16, "ink", 0.9, 4);
        p.bar(20, 82, 150, 8, "ink", 0.3);
        p.bar(20, 104, W - 40, 32, "fill", 0.85);
        p.dot(38, 120, 6, "ink", 0.3);
        p.bar(20, 150, W - 40, 132, "accent", 1, 18);
        p.knock(()=>{
            p.bar(36, 168, 92, 10, "ink", 1);
            p.bar(36, 186, 60, 7, "ink", 1);
            p.line(wave(36, W - 36, 258, 30, 7, 16), "ink", 1, 2.5);
        });
        for(let i = 0; i < 3; i++){
            const y = 300 + i * 54;
            p.dot(40, y + 18, 16, "fill", 1);
            p.dot(40, y + 18, 6, i === 0 ? "accent" : "ink", i === 0 ? 1 : 0.3);
            p.bar(66, y + 10, 100 - i * 14, 9, "ink", 0.8);
            p.bar(66, y + 26, 70, 7, "ink", 0.3);
            p.bar(W - 52, y + 12, 32, 9, "ink", 0.5);
        }
        p.bar(0, 470, W, 1.2, "ink", 0.08, 0);
        for(let i = 0; i < 4; i++){
            p.bar(30 + i * 52, 484, 20, 20, i === 0 ? "accent" : "ink", i === 0 ? 1 : 0.32, 6);
        }
    },
    phone2: (p, W)=>{
        p.text("9:41", 22, 28, 13, "ink", 0.85, {
            weight: 600
        });
        p.bar(W - 40, 19, 20, 8, "ink", 0.6, 2);
        p.bar(20, 58, 96, 16, "ink", 0.9, 4);
        p.ring(W / 2, 184, 64, 13, "ink", 0.1);
        p.ring(W / 2, 184, 64, 13, "accent", 1, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.82);
        p.text("82%", W / 2, 197, 36, "ink", 0.92, {
            weight: 600,
            align: "center"
        });
        p.bar(W / 2 - 50, 272, 100, 8, "ink", 0.35);
        for(let i = 0; i < 2; i++){
            const x = 20 + i * ((W - 52) / 2 + 12);
            const w = (W - 52) / 2;
            p.bar(x, 300, w, 92, "fill", 0.7, 12);
            p.bar(x + 12, 314, 40, 7, "ink", 0.35);
            p.text(i ? "4.9" : "12k", x + 12, 356, 24, "ink", 0.88, {
                weight: 600
            });
            p.bar(x + 12, 370, w - 40, 6, i ? "accent" : "ink", i ? 0.8 : 0.25);
        }
        p.bar(20, 420, W - 40, 44, "accent", 1, 12);
        p.knock(()=>p.bar(W / 2 - 36, 439, 72, 7, "ink", 1));
        p.bar(W / 2 - 40, 484, 80, 7, "ink", 0.3);
    },
    toast: (p, W)=>{
        p.bar(20, 26, 76, 76, "accent", 1, 20);
        p.knock(()=>p.line([
                [
                    42,
                    64
                ],
                [
                    54,
                    76
                ],
                [
                    76,
                    52
                ]
            ], "ink", 1, 6));
        p.text("Deployment complete", 114, 56, 17, "ink", 0.88, {
            weight: 600
        });
        p.text("production · 2m ago", 114, 82, 12, "ink", 0.42, {
            mono: true
        });
        p.dot(W - 30, 38, 5, "accent", 0.8);
    },
    palette: (p)=>{
        const sw = [
            [
                "accent",
                1,
                "#2854DB"
            ],
            [
                "accent",
                0.55,
                "#567CEC"
            ],
            [
                "ink",
                0.9,
                "#090C16"
            ],
            [
                "ink",
                0.45,
                "#687084"
            ],
            [
                "fill",
                1,
                "#EEF1F6"
            ]
        ];
        sw.forEach(([c, a, hex], i)=>{
            const x = 18 + i * 72;
            p.bar(x, 22, 60, 108, c, a, 10);
            p.text(hex, x + 30, 152, 10, "ink", 0.45, {
                mono: true,
                align: "center"
            });
        });
        p.text("Color tokens", 18, 192, 13, "ink", 0.7);
    },
    type: (p)=>{
        p.text("Aa", 18, 128, 100, "ink", 0.9, {
            weight: 500
        });
        p.text("Archivo", 170, 58, 17, "ink", 0.8, {
            weight: 600
        });
        [
            0.2,
            0.35,
            0.55,
            0.8
        ].forEach((a, i)=>p.bar(170, 80 + i * 18, 92, 8, "ink", a));
        p.text("Display · 72 / 80", 18, 190, 10, "ink", 0.4, {
            mono: true
        });
    },
    buttons: (p, W)=>{
        p.bar(20, 22, 122, 38, "accent", 1, 19);
        p.knock(()=>p.text("Primary", 81, 46, 14, "ink", 1, {
                weight: 600,
                align: "center"
            }));
        p.box(154, 22, 122, 38, "ink", 0.42, 19);
        p.text("Secondary", 215, 46, 14, "ink", 0.75, {
            weight: 600,
            align: "center"
        });
        p.ring(W - 58, 41, 18, 1.5, "ink", 0.35);
        p.bar(W - 65, 40, 14, 2, "ink", 0.6, 0);
        p.bar(W - 59, 34, 2, 14, "ink", 0.6, 0);
        p.bar(20, 84, 58, 30, "accent", 1, 15);
        p.knock(()=>p.dot(63, 99, 10, "ink", 1));
        p.bar(92, 84, 58, 30, "fill", 1, 15);
        p.dot(107, 99, 10, "ink", 0.3);
        p.bar(170, 86, 26, 26, "accent", 1, 7);
        p.knock(()=>p.line([
                [
                    176,
                    99
                ],
                [
                    182,
                    105
                ],
                [
                    191,
                    93
                ]
            ], "ink", 1, 3));
        p.ring(228, 99, 12, 1.6, "ink", 0.4);
        p.dot(228, 99, 6, "accent", 1);
        p.bar(20, 150, W - 40, 6, "fill", 1);
        p.bar(20, 150, 212, 6, "accent", 1);
        p.knock(()=>p.dot(232, 153, 11, "ink", 1));
        p.ring(232, 153, 11, 2, "accent", 1);
        p.text("Components", 20, 196, 10, "ink", 0.4, {
            mono: true
        });
    },
    input: (p, W)=>{
        p.bar(16, 30, W - 120, 100, "fill", 0.55, 50);
        p.box(16, 30, W - 120, 100, "ink", 0.2, 50);
        const w = p.text("Tell us about your project", 56, 92, 30, "ink", 0.78, {
            weight: 500
        });
        p.bar(56 + w + 6, 62, 3, 40, "caret", 1, 0);
        p.dot(W - 52, 80, 44, "accent", 1);
        p.knock(()=>{
            p.line([
                [
                    W - 72,
                    80
                ],
                [
                    W - 34,
                    80
                ]
            ], "ink", 1, 4.5);
            p.line([
                [
                    W - 50,
                    64
                ],
                [
                    W - 34,
                    80
                ],
                [
                    W - 50,
                    96
                ]
            ], "ink", 1, 4.5);
        });
    }
};
const CHIP_MARK = {
    nextjs: "N",
    react: "R",
    typescript: "TS",
    node: "JS",
    python: "Py",
    postgres: "Pg",
    mongodb: "M",
    aws: "A",
    docker: "D",
    github: "G"
};
function drawChip(p, W, index) {
    const tech = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECHNOLOGIES"][index];
    p.bar(16, 22, 56, 56, "accent", 0.92, 13);
    const mark = CHIP_MARK[tech.id] ?? tech.name[0];
    p.knock(()=>p.text(mark, 44, 60, mark.length > 1 ? 20 : 26, "ink", 1, {
            weight: 700,
            align: "center"
        }));
    p.text(tech.name, 88, 52, 24, "ink", 0.92, {
        weight: 600
    });
    p.text(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_LABEL"][tech.category].toUpperCase(), 88, 78, 11, "ink", 0.42, {
        mono: true,
        spacing: 1.5
    });
    p.dot(W - 22, 28, 5, "accent", 0.85);
}
function drawLayer(p, W, H, index) {
    for(let y = 60; y < H - 14; y += 24){
        for(let x = 22; x < W - 14; x += 24)p.dot(x, y, 1.6, "ink", 0.14);
    }
    p.box(10, 10, W - 20, H - 20, "ink", 0.16, 14);
    p.text(`0${index + 1}`, 28, 40, 13, "accent", 1, {
        mono: true,
        weight: 500
    });
    p.text(TECH_LAYERS[index].name.toUpperCase(), 58, 40, 13, "ink", 0.62, {
        mono: true,
        spacing: 2
    });
    p.bar(W - 64, 30, 36, 12, "accent", 0.35);
}
/* ------------------------------------------------------------------------ */ function readFonts() {
    const s = getComputedStyle(document.documentElement);
    const sans = s.getPropertyValue("--font-archivo").trim() || "Archivo, system-ui, sans-serif";
    const mono = s.getPropertyValue("--font-jetbrains").trim() || "ui-monospace, monospace";
    return {
        sans,
        mono
    };
}
function createAtlas(kinds) {
    const canvas = document.createElement("canvas");
    canvas.width = ATLAS_SIZE;
    canvas.height = ATLAS_SIZE;
    const ctx = canvas.getContext("2d", {
        alpha: false
    });
    const placed = pack(Array.from(new Set(kinds)));
    const rects = new Map();
    for (const pl of placed){
        rects.set(pl.kind, {
            u: pl.x / ATLAS_SIZE,
            v: 1 - (pl.y + pl.h) / ATLAS_SIZE,
            w: pl.w / ATLAS_SIZE,
            h: pl.h / ATLAS_SIZE
        });
    }
    const redraw = ()=>{
        const painter = new Painter(ctx, readFonts());
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);
        ctx.globalCompositeOperation = "lighter";
        for (const pl of placed){
            ctx.save();
            ctx.translate(pl.x, pl.y);
            ctx.beginPath();
            ctx.rect(0, 0, pl.w, pl.h);
            ctx.clip();
            if (pl.kind.startsWith("chip")) drawChip(painter, pl.w, Number(pl.kind.slice(4)));
            else if (pl.kind.startsWith("layer")) drawLayer(painter, pl.w, pl.h, Number(pl.kind.slice(5)));
            else DRAW[pl.kind](painter, pl.w, pl.h);
            ctx.restore();
        }
    };
    redraw();
    return {
        canvas,
        rects,
        redraw
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/palette.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "C",
    ()=>C,
    "C_LIGHT",
    ()=>C_LIGHT,
    "C_PANEL",
    ()=>C_PANEL,
    "PALETTE",
    ()=>PALETTE,
    "color",
    ()=>color,
    "mixColor",
    ()=>mixColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const PALETTE = {
    void: "#04050a",
    ink: "#070911",
    carbon: "#0b0e18",
    ion: "#6e9bff",
    ionSoft: "#a8c2ff",
    ionDeep: "#2b47c9",
    ember: "#ff8a5b",
    aqua: "#74e0ff",
    chalk: "#e9ecf5"
};
const color = (hex)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](hex);
const C = {
    void: color(PALETTE.void),
    ink: color(PALETTE.ink),
    carbon: color(PALETTE.carbon),
    ion: color(PALETTE.ion),
    ionSoft: color(PALETTE.ionSoft),
    ionDeep: color(PALETTE.ionDeep),
    ember: color(PALETTE.ember),
    aqua: color(PALETTE.aqua),
    chalk: color(PALETTE.chalk)
};
const C_LIGHT = {
    /** Sky gradient, bottom → top. Kept close together: a strong gradient on
   *  paper reads as a dirty print rather than a lit room. */ skyLow: color("#eceef2"),
    skyMid: color("#f3f4f7"),
    skyHigh: color("#f8f9fb"),
    skyGlow: color("#b9c8e6"),
    ionSoft: color("#567cec")
};
const C_PANEL = {
    surfaceL: color("#ffffff"),
    fillL: color("#e8ecf4"),
    inkL: color("#0b1222"),
    accentL: color("#2854db"),
    shadowL: color("#0b1530"),
    edgeL: color("#0b1530"),
    surfaceD: color("#0b1020"),
    fillD: color("#1a2340").multiplyScalar(1.3),
    inkD: color("#cfd8f0").multiplyScalar(0.5),
    accentD: color("#6e9bff").multiplyScalar(1.8),
    haloD: color("#3a5bd9"),
    edgeD: color("#6e9bff").multiplyScalar(0.8)
};
function mixColor(out, a, b, t) {
    out.copy(a).lerp(b, t);
    return out;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/panels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_HOLD",
    ()=>DEFAULT_HOLD,
    "HERO_MEMBERS",
    ()=>HERO_MEMBERS,
    "LAYOUTS",
    ()=>LAYOUTS,
    "LAYOUT_HOLD",
    ()=>LAYOUT_HOLD,
    "P",
    ()=>P,
    "PANEL_COUNT",
    ()=>PANEL_COUNT,
    "ROSTER",
    ()=>ROSTER,
    "STAGGER",
    ()=>STAGGER,
    "STRIDE",
    ()=>STRIDE,
    "blend",
    ()=>blend,
    "makeBuf",
    ()=>makeBuf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/technologies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interfaceAtlas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interfaceAtlas.ts [app-client] (ecmascript)");
;
;
;
;
const P = {
    browser: 0,
    dashboard: 1,
    terminal: 2,
    code: 3,
    design: 4,
    image: 5,
    card: 6,
    chart: 7,
    table: 8,
    form: 9,
    phone: 10,
    phone2: 11,
    toast: 12,
    palette: 13,
    type: 14,
    buttons: 15,
    chip0: 16,
    layer0: 26,
    input: 30
};
const spec = (kind, w, r = 0.055)=>{
    const [pw, ph] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interfaceAtlas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kindPixels"])(kind);
    return {
        kind,
        w,
        h: w * ph / pw,
        r
    };
};
const ROSTER = [
    spec("browser", 2.4, 0.07),
    spec("dashboard", 2.4, 0.07),
    spec("terminal", 1.6, 0.06),
    spec("code", 1.4, 0.06),
    spec("design", 1.6, 0.06),
    spec("image", 1.2),
    spec("card", 0.96),
    spec("chart", 0.96),
    spec("table", 1.04),
    spec("form", 0.72),
    spec("phone", 0.6, 0.085),
    spec("phone2", 0.6, 0.085),
    spec("toast", 0.96, 0.07),
    spec("palette", 0.96),
    spec("type", 0.72),
    spec("buttons", 0.96),
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECHNOLOGIES"].map((_, i)=>spec(`chip${i}`, 0.96, 0.06)),
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interfaceAtlas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECH_LAYERS"].map((_, i)=>spec(`layer${i}`, 2.6, 0.07)),
    spec("input", 2.2, 0.08)
];
const PANEL_COUNT = ROSTER.length;
const STRIDE = 11;
const O = 8;
const F = 9;
const GL = 10;
const makeBuf = ()=>new Float32Array(PANEL_COUNT * STRIDE);
const _e = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](0, 0, 0, "YXZ");
const _q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _v = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
/** A local frame: yaw, then pitch, then roll — how you would aim a camera. */ class Frame {
    pos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    quat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    scale = 1;
    set(x, y, z, rx = 0, ry = 0, rz = 0, s = 1) {
        this.pos.set(x, y, z);
        this.quat.setFromEuler(_e.set(rx, ry, rz, "YXZ"));
        this.scale = s;
        return this;
    }
}
const WORLD = new Frame();
const G = new Frame();
function hideAll(out) {
    for(let i = 0; i < PANEL_COUNT; i++){
        const b = i * STRIDE;
        out[b + 3] = 0;
        out[b + 4] = 0;
        out[b + 5] = 0;
        out[b + 6] = 1;
        out[b + 7] = 1;
        out[b + O] = 0;
    }
}
function put(out, i, g, lx, ly, lz, rx, ry, rz, s, o, fill = 1, glow = 0) {
    _v.set(lx, ly, lz).multiplyScalar(g.scale).applyQuaternion(g.quat).add(g.pos);
    _q.setFromEuler(_e.set(rx, ry, rz, "YXZ")).premultiply(g.quat);
    const b = i * STRIDE;
    out[b] = _v.x;
    out[b + 1] = _v.y;
    out[b + 2] = _v.z;
    out[b + 3] = _q.x;
    out[b + 4] = _q.y;
    out[b + 5] = _q.z;
    out[b + 6] = _q.w;
    out[b + 7] = s * g.scale;
    out[b + O] = o;
    out[b + F] = fill;
    out[b + GL] = glow;
}
/* ------------------------------------------------------------------------ */ /* Blending                                                                  */ /* ------------------------------------------------------------------------ */ const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeRng"])(0x1f00d);
const STAGGER = Float32Array.from({
    length: PANEL_COUNT
}, ()=>rng() * 0.32);
const STAGGER_MAX = 0.32;
const _qa = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _qb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
function blend(out, a, b, k, pop = 0) {
    for(let i = 0; i < PANEL_COUNT; i++){
        const base = i * STRIDE;
        const oa = a[base + O];
        const ob = b[base + O];
        const ki = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(0, 1, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((k - STAGGER[i]) / (1 - STAGGER_MAX)));
        if (oa < 0.004 && ob < 0.004) {
            for(let c = 0; c < STRIDE; c++)out[base + c] = b[base + c];
            out[base + O] = 0;
            continue;
        }
        const src = oa < 0.004 ? b : a;
        const dst = ob < 0.004 ? a : b;
        const ghostA = oa < 0.004;
        const ghostB = ob < 0.004;
        const ax = src[base];
        const ay = src[base + 1];
        const az = src[base + 2] - (ghostA ? 1.1 : 0);
        const bx = dst[base];
        const by = dst[base + 1];
        const bz = dst[base + 2] - (ghostB ? 1.1 : 0);
        // Panels lift toward the viewer mid-move: the layout visibly comes apart
        // and resettles, which is what makes it read as an exploded view.
        const lift = ghostA || ghostB ? 0 : Math.sin(ki * Math.PI) * pop;
        out[base] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(ax, bx, ki);
        out[base + 1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(ay, by, ki);
        out[base + 2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(az, bz, ki) + lift;
        _qa.set(src[base + 3], src[base + 4], src[base + 5], src[base + 6]);
        _qb.set(dst[base + 3], dst[base + 4], dst[base + 5], dst[base + 6]);
        _qa.slerp(_qb, ki);
        out[base + 3] = _qa.x;
        out[base + 4] = _qa.y;
        out[base + 5] = _qa.z;
        out[base + 6] = _qa.w;
        const sa = src[base + 7] * (ghostA ? 0.84 : 1);
        const sb = dst[base + 7] * (ghostB ? 0.84 : 1);
        out[base + 7] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(sa, sb, ki);
        out[base + O] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(oa, ob, ki);
        out[base + F] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(src[base + F], dst[base + F], ki);
        out[base + GL] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(src[base + GL], dst[base + GL], ki);
    }
}
/**
 * The product, exploded: one website pulled apart into its layers.
 * [panel, x, y, depth (in layer separations), yaw, scale, opacity], back to
 * front — which is also the order the layers arrive in on load, so the page
 * builds up the way a product is layered.
 */ const EXPLODED = [
    [
        P.dashboard,
        -0.75,
        0.5,
        -2.2,
        0,
        1.15,
        0.5
    ],
    [
        P.code,
        1.3,
        0.62,
        -1.15,
        0,
        0.95,
        0.8
    ],
    [
        P.browser,
        0,
        0,
        0,
        0,
        1.55,
        1
    ],
    [
        P.image,
        0.62,
        0.2,
        0.95,
        0,
        1.08,
        1
    ],
    [
        P.card,
        -1.0,
        -0.56,
        1.4,
        0,
        1.0,
        1
    ],
    [
        P.form,
        1.9,
        0.28,
        1.75,
        0,
        0.85,
        1
    ],
    [
        P.chart,
        1.05,
        -0.72,
        2.05,
        0,
        0.9,
        1
    ],
    [
        P.toast,
        -0.72,
        0.74,
        2.45,
        0,
        1.0,
        1
    ],
    [
        P.buttons,
        -1.58,
        0.06,
        2.85,
        0,
        0.8,
        1
    ],
    [
        P.phone,
        -2.6,
        -0.22,
        1.25,
        0.1,
        1.1,
        1
    ]
];
const HERO_MEMBERS = EXPLODED.map(_c = ([id])=>id);
_c1 = HERO_MEMBERS;
/** Where each layer flies in from, relative to its resting place. */ const arrivalRng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeRng"])(0xa55e);
const ARRIVAL = EXPLODED.map(_c2 = ()=>[
        (arrivalRng() - 0.5) * 9,
        (arrivalRng() - 0.5) * 6,
        2.5 + arrivalRng() * 3.5,
        (arrivalRng() - 0.5) * 1.6,
        (arrivalRng() - 0.5) * 1.6,
        (arrivalRng() - 0.5) * 1.0
    ]);
_c3 = ARRIVAL;
/** Ease-out with a small overshoot, so each layer snaps into place. */ const snap = (t)=>{
    const u = t - 1;
    return 1 + 2.25 * u * u * u + 1.25 * u * u;
};
/**
 * The hero: the product at full strength in the right half of the frame,
 * beside the headline. It assembles layer by layer as the preloader hands off,
 * tilts toward the pointer, spreads its layers while the pointer works it,
 * and lifts whichever layer is hovered.
 */ const hero = (out, ctx)=>{
    hideAll(out);
    const portrait = ctx.portrait;
    const sep = 0.46 * (1 + 0.12 * Math.sin(ctx.t * 0.5)) * (1 + 0.65 * ctx.engage);
    G.set(portrait ? 0.15 : 2.3, portrait ? -1.75 : -0.12, portrait ? -2.2 : -1.8, -0.3 - ctx.pointer.y * 0.12, -0.58 + ctx.pointer.x * 0.2, 0.05, portrait ? 0.6 : 1.12);
    EXPLODED.forEach(([id, lx, ly, depth, ry, s, o], k)=>{
        const arrive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((ctx.intro - k * 0.05) / 0.5);
        const e = arrive >= 1 ? 1 : snap(arrive);
        const away = 1 - e;
        const [ax, ay, az, arx, ary, arz] = ARRIVAL[k];
        const h = ctx.hover[id];
        const focus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(1, 0.7, ctx.hoverAny * (1 - h));
        put(out, id, G, lx + ax * away, ly + ay * away, depth * sep + h * 0.55 + az * away, arx * away, ry + ary * away, arz * away, s * (1 + 0.06 * h), o * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smoothstep"])(0, 0.35, arrive) * focus, 1, h);
    });
};
/** The client cards carry this section; the interface clears out behind them. */ const clients = (out)=>hideAll(out);
/** Copy sits on both sides here, so the product returns as a backdrop, its
 *  layers pulled further apart. */ const manifesto = (out, ctx)=>{
    hideAll(out);
    const sep = 0.95 * (1 + 0.14 * Math.sin(ctx.t * 0.5));
    G.set(1.0, -0.1, -2.6, -0.22, -0.95, 0.03, ctx.portrait ? 0.7 : 1.2);
    for (const [id, lx, ly, depth, ry, s, o] of EXPLODED){
        put(out, id, G, lx, ly, depth * sep, 0, ry, 0, s, o * 0.45);
    }
};
/**
 * One product group per service (SERVICES order: web, software, mobile,
 * design), shown in the open quarter of the frame under the intro copy — the
 * heading and the list own the rest of it. Groups cross-fade in place as the
 * active service changes, rising in as they arrive and sinking as they leave.
 */ const services = (out, ctx)=>{
    hideAll(out);
    const portrait = ctx.portrait;
    for(let c = 0; c < 4; c++){
        const w = ctx.service[c];
        if (w < 0.005) continue;
        const settle = 1 - w;
        G.set(portrait ? 0 : -3.2, (portrait ? -2.6 : -2.15) - settle * 0.45, (portrait ? -3.2 : -0.6) - settle * 1.1, 0.04, portrait ? 0 : 0.3, 0, portrait ? 0.7 : 1.12);
        // Below lg the list runs under the heading, so there is no open quarter:
        // the group drops to a backdrop behind it.
        const o = w * (portrait ? 0.3 : 1);
        const g = w * 0.6;
        const bob = Math.sin(ctx.t * 0.5 + c * 1.7) * 0.05;
        if (c === 0) {
            put(out, P.browser, G, 0, bob, 0, 0, 0, 0, 0.95, o, 1, g);
            put(out, P.image, G, 0.98, -0.56 + bob, 0.45, 0, 0, 0, 0.7, o, 1, g * 0.5);
            put(out, P.form, G, -1.22, -0.34 + bob, 0.6, 0, 0, 0, 0.72, o, 1, g * 0.5);
            put(out, P.card, G, -0.72, 0.74 + bob, 0.36, 0, 0, 0, 0.68, o, 1, g * 0.5);
        } else if (c === 1) {
            put(out, P.dashboard, G, 0, bob, 0, 0, 0, 0, 0.95, o, 1, g);
            put(out, P.terminal, G, -1.16, -0.56 + bob, 0.5, 0, 0, 0, 0.72, o, 1, g * 0.5);
            put(out, P.table, G, 1.16, -0.5 + bob, 0.44, 0, 0, 0, 0.74, o, 1, g * 0.5);
            put(out, P.code, G, 0.92, 0.72 + bob, 0.34, 0, 0, 0, 0.64, o, 1, g * 0.5);
            put(out, P.chart, G, -1.02, 0.74 + bob, 0.4, 0, 0, 0, 0.62, o, 1, g * 0.5);
        } else if (c === 2) {
            put(out, P.phone, G, -0.44, bob, 0.16, 0, 0.2, 0, 1.0, o, 1, g);
            put(out, P.phone2, G, 0.44, -bob, -0.1, 0, -0.2, 0, 1.0, o, 1, g);
            put(out, P.toast, G, 0.06, 0.92, 0.52, 0, 0, 0, 0.86, o, 1, g * 0.6);
        } else {
            put(out, P.design, G, 0, bob, 0, 0, 0, 0, 0.95, o, 1, g);
            put(out, P.palette, G, -1.06, -0.6 + bob, 0.46, 0, 0, 0, 0.74, o, 1, g * 0.5);
            put(out, P.type, G, 1.02, 0.62 + bob, 0.4, 0, 0, 0, 0.72, o, 1, g * 0.5);
            put(out, P.buttons, G, 0.96, -0.62 + bob, 0.5, 0, 0, 0, 0.72, o, 1, g * 0.5);
        }
    }
};
const TECH_INDEX = new Map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECHNOLOGIES"].map((t, i)=>[
        t.id,
        i
    ]));
const FLOORS = [
    1.3,
    0.43,
    -0.43,
    -1.3
];
/** The stack as architecture: four floors, the technologies standing on them. */ const technology = (out, ctx)=>{
    hideAll(out);
    // Pitch the frame so the floors are seen from above; chips undo the pitch so
    // they stand upright and face the viewer.
    const pitch = -1.02;
    // Centred on the gutter between the focus panel and the list.
    G.set(-0.45, -0.25, -1.4, pitch, 0.52, 0, ctx.portrait ? 0.72 : 0.9);
    const anyFocus = Math.max(...ctx.tech);
    FLOORS.forEach((fz, l)=>{
        const z = fz + Math.sin(ctx.t * 0.4 + l) * 0.03;
        put(out, P.layer0 + l, G, 0, 0, z, 0, 0, 0, 1, 0.92, 1, 0.1);
        const ids = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interfaceAtlas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECH_LAYERS"][l].techs;
        const step = 0.98;
        ids.forEach((id, j)=>{
            const ti = TECH_INDEX.get(id);
            const w = ctx.tech[ti];
            const x = (j - (ids.length - 1) / 2) * step;
            put(out, P.chip0 + ti, G, x, -0.28, z + 0.2 + w * 0.26, -pitch, 0, 0, 0.92 + w * 0.16, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(1, 0.55, anyFocus * (1 - w)), 1, w);
        });
    });
};
/** Screens lining a corridor around the portal, drifting past as you scroll. */ const WALL_L = [
    P.browser,
    P.code,
    P.phone,
    P.chart,
    P.design,
    P.form,
    P.toast
];
const WALL_R = [
    P.dashboard,
    P.image,
    P.terminal,
    P.phone2,
    P.table,
    P.card,
    P.buttons
];
const work = (out, ctx)=>{
    hideAll(out);
    const flow = ctx.work * 4.2;
    const x = ctx.portrait ? 2.6 : 4.9;
    // The project list and the meta column sit over the near ends of both
    // walls, so screens fade out as they approach and the corridor only reads
    // in depth, behind the portal's frame.
    const wall = (ids, side)=>ids.forEach((id, i)=>{
            const z = -2.2 - i * 2.05 - (side > 0 ? 1.0 : 0) + flow;
            const y = (i % 2 ? 0.8 : -0.5) * (side > 0 ? -1 : 1) + Math.sin(ctx.t * 0.4 + i) * 0.05;
            const o = 0.42 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(-2.6, -6.2, z) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(-17, -13.5, z);
            put(out, id, WORLD, -side * x, y, z, 0, side * 1.22, 0, 1.05, o, 1, 0.1);
        });
    wall(WALL_L, 1);
    wall(WALL_R, -1);
};
/* Process: six sub-layouts, one per step, blended by the damped step value. */ const PROCESS_FRAMES = Array.from({
    length: 6
}, makeBuf);
const NOTES = [
    P.card,
    P.chart,
    P.table,
    P.form,
    P.toast,
    P.palette,
    P.type,
    P.buttons,
    P.image
];
const noteRng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeRng"])(77);
const NOTE_SCATTER = NOTES.map(_c4 = ()=>[
        (noteRng() - 0.5) * 7.2,
        -0.2 + noteRng() * 2.7,
        (noteRng() - 0.5) * 2.4,
        (noteRng() - 0.5) * 0.5,
        (noteRng() - 0.5) * 0.6,
        (noteRng() - 0.5) * 0.4
    ]);
_c5 = NOTE_SCATTER;
function processStep(out, step, ctx) {
    hideAll(out);
    // The heading owns the top left and the step copy the bottom, so the build
    // happens in the open upper right of the frame.
    G.set(ctx.portrait ? 0 : 1.75, ctx.portrait ? 1.3 : 1.65, 0, 0, 0, 0, ctx.portrait ? 0.55 : 1.0);
    const cy = 0;
    if (step === 0) {
        NOTES.forEach((id, i)=>{
            const [x, y, z, rx, ry, rz] = NOTE_SCATTER[i];
            put(out, id, G, x, y - 1.05, z, rx, ry, rz, 0.9, 0.85, 0, 0);
        });
        return;
    }
    if (step === 1) {
        NOTES.forEach((id, i)=>{
            const col = i % 3;
            const row = Math.floor(i / 3);
            put(out, id, G, (col - 1) * 2.25, 1.1 - row * 1.1, 0, 0, 0, 0, 0.84, 0.9, 0.14, 0);
        });
        return;
    }
    if (step === 2) {
        put(out, P.browser, G, 0, cy, -0.6, 0, 0, 0, 1.25, 0.9, 0.35, 0);
        put(out, P.design, G, -3.15, 0.15, 0.2, 0, 0.22, 0, 1.0, 1, 1, 0.35);
        put(out, P.palette, G, -3.2, -1.1, 0.5, 0, 0.22, 0, 0.8, 1, 1, 0);
        put(out, P.type, G, -2.2, 1.3, 0.6, 0, 0.18, 0, 0.75, 1, 1, 0);
        put(out, P.image, G, 0.55, 0.25, 0.25, 0, 0, 0, 0.9, 1, 0.6, 0);
        put(out, P.card, G, -0.9, -0.45, 0.35, 0, 0, 0, 0.8, 1, 0.6, 0);
        put(out, P.buttons, G, -0.7, 0.7, 0.3, 0, 0, 0, 0.75, 1, 0.6, 0);
        put(out, P.chart, G, 1.35, -0.5, 0.4, 0, 0, 0, 0.75, 1, 0.6, 0);
        return;
    }
    if (step === 3) {
        put(out, P.browser, G, -0.4, cy, -0.5, 0, 0, 0, 1.3, 1, 1, 0.15);
        put(out, P.image, G, 0.15, 0.2, -0.3, 0, 0, 0, 0.85, 1, 1, 0);
        put(out, P.card, G, -1.2, -0.5, -0.25, 0, 0, 0, 0.75, 1, 1, 0);
        put(out, P.chart, G, 0.9, -0.5, -0.25, 0, 0, 0, 0.72, 1, 1, 0);
        put(out, P.buttons, G, -1.15, 0.65, -0.3, 0, 0, 0, 0.7, 1, 1, 0);
        put(out, P.code, G, 2.9, 0.45, 0.3, 0, -0.25, 0, 0.95, 1, 1, 0.3);
        put(out, P.terminal, G, 3.0, -0.95, 0.5, 0, -0.25, 0, 0.8, 1, 1, 0.2);
        put(out, P.design, G, -3.3, 0.35, -0.8, 0, 0.3, 0, 0.8, 0.6, 1, 0);
        return;
    }
    if (step === 4) {
        put(out, P.browser, G, 0, cy, -0.4, 0, 0, 0, 1.3, 1, 1, 0.25);
        put(out, P.phone, G, 2.55, -0.15, 0.4, 0, -0.2, 0, 1.0, 1, 1, 0.2);
        put(out, P.phone2, G, -2.55, -0.15, 0.4, 0, 0.2, 0, 1.0, 1, 1, 0.2);
        put(out, P.table, G, 1.5, 1.35, 0.8, 0, -0.1, 0, 0.8, 1, 1, 0.4);
        put(out, P.terminal, G, 3.9, -1.2, -1.0, 0, -0.35, 0, 0.7, 0.5, 1, 0);
        return;
    }
    put(out, P.dashboard, G, 0.2, 0.3, -2.2, 0, 0, 0, 1.25, 0.7, 1, 0.2);
    put(out, P.browser, G, 0, cy, -0.4, 0, 0, 0, 1.35, 1, 1, 0.6);
    put(out, P.phone, G, 2.55, -0.15, 0.4, 0, -0.2, 0, 1.0, 1, 1, 0.4);
    put(out, P.phone2, G, -2.55, -0.15, 0.4, 0, 0.2, 0, 1.0, 1, 1, 0.4);
    put(out, P.chart, G, 2.2, -1.1, 1.0, 0, -0.1, 0, 0.8, 1, 1, 0.5);
    put(out, P.toast, G, -1.9, 1.35, 1.0, 0, 0.1, 0, 0.9, 1, 1, 0.8);
}
const processLayout = (out, ctx)=>{
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(ctx.step, 0, 5);
    const i = Math.min(4, Math.floor(s));
    processStep(PROCESS_FRAMES[i], i, ctx);
    processStep(PROCESS_FRAMES[i + 1], i + 1, ctx);
    blend(out, PROCESS_FRAMES[i], PROCESS_FRAMES[i + 1], s - i, 0.35);
};
/** The finished product, turning slowly beside the studio copy. */ const PILLAR_PANELS = [
    P.chart,
    P.design,
    P.code,
    P.card
];
const about = (out, ctx)=>{
    hideAll(out);
    G.set(1.1, 0.25, -2.4, 0.06, -0.5 + Math.sin(ctx.t * 0.12) * 0.1, 0.02, ctx.portrait ? 0.62 : 1.1);
    // The statement and the pillar row cover the whole frame here, so the
    // product stays a quiet backdrop; a focused pillar still brings its screen
    // forward.
    const o = 0.3;
    const pw = (id)=>{
        const k = PILLAR_PANELS.indexOf(id);
        return k < 0 ? 0 : ctx.pillar[k];
    };
    const place = (id, x, y, z, s, oo = o)=>{
        const w = pw(id);
        put(out, id, G, x, y, z + w * 0.7, 0, 0, 0, s * (1 + 0.1 * w), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(oo, 0.75, w), 1, w);
    };
    place(P.dashboard, 0.9, 0.55, -1.0, 1.0, o * 0.65);
    place(P.design, -1.15, 0.95, -0.5, 0.75);
    place(P.browser, 0, 0, 0, 1.15);
    place(P.chart, 1.5, 1.05, 0.5, 0.7);
    place(P.code, 1.75, -0.6, 0.45, 0.8);
    place(P.phone, -1.6, -0.3, 0.7, 1.0);
    place(P.card, -0.2, -1.05, 0.8, 0.75);
    place(P.toast, 0.5, 1.4, 0.9, 0.8);
};
/** A faint wall of cards far behind the insights grid. */ const WALL = [
    P.card,
    P.chart,
    P.image,
    P.table,
    P.form,
    P.palette,
    P.type,
    P.buttons,
    P.toast,
    P.terminal,
    P.code,
    P.design
];
const insights = (out, ctx)=>{
    hideAll(out);
    G.set(1.4, 0.4, -7.5, -0.06, -0.38, 0, 1);
    WALL.forEach((id, i)=>{
        const col = i % 4;
        const row = Math.floor(i / 4);
        const spec = ROSTER[id];
        const fit = Math.min(1.7 / spec.w, 1.25 / spec.h);
        const y = (1 - row) * 1.55 + Math.sin(ctx.t * 0.3 + i) * 0.04;
        put(out, id, G, (col - 1.5) * 2.05, y, 0, 0, 0, 0, fit, 0.42);
    });
};
/** Everything folds into a tunnel converging on one waiting input. */ const TUNNEL = [
    P.browser,
    P.dashboard,
    P.code,
    P.terminal,
    P.design,
    P.image,
    P.card,
    P.chart,
    P.table,
    P.form,
    P.phone,
    P.phone2,
    P.toast,
    P.palette,
    P.type,
    P.buttons,
    P.chip0,
    P.chip0 + 3,
    P.chip0 + 5,
    P.chip0 + 7
];
const cta = (out, ctx)=>{
    hideAll(out);
    // Wide enough that the walls frame the copy rather than crowding it.
    const X = ctx.portrait ? 2.1 : 4.4;
    const Y = ctx.portrait ? 3.0 : 2.75;
    const span = 13;
    TUNNEL.forEach((id, i)=>{
        const wall = i % 4;
        const phase = (i / TUNNEL.length + ctx.t * 0.035) % 1;
        const z = -1.2 - phase * span;
        const o = 0.7 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(0, 0.12, phase) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(1, 0.8, phase);
        const along = i * 0.37 % 1 - 0.5;
        const s = 0.95;
        if (wall === 0) put(out, id, WORLD, -X, along * Y * 1.2, z, 0, Math.PI / 2, 0, s, o, 1, 0.25);
        else if (wall === 1) put(out, id, WORLD, X, along * Y * 1.2, z, 0, -Math.PI / 2, 0, s, o, 1, 0.25);
        else if (wall === 2) put(out, id, WORLD, along * X * 1.4, Y, z, Math.PI / 2, 0, 0, s, o, 1, 0.25);
        else put(out, id, WORLD, along * X * 1.4, -Y, z, -Math.PI / 2, 0, 0, s, o, 1, 0.25);
    });
    put(out, P.input, WORLD, 0, -0.35, -9.5, 0, 0, 0, 1.35, 0.95, 1, 0.7 + ctx.ctaHover * 0.3);
};
const LAYOUTS = {
    clients,
    hero,
    manifesto,
    services,
    technology,
    work,
    process: processLayout,
    about,
    insights,
    cta
};
const LAYOUT_HOLD = {
    clients: 0.5
};
const DEFAULT_HOLD = 0.4;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "HERO_MEMBERS$EXPLODED.map");
__turbopack_context__.k.register(_c1, "HERO_MEMBERS");
__turbopack_context__.k.register(_c2, "ARRIVAL$EXPLODED.map");
__turbopack_context__.k.register(_c3, "ARRIVAL");
__turbopack_context__.k.register(_c4, "NOTE_SCATTER$NOTES.map");
__turbopack_context__.k.register(_c5, "NOTE_SCATTER");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shaders/atmosphere.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "atmosphereFragment",
    ()=>atmosphereFragment,
    "atmosphereVertex",
    ()=>atmosphereVertex,
    "glowFragment",
    ()=>glowFragment,
    "glowVertex",
    ()=>glowVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/chunks/noise.ts [app-client] (ecmascript)");
;
const atmosphereVertex = /* glsl */ `
varying vec3 vDir;

void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const atmosphereFragment = /* glsl */ `
precision highp float;

uniform vec3 uVoid;
uniform vec3 uHorizon;
uniform vec3 uZenith;
uniform vec3 uGlow;
uniform float uTime;
uniform float uGlowStrength;
uniform float uStage;
uniform float uLight;

varying vec3 vDir;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simplex3d"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fbm3d"]}

void main() {
  vec3 d = normalize(vDir);
  float h = d.y * 0.5 + 0.5;

  vec3 col = mix(uVoid, uHorizon, smoothstep(0.0, 0.62, h));
  col = mix(col, uZenith, smoothstep(0.5, 1.0, h));

  // Drifting volumetric haze. Two octaves only: this shader runs over every
  // pixel on screen, and at four octaves it was the single most expensive
  // thing in the frame for a detail nobody can consciously see.
  float n = fbm(d * 1.9 + vec3(uTime * 0.006, uTime * 0.004, 0.0), 2, 2.1, 0.55);
  float haze = smoothstep(0.05, 0.85, n);
  col += uGlow * haze * uGlowStrength * (0.45 + 0.55 * (1.0 - abs(d.y)));

  // A single soft light source that swings across the journey. It only makes
  // sense against black — on paper the same term is just a smudge on the print.
  vec3 sunDir = normalize(vec3(sin(uStage * 0.55) * 0.8, 0.35, cos(uStage * 0.55) * 0.8));
  float sun = pow(clamp(dot(d, sunDir), 0.0, 1.0), 12.0);
  col += uGlow * sun * 0.22 * uGlowStrength * (1.0 - uLight);

  gl_FragColor = vec4(col, 1.0);
}
`;
const glowVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const glowFragment = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform float uIntensity;
uniform float uTime;
uniform float uFalloff;

varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  float r = length(uv) * 2.0;
  float a = pow(clamp(1.0 - r, 0.0, 1.0), uFalloff);
  a *= 0.9 + sin(uTime * 0.6) * 0.1;
  if (a < 0.002) discard;
  gl_FragColor = vec4(uColor * a * uIntensity, a);
}
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shaders/chunks/noise.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared GLSL chunks. Kept as tagged strings rather than `.glsl` files so the
 * bundler needs no extra loader and the shaders travel with the TypeScript
 * that configures them.
 *
 * `snoise` is Ashima Arts' simplex noise (MIT / public domain).
 */ __turbopack_context__.s([
    "fbm3d",
    ()=>fbm3d,
    "helpers",
    ()=>helpers,
    "simplex3d",
    ()=>simplex3d
]);
const simplex3d = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;
const fbm3d = /* glsl */ `
float fbm(vec3 p, int octaves, float lacunarity, float gain) {
  float amp = 0.5;
  float sum = 0.0;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    sum += amp * snoise(p);
    p *= lacunarity;
    amp *= gain;
  }
  return sum;
}
`;
const helpers = /* glsl */ `
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

mat2 rot2(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

/** Any vector orthogonal to v — used to build a tangent basis for normals. */
vec3 orthogonal(vec3 v) {
  return normalize(
    abs(v.x) > abs(v.z)
      ? vec3(-v.y, v.x, 0.0)
      : vec3(0.0, -v.z, v.y)
  );
}

float easeOutExpo(float x) {
  return x >= 1.0 ? 1.0 : 1.0 - pow(2.0, -10.0 * x);
}

float easeInOutCubic(float x) {
  return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
}
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shaders/panels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Interface panels.
 *
 * One instanced quad per screen. The quad is a little larger than the panel so
 * the same fragment can draw the card, its soft shadow (light acts) or halo
 * (dark acts), and a lit edge — the panel shape itself is a rounded-rect SDF,
 * so corners stay crisp at any size.
 *
 * The atlas stores meaning, not colour (R ink, G accent, B fill; all three is a
 * caret), and is inked here per environment. `fill` runs 0 → 1 from a bare
 * wireframe to a finished, coloured screen, which is how the process section
 * shows a product being designed and built.
 */ __turbopack_context__.s([
    "panelFragment",
    ()=>panelFragment,
    "panelVertex",
    ()=>panelVertex
]);
const panelVertex = /* glsl */ `
attribute vec4 aRect;
attribute vec2 aSize;
attribute vec4 aState;

uniform float uMargin;

varying vec2 vLocal;
varying vec2 vUv;
varying vec2 vSize;
varying vec4 vState;
varying vec3 vViewPos;
varying vec3 vViewNormal;

void main() {
  vec2 ext = aSize * 0.5 + uMargin;
  vec2 local = position.xy * 2.0 * ext;

  vLocal = local;
  vSize = aSize;
  vState = aState;
  vUv = aRect.xy + (local / aSize + 0.5) * aRect.zw;

  mat4 mv = modelViewMatrix * instanceMatrix;
  vec4 p = mv * vec4(local, 0.0, 1.0);
  vViewPos = p.xyz;
  vViewNormal = normalize(mat3(mv) * vec3(0.0, 0.0, 1.0));
  gl_Position = projectionMatrix * p;
}
`;
const panelFragment = /* glsl */ `
precision highp float;

uniform sampler2D uAtlas;
uniform float uLight;
uniform float uTime;
uniform float uMargin;
uniform float uSweep;
uniform float uSweepGain;
uniform vec2 uViewport;

uniform vec3 uSurfaceL;
uniform vec3 uSurfaceD;
uniform vec3 uFillL;
uniform vec3 uFillD;
uniform vec3 uInkL;
uniform vec3 uInkD;
uniform vec3 uAccentL;
uniform vec3 uAccentD;
uniform vec3 uShadowL;
uniform vec3 uHaloD;
uniform vec3 uEdgeL;
uniform vec3 uEdgeD;

varying vec2 vLocal;
varying vec2 vUv;
varying vec2 vSize;
varying vec4 vState;
varying vec3 vViewPos;
varying vec3 vViewNormal;

float sdRound(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

// Premultiplied "over".
void over(inout vec4 acc, vec3 c, float a) {
  acc.rgb = c * a + acc.rgb * (1.0 - a);
  acc.a = a + acc.a * (1.0 - a);
}

void main() {
  float opacity = vState.x;
  float fill = vState.y;
  float glow = vState.z;
  float radius = vState.w;
  float L = uLight;

  vec2 halfSize = vSize * 0.5;
  float d = sdRound(vLocal, halfSize, radius);
  float aa = max(fwidth(d), 1e-4);
  float body = 1.0 - smoothstep(-aa, aa, d);

  vec3 surface = mix(uSurfaceD, uSurfaceL, L);
  vec3 fillC = mix(uFillD, uFillL, L);
  vec3 ink = mix(uInkD, uInkL, L);
  vec3 accent = mix(uAccentD, uAccentL, L);
  vec3 edgeC = mix(uEdgeD, uEdgeL, L);

  vec4 acc = vec4(0.0);

  // Shadow on paper, halo in the dark — both outside the card only.
  float outside = 1.0 - body;
  float ds = sdRound(vLocal - vec2(0.0, -0.045), halfSize, radius);
  float shadow = exp(-max(ds, 0.0) * 11.0) * smoothstep(uMargin, 0.0, ds) * outside;
  float halo = exp(-max(d, 0.0) * 7.0) * smoothstep(uMargin, 0.0, d) * outside;
  over(acc, uShadowL, shadow * L * mix(0.1, 0.22, fill));
  over(acc, uHaloD, halo * (1.0 - L) * (0.05 + glow * 0.3) * fill);

  if (body > 0.0) {
    vec3 viewDir = normalize(-vViewPos);
    vec3 n = normalize(vViewNormal);
    float facing = abs(dot(n, viewDir));

    vec3 tex = gl_FrontFacing ? texture2D(uAtlas, vUv).rgb : vec3(0.0);
    float caret = min(tex.r, min(tex.g, tex.b));
    float blink = step(0.5, fract(uTime * 1.05));
    tex -= caret;

    // Glass: a soft top-lit gradient plus a specular sweep that moves as the
    // panel turns, so a static screen still catches the light.
    float grad = smoothstep(-halfSize.y, halfSize.y, vLocal.y);
    vec3 surf = surface * mix(0.965, 1.02, grad);
    vec3 r = reflect(-viewDir, gl_FrontFacing ? n : -n);
    float spec = pow(max(dot(r, normalize(vec3(-0.35, 0.8, 0.45))), 0.0), 18.0);
    surf += mix(vec3(0.35, 0.48, 0.9) * 0.22, vec3(1.0) * 1.2, L) * spec;

    // A light sweep across the glass, in screen space so it crosses the whole
    // composition as one band: pale blue on paper, a glint in the dark.
    vec2 sc = gl_FragCoord.xy / uViewport;
    float sweep = exp(-pow((sc.x * 0.85 + sc.y * 0.4 - uSweep) * 7.0, 2.0)) * uSweepGain;
    surf = mix(surf, mix(surf + accent * 0.5, vec3(0.8, 0.86, 1.0), L), sweep * 0.5);

    float surfA = mix(mix(0.0, 0.8, fill), mix(0.0, 0.97, fill), L);
    if (!gl_FrontFacing) surf *= mix(0.55, 0.92, L);
    over(acc, surf, body * surfA);

    // Content. A wireframe (fill 0) keeps only the drawn lines; colour and
    // secondary surfaces arrive with fill.
    // On paper the grade is linear, and dark-over-light coverage blended in
    // linear light reads far thinner than the same text in CSS (which blends
    // in sRGB). Lifting coverage by the display gamma restores the weight.
    float g = mix(1.0, 2.2, L);
    float a = tex.g;
    float inkA = 1.0 - pow(1.0 - clamp(tex.r, 0.0, 1.0), g);
    over(acc, fillC, body * tex.b * (1.0 - a) * fill);
    over(acc, accent, body * a * fill);
    over(acc, ink, body * a * (1.0 - fill) * 0.35);
    over(acc, ink, body * inkA * mix(0.7, 1.0, fill));
    over(acc, accent, body * caret * blink);

    // Edge: a hairline on paper, a lit rim in the dark. Stronger in wireframe,
    // where it is most of the drawing, and brighter at grazing angles.
    float rim = 1.0 - smoothstep(0.0, aa * 1.6, abs(d + aa * 0.8));
    float dash = mix(step(0.45, fract((vLocal.x + vLocal.y) * 9.0)), 1.0, fill);
    float edgeA = mix(0.55, mix(0.16, 0.42, 1.0 - L), fill) + (1.0 - facing) * 0.35;
    over(acc, mix(edgeC, accent, glow), rim * dash * clamp(edgeA + glow * 0.5, 0.0, 1.0));
    over(acc, accent, rim * sweep * 0.9);

    // Focus: a thin accent frame just inside the edge.
    float inner = 1.0 - smoothstep(0.0, aa * 1.4, abs(d + 0.018));
    over(acc, accent, inner * glow * 0.85 * fill);
  }

  acc *= opacity;
  if (acc.a < 0.002) discard;
  gl_FragColor = acc;
}
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shaders/portal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "portalFragment",
    ()=>portalFragment,
    "portalVertex",
    ()=>portalVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/chunks/noise.ts [app-client] (ecmascript)");
;
const portalVertex = /* glsl */ `
uniform float uTime;
uniform float uTransition;
uniform float uHover;

varying vec2 vUv;
varying vec3 vViewDir;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simplex3d"]}

void main() {
  vUv = uv;

  vec3 p = position;

  // The plane flexes while a project changes, and leans toward the pointer.
  float w = snoise(vec3(uv * 2.4, uTime * 0.25));
  p.z += w * uTransition * 0.42;
  p.z += sin(uv.x * 3.1415) * sin(uv.y * 3.1415) * (0.06 + uHover * 0.1);

  vec4 world = modelMatrix * vec4(p, 1.0);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
const portalFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uVariant;
uniform float uPrevVariant;
uniform float uTransition;
uniform float uHover;
uniform float uOpacity;
uniform float uAspect;
uniform vec2  uPointer;

uniform vec3 uInk;
uniform vec3 uIon;
uniform vec3 uIonSoft;
uniform vec3 uEmber;

varying vec2 vUv;
varying vec3 vViewDir;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simplex3d"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fbm3d"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["helpers"]}

/* ---------- 0 · Ledger topography — financial infrastructure ---------- */
vec3 vizLedger(vec2 uv, float t) {
  vec2 p = uv * vec2(uAspect, 1.0);
  float n = fbm(vec3(p * 2.1, t * 0.035), 3, 2.05, 0.52);

  float contour = abs(fract(n * 8.0) - 0.5);
  float line = smoothstep(0.055, 0.0, contour);
  float major = smoothstep(0.02, 0.0, abs(fract(n * 2.0) - 0.5));

  vec3 col = uInk * 0.55;
  col += uIon * line * 0.55;
  col += uIonSoft * major * 0.9;

  // Settlement ticks running along one contour.
  float run = exp(-pow((fract(n * 2.0) - 0.5) * 26.0, 2.0));
  float tick = step(0.72, fract(p.x * 42.0 - t * 0.5));
  col += uEmber * run * tick * 0.55;

  return col;
}

/* ---------- 1 · Vitals radial — healthcare ---------- */
vec3 vizVitals(vec2 uv, float t) {
  vec2 c = (uv - 0.5) * vec2(uAspect, 1.0);
  float r = length(c) * 2.0;
  float a = atan(c.y, c.x);

  vec3 col = uInk * 0.5;

  float rings = smoothstep(0.014, 0.0, abs(fract(r * 4.5 - t * 0.08) - 0.5) - 0.485);
  col += uIon * rings * 0.7;

  // Rotating acquisition sweep with a decaying tail.
  float sweep = fract((a / 6.2831853) + t * 0.06);
  float tail = pow(1.0 - sweep, 5.0);
  col += uIonSoft * tail * smoothstep(1.35, 0.1, r) * 0.85;

  // Trace: a single vital line crossing the frame.
  float wave =
    sin(uv.x * 26.0 + t * 1.1) * 0.035 +
    exp(-pow((fract(uv.x * 1.6 - t * 0.11) - 0.5) * 12.0, 2.0)) * 0.16;
  float trace = smoothstep(0.007, 0.0, abs(uv.y - 0.5 - wave));
  col += uEmber * trace * 1.15;

  float dot_ = exp(-pow((r - 0.06) * 22.0, 2.0));
  col += uIonSoft * dot_ * 0.8;

  return col;
}

/* ---------- 2 · Advected flow — logistics ---------- */
vec3 vizFlow(vec2 uv, float t) {
  vec2 p = uv * vec2(uAspect, 1.0);
  vec3 col = uInk * 0.5;

  // Trace a handful of streamlines through a noise field.
  vec2 q = p;
  float acc = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float n = snoise(vec3(q * 1.7 + fi * 3.1, t * 0.07));
    q += vec2(cos(n * 3.1415), sin(n * 3.1415)) * 0.06;
    float lane = abs(fract(q.y * 7.0 + n * 0.6 - t * 0.12) - 0.5);
    acc += smoothstep(0.07, 0.0, lane) * (0.38 - fi * 0.06);
  }

  col += mix(uIon, uIonSoft, acc) * acc * 0.95;

  // Node beacons along the busiest lane.
  float beacon = exp(-pow((fract(p.x * 1.2 - t * 0.09) - 0.5) * 16.0, 2.0));
  col += uEmber * beacon * acc * 0.7;

  return col;
}

/* ---------- 3 · Silk drape — luxury retail ---------- */
vec3 vizSilk(vec2 uv, float t) {
  vec2 p = uv * vec2(uAspect, 1.0);

  // Directional drape: warp a vertical band field rather than using isotropic
  // noise, which reads as blotches instead of fabric.
  float w = fbm(vec3(p.x * 1.5, p.y * 0.5, t * 0.045), 3, 2.1, 0.52);
  float fold = 0.5 + 0.5 * sin((p.x * 5.6 + w * 2.4) * 3.14159265);

  vec3 col = mix(uInk * 0.9, uIon * 0.38, fold);

  // Specular running along the crest of each fold.
  col += uIonSoft * pow(fold, 12.0) * 0.85;
  col += uEmber * pow(fold, 44.0) * 0.45;

  // Fine weave under the sheen.
  col += uIonSoft * smoothstep(0.88, 1.0, sin(p.x * 250.0) * 0.5 + 0.5) * 0.03;

  // The drape falls into shadow toward the bottom of the frame.
  col *= 0.42 + 0.72 * smoothstep(0.0, 0.62, uv.y);
  return col;
}

/* ---------- 4 · Data field — analytics ---------- */
vec3 vizBars(vec2 uv, float t) {
  vec3 col = uInk * 0.5;

  float cols = 54.0;
  float ix = floor(uv.x * cols);
  float fx = fract(uv.x * cols);

  float h = 0.18 + (snoise(vec3(ix * 0.16, t * 0.22, 0.0)) * 0.5 + 0.5) * 0.62;
  float bar = step(uv.y, h) * smoothstep(0.0, 0.12, fx) * smoothstep(1.0, 0.88, fx);

  float grad = smoothstep(0.0, h, uv.y);
  col += mix(uIon * 0.5, uIonSoft, grad) * bar * 0.85;

  // Cap highlight.
  col += uIonSoft * smoothstep(h - 0.008, h, uv.y) * step(uv.y, h) * bar * 2.2;

  // Query sweep passing across the field.
  float sweep = exp(-pow((uv.x - fract(t * 0.07)) * 9.0, 2.0));
  col += uEmber * sweep * bar * 0.9;

  // Baseline grid.
  float grid = smoothstep(0.985, 1.0, sin(uv.y * 62.8) * 0.5 + 0.5) * 0.05;
  col += uIon * grid;

  return col;
}

vec3 vizFor(int id, vec2 uv, float t) {
  if (id == 0) return vizLedger(uv, t);
  if (id == 1) return vizVitals(uv, t);
  if (id == 2) return vizFlow(uv, t);
  if (id == 3) return vizSilk(uv, t);
  return vizBars(uv, t);
}

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, vec2(0.0))) - r;
}

void main() {
  float t = uTime;
  float tr = uTransition;

  vec2 uv = vUv;

  // Displacement while switching, plus a gentle lens toward the pointer.
  float warp = snoise(vec3(uv * 3.4, t * 0.4));
  uv += vec2(warp, -warp * 0.6) * tr * 0.075;

  vec2 c = uv - 0.5;
  uv += c * dot(c, c) * (0.1 + uHover * 0.22);
  uv += uPointer * 0.014 * uHover;

  vec3 col = vizFor(int(uVariant + 0.5), uv, t);

  if (tr > 0.002) {
    vec3 prev = vizFor(int(uPrevVariant + 0.5), uv + vec2(tr * 0.05, 0.0), t);
    col = mix(col, prev, tr);
    col += uIonSoft * tr * 0.12;
  }

  // Bring the plate into the scene's register. A gamma push rather than a flat
  // scale: it crushes the midtones toward black so the plate reads as a lit
  // screen instead of a translucent card, while highlights survive for bloom.
  col = pow(max(col, vec3(0.0)), vec3(1.95)) * 1.45;

  // Depth: darken the edges, lift the centre.
  vec2 vc = (vUv - 0.5) * vec2(1.25, 1.0);
  float vign = smoothstep(0.9, 0.1, length(vc));
  col *= mix(0.1, 1.0, vign);

  // Screen-door shimmer, very faint.
  col += uIon * 0.018 * step(0.5, fract(vUv.y * 420.0));

  // Grain keeps the gradients from banding.
  float g = hash22(vUv * vec2(1600.0, 900.0) + fract(t) * 91.0).x;
  col += (g - 0.5) * 0.03;

  // Rounded frame with a lit edge.
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  float d = roundedBox(p, vec2(uAspect * 0.5, 0.5) - 0.004, 0.045);
  float inside = smoothstep(0.004, 0.0, d);
  float edge = smoothstep(0.012, 0.0, abs(d + 0.006));
  col += mix(uIon, uIonSoft, uHover) * edge * (0.5 + uHover * 0.9);

  float alpha = inside * uOpacity;
  if (alpha < 0.004) discard;

  gl_FragColor = vec4(col, alpha);
}
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1fpkrnu._.js.map