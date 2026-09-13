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
            const heat = Math.max(1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage - 0) / 1.4), 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage - 7) / 1.2)) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro;
            domeMaterial.uniforms.uGlowStrength.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(domeMaterial.uniforms.uGlowStrength.value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.42 + heat * 0.75, 0.16, theme), 2, d);
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
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Atmosphere.tsx",
                lineNumber: 128,
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
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Atmosphere.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Atmosphere.tsx",
        lineNumber: 127,
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
"[project]/src/components/canvas/Constellation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Constellation",
    ()=>Constellation,
    "NODE_POSITIONS",
    ()=>NODE_POSITIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/links.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/technologies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
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
const SCALE = 1.16;
const SEGMENTS = 18;
const NODE_POSITIONS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECHNOLOGIES"].map(_c = (t)=>[
        t.position[0] * SCALE,
        t.position[1] * SCALE,
        t.position[2] * SCALE
    ]);
_c1 = NODE_POSITIONS;
function Constellation() {
    _s();
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const linkGeometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Constellation.useMemo[linkGeometry]": ()=>{
            const perLink = SEGMENTS * 2;
            const total = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECH_LINKS"].length * perLink;
            const positions = new Float32Array(total * 3);
            const ts = new Float32Array(total);
            const ids = new Float32Array(total);
            const ends = new Float32Array(total * 2);
            const a = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const b = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const mid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            let v = 0;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECH_LINKS"].forEach({
                "Constellation.useMemo[linkGeometry]": (link, li)=>{
                    a.fromArray(NODE_POSITIONS[link[0]]);
                    b.fromArray(NODE_POSITIONS[link[1]]);
                    // Bow each wire outward from the centre so the structure reads as a
                    // volume rather than a flat web of straight lines.
                    mid.addVectors(a, b).multiplyScalar(0.5);
                    const bow = mid.clone().normalize().multiplyScalar(0.34 + li % 3 * 0.07);
                    mid.add(bow);
                    const sample = {
                        "Constellation.useMemo[linkGeometry].sample": (t, out)=>{
                            const it = 1 - t;
                            out.set(0, 0, 0);
                            out.addScaledVector(a, it * it);
                            out.addScaledVector(mid, 2 * it * t);
                            out.addScaledVector(b, t * t);
                            return out;
                        }
                    }["Constellation.useMemo[linkGeometry].sample"];
                    for(let s = 0; s < SEGMENTS; s++){
                        const t0 = s / SEGMENTS;
                        const t1 = (s + 1) / SEGMENTS;
                        sample(t0, p);
                        positions.set([
                            p.x,
                            p.y,
                            p.z
                        ], v * 3);
                        ts[v] = t0;
                        ids[v] = li;
                        ends[v * 2] = link[0];
                        ends[v * 2 + 1] = link[1];
                        v++;
                        sample(t1, p);
                        positions.set([
                            p.x,
                            p.y,
                            p.z
                        ], v * 3);
                        ts[v] = t1;
                        ids[v] = li;
                        ends[v * 2] = link[0];
                        ends[v * 2 + 1] = link[1];
                        v++;
                    }
                }
            }["Constellation.useMemo[linkGeometry]"]);
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            g.setAttribute("aT", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](ts, 1));
            g.setAttribute("aLink", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](ids, 1));
            g.setAttribute("aEnds", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](ends, 2));
            return g;
        }
    }["Constellation.useMemo[linkGeometry]"], []);
    const linkMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Constellation.useMemo[linkMaterial]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkFragment"],
                transparent: true,
                depthWrite: false,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uOpacity: {
                        value: 0
                    },
                    uReveal: {
                        value: 0
                    },
                    uActiveTech: {
                        value: -1
                    },
                    uColor: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                    },
                    uPulseColor: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionSoft.clone()
                    }
                }
            })
    }["Constellation.useMemo[linkMaterial]"], []);
    const nodeMaterials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Constellation.useMemo[nodeMaterials]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECHNOLOGIES"].map({
                "Constellation.useMemo[nodeMaterials]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                        vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeVertex"],
                        fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeFragment"],
                        transparent: true,
                        depthWrite: false,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                        uniforms: {
                            uTime: {
                                value: 0
                            },
                            uFocus: {
                                value: 0
                            },
                            uOpacity: {
                                value: 0
                            },
                            uColor: {
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                            },
                            uFocusColor: {
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionSoft.clone()
                            }
                        }
                    })
            }["Constellation.useMemo[nodeMaterials]"])
    }["Constellation.useMemo[nodeMaterials]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Constellation.useEffect": ()=>({
                "Constellation.useEffect": ()=>{
                    linkGeometry.dispose();
                    linkMaterial.dispose();
                    nodeMaterials.forEach({
                        "Constellation.useEffect": (m)=>m.dispose()
                    }["Constellation.useEffect"]);
                }
            })["Constellation.useEffect"]
    }["Constellation.useEffect"], [
        linkGeometry,
        linkMaterial,
        nodeMaterials
    ]);
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Constellation.useFrame": (state, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const t = state.clock.elapsedTime;
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            // Present through the technology beat only.
            // Cleared well before the work portal arrives — stray nodes lingering at
            // the edge of frame read as debris, not atmosphere.
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(2.35, 3.0, stage) * (1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(3.45, 3.85, stage));
            opacity.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(opacity.current, target, 4.5, d);
            const o = opacity.current;
            const g = group.current;
            if (g) {
                g.visible = o > 0.006;
                if (!g.visible) return;
                g.rotation.y = Math.sin(t * 0.06) * 0.14 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x * 0.2;
                g.rotation.x = Math.cos(t * 0.05) * 0.08 - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y * 0.12;
            }
            const active = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"].getState().activeTech;
            linkMaterial.uniforms.uTime.value = t;
            linkMaterial.uniforms.uOpacity.value = o;
            linkMaterial.uniforms.uActiveTech.value = active;
            linkMaterial.uniforms.uReveal.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(linkMaterial.uniforms.uReveal.value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((stage - 2.45) / 0.5), 3, d);
            for(let i = 0; i < nodeMaterials.length; i++){
                const u = nodeMaterials[i].uniforms;
                u.uTime.value = t;
                u.uOpacity.value = o;
                u.uFocus.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uFocus.value, active === i ? 1 : 0, 8, d);
            }
        }
    }["Constellation.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: group,
        renderOrder: 3,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("lineSegments", {
                geometry: linkGeometry,
                material: linkMaterial,
                renderOrder: 3
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Constellation.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            NODE_POSITIONS.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: p,
                    material: nodeMaterials[i],
                    renderOrder: 4,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("octahedronGeometry", {
                        args: [
                            0.155,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/Constellation.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECHNOLOGIES"][i].id, false, {
                    fileName: "[project]/src/components/canvas/Constellation.tsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Constellation.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_s(Constellation, "jHRxIgnMUE/xHZJqs2DZaytlg5o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = Constellation;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "NODE_POSITIONS$TECHNOLOGIES.map");
__turbopack_context__.k.register(_c1, "NODE_POSITIONS");
__turbopack_context__.k.register(_c2, "Constellation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/Dust.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dust",
    ()=>Dust
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$dust$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/dust.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAppStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/palette.ts [app-client] (ecmascript)");
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
const BOX = {
    w: 26,
    h: 16,
    d: 34
};
function Dust() {
    _s();
    const count = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "Dust.useAppStore[count]": (s)=>s.quality.dust
    }["Dust.useAppStore[count]"]);
    const dpr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "Dust.useThree[dpr]": (s)=>s.viewport.dpr
    }["Dust.useThree[dpr]"]);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dust.useMemo[geometry]": ()=>{
            const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeRng"])(0xd0571);
            const pos = new Float32Array(count * 3);
            const seed = new Float32Array(count * 3);
            for(let i = 0; i < count; i++){
                pos[i * 3] = (rng() - 0.5) * BOX.w;
                pos[i * 3 + 1] = (rng() - 0.5) * BOX.h;
                pos[i * 3 + 2] = rng() * BOX.d;
                seed[i * 3] = 0.2 + Math.pow(rng(), 2.2) * 1.4; // size
                seed[i * 3 + 1] = rng(); // speed
                seed[i * 3 + 2] = rng(); // phase
            }
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](pos, 3));
            g.setAttribute("aSeed", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](seed, 3));
            g.boundingSphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -BOX.d / 2), BOX.d);
            return g;
        }
    }["Dust.useMemo[geometry]"], [
        count
    ]);
    const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dust.useMemo[material]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$dust$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dustVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$dust$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dustFragment"],
                transparent: true,
                depthWrite: false,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uSize: {
                        value: 14
                    },
                    uPixelRatio: {
                        value: 1
                    },
                    uBoxDepth: {
                        value: BOX.d
                    },
                    uPointer: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]()
                    },
                    uOpacity: {
                        value: 0
                    },
                    uColorA: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionSoft.clone()
                    },
                    uColorB: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                    }
                }
            })
    }["Dust.useMemo[material]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dust.useEffect": ()=>({
                "Dust.useEffect": ()=>geometry.dispose()
            })["Dust.useEffect"]
    }["Dust.useEffect"], [
        geometry
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dust.useEffect": ()=>({
                "Dust.useEffect": ()=>material.dispose()
            })["Dust.useEffect"]
    }["Dust.useEffect"], [
        material
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dust.useEffect": ()=>{
            material.uniforms.uPixelRatio.value = dpr;
        }
    }["Dust.useEffect"], [
        dpr,
        material
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Dust.useFrame": (state)=>{
            material.uniforms.uTime.value = state.clock.elapsedTime;
            // Motes are glow. On paper there is nothing for them to glow against, and
            // the light acts are deliberately cleaner, so they fade right out.
            material.uniforms.uOpacity.value = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro * 0.55 * (1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeAt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage));
            material.uniforms.uPointer.value.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y);
            // Lock to the camera so the motes always frame the shot.
            const p = ref.current;
            if (p) {
                p.position.copy(state.camera.position);
                p.quaternion.copy(state.camera.quaternion);
            }
        }
    }["Dust.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: ref,
        geometry: geometry,
        material: material,
        frustumCulled: false,
        renderOrder: 6
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Dust.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(Dust, "MB4A5Pk94ZY7Nq3tKFLyNjfpIrs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Dust;
var _c;
__turbopack_context__.k.register(_c, "Dust");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAppStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interaction.ts [app-client] (ecmascript)");
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
function Effects() {
    _s();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "Effects.useAppStore[quality]": (s)=>s.quality
    }["Effects.useAppStore[quality]"]);
    const bloom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chroma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dof = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Mutated in place each frame; the effect holds it by reference.
    const focusTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Effects.useMemo[focusTarget]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0)
    }["Effects.useMemo[focusTarget]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Effects.useFrame": (_, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            // Focus rides the subject: the core, then the portal deeper in the corridor.
            const inWork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(3.5, 4.1, stage) * (1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(4.7, 5.1, stage));
            focusTarget.set(0, 0, -3.1 * inWork);
            if (dof.current && dof.current.target !== focusTarget) {
                dof.current.target = focusTarget;
            }
            const climax = Math.max(1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(stage - 0) / 1.3), 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(stage - 7) / 1.1));
            if (bloom.current) {
                bloom.current.intensity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(bloom.current.intensity, (0.34 + climax * 0.2 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].energy * 0.35) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro, 3, d);
            }
            if (chroma.current) {
                // Radial modulation keeps the centre of frame clean and pushes the
                // fringing to the edges, which is where a real lens puts it.
                chroma.current.radialModulation = true;
                chroma.current.modulationOffset = 0.3;
                const o = 0.00035 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].energy * 0.0038;
                chroma.current.offset.set(o, o * 0.62);
            }
        }
    }["Effects.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
        multisampling: 0,
        enableNormalPass: false,
        children: [
            quality.depthOfField ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DepthOfField"], {
                ref: dof,
                focusDistance: 7.2,
                focusRange: 5.5,
                bokehScale: 2.6,
                resolutionScale: 0.5
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this),
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
                lineNumber: 94,
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
                lineNumber: 105,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vignette"], {
                offset: 0.24,
                darkness: 0.82,
                blendFunction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlendFunction"].NORMAL
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToneMapping"], {
                mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToneMappingMode"].AGX
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Effects.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Effects.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(Effects, "rBSI5ljgIBFWqKrzyqgPemZssW0=", false, function() {
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
"[project]/src/components/canvas/EvolveSystem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EvolveSystem",
    ()=>EvolveSystem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/evolve.ts [app-client] (ecmascript)");
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
function EvolveSystem() {
    _s();
    const mesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EvolveSystem.useMemo[geometry]": ()=>{
            // PolyhedronGeometry is already non-indexed, so every run of three
            // vertices is one triangle — exactly what barycentric wireframing needs.
            // Detail 2 (320 faces). Any denser and the barycentric wireframe stops
            // reading as a structure and turns into a solid mesh of edges.
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](1, 2);
            const count = g.attributes.position.count;
            const bary = new Float32Array(count * 3);
            for(let i = 0; i < count; i++){
                const corner = i % 3;
                bary[i * 3 + corner] = 1;
            }
            g.setAttribute("aBary", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](bary, 3));
            return g;
        }
    }["EvolveSystem.useMemo[geometry]"], []);
    const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EvolveSystem.useMemo[material]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evolveVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evolveFragment"],
                transparent: true,
                depthWrite: false,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uEvolve: {
                        value: 0
                    },
                    uChaos: {
                        value: 1
                    },
                    uBuild: {
                        value: 0
                    },
                    uOpacity: {
                        value: 0
                    },
                    uLight: {
                        value: 0
                    },
                    uPaper: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].paper.clone()
                    },
                    uInk: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].ink.clone()
                    },
                    uColorDeep: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionDeep.clone()
                    },
                    uColorMid: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                    },
                    uColorHot: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ember.clone()
                    }
                }
            })
    }["EvolveSystem.useMemo[material]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EvolveSystem.useEffect": ()=>({
                "EvolveSystem.useEffect": ()=>{
                    geometry.dispose();
                    material.dispose();
                }
            })["EvolveSystem.useEffect"]
    }["EvolveSystem.useEffect"], [
        geometry,
        material
    ]);
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "EvolveSystem.useFrame": (state, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const t = state.clock.elapsedTime;
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            const u = material.uniforms;
            // Held back until the work portal has cleared — a wireframe at low opacity
            // still draws every edge, so it reads as present long before it should.
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(4.98, 5.32, stage) * (1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(5.82, 6.25, stage));
            opacity.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(opacity.current, target, 4.5, d);
            u.uOpacity.value = opacity.current;
            const m = mesh.current;
            if (m) {
                m.visible = opacity.current > 0.006;
                if (!m.visible) return;
            }
            const evolve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(stage - 5);
            u.uLight.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeAt"])(stage);
            u.uTime.value = t;
            u.uEvolve.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uEvolve.value, evolve, 8, d);
            // One construction sweep per process step.
            u.uBuild.value = evolve * 6 % 1;
            if (m) {
                // Spins fast and loose early, settles as the product resolves.
                m.rotation.y += d * (0.55 - evolve * 0.44);
                m.rotation.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(m.rotation.x, -0.18 + evolve * 0.12, 2, d);
                m.scale.setScalar(0.82 + evolve * 0.16);
            }
        }
    }["EvolveSystem.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: mesh,
        geometry: geometry,
        material: material,
        position: [
            0,
            1.45,
            0.4
        ],
        renderOrder: 3
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/EvolveSystem.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(EvolveSystem, "slcmr026+HC9gra21YZTfIn1cY8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = EvolveSystem;
var _c;
__turbopack_context__.k.register(_c, "EvolveSystem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/Field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Field",
    ()=>Field
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$field$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/field.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/interaction.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cameraPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/cameraPath.ts [app-client] (ecmascript) <locals>");
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
function Field() {
    _s();
    const count = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "Field.useAppStore[count]": (s)=>s.quality.particles
    }["Field.useAppStore[count]"]);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "Field.useThree[size]": (s)=>s.size
    }["Field.useThree[size]"]);
    const dpr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])({
        "Field.useThree[dpr]": (s)=>s.viewport.dpr
    }["Field.useThree[dpr]"]);
    // Allocate once at the tier we booted with. Later downgrades shrink the draw
    // range rather than regenerating and re-uploading the attributes, which would
    // stall for tens of milliseconds mid-scroll.
    const capacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(count).current;
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Field.useMemo[data]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildField"])(capacity)
    }["Field.useMemo[data]"], [
        capacity
    ]);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Field.useMemo[geometry]": ()=>{
            const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            g.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](data.base, 3));
            data.targets.forEach({
                "Field.useMemo[geometry]": (arr, i)=>{
                    g.setAttribute(`aF${i + 1}`, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](arr, 3));
                }
            }["Field.useMemo[geometry]"]);
            g.setAttribute("aSeed", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](data.seed, 4));
            // The shader moves points far outside the authored bounds; give the
            // renderer a bounding sphere generous enough that it never culls us.
            g.boundingSphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -8), 42);
            return g;
        }
    }["Field.useMemo[geometry]"], [
        data
    ]);
    const material = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Field.useMemo[material]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$field$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$field$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldFragment"],
                transparent: true,
                depthWrite: false,
                depthTest: true,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uMorph: {
                        value: 0
                    },
                    uTurbulence: {
                        value: 0
                    },
                    uSize: {
                        value: 26
                    },
                    uPixelRatio: {
                        value: 1
                    },
                    uIntro: {
                        value: 0
                    },
                    uActiveCluster: {
                        value: -1
                    },
                    uActiveTech: {
                        value: -1
                    },
                    uClusterDim: {
                        value: 0.22
                    },
                    uFocusRange: {
                        value: 26
                    },
                    uPointer: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]()
                    },
                    uDrift: {
                        value: 1
                    },
                    uOpacity: {
                        value: 1
                    },
                    uLight: {
                        value: 0
                    },
                    uColorDeep: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionDeep.clone()
                    },
                    uColorMid: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                    },
                    uColorHot: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionSoft.clone()
                    },
                    uInkDeep: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].dustDeep.clone()
                    },
                    uInkMid: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].dustMid.clone()
                    },
                    uInkHot: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].dustHot.clone()
                    }
                }
            })
    }["Field.useMemo[material]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Field.useEffect": ()=>({
                "Field.useEffect": ()=>geometry.dispose()
            })["Field.useEffect"]
    }["Field.useEffect"], [
        geometry
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Field.useEffect": ()=>({
                "Field.useEffect": ()=>material.dispose()
            })["Field.useEffect"]
    }["Field.useEffect"], [
        material
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Field.useEffect": ()=>{
            geometry.setDrawRange(0, Math.min(count, capacity));
        }
    }["Field.useEffect"], [
        count,
        capacity,
        geometry
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Field.useEffect": ()=>{
            material.uniforms.uPixelRatio.value = dpr;
            // Point size is authored against a 900px-tall frame.
            material.uniforms.uSize.value = 24 * (size.height / 900);
        }
    }["Field.useEffect"], [
        dpr,
        size.height,
        material
    ]);
    const prevMorph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const turbulence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const cluster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(-1);
    const tech = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(-1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Field.useFrame": (state, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const u = material.uniforms;
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            u.uTime.value = state.clock.elapsedTime;
            const morph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cameraPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["morphAt"])(stage);
            const rate = Math.abs(morph - prevMorph.current) / Math.max(d, 1e-4);
            prevMorph.current = morph;
            // The field visibly energises while it reconfigures, and settles once the
            // new formation has landed.
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(rate * 0.19 + Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].velocity) * 0.0006, 0, 1);
            turbulence.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(turbulence.current, target, 5.5, d);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interaction"].energy = turbulence.current;
            u.uMorph.value = morph;
            u.uTurbulence.value = turbulence.current;
            u.uIntro.value = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro;
            u.uPointer.value.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y);
            // Read the store transiently — highlighting must not re-render the tree.
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"].getState();
            const nearServices = 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(stage - 2));
            const nearTech = 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(stage - 3));
            cluster.current = nearServices > 0.05 ? s.activeService : -1;
            tech.current = nearTech > 0.05 ? s.activeTech : -1;
            u.uActiveCluster.value = cluster.current;
            u.uActiveTech.value = tech.current;
            // Environment. Additive light does nothing on paper, so the material flips
            // to normal blending as the field crosses over. The switch happens at the
            // exact midpoint, where the field has also dipped out — so the change of
            // blend mode is never visible.
            const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeAt"])(stage);
            const swap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swapAt"])(theme);
            u.uLight.value = theme;
            const wantsNormal = theme > 0.5;
            if (wantsNormal !== (material.blending === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NormalBlending"])) {
                material.blending = wantsNormal ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NormalBlending"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"];
            }
            // The field steps back to a supporting role wherever the DOM carries the
            // weight: through every copy-dense beat on portrait, and in the studio
            // section — which has no sticky frame — on all viewports.
            const portrait = size.width < size.height;
            const copyHeavy = stage > 1.5 && stage < 6.05;
            const studio = stage >= 5.9 && stage < 7.0;
            const dim = portrait && copyHeavy ? 0.46 : studio ? 0.55 : 1;
            u.uOpacity.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uOpacity.value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(dim, 0.3, swap), 4.5, d);
            // Wider depth range inside the corridor so the far end still reads.
            u.uFocusRange.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uFocusRange.value, stage > 3.4 && stage < 4.9 ? 34 : 22, 2.5, d);
        }
    }["Field.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        geometry: geometry,
        material: material,
        frustumCulled: false,
        renderOrder: 4
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Field.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_s(Field, "cN4SQp8Vuh0RPQ0l7tGdhSzeE+o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Field;
var _c;
__turbopack_context__.k.register(_c, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/HeroCore.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroCore",
    ()=>HeroCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$core$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/core.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/evolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
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
const RINGS = [
    {
        radius: 2.32,
        tube: 0.012,
        rot: [
            -0.42,
            0.2,
            0.15
        ],
        speed: 0.075,
        seed: 0.0
    },
    {
        radius: 2.76,
        tube: 0.009,
        rot: [
            0.28,
            -0.85,
            -0.3
        ],
        speed: -0.055,
        seed: 0.37
    },
    {
        radius: 3.2,
        tube: 0.007,
        rot: [
            1.15,
            0.5,
            0.6
        ],
        speed: 0.04,
        seed: 0.71
    }
];
/** Small reflective chips orbiting the core — the only truly metallic surfaces
 *  in the scene, there to pick up the procedural environment. */ const SHARDS = [
    {
        r: 2.0,
        phase: 0.0,
        y: 0.55,
        scale: 0.09,
        speed: 0.14
    },
    {
        r: 2.45,
        phase: 2.1,
        y: -0.72,
        scale: 0.065,
        speed: -0.11
    },
    {
        r: 1.72,
        phase: 4.0,
        y: 1.05,
        scale: 0.055,
        speed: 0.19
    },
    {
        r: 2.9,
        phase: 5.3,
        y: 0.12,
        scale: 0.075,
        speed: -0.08
    },
    {
        r: 2.2,
        phase: 1.1,
        y: -1.15,
        scale: 0.05,
        speed: 0.16
    }
];
function HeroCore() {
    _s();
    const detail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "HeroCore.useAppStore[detail]": (s)=>s.quality.coreDetail
    }["HeroCore.useAppStore[detail]"]);
    const showShards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "HeroCore.useAppStore[showShards]": (s)=>s.quality.shards
    }["HeroCore.useAppStore[showShards]"]);
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const coreMesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shellMesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const coreMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroCore.useMemo[coreMaterial]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$core$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coreVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$core$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coreFragment"],
                transparent: true,
                depthWrite: true,
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uAmp: {
                        value: 0.28
                    },
                    uIntro: {
                        value: 0
                    },
                    uPulse: {
                        value: 0
                    },
                    uOpacity: {
                        value: 1
                    },
                    uColorDeep: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionDeep.clone()
                    },
                    uColorMid: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                    },
                    uColorHot: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ember.clone()
                    }
                }
            })
    }["HeroCore.useMemo[coreMaterial]"], []);
    const shellMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroCore.useMemo[shellMaterial]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$core$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shellVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$core$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shellFragment"],
                transparent: true,
                depthWrite: false,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                uniforms: {
                    uColor: {
                        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionSoft.clone()
                    },
                    uOpacity: {
                        value: 0.5
                    }
                }
            })
    }["HeroCore.useMemo[shellMaterial]"], []);
    const ringMaterials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroCore.useMemo[ringMaterials]": ()=>RINGS.map({
                "HeroCore.useMemo[ringMaterials]": (r)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                        vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ringVertex"],
                        fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ringFragment"],
                        transparent: true,
                        depthWrite: false,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                        uniforms: {
                            uTime: {
                                value: 0
                            },
                            uWarp: {
                                value: 0.01
                            },
                            uOpacity: {
                                value: 1
                            },
                            uSpeed: {
                                value: r.speed
                            },
                            uSeed: {
                                value: r.seed
                            },
                            uColor: {
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                            },
                            uHotColor: {
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionSoft.clone()
                            }
                        }
                    })
            }["HeroCore.useMemo[ringMaterials]"])
    }["HeroCore.useMemo[ringMaterials]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCore.useEffect": ()=>({
                "HeroCore.useEffect": ()=>{
                    coreMaterial.dispose();
                    shellMaterial.dispose();
                    ringMaterials.forEach({
                        "HeroCore.useEffect": (m)=>m.dispose()
                    }["HeroCore.useEffect"]);
                }
            })["HeroCore.useEffect"]
    }["HeroCore.useEffect"], [
        coreMaterial,
        shellMaterial,
        ringMaterials
    ]);
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "HeroCore.useFrame": (state, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const t = state.clock.elapsedTime;
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            // The core belongs to the hero; it dissolves as the field takes over.
            const target = (1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(0.45, 1.5, stage)) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro;
            opacity.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(opacity.current, target, 5, d);
            const o = opacity.current;
            const g = group.current;
            if (g) {
                g.visible = o > 0.008;
                if (!g.visible) return;
                g.rotation.y = t * 0.055 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x * 0.22;
                g.rotation.x = Math.sin(t * 0.09) * 0.06 - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y * 0.16;
                // Recedes and shrinks slightly as it hands off to the particle field.
                const s = 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(0.4, 1.5, stage) * 0.35;
                g.scale.setScalar(s * (0.6 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro * 0.4));
                g.position.z = -(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(0.4, 1.5, stage) * 2.4;
            }
            coreMaterial.uniforms.uTime.value = t;
            coreMaterial.uniforms.uIntro.value = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].intro;
            coreMaterial.uniforms.uOpacity.value = o;
            coreMaterial.uniforms.uPulse.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(coreMaterial.uniforms.uPulse.value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].velocity) * 0.012, 0, 1), 4, d);
            shellMaterial.uniforms.uOpacity.value = o * 0.16;
            for(let i = 0; i < ringMaterials.length; i++){
                ringMaterials[i].uniforms.uTime.value = t;
                ringMaterials[i].uniforms.uOpacity.value = o;
            }
            if (shellMesh.current) {
                shellMesh.current.rotation.y = -t * 0.09;
                shellMesh.current.rotation.z = t * 0.04;
            }
            for(let i = 0; i < SHARDS.length; i++){
                const m = shards.current[i];
                if (!m) continue;
                const s = SHARDS[i];
                const a = s.phase + t * s.speed;
                m.position.set(Math.cos(a) * s.r, s.y + Math.sin(t * 0.3 + s.phase) * 0.12, Math.sin(a) * s.r);
                m.rotation.x = t * 0.4 + s.phase;
                m.rotation.y = t * 0.3;
                m.scale.setScalar(s.scale * o);
            }
        }
    }["HeroCore.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: group,
        renderOrder: 1,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: coreMesh,
                material: coreMaterial,
                renderOrder: 1,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("icosahedronGeometry", {
                    args: [
                        0.86,
                        detail
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/canvas/HeroCore.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/HeroCore.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: shellMesh,
                material: shellMaterial,
                renderOrder: 2,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("icosahedronGeometry", {
                    args: [
                        1.44,
                        1
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/canvas/HeroCore.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/HeroCore.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            RINGS.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    material: ringMaterials[i],
                    rotation: r.rot,
                    renderOrder: 3,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                        args: [
                            r.radius,
                            r.tube,
                            8,
                            220
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/HeroCore.tsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, this)
                }, i, false, {
                    fileName: "[project]/src/components/canvas/HeroCore.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this)),
            showShards && SHARDS.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    ref: (el)=>{
                        shards.current[i] = el;
                    },
                    renderOrder: 1,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("octahedronGeometry", {
                            args: [
                                1,
                                0
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/canvas/HeroCore.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                            color: "#0d1220",
                            metalness: 1,
                            roughness: 0.14,
                            envMapIntensity: 2.4,
                            clearcoat: 1,
                            clearcoatRoughness: 0.15
                        }, void 0, false, {
                            fileName: "[project]/src/components/canvas/HeroCore.tsx",
                            lineNumber: 206,
                            columnNumber: 13
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/canvas/HeroCore.tsx",
                    lineNumber: 198,
                    columnNumber: 11
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/HeroCore.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_s(HeroCore, "pMhD1fLrtuQRLhCOVvjT9jxCRn4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = HeroCore;
var _c;
__turbopack_context__.k.register(_c, "HeroCore");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/canvas/PillarRings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PillarRings",
    ()=>PillarRings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/evolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$company$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/company.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey.ts [app-client] (ecmascript)");
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
function PillarRings() {
    _s();
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PillarRings.useMemo[rings]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$company$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PILLARS"].map({
                "PillarRings.useMemo[rings]": (_, i)=>({
                        tilt: i / 4 * Math.PI,
                        yaw: i / 4 * Math.PI * 1.35 + 0.4,
                        speed: 0.05 + i * 0.018 * (i % 2 === 0 ? 1 : -1),
                        seed: i * 0.27
                    })
            }["PillarRings.useMemo[rings]"])
    }["PillarRings.useMemo[rings]"], []);
    const materials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PillarRings.useMemo[materials]": ()=>rings.map({
                "PillarRings.useMemo[materials]": (r)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                        vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ringVertex"],
                        fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$evolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ringFragment"],
                        transparent: true,
                        depthWrite: false,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                        uniforms: {
                            uTime: {
                                value: 0
                            },
                            uWarp: {
                                value: 0.006
                            },
                            uOpacity: {
                                value: 0
                            },
                            uSpeed: {
                                value: r.speed
                            },
                            uSeed: {
                                value: r.seed
                            },
                            uLight: {
                                value: 0
                            },
                            uPaper: {
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].paper.clone()
                            },
                            uInk: {
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C_LIGHT"].ion.clone()
                            },
                            uColor: {
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ion.clone()
                            },
                            uHotColor: {
                                value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ionSoft.clone()
                            }
                        }
                    })
            }["PillarRings.useMemo[materials]"])
    }["PillarRings.useMemo[materials]"], [
        rings
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PillarRings.useEffect": ()=>({
                "PillarRings.useEffect": ()=>materials.forEach({
                        "PillarRings.useEffect": (m)=>m.dispose()
                    }["PillarRings.useEffect"])
            })["PillarRings.useEffect"]
    }["PillarRings.useEffect"], [
        materials
    ]);
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "PillarRings.useFrame": (state, dt)=>{
            const d = Math.min(dt, 1 / 30);
            const t = state.clock.elapsedTime;
            const stage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].stage;
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(5.55, 6.1, stage) * (1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(6.7, 7.05, stage));
            opacity.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(opacity.current, target, 4.5, d);
            const g = group.current;
            if (g) {
                g.visible = opacity.current > 0.006;
                if (!g.visible) return;
                g.rotation.y = t * 0.03 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.x * 0.16;
                g.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journey"].smoothPointer.y * -0.1;
            }
            // Additive strokes vanish on paper, so the rings draw rather than glow.
            const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeAt"])(stage);
            const wantsNormal = theme > 0.5;
            // Hover wins; otherwise the rings light in sequence as the section scrolls.
            const hovered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"].getState().activePillar;
            const auto = Math.min(3, Math.floor((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(stage - 6) * 4.2));
            const focus = hovered >= 0 ? hovered : auto;
            for(let i = 0; i < materials.length; i++){
                const m = materials[i];
                if (wantsNormal !== (m.blending === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NormalBlending"])) {
                    m.blending = wantsNormal ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NormalBlending"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"];
                }
                const u = m.uniforms;
                u.uTime.value = t;
                u.uLight.value = theme;
                u.uOpacity.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["damp"])(u.uOpacity.value, opacity.current * (focus === i ? 1 : 0.28), 5, d);
            }
        }
    }["PillarRings.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: group,
        renderOrder: 3,
        children: rings.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                material: materials[i],
                rotation: [
                    r.tilt,
                    r.yaw,
                    0,
                    "YXZ"
                ],
                renderOrder: 3,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                    args: [
                        2.42,
                        0.01,
                        8,
                        260
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/canvas/PillarRings.tsx",
                    lineNumber: 117,
                    columnNumber: 11
                }, this)
            }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$company$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PILLARS"][i].id, false, {
                fileName: "[project]/src/components/canvas/PillarRings.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/PillarRings.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(PillarRings, "30GqA5k4drZd5a4iY+EhAbffhww=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = PillarRings;
var _c;
__turbopack_context__.k.register(_c, "PillarRings");
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
                    uVariant: {
                        value: 0
                    },
                    uPrevVariant: {
                        value: 0
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
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(3.45, 4.02, stage) * (1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(4.72, 5.15, stage));
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
            lineNumber: 102,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Portal.tsx",
        lineNumber: 101,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Environment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Lightformer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerformanceMonitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/PerformanceMonitor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAppStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Rig$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/canvas/Rig.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Atmosphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Atmosphere.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Dust$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Dust.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$HeroCore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/HeroCore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Constellation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Constellation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Portal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Portal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$EvolveSystem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/EvolveSystem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$PillarRings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/PillarRings.tsx [app-client] (ecmascript)");
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
;
;
;
;
;
function Scene() {
    _s();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])({
        "Scene.useAppStore[quality]": (s)=>s.quality
    }["Scene.useAppStore[quality]"]);
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
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    "#04050a"
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Rig$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Rig"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Atmosphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Atmosphere"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            quality.environment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Environment"], {
                resolution: 256,
                frames: 1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                        intensity: 2.4,
                        position: [
                            0,
                            4,
                            -3
                        ],
                        scale: [
                            10,
                            5,
                            1
                        ],
                        color: "#a8c2ff"
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/Scene.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                        intensity: 1.1,
                        position: [
                            -5,
                            -1,
                            2
                        ],
                        rotation: [
                            0,
                            Math.PI / 2,
                            0
                        ],
                        scale: [
                            8,
                            4,
                            1
                        ],
                        color: "#ff8a5b"
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/Scene.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                        intensity: 0.7,
                        position: [
                            5,
                            1,
                            1
                        ],
                        rotation: [
                            0,
                            -Math.PI / 2,
                            0
                        ],
                        scale: [
                            6,
                            6,
                            1
                        ],
                        color: "#2b47c9"
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/Scene.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                        form: "ring",
                        intensity: 1.6,
                        position: [
                            0,
                            0,
                            6
                        ],
                        scale: 4,
                        color: "#6e9bff"
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/Scene.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.18,
                color: "#8fa8ff"
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    3,
                    5,
                    4
                ],
                intensity: 0.5,
                color: "#cddaff"
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$HeroCore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeroCore"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Constellation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Constellation"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Portal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$EvolveSystem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EvolveSystem"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$PillarRings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PillarRings"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Dust$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dust"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Effects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Effects"], {}, void 0, false, {
                fileName: "[project]/src/components/canvas/Scene.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Scene.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Scene, "Og1QCdNzgtog2qT7tiZPz3LeUNs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAppStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
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
    "STAGE_FORMATION",
    ()=>STAGE_FORMATION,
    "morphAt",
    ()=>morphAt,
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
 */ //                     hero   manifesto services  tech    work   process  about   cta
const POS_X = [
    0.0,
    1.15,
    0.0,
    -0.45,
    0.0,
    0.15,
    -0.7,
    0.0
];
const POS_Y = [
    0.0,
    0.55,
    0.8,
    0.1,
    0.05,
    1.05,
    0.25,
    0.95
];
const POS_Z = [
    7.4,
    8.7,
    8.4,
    7.1,
    4.1,
    10.4,
    8.5,
    6.35
];
// Framing is set by the look target, not the camera position: with lookAt
// pinned to the subject, moving the camera only changes the angle. Pushing the
// target left slides the subject to the right of frame, which is how the
// manifesto and studio beats clear space for left-aligned copy.
const LOOK_X = [
    0.0,
    -1.95,
    0.0,
    0.0,
    0.0,
    0.0,
    -1.15,
    0.0
];
const LOOK_Y = [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.6,
    0.0,
    -0.15
];
const LOOK_Z = [
    0.0,
    0.0,
    0.0,
    0.0,
    -7.0,
    0.0,
    0.0,
    0.0
];
const FOV = [
    42,
    44,
    46,
    42,
    58,
    45,
    42,
    38
];
const ROLL = [
    0,
    0.012,
    -0.01,
    0.008,
    0,
    -0.012,
    0.01,
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
const STAGE_FORMATION = [
    0,
    0.32,
    1,
    2,
    3,
    4,
    5,
    6
];
function morphAt(stage) {
    const last = STAGE_FORMATION.length - 1;
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(stage, 0, last);
    const i = Math.min(last - 1, Math.floor(s));
    if (s >= last) return STAGE_FORMATION[last];
    const local = s - i;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(STAGE_FORMATION[i], STAGE_FORMATION[i + 1], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(0.42, 1, local));
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/formations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHAIN_ANCHORS",
    ()=>CHAIN_ANCHORS,
    "CLUSTER_ANCHORS",
    ()=>CLUSTER_ANCHORS,
    "FORMATION",
    ()=>FORMATION,
    "FORMATION_COUNT",
    ()=>FORMATION_COUNT,
    "buildField",
    ()=>buildField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/technologies.ts [app-client] (ecmascript)");
;
;
const FORMATION = {
    CORE: 0,
    CLUSTERS: 1,
    CONSTELLATION: 2,
    CORRIDOR: 3,
    CHAIN: 4,
    ORBIT: 5,
    CONVERGENCE: 6
};
const FORMATION_COUNT = 7;
const CLUSTER_ANCHORS = [
    [
        -3.5,
        -2.05,
        -1.35
    ],
    [
        -1.2,
        -2.72,
        0.35
    ],
    [
        1.2,
        -2.68,
        -0.85
    ],
    [
        3.5,
        -2.0,
        0.55
    ]
];
const CHAIN_ANCHORS = Array.from({
    length: 6
}, (_, i)=>{
    const t = i / 5;
    const x = -4.4 + t * 8.8;
    const a = t * Math.PI * 3.1;
    return [
        x,
        Math.sin(a) * 0.8,
        Math.cos(a) * 0.8
    ];
});
const TECH_POS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECHNOLOGIES"].map(_c = (t)=>[
        t.position[0] * 1.16,
        t.position[1] * 1.16,
        t.position[2] * 1.16
    ]);
_c1 = TECH_POS;
function buildField(count) {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeRng"])(0x5eed1a);
    const base = new Float32Array(count * 3);
    const targets = Array.from({
        length: 6
    }, ()=>new Float32Array(count * 3));
    const seed = new Float32Array(count * 4);
    /**
   * Points are written in shuffled order.
   *
   * Formations are generated from an index-ordered distribution (the Fibonacci
   * sphere walks pole to pole), so the first N buffer slots would otherwise be
   * a contiguous cap rather than a sample of the whole. Shuffling means any
   * prefix is a uniform subset, which lets the renderer drop quality by
   * shrinking the draw range instead of rebuilding several megabytes of
   * attributes mid-scroll.
   */ const order = new Uint32Array(count);
    for(let i = 0; i < count; i++)order[i] = i;
    for(let i = count - 1; i > 0; i--){
        const j = Math.floor(rng() * (i + 1));
        const t = order[i];
        order[i] = order[j];
        order[j] = t;
    }
    const [f1, f2, f3, f4, f5, f6] = targets;
    const tmp = [
        0,
        0,
        0
    ];
    for(let i = 0; i < count; i++){
        const slot = order[i];
        const i3 = slot * 3;
        const i4 = slot * 4;
        const r = rng();
        /* ---------------------------------------------------------------
       Formation 0 — CORE. A luminous shell, a dense inner mass and
       three orbital bands: the "digital core" of the hero.
    --------------------------------------------------------------- */ if (r < 0.62) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fibonacciSphere"])(i, count, tmp);
            const radius = 1.86 + (rng() - 0.5) * 0.2;
            base[i3] = tmp[0] * radius;
            base[i3 + 1] = tmp[1] * radius;
            base[i3 + 2] = tmp[2] * radius;
        } else if (r < 0.82) {
            const rr = Math.pow(rng(), 0.45) * 0.92;
            const theta = rng() * Math.PI * 2;
            const phi = Math.acos(2 * rng() - 1);
            base[i3] = Math.sin(phi) * Math.cos(theta) * rr;
            base[i3 + 1] = Math.cos(phi) * rr;
            base[i3 + 2] = Math.sin(phi) * Math.sin(theta) * rr;
        } else {
            const band = Math.floor(rng() * 3);
            const ringR = 2.32 + band * 0.44;
            const a = rng() * Math.PI * 2;
            const tilt = [
                -0.42,
                0.28,
                1.15
            ][band];
            const roll = [
                0.2,
                -0.85,
                0.5
            ][band];
            const x = Math.cos(a) * ringR;
            const z = Math.sin(a) * ringR;
            const y = (rng() - 0.5) * 0.06;
            // rotate around X then Z
            const y1 = y * Math.cos(tilt) - z * Math.sin(tilt);
            const z1 = y * Math.sin(tilt) + z * Math.cos(tilt);
            base[i3] = x * Math.cos(roll) - y1 * Math.sin(roll);
            base[i3 + 1] = x * Math.sin(roll) + y1 * Math.cos(roll);
            base[i3 + 2] = z1;
        }
        /* ---------------------------------------------------------------
       Formation 1 — CLUSTERS. Four discrete systems, one per service.
    --------------------------------------------------------------- */ const cluster = i % 4;
        const anchor = CLUSTER_ANCHORS[cluster];
        if (rng() < 0.58) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fibonacciSphere"])(i, count, tmp);
            const rad = 0.52 + (rng() - 0.5) * 0.08;
            f1[i3] = anchor[0] + tmp[0] * rad;
            f1[i3 + 1] = anchor[1] + tmp[1] * rad;
            f1[i3 + 2] = anchor[2] + tmp[2] * rad;
        } else {
            // snapped lattice reads as "engineered" next to the organic shell
            const g = 5;
            const q = (v)=>(Math.floor(v * g) / (g - 1) - 0.5) * 0.98;
            f1[i3] = anchor[0] + q(rng());
            f1[i3 + 1] = anchor[1] + q(rng());
            f1[i3 + 2] = anchor[2] + q(rng());
        }
        /* ---------------------------------------------------------------
       Formation 2 — CONSTELLATION. Points hug the technology nodes and
       stream along the links between them, so the particles literally
       draw the network.
    --------------------------------------------------------------- */ let techIndex = -1;
        const cr = rng();
        if (cr < 0.5) {
            techIndex = Math.floor(rng() * TECH_POS.length);
            const p = TECH_POS[techIndex];
            const rad = Math.pow(rng(), 0.6) * 0.22;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fibonacciSphere"])(i * 7 % count, count, tmp);
            f2[i3] = p[0] + tmp[0] * rad;
            f2[i3 + 1] = p[1] + tmp[1] * rad;
            f2[i3 + 2] = p[2] + tmp[2] * rad;
        } else if (cr < 0.94) {
            const link = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECH_LINKS"][Math.floor(rng() * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$technologies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TECH_LINKS"].length)];
            const a = TECH_POS[link[0]];
            const b = TECH_POS[link[1]];
            const t = rng();
            const j = 0.035;
            f2[i3] = a[0] + (b[0] - a[0]) * t + (rng() - 0.5) * j;
            f2[i3 + 1] = a[1] + (b[1] - a[1]) * t + (rng() - 0.5) * j;
            f2[i3 + 2] = a[2] + (b[2] - a[2]) * t + (rng() - 0.5) * j;
        } else {
            // A thin halo only — a wide diffuse cloud here reads as noise and buries
            // the structure the nodes and links are describing.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fibonacciSphere"])(i, count, tmp);
            const rad = 2.9 + rng() * 0.75;
            f2[i3] = tmp[0] * rad;
            f2[i3 + 1] = tmp[1] * rad * 0.66;
            f2[i3 + 2] = tmp[2] * rad;
        }
        /* ---------------------------------------------------------------
       Formation 3 — CORRIDOR. Floor and ceiling lattices receding into
       depth, so the camera sits inside the work section rather than in
       front of it.
    --------------------------------------------------------------- */ {
            const gr = rng();
            if (gr < 0.82) {
                // Coarser lattice than feels natural on paper: fewer cells means more
                // points land on each intersection, and the grid reads as a structure
                // rather than dissolving into a starfield.
                const cols = 26;
                const rows = 18;
                const cx = Math.floor(rng() * cols) / (cols - 1) - 0.5;
                const cz = Math.floor(rng() * rows) / (rows - 1);
                const top = rng() < 0.5;
                // Near edge kept off the camera plane: points that pass within a unit
                // of the lens clamp to max point size and murder fill rate.
                const depth = -cz * 24 + 2;
                f3[i3] = cx * 15 + (rng() - 0.5) * 0.04;
                f3[i3 + 1] = (top ? 2.15 : -2.15) + Math.sin(cx * 6.0 + cz * 5.0) * 0.2 + (rng() - 0.5) * 0.04;
                f3[i3 + 2] = depth;
            } else {
                // vertical struts at regular intervals
                const strut = Math.floor(rng() * 9);
                const side = strut % 2 === 0 ? -1 : 1;
                f3[i3] = side * (5.2 + Math.floor(strut / 2) * 1.3);
                f3[i3 + 1] = (rng() - 0.5) * 5.1;
                f3[i3 + 2] = 4 - Math.floor(rng() * 9) * 2.9;
            }
        }
        /* ---------------------------------------------------------------
       Formation 4 — CHAIN. A spiral with six dense knots: the process.
    --------------------------------------------------------------- */ {
            const kr = rng();
            if (kr < 0.34) {
                const knot = Math.floor(rng() * 6);
                const p = CHAIN_ANCHORS[knot];
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fibonacciSphere"])(i * 13 % count, count, tmp);
                const rad = Math.pow(rng(), 0.5) * 0.3;
                f4[i3] = p[0] + tmp[0] * rad;
                f4[i3 + 1] = p[1] + tmp[1] * rad;
                f4[i3 + 2] = p[2] + tmp[2] * rad;
            } else {
                // A tube rather than a wire: concentrating every point on a 1D curve
                // stacks them per-pixel and the additive blend saturates to white.
                const t = rng();
                const a = t * Math.PI * 3.1;
                const wobble = 0.36 + Math.pow(rng(), 0.7) * 0.62;
                f4[i3] = -4.4 + t * 8.8;
                f4[i3 + 1] = Math.sin(a) * wobble;
                f4[i3 + 2] = Math.cos(a) * wobble;
            }
        }
        /* ---------------------------------------------------------------
       Formation 5 — ORBIT. Four interlocking great circles: engineering,
       design, strategy, innovation, sharing one centre.
    --------------------------------------------------------------- */ {
            const or = rng();
            if (or < 0.88) {
                const ring = Math.floor(rng() * 4);
                const a = rng() * Math.PI * 2;
                const R = 2.42 + (rng() - 0.5) * 0.05;
                const x = Math.cos(a) * R;
                const y = Math.sin(a) * R;
                const tilt = ring / 4 * Math.PI;
                const yaw = ring / 4 * Math.PI * 1.35 + 0.4;
                const z0 = (rng() - 0.5) * 0.05;
                const y1 = y * Math.cos(tilt) - z0 * Math.sin(tilt);
                const z1 = y * Math.sin(tilt) + z0 * Math.cos(tilt);
                f5[i3] = x * Math.cos(yaw) - z1 * Math.sin(yaw);
                f5[i3 + 1] = y1;
                f5[i3 + 2] = x * Math.sin(yaw) + z1 * Math.cos(yaw);
            } else {
                // Sparse outer haze only. A radius distribution weighted toward zero
                // packs a bright ball into the middle of the frame, right where the
                // studio copy sits.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fibonacciSphere"])(i, count, tmp);
                const rad = 1.7 + rng() * 2.1;
                f5[i3] = tmp[0] * rad;
                f5[i3 + 1] = tmp[1] * rad;
                f5[i3 + 2] = tmp[2] * rad;
            }
        }
        /* ---------------------------------------------------------------
       Formation 6 — CONVERGENCE. Everything falls into one ring around a
       rising column of light: the closing shot.
    --------------------------------------------------------------- */ {
            const vr = rng();
            if (vr < 0.5) {
                const a = rng() * Math.PI * 2;
                const R = 2.62;
                const tubeA = rng() * Math.PI * 2;
                const tube = 0.3 + rng() * 0.16;
                const cx = Math.cos(a) * (R + Math.cos(tubeA) * tube);
                const cz = Math.sin(a) * (R + Math.cos(tubeA) * tube);
                f6[i3] = cx;
                f6[i3 + 1] = Math.sin(tubeA) * tube - 0.15;
                f6[i3 + 2] = cz;
            } else if (vr < 0.78) {
                const h = Math.pow(rng(), 0.85);
                const rad = (1 - h) * 0.55 + 0.04;
                const a = rng() * Math.PI * 2;
                f6[i3] = Math.cos(a) * rad;
                f6[i3 + 1] = -2.6 + h * 6.2;
                f6[i3 + 2] = Math.sin(a) * rad;
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fibonacciSphere"])(i, count, tmp);
                const rad = Math.pow(rng(), 0.6) * 0.72;
                f6[i3] = tmp[0] * rad;
                f6[i3 + 1] = tmp[1] * rad - 0.15;
                f6[i3 + 2] = tmp[2] * rad;
            }
        }
        /* --------------------------------------------------------------- */ const bright = rng();
        seed[i4] = rng();
        seed[i4 + 1] = bright < 0.04 ? 1.4 + rng() * 1.1 : 0.42 + rng() * 0.5;
        seed[i4 + 2] = cluster;
        seed[i4 + 3] = techIndex;
    }
    return {
        count,
        base,
        targets,
        seed
    };
}
var _c, _c1;
__turbopack_context__.k.register(_c, "TECH_POS$TECHNOLOGIES.map");
__turbopack_context__.k.register(_c1, "TECH_POS");
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
    /** Sky gradient, bottom → top. */ skyLow: color("#dfe4ee").multiplyScalar(1.5),
    skyMid: color("#f2f4f8").multiplyScalar(1.55),
    skyHigh: color("#ffffff").multiplyScalar(1.6),
    skyGlow: color("#9fb6e8"),
    /** Particles read as fine graphite dust on paper, not as light. */ dustDeep: color("#aab6cf"),
    dustMid: color("#3b4d78"),
    dustHot: color("#c25a30"),
    ion: color("#2854db"),
    ionSoft: color("#567cec"),
    ember: color("#ce4e26"),
    ink: color("#0a0f1c"),
    paper: color("#eef1f6")
};
function mixColor(out, a, b, t) {
    out.copy(a).lerp(b, t);
    return out;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyTheme",
    ()=>applyTheme,
    "swapAt",
    ()=>swapAt,
    "themeAt",
    ()=>themeAt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/math.ts [app-client] (ecmascript)");
;
/**
 * Light / dark environment as a function of the journey.
 *
 * The page alternates between two environments in five acts — a dark opening,
 * a light middle, a dark technical core, a light process/studio stretch, and a
 * dark climax. Which act you are in is derived from the same `stage` float that
 * drives the camera and the particle formations, so the environment change is
 * part of the journey rather than a separate theme toggle.
 *
 *   0 = dark    1 = light
 */ const STAGE_LIGHT = [
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    0
];
/**
 * The environment holds for most of a section and then crosses over late, in a
 * short decisive window rather than a long fade.
 */ const CROSS_START = 0.7;
const CROSS_END = 0.94;
function themeAt(stage) {
    const last = STAGE_LIGHT.length - 1;
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(stage, 0, last);
    if (s >= last) return STAGE_LIGHT[last];
    const i = Math.min(last - 1, Math.floor(s));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(STAGE_LIGHT[i], STAGE_LIGHT[i + 1], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(CROSS_START, CROSS_END, s - i));
}
function swapAt(theme) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smootherstep"])(0.34, 0.02, Math.abs(theme - 0.5));
}
/** [dark, light] for every themed CSS custom property. */ const TOKENS = {
    "--color-void": [
        [
            4,
            5,
            10
        ],
        [
            244,
            245,
            248
        ]
    ],
    "--color-ink": [
        [
            7,
            9,
            17
        ],
        [
            236,
            238,
            243
        ]
    ],
    "--color-carbon": [
        [
            11,
            14,
            24
        ],
        [
            255,
            255,
            255
        ]
    ],
    "--color-graphite": [
        [
            19,
            24,
            38
        ],
        [
            230,
            233,
            240
        ]
    ],
    "--color-hairline": [
        [
            27,
            34,
            51
        ],
        [
            219,
            223,
            232
        ]
    ],
    "--color-hairline-strong": [
        [
            42,
            51,
            72
        ],
        [
            190,
            197,
            212
        ]
    ],
    "--color-chalk": [
        [
            233,
            236,
            245
        ],
        [
            9,
            12,
            22
        ]
    ],
    "--color-fog": [
        [
            154,
            163,
            184
        ],
        [
            70,
            78,
            97
        ]
    ],
    "--color-mist": [
        [
            107,
            116,
            137
        ],
        [
            104,
            112,
            132
        ]
    ],
    "--color-dim": [
        [
            70,
            78,
            97
        ],
        [
            150,
            157,
            172
        ]
    ],
    "--color-ion": [
        [
            110,
            155,
            255
        ],
        [
            40,
            84,
            219
        ]
    ],
    "--color-ion-soft": [
        [
            168,
            194,
            255
        ],
        [
            86,
            124,
            236
        ]
    ],
    "--color-ion-deep": [
        [
            43,
            71,
            201
        ],
        [
            24,
            50,
            146
        ]
    ],
    "--color-ember": [
        [
            255,
            138,
            91
        ],
        [
            206,
            78,
            38
        ]
    ],
    /** Bare triplet, for `rgb(var(--scrim-rgb) / x)` in gradients. */ "--scrim-rgb": [
        [
            4,
            5,
            10
        ],
        [
            244,
            245,
            248
        ]
    ]
};
const RAW = new Set([
    "--scrim-rgb"
]);
function applyTheme(t, el) {
    const style = el.style;
    for(const name in TOKENS){
        const [dark, light] = TOKENS[name];
        const r = Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(dark[0], light[0], t));
        const g = Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(dark[1], light[1], t));
        const b = Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(dark[2], light[2], t));
        style.setProperty(name, RAW.has(name) ? `${r} ${g} ${b}` : `rgb(${r} ${g} ${b})`);
    }
    const swap = swapAt(t);
    style.setProperty("--swap", swap.toFixed(4));
    style.setProperty("--swap-opacity", (1 - swap * 0.82).toFixed(4));
    style.setProperty("--theme", t.toFixed(4));
}
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

  // A single soft light source that swings across the journey.
  vec3 sunDir = normalize(vec3(sin(uStage * 0.55) * 0.8, 0.35, cos(uStage * 0.55) * 0.8));
  float sun = pow(clamp(dot(d, sunDir), 0.0, 1.0), 12.0);
  col += uGlow * sun * 0.22 * uGlowStrength;

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
"[project]/src/shaders/core.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "coreFragment",
    ()=>coreFragment,
    "coreVertex",
    ()=>coreVertex,
    "shellFragment",
    ()=>shellFragment,
    "shellVertex",
    ()=>shellVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/chunks/noise.ts [app-client] (ecmascript)");
;
const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uIntro;
uniform float uPulse;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying vec3 vLocal;
varying float vDisp;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simplex3d"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fbm3d"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["helpers"]}

float displace(vec3 dir) {
  float t = uTime * 0.14;
  float n = fbm(dir * 1.45 + vec3(0.0, t * 0.9, t * 0.55), 3, 2.05, 0.52);
  float ridge = 1.0 - abs(snoise(dir * 2.35 + vec3(t * 0.7)));
  return n * 0.55 + pow(ridge, 3.0) * 0.3;
}

void main() {
  vec3 dir = normalize(position);
  float amp = uAmp * mix(0.25, 1.0, uIntro) * (1.0 + uPulse * 0.55);

  float d = displace(dir);
  vDisp = d;

  vec3 p = dir * (1.0 + d * amp);

  // Rebuild the normal from two tangential samples of the same field.
  vec3 tangent = orthogonal(dir);
  vec3 bitangent = normalize(cross(dir, tangent));
  const float eps = 0.045;
  vec3 da = normalize(dir + tangent * eps);
  vec3 db = normalize(dir + bitangent * eps);
  vec3 pa = da * (1.0 + displace(da) * amp);
  vec3 pb = db * (1.0 + displace(db) * amp);
  vec3 n = normalize(cross(pa - p, pb - p));
  if (dot(n, dir) < 0.0) n = -n;

  vLocal = p;
  vNormalW = normalize(mat3(modelMatrix) * n);

  vec4 world = modelMatrix * vec4(p, 1.0);
  vViewDir = normalize(cameraPosition - world.xyz);

  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
const coreFragment = /* glsl */ `
precision highp float;

uniform vec3 uColorDeep;
uniform vec3 uColorMid;
uniform vec3 uColorHot;
uniform float uTime;
uniform float uOpacity;
uniform float uPulse;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying vec3 vLocal;
varying float vDisp;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);

  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.7);

  // Two key lights, cool from above, warm rake from below-left.
  float key = clamp(dot(N, normalize(vec3(0.35, 0.78, 0.52))), 0.0, 1.0);
  float rake = clamp(dot(N, normalize(vec3(-0.72, -0.28, 0.42))), 0.0, 1.0);

  // Deliberately dark: the core is a dense object catching light, not a lamp.
  // Everything here is tuned to survive bloom without blowing out the headline
  // that sits in front of it.
  vec3 col = uColorDeep * 0.05;
  col += uColorMid * pow(key, 2.1) * 0.15;
  col += uColorHot * pow(rake, 3.0) * 0.09;

  // Emissive ridges: the surface looks powered, not painted.
  float ridge = smoothstep(0.55, 0.98, vDisp);
  col += mix(uColorMid, uColorHot, ridge) * ridge * (0.3 + uPulse * 0.4);

  // Rim only — the silhouette carries the read.
  col += uColorMid * fres * 0.5;
  col += vec3(1.0) * pow(fres, 7.0) * 0.2;

  // Slow vertical scan, a single band travelling the body.
  float band = exp(-pow((vLocal.y - sin(uTime * 0.24) * 1.15) * 5.5, 2.0));
  col += uColorHot * band * 0.12;

  gl_FragColor = vec4(col, uOpacity);
}
`;
const shellVertex = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
const shellFragment = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform float uOpacity;

varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.2);
  float alpha = fres * uOpacity;
  if (alpha < 0.002) discard;
  gl_FragColor = vec4(uColor * (0.4 + fres * 1.6), alpha);
}
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shaders/dust.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dustFragment",
    ()=>dustFragment,
    "dustVertex",
    ()=>dustVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/chunks/noise.ts [app-client] (ecmascript)");
;
const dustVertex = /* glsl */ `
attribute vec3 aSeed; // x: size, y: speed, z: phase

uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uBoxDepth;
uniform vec2  uPointer;
uniform float uOpacity;

varying float vAlpha;
varying float vSeed;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["helpers"]}

void main() {
  vec3 p = position;

  // Wrap through the box on Z so motes stream past the camera forever.
  // The mesh is locked to the camera, so local -Z is "into the scene".
  float speed = 0.35 + aSeed.y * 0.9;
  p.z = mod(p.z + uTime * speed, uBoxDepth) - uBoxDepth;
  p.x += sin(uTime * 0.18 + aSeed.z * 9.0) * 0.35;
  p.y += cos(uTime * 0.14 + aSeed.z * 7.0) * 0.28;

  p.x += uPointer.x * 0.7 * aSeed.x;
  p.y += uPointer.y * 0.5 * aSeed.x;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float dist = max(-mv.z, 0.001);
  gl_PointSize = clamp((uSize * aSeed.x * uPixelRatio) / dist, 0.4, 9.0);

  // Fade at both ends of the box so nothing pops in or out.
  float edge = smoothstep(0.0, 4.0, dist) * (1.0 - smoothstep(uBoxDepth * 0.32, uBoxDepth * 0.5, dist));
  vAlpha = edge * uOpacity * (0.25 + aSeed.x * 0.75);
  vSeed = aSeed.z;
}
`;
const dustFragment = /* glsl */ `
precision highp float;

uniform vec3 uColorA;
uniform vec3 uColorB;

varying float vAlpha;
varying float vSeed;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = dot(uv, uv);
  if (d > 0.25) discard;
  float mask = smoothstep(0.25, 0.0, d);
  vec3 col = mix(uColorA, uColorB, vSeed);
  float a = mask * vAlpha;
  if (a < 0.002) discard;
  gl_FragColor = vec4(col, a);
}
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shaders/evolve.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evolveFragment",
    ()=>evolveFragment,
    "evolveVertex",
    ()=>evolveVertex,
    "ringFragment",
    ()=>ringFragment,
    "ringVertex",
    ()=>ringVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/chunks/noise.ts [app-client] (ecmascript)");
;
const evolveVertex = /* glsl */ `
attribute vec3 aBary;

uniform float uTime;
uniform float uEvolve;
uniform float uChaos;

varying vec3 vBary;
varying vec3 vNormalW;
varying vec3 vViewDir;
varying vec3 vLocal;
varying float vNoise;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simplex3d"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fbm3d"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["helpers"]}

/** Chebyshev projection of a direction onto a rounded slab. */
vec3 slabPoint(vec3 dir) {
  // Not too thin: the object rotates, and an extreme slab reads as a shard
  // rather than a resolved product whenever it turns edge-on.
  vec3 b = vec3(1.16, 0.8, 0.44);
  vec3 k = abs(dir) / b;
  float m = max(max(k.x, k.y), k.z);
  vec3 boxy = dir / max(m, 0.0001);
  // Round the silhouette by pulling partway back toward the sphere.
  return mix(boxy, normalize(dir) * 0.78, 0.26);
}

vec3 shapeFor(vec3 dir, float e, float turbulence) {
  vec3 sphere = dir * 1.02;
  vec3 slab = slabPoint(dir);
  vec3 p = mix(sphere, slab, easeInOutCubic(e));

  // Chaos early, order late.
  float n = fbm(dir * 2.2 + vec3(0.0, uTime * 0.16, uTime * 0.1), 3, 2.1, 0.5);
  p += dir * n * turbulence;
  return p;
}

void main() {
  vBary = aBary;

  vec3 dir = normalize(position);
  float turbulence = mix(0.42, 0.02, smoothstep(0.0, 0.85, uEvolve)) * uChaos;

  vec3 p = shapeFor(dir, uEvolve, turbulence);
  vNoise = length(p) - 1.0;

  // Rebuild normals from the deformed surface.
  vec3 tangent = orthogonal(dir);
  vec3 bitangent = normalize(cross(dir, tangent));
  const float eps = 0.05;
  vec3 pa = shapeFor(normalize(dir + tangent * eps), uEvolve, turbulence);
  vec3 pb = shapeFor(normalize(dir + bitangent * eps), uEvolve, turbulence);
  vec3 n = normalize(cross(pa - p, pb - p));
  if (dot(n, dir) < 0.0) n = -n;

  vLocal = p;
  vNormalW = normalize(mat3(modelMatrix) * n);

  vec4 world = modelMatrix * vec4(p, 1.0);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
const evolveFragment = /* glsl */ `
precision highp float;

uniform vec3 uColorDeep;
uniform vec3 uColorMid;
uniform vec3 uColorHot;
uniform float uTime;
uniform float uEvolve;
uniform float uOpacity;
uniform float uBuild;
uniform float uLight;
uniform vec3 uPaper;
uniform vec3 uInk;

varying vec3 vBary;
varying vec3 vNormalW;
varying vec3 vViewDir;
varying vec3 vLocal;
varying float vNoise;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.5);
  float key = clamp(dot(N, normalize(vec3(0.4, 0.75, 0.55))), 0.0, 1.0);

  // Wireframe from barycentric coordinates.
  float e = min(min(vBary.x, vBary.y), vBary.z);
  float wire = 1.0 - smoothstep(0.0, fwidth(e) * 1.6, e);

  // Solidity grows as the product resolves.
  float solid = smoothstep(0.15, 0.92, uEvolve);

  // Construction sweep: surfaces light up as the build passes over them.
  float sweep = smoothstep(0.06, 0.0, abs(vLocal.y - (uBuild * 2.6 - 1.3)));

  vec3 col = uColorDeep * 0.12;
  col += uColorMid * pow(key, 1.5) * 0.5 * solid;
  col += uColorMid * fres * (0.8 + solid * 0.7);
  col += vec3(1.0) * pow(fres, 6.0) * 0.5 * solid;

  // Wire is dominant early, a structural hint later. Kept cool with only a
  // warm trace, so the unresolved state reads as schematic, not rusted.
  vec3 wireCol = mix(mix(uColorMid, uColorHot, 0.22), uColorMid, solid);
  col += wireCol * wire * mix(0.62, 0.2, solid);

  col += uColorHot * sweep * (0.3 + wire * 0.45);
  col += uColorHot * smoothstep(0.02, 0.2, abs(vNoise)) * (1.0 - solid) * 0.12;

  // On paper the same structure is drawn rather than lit: everything the dark
  // pass renders as brightness becomes darkness instead, which preserves the
  // read of the form without inventing a second set of art direction.
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  vec3 inked = mix(uPaper, uInk, clamp(lum * 1.15, 0.0, 1.0));
  col = mix(col, inked, uLight);

  float alpha = uOpacity * max(wire * mix(0.95, 0.28, solid), solid * (0.24 + fres * 0.7));
  alpha *= mix(1.0, 1.45, uLight);
  if (alpha < 0.004) discard;

  gl_FragColor = vec4(col, alpha);
}
`;
const ringVertex = /* glsl */ `
uniform float uTime;
uniform float uWarp;

varying vec2 vUv;
varying vec3 vViewDir;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simplex3d"]}

void main() {
  vUv = uv;
  vec3 p = position;
  p += normal * snoise(vec3(position.xy * 2.0, uTime * 0.2)) * uWarp;
  vec4 world = modelMatrix * vec4(p, 1.0);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
const ringFragment = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform vec3 uHotColor;
uniform float uTime;
uniform float uOpacity;
uniform float uSpeed;
uniform float uSeed;
uniform float uLight;
uniform vec3 uPaper;
uniform vec3 uInk;

varying vec2 vUv;
varying vec3 vViewDir;

void main() {
  // vUv.x runs around the ring, vUv.y across the tube.
  float across = abs(vUv.y - 0.5) * 2.0;
  float body = pow(1.0 - across, 2.2);

  float head = fract(uTime * uSpeed + uSeed);
  float d = abs(fract(vUv.x - head + 0.5) - 0.5);
  float pulse = exp(-pow(d * 17.0, 2.0));

  float sweep = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(vUv.x * 6.2831 - uTime * 0.3 + uSeed * 6.0), 2.0);

  vec3 col = uColor * sweep;
  col += uHotColor * pulse * 2.2;

  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(col, mix(uPaper, uInk, clamp(lum * 1.3, 0.0, 1.0)), uLight);

  float alpha = uOpacity * body * (0.28 + sweep * 0.5 + pulse * 1.1);
  alpha *= mix(1.0, 1.5, uLight);
  if (alpha < 0.003) discard;

  gl_FragColor = vec4(col, alpha);
}
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shaders/field.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fieldFragment",
    ()=>fieldFragment,
    "fieldVertex",
    ()=>fieldVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/chunks/noise.ts [app-client] (ecmascript)");
;
const fieldVertex = /* glsl */ `
attribute vec3 aF1;
attribute vec3 aF2;
attribute vec3 aF3;
attribute vec3 aF4;
attribute vec3 aF5;
attribute vec3 aF6;
attribute vec4 aSeed; // x: random, y: size, z: cluster, w: tech node

uniform float uTime;
uniform float uMorph;
uniform float uTurbulence;
uniform float uSize;
uniform float uPixelRatio;
uniform float uIntro;
uniform float uActiveCluster;
uniform float uActiveTech;
uniform float uClusterDim;
uniform float uFocusRange;
uniform vec2  uPointer;
uniform float uDrift;

varying float vAlpha;
varying float vEnergy;
varying float vSeed;
varying float vHighlight;
varying float vDepth;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simplex3d"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["helpers"]}

vec3 resolveFormation(float m) {
  vec3 p = position;
  p = mix(p, aF1, smoothstep(0.0, 1.0, clamp(m,       0.0, 1.0)));
  p = mix(p, aF2, smoothstep(0.0, 1.0, clamp(m - 1.0, 0.0, 1.0)));
  p = mix(p, aF3, smoothstep(0.0, 1.0, clamp(m - 2.0, 0.0, 1.0)));
  p = mix(p, aF4, smoothstep(0.0, 1.0, clamp(m - 3.0, 0.0, 1.0)));
  p = mix(p, aF5, smoothstep(0.0, 1.0, clamp(m - 4.0, 0.0, 1.0)));
  p = mix(p, aF6, smoothstep(0.0, 1.0, clamp(m - 5.0, 0.0, 1.0)));
  return p;
}

void main() {
  vSeed = aSeed.x;

  // Per-point lag: the field arrives as a wave, not a switch.
  float lag = (aSeed.x - 0.5) * 0.62;
  float m = clamp(uMorph + lag, 0.0, 6.0);

  vec3 p = resolveFormation(m);

  // Services beat: the focused cluster steps forward, the rest recede. Depth
  // does the work of a highlight without changing the composition.
  float clusterW0 = 1.0 - clamp(abs(m - 1.0), 0.0, 1.0);
  float clusterHit0 = 1.0 - step(0.5, abs(aSeed.z - uActiveCluster));
  p.z += clusterW0 * mix(-1.9, 0.85, clusterHit0);

  // Continuous life. Amplitude rises sharply while the field reconfigures.
  float t = uTime * 0.085;
  vec3 np = p * 0.38 + vec3(0.0, t * 1.6, t);
  vec3 flow = vec3(
    snoise(np),
    snoise(np + vec3(37.1, 11.7, 5.3)),
    snoise(np + vec3(-19.3, 41.9, 23.7))
  );

  float turb = uTurbulence;
  p += flow * (0.055 + turb * 0.85) * (0.6 + aSeed.x * 0.8);

  // Slow global drift so nothing ever looks frozen.
  p.y += sin(uTime * 0.22 + aSeed.x * 12.0) * 0.035 * uDrift;

  // Parallax response to the pointer, stronger on nearer points.
  p.x += uPointer.x * 0.22 * (0.35 + aSeed.x * 0.9);
  p.y += uPointer.y * 0.16 * (0.35 + aSeed.x * 0.9);

  // Page-load convergence: the core assembles from the outside in.
  float ip = easeOutExpo(clamp((uIntro - aSeed.x * 0.3) / 0.7, 0.0, 1.0));
  p *= mix(2.6, 1.0, ip);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float dist = max(-mv.z, 0.001);
  vDepth = dist;

  // Section-scoped highlighting (hovered service cluster / technology node).
  float clusterW = 1.0 - clamp(abs(m - 1.0), 0.0, 1.0);
  float clusterHit = 1.0 - step(0.5, abs(aSeed.z - uActiveCluster));
  float techW = 1.0 - clamp(abs(m - 2.0), 0.0, 1.0);
  float techHit = (1.0 - step(0.5, abs(aSeed.w - uActiveTech))) * step(0.0, uActiveTech);
  vHighlight = max(clusterHit * clusterW, techHit * techW);

  float energy = length(flow) * 0.4 + turb * 2.2;
  vEnergy = clamp(energy, 0.0, 1.6);

  float size = uSize * aSeed.y
    * (1.0 + vHighlight * 1.35)
    * (1.0 + turb * 0.7);

  // The upper clamp matters: without it, points that pass close to the camera
  // blow up into soft discs and the field stops reading as particles.
  gl_PointSize = clamp((size * uPixelRatio) / dist, 0.55, 13.0);

  // Fade the far field so depth reads without relying only on DOF.
  float depthFade = 1.0 - smoothstep(uFocusRange * 0.55, uFocusRange, dist);
  vAlpha = ip * mix(0.18, 1.0, depthFade) * (0.55 + aSeed.x * 0.6);

  // In the services beat, ghost every cluster except the focused one. The four
  // systems stay legible as a set, but only one competes with the copy.
  vAlpha *= mix(1.0, mix(uClusterDim, 1.0, clusterHit), clusterW);
}
`;
const fieldFragment = /* glsl */ `
precision highp float;

uniform vec3 uColorDeep;
uniform vec3 uColorMid;
uniform vec3 uColorHot;
uniform float uOpacity;
uniform float uLight;
uniform vec3 uInkDeep;
uniform vec3 uInkMid;
uniform vec3 uInkHot;

varying float vAlpha;
varying float vEnergy;
varying float vSeed;
varying float vHighlight;
varying float vDepth;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = dot(uv, uv);
  if (d > 0.25) discard;

  // Soft body + tight hot centre gives points a lens-like quality under bloom.
  float body = smoothstep(0.25, 0.005, d);
  float core = smoothstep(0.02, 0.0, d);

  // Dark environment: emissive points, blended additively so overlaps bloom.
  vec3 glowCol = mix(uColorDeep, uColorMid, smoothstep(0.15, 0.9, vSeed));
  glowCol = mix(glowCol, uColorHot, clamp(vEnergy * 0.62, 0.0, 1.0));
  glowCol = mix(glowCol, vec3(1.0), core * 0.7);
  glowCol += uColorMid * vHighlight * 1.1;
  glowCol *= 0.75 + vHighlight * 0.8;

  // Light environment: the same field read as graphite dust settling on paper.
  // Adding light to white does nothing, so here the points darken instead —
  // the host swaps the material to normal blending to match.
  vec3 inkCol = mix(uInkDeep, uInkMid, smoothstep(0.15, 0.9, vSeed));
  inkCol = mix(inkCol, uInkHot, clamp(vEnergy * 0.5, 0.0, 1.0));
  inkCol = mix(inkCol, uInkMid * 0.35, core * 0.8);
  inkCol = mix(inkCol, uInkHot, vHighlight * 0.5);

  vec3 col = mix(glowCol, inkCol, uLight);

  // Ink needs more coverage than glow to register at the same weight.
  float alpha = body * vAlpha * uOpacity * mix(1.0, 1.85, uLight);
  if (alpha < 0.003) discard;

  gl_FragColor = vec4(col, alpha);
}
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shaders/links.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "linkFragment",
    ()=>linkFragment,
    "linkVertex",
    ()=>linkVertex,
    "nodeFragment",
    ()=>nodeFragment,
    "nodeVertex",
    ()=>nodeVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shaders/chunks/noise.ts [app-client] (ecmascript)");
;
const linkVertex = /* glsl */ `
attribute float aT;      // 0..1 along the segment
attribute float aLink;   // segment index, for de-syncing pulses
attribute vec2  aEnds;   // node indices at either end

uniform float uActiveTech;

varying float vT;
varying float vLink;
varying float vHighlight;

void main() {
  vT = aT;
  vLink = aLink;

  float on = step(0.0, uActiveTech);
  float hit = max(
    1.0 - step(0.5, abs(aEnds.x - uActiveTech)),
    1.0 - step(0.5, abs(aEnds.y - uActiveTech))
  );
  vHighlight = hit * on;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const linkFragment = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform vec3 uPulseColor;
uniform float uTime;
uniform float uOpacity;
uniform float uReveal;

varying float vT;
varying float vLink;
varying float vHighlight;

${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shaders$2f$chunks$2f$noise$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["helpers"]}

void main() {
  // Segments draw in from their origin as the section arrives.
  float draw = smoothstep(vT - 0.12, vT, uReveal);

  // A bright head travelling the wire, offset per segment.
  float head = fract(uTime * 0.16 + hash11(vLink + 1.0));
  float pulse = exp(-pow((vT - head) * 13.0, 2.0));

  // Fade toward the ends so links read as light, not as drawn lines.
  float taper = sin(vT * 3.14159);

  vec3 col = uColor * (0.6 + taper * 0.8);
  col += uPulseColor * pulse * (1.6 + vHighlight * 2.0);
  col += uColor * vHighlight * 1.2;

  float alpha = uOpacity * draw * (0.5 + taper * 0.55 + pulse * 1.1 + vHighlight * 0.6);
  if (alpha < 0.003) discard;

  gl_FragColor = vec4(col, alpha);
}
`;
const nodeVertex = /* glsl */ `
uniform float uTime;
uniform float uFocus;

varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vec3 p = position * (1.0 + uFocus * 0.35 + sin(uTime * 1.6) * 0.03 * uFocus);
  vec4 world = modelMatrix * vec4(p, 1.0);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
const nodeFragment = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform vec3 uFocusColor;
uniform float uFocus;
uniform float uOpacity;

varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDir);
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.2);
  float facing = clamp(dot(N, V), 0.0, 1.0);

  vec3 col = mix(uColor, uFocusColor, uFocus);
  vec3 out_ = col * (0.25 + facing * 0.35) + col * fres * 1.9;
  out_ += vec3(1.0) * pow(fres, 6.0) * (0.4 + uFocus * 1.2);

  float alpha = uOpacity * (0.35 + fres * 0.75 + uFocus * 0.3);
  if (alpha < 0.003) discard;
  gl_FragColor = vec4(out_, alpha);
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

//# sourceMappingURL=src_10ywc2l._.js.map