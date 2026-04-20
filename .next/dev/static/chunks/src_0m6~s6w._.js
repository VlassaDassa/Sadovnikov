(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useBreakpoint.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBreakpoint",
    ()=>useBreakpoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useBreakpoint = ()=>{
    _s();
    const [breakpoint, setBreakpoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('mobile');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBreakpoint.useEffect": ()=>{
            const updateBreakpoint = {
                "useBreakpoint.useEffect.updateBreakpoint": ()=>{
                    if (window.innerWidth >= 1280) {
                        setBreakpoint('desktop');
                    } else if (window.innerWidth >= 768) {
                        setBreakpoint('tablet');
                    } else {
                        setBreakpoint('mobile');
                    }
                }
            }["useBreakpoint.useEffect.updateBreakpoint"];
            updateBreakpoint();
            window.addEventListener('resize', updateBreakpoint);
            return ({
                "useBreakpoint.useEffect": ()=>window.removeEventListener('resize', updateBreakpoint)
            })["useBreakpoint.useEffect"];
        }
    }["useBreakpoint.useEffect"], []);
    return breakpoint;
};
_s(useBreakpoint, "f8l0DGUlEcgmlQsnC4WY3SGVIos=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/IconBell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const IconBell = ({ strokeColor, fillColor, iconClass, size })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        className: iconClass,
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9",
            stroke: strokeColor,
            fill: fillColor,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/IconBell.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/IconBell.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = IconBell;
const __TURBOPACK__default__export__ = IconBell;
var _c;
__turbopack_context__.k.register(_c, "IconBell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/IconTrash.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const IconTrash = ({ strokeColor, fillColor, iconClass, size })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        className: iconClass,
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20",
            stroke: strokeColor,
            fill: fillColor,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/IconTrash.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/IconTrash.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = IconTrash;
const __TURBOPACK__default__export__ = IconTrash;
var _c;
__turbopack_context__.k.register(_c, "IconTrash");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/IconLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const IconLoader = ({ strokeColor, iconClass, size })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: `0 0 64 64`,
        className: iconClass,
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                clipPath: "url(#clip0_105_300)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M48.9707 15.0296L45.2 18.8002C42.1464 15.7464 38.1285 13.8457 33.8307 13.4222C29.5329 12.9987 25.2212 14.0785 21.6302 16.4775C18.0393 18.8766 15.3913 22.4466 14.1374 26.5792C12.8836 30.7118 13.1014 35.1513 14.7538 39.1413C16.4062 43.1312 19.391 46.4248 23.1995 48.4609C27.0081 50.4969 31.4048 51.1494 35.6405 50.3071C39.8762 49.4649 43.6888 47.1801 46.4287 43.8419C49.1686 40.5038 50.6664 36.3189 50.6667 32.0002H56C56 37.5528 54.0746 42.9335 50.5521 47.2256C47.0296 51.5178 42.1278 54.4557 36.682 55.5389C31.2361 56.6221 25.5832 55.7835 20.6863 53.1661C15.7895 50.5486 11.9517 46.3142 9.82683 41.1843C7.70201 36.0544 7.42164 30.3465 9.03349 25.033C10.6453 19.7196 14.0497 15.1295 18.6665 12.0447C23.2832 8.95989 28.8268 7.57134 34.3526 8.11562C39.8784 8.6599 45.0445 11.1033 48.9707 15.0296Z",
                    stroke: strokeColor,
                    fill: strokeColor,
                    strokeWidth: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/icons/IconLoader.tsx",
                    lineNumber: 14,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/icons/IconLoader.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                    id: "clip0_105_300",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: size && size * 3,
                        height: size && size * 3
                    }, void 0, false, {
                        fileName: "[project]/src/components/icons/IconLoader.tsx",
                        lineNumber: 22,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/icons/IconLoader.tsx",
                    lineNumber: 21,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/icons/IconLoader.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/icons/IconLoader.tsx",
        lineNumber: 12,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0));
};
_c = IconLoader;
const __TURBOPACK__default__export__ = IconLoader;
var _c;
__turbopack_context__.k.register(_c, "IconLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/IconTelegram.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const IconTelegram = ({ strokeColor, fillColor, iconClass, size })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 17 14",
        className: iconClass,
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M15.5538 0.091979L0.778839 5.78948C-0.229495 6.19448 -0.223661 6.75698 0.593839 7.00781L4.38717 8.19115L13.1638 2.65365C13.5788 2.40115 13.958 2.53698 13.6463 2.81365L6.53551 9.23115H6.53384L6.53551 9.23198L6.27384 13.142C6.65717 13.142 6.82634 12.9661 7.04134 12.7586L8.88384 10.967L12.7163 13.7978C13.423 14.187 13.9305 13.987 14.1063 13.1436L16.6222 1.28698C16.8797 0.254479 16.228 -0.213021 15.5538 0.091979Z",
            stroke: strokeColor,
            fill: fillColor,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/IconTelegram.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/IconTelegram.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = IconTelegram;
const __TURBOPACK__default__export__ = IconTelegram;
var _c;
__turbopack_context__.k.register(_c, "IconTelegram");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/IconPhone.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const IconPhone = ({ strokeColor, fillColor, iconClass, size })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 19 19",
        className: iconClass,
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M8.1292 4.53417L5.31003 1.28001C4.98503 0.905006 4.3892 0.906672 4.0117 1.28501L1.69337 3.60751C1.00337 4.29834 0.805865 5.32417 1.20503 6.14667C3.58971 11.0841 7.57174 15.0717 12.5059 17.4633C13.3275 17.8625 14.3525 17.665 15.0425 16.9742L17.3825 14.63C17.7617 14.2508 17.7625 13.6517 17.3842 13.3267L14.1175 10.5225C13.7759 10.2292 13.245 10.2675 12.9025 10.6108L11.7659 11.7492C11.7077 11.8102 11.6311 11.8504 11.5478 11.8636C11.4646 11.8769 11.3793 11.8624 11.305 11.8225C9.44707 10.7526 7.90586 9.20936 6.83837 7.35001C6.79839 7.27563 6.78391 7.19019 6.79716 7.1068C6.81041 7.02341 6.85064 6.94666 6.9117 6.88834L8.04503 5.75417C8.38837 5.40917 8.42587 4.87667 8.1292 4.53417Z",
            stroke: strokeColor,
            fill: fillColor,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/IconPhone.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/IconPhone.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = IconPhone;
const __TURBOPACK__default__export__ = IconPhone;
var _c;
__turbopack_context__.k.register(_c, "IconPhone");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/IconEmail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const IconEmail = ({ strokeColor, fillColor, iconClass, size })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 18 12",
        className: iconClass,
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M1.88 0H15.13C16.38 0 17.01 0.59 17.01 1.79V10.21C17.01 11.4 16.38 12 15.13 12H1.88C0.63 12 0 11.4 0 10.21V1.79C0 0.59 0.63 0 1.88 0ZM8.5 8.6L15.24 3.07C15.48 2.87 15.67 2.41 15.37 2C15.08 1.59 14.55 1.58 14.2 1.83L8.5 5.69L2.81 1.83C2.46 1.58 1.93 1.59 1.64 2C1.34 2.41 1.53 2.87 1.77 3.07L8.5 8.6Z",
            stroke: strokeColor,
            fill: fillColor,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/IconEmail.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/IconEmail.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = IconEmail;
const __TURBOPACK__default__export__ = IconEmail;
var _c;
__turbopack_context__.k.register(_c, "IconEmail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/Icon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconBell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/IconBell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconTrash$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/IconTrash.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/IconLoader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconTelegram$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/IconTelegram.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconPhone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/IconPhone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconEmail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/IconEmail.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
const icons = {
    bell: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconBell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    trash: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconTrash$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    loader: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    telegram: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconTelegram$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconPhone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$IconEmail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
};
const Icon = ({ name, strokeColor, fillColor, iconClass, size = 24 })=>{
    const Component = icons[name];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        strokeColor: strokeColor,
        fillColor: fillColor,
        iconClass: `${iconClass} ${name === 'loader' ? 'icon-btn-loader' : null}`,
        size: size
    }, void 0, false, {
        fileName: "[project]/src/components/icons/Icon.tsx",
        lineNumber: 32,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Icon;
const __TURBOPACK__default__export__ = Icon;
var _c;
__turbopack_context__.k.register(_c, "Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/__variables.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
});
}),
"[project]/src/components/general/button/DecorButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/__variables.module.scss [app-client] (css module)");
;
;
;
const bigBgBtn = '/images/button/bg_big_btn.png';
const mediumBgBtn = '/images/button/bg_medium_btn.png';
const smallBgBtn = '/images/button/bg_small_btn.png';
const indexFinger = '/images/button/index_finger.png';
const DecorButton = ({ behavior = 'default', variant = 'medium', text = {
    default: 'Button',
    alter: 'btn'
}, additionalClass, onClick, breakpoint })=>{
    const size = breakpoint === 'desktop' ? 'big' : breakpoint === 'tablet' ? 'medium' : 'small';
    const curText = breakpoint === 'mobile' ? text.alter : text.default;
    const bgBtn = variant === 'big' ? bigBgBtn : variant === 'medium' ? mediumBgBtn : smallBgBtn;
    // Определение размера декоративного Loader
    const defineSizeLoader = ()=>{
        if (variant === 'big') {
            // Размер для большого варианта
            if (size === 'big') {
                return 64;
            } else if (size === 'medium') {
                return 44;
            } else {
                return 24;
            }
        } else if (variant === 'medium') {
            // Размер для среднего варианта
            if (size === 'big') {
                return 44;
            } else {
                return 24;
            }
        } else {
            return 24;
        }
    };
    // Если ожидание загрузки, вместо текста - иконка
    const buttonContent = behavior === 'loading' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        name: "loader",
        strokeColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].white,
        iconClass: "btnLoader",
        size: defineSizeLoader()
    }, void 0, false, {
        fileName: "[project]/src/components/general/button/DecorButton.tsx",
        lineNumber: 85,
        columnNumber: 21
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: `whiteText 
                            ${textDecorBtn} 
                            textDecorBtn-${variant} 
                            textDecorBtn-${variant}-${size}
                        `,
        children: curText
    }, void 0, false, {
        fileName: "[project]/src/components/general/button/DecorButton.tsx",
        lineNumber: 92,
        columnNumber: 21
    }, ("TURBOPACK compile-time value", void 0));
    // Если вариант кнопки "big", показывать характерные элементы
    const variantElements = variant === 'big' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: indexFinger,
                alt: "",
                "aria-hidden": "true",
                className: `decorBtnIcon 
                                decorBtnIconPosition_${behavior} 
                                decorBtnIcon_${size}
                                `
            }, void 0, false, {
                fileName: "[project]/src/components/general/button/DecorButton.tsx",
                lineNumber: 107,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `decorBtnLabel lightText decorBtnLabel_${size}`,
                children: "(click)"
            }, void 0, false, {
                fileName: "[project]/src/components/general/button/DecorButton.tsx",
                lineNumber: 119,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        tabIndex: 0,
        role: "button",
        className: `decorBtn 
                decorBtn-${additionalClass} 
                decorBtn_${behavior} 
                decorBtn-${variant}`,
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: `decorBgBtnBig 
                    decorBgBtn-${variant}-${size} 
                    decorBgBtn-${variant}-${behavior}
                    `,
                src: bgBtn,
                alt: "",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/general/button/DecorButton.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            buttonContent,
            variantElements
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/general/button/DecorButton.tsx",
        lineNumber: 126,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = DecorButton;
const __TURBOPACK__default__export__ = DecorButton;
var _c;
__turbopack_context__.k.register(_c, "DecorButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/general/header/index.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "body-14-magra-black": "index-module-scss-module___WcdWG__body-14-magra-black",
  "body-14-magra-bold": "index-module-scss-module___WcdWG__body-14-magra-bold",
  "body-14-magra-exta_bold": "index-module-scss-module___WcdWG__body-14-magra-exta_bold",
  "body-14-magra-extra_ligth": "index-module-scss-module___WcdWG__body-14-magra-extra_ligth",
  "body-14-magra-light": "index-module-scss-module___WcdWG__body-14-magra-light",
  "body-14-magra-medium": "index-module-scss-module___WcdWG__body-14-magra-medium",
  "body-14-magra-regular": "index-module-scss-module___WcdWG__body-14-magra-regular",
  "body-14-magra-semi_bold": "index-module-scss-module___WcdWG__body-14-magra-semi_bold",
  "body-14-magra-thin": "index-module-scss-module___WcdWG__body-14-magra-thin",
  "body-14-mont-black": "index-module-scss-module___WcdWG__body-14-mont-black",
  "body-14-mont-bold": "index-module-scss-module___WcdWG__body-14-mont-bold",
  "body-14-mont-exta_bold": "index-module-scss-module___WcdWG__body-14-mont-exta_bold",
  "body-14-mont-extra_ligth": "index-module-scss-module___WcdWG__body-14-mont-extra_ligth",
  "body-14-mont-light": "index-module-scss-module___WcdWG__body-14-mont-light",
  "body-14-mont-medium": "index-module-scss-module___WcdWG__body-14-mont-medium",
  "body-14-mont-regular": "index-module-scss-module___WcdWG__body-14-mont-regular",
  "body-14-mont-semi_bold": "index-module-scss-module___WcdWG__body-14-mont-semi_bold",
  "body-14-mont-thin": "index-module-scss-module___WcdWG__body-14-mont-thin",
  "body-16-magra-black": "index-module-scss-module___WcdWG__body-16-magra-black",
  "body-16-magra-bold": "index-module-scss-module___WcdWG__body-16-magra-bold",
  "body-16-magra-exta_bold": "index-module-scss-module___WcdWG__body-16-magra-exta_bold",
  "body-16-magra-extra_ligth": "index-module-scss-module___WcdWG__body-16-magra-extra_ligth",
  "body-16-magra-light": "index-module-scss-module___WcdWG__body-16-magra-light",
  "body-16-magra-medium": "index-module-scss-module___WcdWG__body-16-magra-medium",
  "body-16-magra-regular": "index-module-scss-module___WcdWG__body-16-magra-regular",
  "body-16-magra-semi_bold": "index-module-scss-module___WcdWG__body-16-magra-semi_bold",
  "body-16-magra-thin": "index-module-scss-module___WcdWG__body-16-magra-thin",
  "body-16-mont-black": "index-module-scss-module___WcdWG__body-16-mont-black",
  "body-16-mont-bold": "index-module-scss-module___WcdWG__body-16-mont-bold",
  "body-16-mont-exta_bold": "index-module-scss-module___WcdWG__body-16-mont-exta_bold",
  "body-16-mont-extra_ligth": "index-module-scss-module___WcdWG__body-16-mont-extra_ligth",
  "body-16-mont-light": "index-module-scss-module___WcdWG__body-16-mont-light",
  "body-16-mont-medium": "index-module-scss-module___WcdWG__body-16-mont-medium",
  "body-16-mont-regular": "index-module-scss-module___WcdWG__body-16-mont-regular",
  "body-16-mont-semi_bold": "index-module-scss-module___WcdWG__body-16-mont-semi_bold",
  "body-16-mont-thin": "index-module-scss-module___WcdWG__body-16-mont-thin",
  "body-20-magra-black": "index-module-scss-module___WcdWG__body-20-magra-black",
  "body-20-magra-bold": "index-module-scss-module___WcdWG__body-20-magra-bold",
  "body-20-magra-exta_bold": "index-module-scss-module___WcdWG__body-20-magra-exta_bold",
  "body-20-magra-extra_ligth": "index-module-scss-module___WcdWG__body-20-magra-extra_ligth",
  "body-20-magra-light": "index-module-scss-module___WcdWG__body-20-magra-light",
  "body-20-magra-medium": "index-module-scss-module___WcdWG__body-20-magra-medium",
  "body-20-magra-regular": "index-module-scss-module___WcdWG__body-20-magra-regular",
  "body-20-magra-semi_bold": "index-module-scss-module___WcdWG__body-20-magra-semi_bold",
  "body-20-magra-thin": "index-module-scss-module___WcdWG__body-20-magra-thin",
  "body-20-mont-black": "index-module-scss-module___WcdWG__body-20-mont-black",
  "body-20-mont-bold": "index-module-scss-module___WcdWG__body-20-mont-bold",
  "body-20-mont-exta_bold": "index-module-scss-module___WcdWG__body-20-mont-exta_bold",
  "body-20-mont-extra_ligth": "index-module-scss-module___WcdWG__body-20-mont-extra_ligth",
  "body-20-mont-light": "index-module-scss-module___WcdWG__body-20-mont-light",
  "body-20-mont-medium": "index-module-scss-module___WcdWG__body-20-mont-medium",
  "body-20-mont-regular": "index-module-scss-module___WcdWG__body-20-mont-regular",
  "body-20-mont-semi_bold": "index-module-scss-module___WcdWG__body-20-mont-semi_bold",
  "body-20-mont-thin": "index-module-scss-module___WcdWG__body-20-mont-thin",
  "body-24-magra-black": "index-module-scss-module___WcdWG__body-24-magra-black",
  "body-24-magra-bold": "index-module-scss-module___WcdWG__body-24-magra-bold",
  "body-24-magra-exta_bold": "index-module-scss-module___WcdWG__body-24-magra-exta_bold",
  "body-24-magra-extra_ligth": "index-module-scss-module___WcdWG__body-24-magra-extra_ligth",
  "body-24-magra-light": "index-module-scss-module___WcdWG__body-24-magra-light",
  "body-24-magra-medium": "index-module-scss-module___WcdWG__body-24-magra-medium",
  "body-24-magra-regular": "index-module-scss-module___WcdWG__body-24-magra-regular",
  "body-24-magra-semi_bold": "index-module-scss-module___WcdWG__body-24-magra-semi_bold",
  "body-24-magra-thin": "index-module-scss-module___WcdWG__body-24-magra-thin",
  "body-24-mont-black": "index-module-scss-module___WcdWG__body-24-mont-black",
  "body-24-mont-bold": "index-module-scss-module___WcdWG__body-24-mont-bold",
  "body-24-mont-exta_bold": "index-module-scss-module___WcdWG__body-24-mont-exta_bold",
  "body-24-mont-extra_ligth": "index-module-scss-module___WcdWG__body-24-mont-extra_ligth",
  "body-24-mont-light": "index-module-scss-module___WcdWG__body-24-mont-light",
  "body-24-mont-medium": "index-module-scss-module___WcdWG__body-24-mont-medium",
  "body-24-mont-regular": "index-module-scss-module___WcdWG__body-24-mont-regular",
  "body-24-mont-semi_bold": "index-module-scss-module___WcdWG__body-24-mont-semi_bold",
  "body-24-mont-thin": "index-module-scss-module___WcdWG__body-24-mont-thin",
  "btnBurger": "index-module-scss-module___WcdWG__btnBurger",
  "darkText": "index-module-scss-module___WcdWG__darkText",
  "decorBgBtnBig": "index-module-scss-module___WcdWG__decorBgBtnBig",
  "decorBtn-changeLang": "index-module-scss-module___WcdWG__decorBtn-changeLang",
  "glass": "index-module-scss-module___WcdWG__glass",
  "header": "index-module-scss-module___WcdWG__header",
  "headerNav": "index-module-scss-module___WcdWG__headerNav",
  "headerNavItemLink": "index-module-scss-module___WcdWG__headerNavItemLink",
  "headerNavList": "index-module-scss-module___WcdWG__headerNavList",
  "heading-128-magra-black": "index-module-scss-module___WcdWG__heading-128-magra-black",
  "heading-128-magra-bold": "index-module-scss-module___WcdWG__heading-128-magra-bold",
  "heading-128-magra-exta_bold": "index-module-scss-module___WcdWG__heading-128-magra-exta_bold",
  "heading-128-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-128-magra-extra_ligth",
  "heading-128-magra-light": "index-module-scss-module___WcdWG__heading-128-magra-light",
  "heading-128-magra-medium": "index-module-scss-module___WcdWG__heading-128-magra-medium",
  "heading-128-magra-regular": "index-module-scss-module___WcdWG__heading-128-magra-regular",
  "heading-128-magra-semi_bold": "index-module-scss-module___WcdWG__heading-128-magra-semi_bold",
  "heading-128-magra-thin": "index-module-scss-module___WcdWG__heading-128-magra-thin",
  "heading-128-mont-black": "index-module-scss-module___WcdWG__heading-128-mont-black",
  "heading-128-mont-bold": "index-module-scss-module___WcdWG__heading-128-mont-bold",
  "heading-128-mont-exta_bold": "index-module-scss-module___WcdWG__heading-128-mont-exta_bold",
  "heading-128-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-128-mont-extra_ligth",
  "heading-128-mont-light": "index-module-scss-module___WcdWG__heading-128-mont-light",
  "heading-128-mont-medium": "index-module-scss-module___WcdWG__heading-128-mont-medium",
  "heading-128-mont-regular": "index-module-scss-module___WcdWG__heading-128-mont-regular",
  "heading-128-mont-semi_bold": "index-module-scss-module___WcdWG__heading-128-mont-semi_bold",
  "heading-128-mont-thin": "index-module-scss-module___WcdWG__heading-128-mont-thin",
  "heading-20-magra-black": "index-module-scss-module___WcdWG__heading-20-magra-black",
  "heading-20-magra-bold": "index-module-scss-module___WcdWG__heading-20-magra-bold",
  "heading-20-magra-exta_bold": "index-module-scss-module___WcdWG__heading-20-magra-exta_bold",
  "heading-20-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-20-magra-extra_ligth",
  "heading-20-magra-light": "index-module-scss-module___WcdWG__heading-20-magra-light",
  "heading-20-magra-medium": "index-module-scss-module___WcdWG__heading-20-magra-medium",
  "heading-20-magra-regular": "index-module-scss-module___WcdWG__heading-20-magra-regular",
  "heading-20-magra-semi_bold": "index-module-scss-module___WcdWG__heading-20-magra-semi_bold",
  "heading-20-magra-thin": "index-module-scss-module___WcdWG__heading-20-magra-thin",
  "heading-20-mont-black": "index-module-scss-module___WcdWG__heading-20-mont-black",
  "heading-20-mont-bold": "index-module-scss-module___WcdWG__heading-20-mont-bold",
  "heading-20-mont-exta_bold": "index-module-scss-module___WcdWG__heading-20-mont-exta_bold",
  "heading-20-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-20-mont-extra_ligth",
  "heading-20-mont-light": "index-module-scss-module___WcdWG__heading-20-mont-light",
  "heading-20-mont-medium": "index-module-scss-module___WcdWG__heading-20-mont-medium",
  "heading-20-mont-regular": "index-module-scss-module___WcdWG__heading-20-mont-regular",
  "heading-20-mont-semi_bold": "index-module-scss-module___WcdWG__heading-20-mont-semi_bold",
  "heading-20-mont-thin": "index-module-scss-module___WcdWG__heading-20-mont-thin",
  "heading-24-magra-black": "index-module-scss-module___WcdWG__heading-24-magra-black",
  "heading-24-magra-bold": "index-module-scss-module___WcdWG__heading-24-magra-bold",
  "heading-24-magra-exta_bold": "index-module-scss-module___WcdWG__heading-24-magra-exta_bold",
  "heading-24-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-24-magra-extra_ligth",
  "heading-24-magra-light": "index-module-scss-module___WcdWG__heading-24-magra-light",
  "heading-24-magra-medium": "index-module-scss-module___WcdWG__heading-24-magra-medium",
  "heading-24-magra-regular": "index-module-scss-module___WcdWG__heading-24-magra-regular",
  "heading-24-magra-semi_bold": "index-module-scss-module___WcdWG__heading-24-magra-semi_bold",
  "heading-24-magra-thin": "index-module-scss-module___WcdWG__heading-24-magra-thin",
  "heading-24-mont-black": "index-module-scss-module___WcdWG__heading-24-mont-black",
  "heading-24-mont-bold": "index-module-scss-module___WcdWG__heading-24-mont-bold",
  "heading-24-mont-exta_bold": "index-module-scss-module___WcdWG__heading-24-mont-exta_bold",
  "heading-24-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-24-mont-extra_ligth",
  "heading-24-mont-light": "index-module-scss-module___WcdWG__heading-24-mont-light",
  "heading-24-mont-medium": "index-module-scss-module___WcdWG__heading-24-mont-medium",
  "heading-24-mont-regular": "index-module-scss-module___WcdWG__heading-24-mont-regular",
  "heading-24-mont-semi_bold": "index-module-scss-module___WcdWG__heading-24-mont-semi_bold",
  "heading-24-mont-thin": "index-module-scss-module___WcdWG__heading-24-mont-thin",
  "heading-32-magra-black": "index-module-scss-module___WcdWG__heading-32-magra-black",
  "heading-32-magra-bold": "index-module-scss-module___WcdWG__heading-32-magra-bold",
  "heading-32-magra-exta_bold": "index-module-scss-module___WcdWG__heading-32-magra-exta_bold",
  "heading-32-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-32-magra-extra_ligth",
  "heading-32-magra-light": "index-module-scss-module___WcdWG__heading-32-magra-light",
  "heading-32-magra-medium": "index-module-scss-module___WcdWG__heading-32-magra-medium",
  "heading-32-magra-regular": "index-module-scss-module___WcdWG__heading-32-magra-regular",
  "heading-32-magra-semi_bold": "index-module-scss-module___WcdWG__heading-32-magra-semi_bold",
  "heading-32-magra-thin": "index-module-scss-module___WcdWG__heading-32-magra-thin",
  "heading-32-mont-black": "index-module-scss-module___WcdWG__heading-32-mont-black",
  "heading-32-mont-bold": "index-module-scss-module___WcdWG__heading-32-mont-bold",
  "heading-32-mont-exta_bold": "index-module-scss-module___WcdWG__heading-32-mont-exta_bold",
  "heading-32-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-32-mont-extra_ligth",
  "heading-32-mont-light": "index-module-scss-module___WcdWG__heading-32-mont-light",
  "heading-32-mont-medium": "index-module-scss-module___WcdWG__heading-32-mont-medium",
  "heading-32-mont-regular": "index-module-scss-module___WcdWG__heading-32-mont-regular",
  "heading-32-mont-semi_bold": "index-module-scss-module___WcdWG__heading-32-mont-semi_bold",
  "heading-32-mont-thin": "index-module-scss-module___WcdWG__heading-32-mont-thin",
  "heading-36-magra-black": "index-module-scss-module___WcdWG__heading-36-magra-black",
  "heading-36-magra-bold": "index-module-scss-module___WcdWG__heading-36-magra-bold",
  "heading-36-magra-exta_bold": "index-module-scss-module___WcdWG__heading-36-magra-exta_bold",
  "heading-36-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-36-magra-extra_ligth",
  "heading-36-magra-light": "index-module-scss-module___WcdWG__heading-36-magra-light",
  "heading-36-magra-medium": "index-module-scss-module___WcdWG__heading-36-magra-medium",
  "heading-36-magra-regular": "index-module-scss-module___WcdWG__heading-36-magra-regular",
  "heading-36-magra-semi_bold": "index-module-scss-module___WcdWG__heading-36-magra-semi_bold",
  "heading-36-magra-thin": "index-module-scss-module___WcdWG__heading-36-magra-thin",
  "heading-36-mont-black": "index-module-scss-module___WcdWG__heading-36-mont-black",
  "heading-36-mont-bold": "index-module-scss-module___WcdWG__heading-36-mont-bold",
  "heading-36-mont-exta_bold": "index-module-scss-module___WcdWG__heading-36-mont-exta_bold",
  "heading-36-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-36-mont-extra_ligth",
  "heading-36-mont-light": "index-module-scss-module___WcdWG__heading-36-mont-light",
  "heading-36-mont-medium": "index-module-scss-module___WcdWG__heading-36-mont-medium",
  "heading-36-mont-regular": "index-module-scss-module___WcdWG__heading-36-mont-regular",
  "heading-36-mont-semi_bold": "index-module-scss-module___WcdWG__heading-36-mont-semi_bold",
  "heading-36-mont-thin": "index-module-scss-module___WcdWG__heading-36-mont-thin",
  "heading-40-magra-black": "index-module-scss-module___WcdWG__heading-40-magra-black",
  "heading-40-magra-bold": "index-module-scss-module___WcdWG__heading-40-magra-bold",
  "heading-40-magra-exta_bold": "index-module-scss-module___WcdWG__heading-40-magra-exta_bold",
  "heading-40-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-40-magra-extra_ligth",
  "heading-40-magra-light": "index-module-scss-module___WcdWG__heading-40-magra-light",
  "heading-40-magra-medium": "index-module-scss-module___WcdWG__heading-40-magra-medium",
  "heading-40-magra-regular": "index-module-scss-module___WcdWG__heading-40-magra-regular",
  "heading-40-magra-semi_bold": "index-module-scss-module___WcdWG__heading-40-magra-semi_bold",
  "heading-40-magra-thin": "index-module-scss-module___WcdWG__heading-40-magra-thin",
  "heading-40-mont-black": "index-module-scss-module___WcdWG__heading-40-mont-black",
  "heading-40-mont-bold": "index-module-scss-module___WcdWG__heading-40-mont-bold",
  "heading-40-mont-exta_bold": "index-module-scss-module___WcdWG__heading-40-mont-exta_bold",
  "heading-40-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-40-mont-extra_ligth",
  "heading-40-mont-light": "index-module-scss-module___WcdWG__heading-40-mont-light",
  "heading-40-mont-medium": "index-module-scss-module___WcdWG__heading-40-mont-medium",
  "heading-40-mont-regular": "index-module-scss-module___WcdWG__heading-40-mont-regular",
  "heading-40-mont-semi_bold": "index-module-scss-module___WcdWG__heading-40-mont-semi_bold",
  "heading-40-mont-thin": "index-module-scss-module___WcdWG__heading-40-mont-thin",
  "heading-48-magra-black": "index-module-scss-module___WcdWG__heading-48-magra-black",
  "heading-48-magra-bold": "index-module-scss-module___WcdWG__heading-48-magra-bold",
  "heading-48-magra-exta_bold": "index-module-scss-module___WcdWG__heading-48-magra-exta_bold",
  "heading-48-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-48-magra-extra_ligth",
  "heading-48-magra-light": "index-module-scss-module___WcdWG__heading-48-magra-light",
  "heading-48-magra-medium": "index-module-scss-module___WcdWG__heading-48-magra-medium",
  "heading-48-magra-regular": "index-module-scss-module___WcdWG__heading-48-magra-regular",
  "heading-48-magra-semi_bold": "index-module-scss-module___WcdWG__heading-48-magra-semi_bold",
  "heading-48-magra-thin": "index-module-scss-module___WcdWG__heading-48-magra-thin",
  "heading-48-mont-black": "index-module-scss-module___WcdWG__heading-48-mont-black",
  "heading-48-mont-bold": "index-module-scss-module___WcdWG__heading-48-mont-bold",
  "heading-48-mont-exta_bold": "index-module-scss-module___WcdWG__heading-48-mont-exta_bold",
  "heading-48-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-48-mont-extra_ligth",
  "heading-48-mont-light": "index-module-scss-module___WcdWG__heading-48-mont-light",
  "heading-48-mont-medium": "index-module-scss-module___WcdWG__heading-48-mont-medium",
  "heading-48-mont-regular": "index-module-scss-module___WcdWG__heading-48-mont-regular",
  "heading-48-mont-semi_bold": "index-module-scss-module___WcdWG__heading-48-mont-semi_bold",
  "heading-48-mont-thin": "index-module-scss-module___WcdWG__heading-48-mont-thin",
  "heading-64-magra-black": "index-module-scss-module___WcdWG__heading-64-magra-black",
  "heading-64-magra-bold": "index-module-scss-module___WcdWG__heading-64-magra-bold",
  "heading-64-magra-exta_bold": "index-module-scss-module___WcdWG__heading-64-magra-exta_bold",
  "heading-64-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-64-magra-extra_ligth",
  "heading-64-magra-light": "index-module-scss-module___WcdWG__heading-64-magra-light",
  "heading-64-magra-medium": "index-module-scss-module___WcdWG__heading-64-magra-medium",
  "heading-64-magra-regular": "index-module-scss-module___WcdWG__heading-64-magra-regular",
  "heading-64-magra-semi_bold": "index-module-scss-module___WcdWG__heading-64-magra-semi_bold",
  "heading-64-magra-thin": "index-module-scss-module___WcdWG__heading-64-magra-thin",
  "heading-64-mont-black": "index-module-scss-module___WcdWG__heading-64-mont-black",
  "heading-64-mont-bold": "index-module-scss-module___WcdWG__heading-64-mont-bold",
  "heading-64-mont-exta_bold": "index-module-scss-module___WcdWG__heading-64-mont-exta_bold",
  "heading-64-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-64-mont-extra_ligth",
  "heading-64-mont-light": "index-module-scss-module___WcdWG__heading-64-mont-light",
  "heading-64-mont-medium": "index-module-scss-module___WcdWG__heading-64-mont-medium",
  "heading-64-mont-regular": "index-module-scss-module___WcdWG__heading-64-mont-regular",
  "heading-64-mont-semi_bold": "index-module-scss-module___WcdWG__heading-64-mont-semi_bold",
  "heading-64-mont-thin": "index-module-scss-module___WcdWG__heading-64-mont-thin",
  "heading-96-magra-black": "index-module-scss-module___WcdWG__heading-96-magra-black",
  "heading-96-magra-bold": "index-module-scss-module___WcdWG__heading-96-magra-bold",
  "heading-96-magra-exta_bold": "index-module-scss-module___WcdWG__heading-96-magra-exta_bold",
  "heading-96-magra-extra_ligth": "index-module-scss-module___WcdWG__heading-96-magra-extra_ligth",
  "heading-96-magra-light": "index-module-scss-module___WcdWG__heading-96-magra-light",
  "heading-96-magra-medium": "index-module-scss-module___WcdWG__heading-96-magra-medium",
  "heading-96-magra-regular": "index-module-scss-module___WcdWG__heading-96-magra-regular",
  "heading-96-magra-semi_bold": "index-module-scss-module___WcdWG__heading-96-magra-semi_bold",
  "heading-96-magra-thin": "index-module-scss-module___WcdWG__heading-96-magra-thin",
  "heading-96-mont-black": "index-module-scss-module___WcdWG__heading-96-mont-black",
  "heading-96-mont-bold": "index-module-scss-module___WcdWG__heading-96-mont-bold",
  "heading-96-mont-exta_bold": "index-module-scss-module___WcdWG__heading-96-mont-exta_bold",
  "heading-96-mont-extra_ligth": "index-module-scss-module___WcdWG__heading-96-mont-extra_ligth",
  "heading-96-mont-light": "index-module-scss-module___WcdWG__heading-96-mont-light",
  "heading-96-mont-medium": "index-module-scss-module___WcdWG__heading-96-mont-medium",
  "heading-96-mont-regular": "index-module-scss-module___WcdWG__heading-96-mont-regular",
  "heading-96-mont-semi_bold": "index-module-scss-module___WcdWG__heading-96-mont-semi_bold",
  "heading-96-mont-thin": "index-module-scss-module___WcdWG__heading-96-mont-thin",
  "lightText": "index-module-scss-module___WcdWG__lightText",
  "line-height-1_5x": "index-module-scss-module___WcdWG__line-height-1_5x",
  "logo": "index-module-scss-module___WcdWG__logo",
  "logoText": "index-module-scss-module___WcdWG__logoText",
  "noize": "index-module-scss-module___WcdWG__noize",
  "overlay": "index-module-scss-module___WcdWG__overlay",
  "radius-12": "index-module-scss-module___WcdWG__radius-12",
  "radius-16": "index-module-scss-module___WcdWG__radius-16",
  "radius-2": "index-module-scss-module___WcdWG__radius-2",
  "radius-24": "index-module-scss-module___WcdWG__radius-24",
  "radius-4": "index-module-scss-module___WcdWG__radius-4",
  "radius-6": "index-module-scss-module___WcdWG__radius-6",
  "radius-8": "index-module-scss-module___WcdWG__radius-8",
  "radius-full": "index-module-scss-module___WcdWG__radius-full",
  "selectLang": "index-module-scss-module___WcdWG__selectLang",
  "selectLang-show": "index-module-scss-module___WcdWG__selectLang-show",
  "selectLangItem": "index-module-scss-module___WcdWG__selectLangItem",
  "shadow-2xl": "index-module-scss-module___WcdWG__shadow-2xl",
  "shadow-inner": "index-module-scss-module___WcdWG__shadow-inner",
  "shadow-lg": "index-module-scss-module___WcdWG__shadow-lg",
  "shadow-xl": "index-module-scss-module___WcdWG__shadow-xl",
  "spanLang": "index-module-scss-module___WcdWG__spanLang",
  "whiteText": "index-module-scss-module___WcdWG__whiteText",
});
}),
"[project]/src/components/general/header/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$button$2f$DecorButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/general/button/DecorButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/general/header/index.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const SelectLang = ({ show, onClick })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `selectLang selectLang-${show ? 'show' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                "data-lang": "RU",
                className: "selectLangItem",
                onClick: onClick,
                children: [
                    "Русский",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "spanLang",
                        children: "RU"
                    }, void 0, false, {
                        fileName: "[project]/src/components/general/header/index.tsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/general/header/index.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                "data-lang": "EN",
                className: "selectLangItem",
                onClick: onClick,
                children: [
                    "Английский",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "spanLang",
                        children: "EN"
                    }, void 0, false, {
                        fileName: "[project]/src/components/general/header/index.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/general/header/index.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/general/header/index.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SelectLang;
const Header = ({ breakpoint })=>{
    _s();
    const [selectLangShow, setSelectLangShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [curLang, setCurLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('RU');
    const toggleLang = ()=>{
        setSelectLangShow((prev)=>!prev);
    };
    const changeLang = (e)=>{
        const newLang = String(e.currentTarget.getAttribute('data-lang'));
        setCurLang(newLang);
        toggleLang();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header} container`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                href: "#",
                "aria-label": "Логотип",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoText,
                    children: "SADOVNIKOV"
                }, void 0, false, {
                    fileName: "[project]/src/components/general/header/index.tsx",
                    lineNumber: 62,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/general/header/index.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnBurger} radius-full`,
                "aria-label": "Открыть меню",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "radius-12"
                    }, void 0, false, {
                        fileName: "[project]/src/components/general/header/index.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "radius-12"
                    }, void 0, false, {
                        fileName: "[project]/src/components/general/header/index.tsx",
                        lineNumber: 72,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "radius-12"
                    }, void 0, false, {
                        fileName: "[project]/src/components/general/header/index.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/general/header/index.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNav,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavList,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItem,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItemLink,
                                href: "#",
                                children: "Contacts"
                            }, void 0, false, {
                                fileName: "[project]/src/components/general/header/index.tsx",
                                lineNumber: 79,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/header/index.tsx",
                            lineNumber: 78,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItem,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItemLink,
                                href: "#",
                                children: "About"
                            }, void 0, false, {
                                fileName: "[project]/src/components/general/header/index.tsx",
                                lineNumber: 83,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/header/index.tsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItem,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItemLink,
                                href: "#",
                                children: "Blog"
                            }, void 0, false, {
                                fileName: "[project]/src/components/general/header/index.tsx",
                                lineNumber: 87,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/header/index.tsx",
                            lineNumber: 86,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItem,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItemLink,
                                href: "#",
                                children: "Portfolio"
                            }, void 0, false, {
                                fileName: "[project]/src/components/general/header/index.tsx",
                                lineNumber: 91,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/header/index.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItem,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$button$2f$DecorButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    behavior: "default",
                                    variant: "small",
                                    text: {
                                        default: curLang,
                                        alter: curLang
                                    },
                                    additionalClass: "changeLang",
                                    breakpoint: breakpoint,
                                    onClick: toggleLang
                                }, void 0, false, {
                                    fileName: "[project]/src/components/general/header/index.tsx",
                                    lineNumber: 95,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectLang, {
                                    show: selectLangShow,
                                    onClick: changeLang
                                }, void 0, false, {
                                    fileName: "[project]/src/components/general/header/index.tsx",
                                    lineNumber: 108,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/general/header/index.tsx",
                            lineNumber: 94,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/general/header/index.tsx",
                    lineNumber: 77,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/general/header/index.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/general/header/index.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Header, "wgx17oDjd6LxhERHdpMByn82irk=");
_c1 = Header;
const __TURBOPACK__default__export__ = Header;
var _c, _c1;
__turbopack_context__.k.register(_c, "SelectLang");
__turbopack_context__.k.register(_c1, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/preview/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
const avatarFrame = '/images/main/avatar_frame.png';
const avatar = '/images/main/avatar.png';
const bgAvatar = '/images/main/bg_avatar.png';
const Preview = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "preview container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "heading-32-magra-bold whiteText",
                children: "FRONTEND DEVELOPER"
            }, void 0, false, {
                fileName: "[project]/src/components/main/preview/index.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "avatarWrapper",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: "bgAvatar",
                        src: bgAvatar,
                        alt: "Photo of developer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/preview/index.tsx",
                        lineNumber: 21,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: "previewAvatar",
                        src: avatar,
                        alt: "Photo of developer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/preview/index.tsx",
                        lineNumber: 22,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: "avatarFrame",
                        src: avatarFrame,
                        alt: "Photo of developer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/preview/index.tsx",
                        lineNumber: 23,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "frameName body-20-magra-regular blackText",
                        children: [
                            "SADOVNIKOV",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/main/preview/index.tsx",
                                lineNumber: 25,
                                columnNumber: 84
                            }, ("TURBOPACK compile-time value", void 0)),
                            "VLAD"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/main/preview/index.tsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/main/preview/index.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/preview/index.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Preview;
const __TURBOPACK__default__export__ = Preview;
var _c;
__turbopack_context__.k.register(_c, "Preview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/talkingAvatar/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
const avatarPic = '/images/main/avatar_without_jaw.png';
const jawPic = '/images/main/jaw.png';
const indexFingerPic = '/images/main/index_finger.png';
const handPic = '/images/main/hand.png';
const cloudPic = '/images/main/cloud.png';
const TalkingAvatar = (props)=>{
    const { hand, indexFinger, text } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "talkingAvatarWrapper",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "avatarPic",
                src: avatarPic,
                alt: "Photo of developer",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/main/talkingAvatar/index.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "jawPic",
                src: jawPic,
                alt: "",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/main/talkingAvatar/index.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            indexFinger ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "indexFingerPic",
                src: indexFingerPic,
                alt: "",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/main/talkingAvatar/index.tsx",
                lineNumber: 35,
                columnNumber: 31
            }, ("TURBOPACK compile-time value", void 0)) : null,
            hand ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "handPic",
                src: handPic,
                alt: "",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/main/talkingAvatar/index.tsx",
                lineNumber: 38,
                columnNumber: 24
            }, ("TURBOPACK compile-time value", void 0)) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cloudWrapper",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: "cloudPic",
                        src: cloudPic,
                        alt: "",
                        "aria-label": text
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/talkingAvatar/index.tsx",
                        lineNumber: 43,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "body-24-mont-semi_bold cloudText",
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/talkingAvatar/index.tsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/main/talkingAvatar/index.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/talkingAvatar/index.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = TalkingAvatar;
const __TURBOPACK__default__export__ = TalkingAvatar;
var _c;
__turbopack_context__.k.register(_c, "TalkingAvatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mockData/skills.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "skills",
    ()=>skills
]);
const skills = [
    {
        id: 1,
        name: 'FRONTEND',
        score: 9
    },
    {
        id: 2,
        name: 'BACKEND',
        score: 8
    },
    {
        id: 3,
        name: 'WEB DESIGN',
        score: 6
    },
    {
        id: 4,
        name: 'VIDEO EDITING',
        score: 5
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/skills/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$talkingAvatar$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/talkingAvatar/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$skills$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockData/skills.ts [app-client] (ecmascript)");
;
;
;
;
const vertex = '/images/main/vertex.svg';
const vertexSelected = '/images/main/vertex_selected.svg';
const cursor = '/images/main/cursor.svg';
const SkillItem = ({ name, score })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "skillItem",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "lightText skillItemName",
                children: name
            }, void 0, false, {
                fileName: "[project]/src/components/main/skills/index.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "skillLevel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "skillLevelWrapper",
                        children: Array.from({
                            length: 10
                        }).map((_, index)=>{
                            if (index < score) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skillLevelItem skillLevelItem--filled"
                                }, index, false, {
                                    fileName: "[project]/src/components/main/skills/index.tsx",
                                    lineNumber: 31,
                                    columnNumber: 40
                                }, ("TURBOPACK compile-time value", void 0));
                            } else {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skillLevelItem"
                                }, index, false, {
                                    fileName: "[project]/src/components/main/skills/index.tsx",
                                    lineNumber: 34,
                                    columnNumber: 40
                                }, ("TURBOPACK compile-time value", void 0));
                            }
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/skills/index.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "skillScore lightText",
                        children: [
                            score,
                            "/10"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/main/skills/index.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/main/skills/index.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/skills/index.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SkillItem;
const Skills = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "skills container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "skillsWrapper",
                children: [
                    Array.from({
                        length: 3
                    }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            className: `vertex vertex-${index + 1}`,
                            src: vertex,
                            alt: "",
                            "aria-hidden": "true"
                        }, index, false, {
                            fileName: "[project]/src/components/main/skills/index.tsx",
                            lineNumber: 52,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: "vertex vertexSelected",
                        src: vertexSelected,
                        alt: "",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/skills/index.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        className: "cursor",
                        src: cursor,
                        alt: "",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/skills/index.tsx",
                        lineNumber: 56,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$skills$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skills"].map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillItem, {
                            ...skill
                        }, index, false, {
                            fileName: "[project]/src/components/main/skills/index.tsx",
                            lineNumber: 59,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/main/skills/index.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "avatarWrapper",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$talkingAvatar$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    hand: true,
                    indexFinger: true,
                    text: "This is how I evaluate my skills..."
                }, void 0, false, {
                    fileName: "[project]/src/components/main/skills/index.tsx",
                    lineNumber: 65,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/main/skills/index.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/skills/index.tsx",
        lineNumber: 48,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = Skills;
const __TURBOPACK__default__export__ = Skills;
var _c, _c1;
__turbopack_context__.k.register(_c, "SkillItem");
__turbopack_context__.k.register(_c1, "Skills");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/stack.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "randomPlacementItems",
    ()=>randomPlacementItems
]);
const randomPlacementItems = (props)=>{
    const { itemsRef, wrapperRef } = props;
    const wrapper = wrapperRef.current;
    const items = itemsRef.current;
    if (!items || !wrapper) return;
    items.forEach((item, index)=>{
        if (item) {
            var attempts = 0;
            const maxAttempts = 200;
            var placed = false;
            while(!placed && attempts < maxAttempts){
                const x = Math.random() * (wrapper.clientWidth - item.offsetWidth);
                const y = Math.random() * (wrapper.clientHeight - item.offsetHeight);
                item.style.left = `${x}px`;
                item.style.top = `${y}px`;
                // Определение пересечения
                var collision = false;
                for(let i = 0; i < index; i++){
                    const otherItem = items[i];
                    if (!otherItem) continue;
                    const rect1 = item.getBoundingClientRect();
                    const rect2 = otherItem.getBoundingClientRect();
                    if (rect1.left < rect2.right && rect1.right > rect2.left && // Хоть одно False - не пересекаются
                    rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
                        collision = true;
                        break;
                    }
                }
                if (!collision) {
                    placed = true;
                }
                attempts++;
            }
            if (!placed) {
                item.style.top = '5px';
                item.style.left = `${index * 50}px`;
            }
        }
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mockData/stack.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stack",
    ()=>stack
]);
const stack = [
    {
        id: 1,
        name: 'Django'
    },
    {
        id: 2,
        name: 'JavaScript'
    },
    {
        id: 3,
        name: 'React'
    },
    {
        id: 4,
        name: 'Python'
    },
    {
        id: 5,
        name: 'SASS'
    },
    {
        id: 6,
        name: 'PostgreSQL'
    },
    {
        id: 7,
        name: 'MySQL'
    },
    {
        id: 8,
        name: 'TypeScript'
    },
    {
        id: 9,
        name: 'PHP'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/myStack/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$stack$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/stack.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$stack$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockData/stack.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const hand = '/images/main/hand.png';
const MyStack = ()=>{
    _s();
    const wrapperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const itemsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyStack.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$stack$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomPlacementItems"])({
                itemsRef,
                wrapperRef
            });
        }
    }["MyStack.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "myStack container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "heading-24-magra-bold whiteText sectionTitle",
                children: "MY STACK"
            }, void 0, false, {
                fileName: "[project]/src/components/main/myStack/index.tsx",
                lineNumber: 26,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "stackHandBg",
                src: hand,
                alt: "",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/main/myStack/index.tsx",
                lineNumber: 27,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stackWrapper",
                ref: wrapperRef,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$stack$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stack"].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stackItem whiteText shadow-xl",
                        ref: (el)=>{
                            itemsRef.current[index] = el;
                        },
                        children: item.name
                    }, item.id, false, {
                        fileName: "[project]/src/components/main/myStack/index.tsx",
                        lineNumber: 31,
                        columnNumber: 6
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/main/myStack/index.tsx",
                lineNumber: 29,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/myStack/index.tsx",
        lineNumber: 25,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MyStack, "bvgUaeMaZkX43FWi9A/1rkejQQI=");
_c = MyStack;
const __TURBOPACK__default__export__ = MyStack;
var _c;
__turbopack_context__.k.register(_c, "MyStack");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mockData/aboutMe.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aboutMe",
    ()=>aboutMe
]);
const aboutMe = {
    birth: 2004,
    placeBirth: 'Uzbekistan',
    education: 'Konakovo Energy College, 2025',
    location: 'Moscow, Russia',
    workExperience: [
        {
            id: 1,
            workingPeriod: 'Spetstechnologiya (Moscow) — Server Maintenance Engineer (July 2025 - Present)',
            description: 'Ensuring 24/7 uptime for dev environments; configuring servers & CI/CD; assisting with frontend deploys (Nginx); code review (Docker, Nginx).'
        },
        {
            id: 2,
            workingPeriod: 'Freelance / Konakovo Energy College — Full-stack Developer (June 2022 - Present)',
            description: 'Full-cycle web dev (Python, Django, React, JS/TS, SQL, REST API). Created portal for my college and a system for the local Education Department.'
        },
        {
            id: 3,
            workingPeriod: 'InfoTech (Moscow) — Assistant Engineer (Dec 2023 - June 2024)',
            description: 'Network setup (MikroTik), IP camera troubleshooting, diagnostics (Wireshark).'
        }
    ],
    shortBio: "A proactive Frontend Developer (21 y.o.) with a full-stack background. I specialize in React & TypeScript, have 3+ years of freelance experience, and currently work with server infrastructure, which helps me build more reliable web apps. I'm passionate about clean code and ready for new challenges in Moscow or remotely."
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/aboutMe/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$button$2f$DecorButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/general/button/DecorButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$aboutMe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockData/aboutMe.ts [app-client] (ecmascript)");
;
;
;
;
const AboutMe = ({ breakpoint })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "aboutMe container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "heading-24-magra-bold whiteText sectionTitle",
                children: "AboutMe"
            }, void 0, false, {
                fileName: "[project]/src/components/main/aboutMe/index.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aboutMeData",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "body-16-magra-bold lightText line-height-1_5x",
                        children: [
                            "Year of birth: ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$aboutMe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aboutMe"]['birth']
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                        lineNumber: 23,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "body-16-magra-bold lightText line-height-1_5x",
                        children: [
                            "Place of birth: ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$aboutMe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aboutMe"]['placeBirth']
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                        lineNumber: 24,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "body-16-magra-bold lightText line-height-1_5x",
                        children: [
                            "Education: ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$aboutMe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aboutMe"]['education']
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "body-16-magra-bold lightText line-height-1_5x",
                        children: [
                            "Location: ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$aboutMe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aboutMe"]['location']
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/main/aboutMe/index.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "workExperience",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "heading-20-magra-bold whiteText",
                        children: "WORK EXPERIENCE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "workExperienceWrapper",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$aboutMe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aboutMe"]['workExperience'].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "workExperienceItem",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "body-16-magra-bold lightText line-height-1_5x",
                                        children: item['workingPeriod']
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                                        lineNumber: 36,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "body-16-magra-bold whiteText line-height-1_5x",
                                        children: item['description']
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                                        lineNumber: 37,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/components/main/aboutMe/index.tsx",
                                lineNumber: 35,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                        lineNumber: 32,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/main/aboutMe/index.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shortBio",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "heading-20-magra-bold whiteText",
                        children: "SHORT BIO"
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "body-16-magra-bold whiteText line-height-1_5x",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$aboutMe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aboutMe"]['shortBio']
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/aboutMe/index.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/main/aboutMe/index.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$button$2f$DecorButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                behavior: "default",
                variant: "big",
                text: {
                    default: 'MY LONG STORY, VERY VERY LONG, IF YOU INTERESTED',
                    alter: 'MY LONG STORY, IF YOU INTERESTED'
                },
                additionalClass: "aboutMe",
                breakpoint: breakpoint
            }, void 0, false, {
                fileName: "[project]/src/components/main/aboutMe/index.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/aboutMe/index.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = AboutMe;
const __TURBOPACK__default__export__ = AboutMe;
var _c;
__turbopack_context__.k.register(_c, "AboutMe");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/canvas/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const Canvas = ({ children, className = '' })=>{
    _s();
    const [manualShow, setManualShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [renderTrigger, setRenderTrigger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [spacePressed, setSpacePressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevScaleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    // Поведение при пробеле
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Canvas.useEffect": ()=>{
            const preventSpaceDefault = {
                "Canvas.useEffect.preventSpaceDefault": (e)=>{
                    // Если курсор в canvas отключаем дефоолтное поведеение пробела
                    const canvasElement = canvasRef.current;
                    const isHoveringCanvas = canvasElement?.matches(':hover');
                    if (e.code === 'Space' && isHoveringCanvas) {
                        e.preventDefault(); // <- отключение стандартного поведения
                        if (e.type === 'keydown' && !e.repeat) {
                            setSpacePressed(true);
                            if (canvasRef.current) {
                                canvasRef.current.style.cursor = 'grab';
                            }
                        }
                        if (e.type === 'keyup') {
                            setSpacePressed(false);
                            if (canvasRef.current) {
                                canvasRef.current.style.cursor = 'default';
                            }
                        }
                    }
                }
            }["Canvas.useEffect.preventSpaceDefault"];
            document.addEventListener('keydown', preventSpaceDefault);
            document.addEventListener('keyup', preventSpaceDefault);
            return ({
                "Canvas.useEffect": ()=>{
                    document.removeEventListener('keydown', preventSpaceDefault);
                    document.removeEventListener('keydown', preventSpaceDefault);
                }
            })["Canvas.useEffect"];
        }
    }["Canvas.useEffect"], []);
    // Поведение при колёсике мыши. Отключение обычного поведения внутри canvas
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Canvas.useEffect": ()=>{
            const handleWheel = {
                "Canvas.useEffect.handleWheel": (e)=>{
                    // Находится ли курсор внутри canvas
                    const isTargetInsideCanvas = canvasRef.current?.contains(e.target);
                    if (isTargetInsideCanvas && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                    }
                }
            }["Canvas.useEffect.handleWheel"];
            window.addEventListener('wheel', handleWheel, {
                passive: false
            });
            return ({
                "Canvas.useEffect": ()=>{
                    window.removeEventListener('wheel', handleWheel);
                }
            })["Canvas.useEffect"];
        }
    }["Canvas.useEffect"], []);
    // Запоминание начальной точки нажатия
    const handleMouseDown = (e)=>{
        // Если дочерний элемент, то не смещаем
        if (e.target instanceof Element && e.target.closest('.canvasElement')) {
            return;
        }
        // Запоминаем начальную точку
        if (spacePressed || e.button === 1) {
            e.preventDefault();
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
        if (canvasRef.current) {
            canvasRef.current.style.cursor = 'grabbing';
        }
    };
    // Перемещение canvas
    const handleMouseMove = (e)=>{
        if (!isDragging) return;
        e.preventDefault();
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };
    // Отмена перемещения
    const handleMouseUp = ()=>{
        setIsDragging(false);
        if (canvasRef.current) {
            canvasRef.current.style.cursor = spacePressed ? 'grab' : 'default';
        }
    };
    // Масштабирование, с учётом местоположения курсора
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Canvas.useCallback[handleWheel]": (e)=>{
            if (e.ctrlKey || e.metaKey) {
                const delta = e.deltaY > 0 ? 0.9 : 1.1 // <- 0.9 и 1.1 <- шаг 
                ;
                const newScale = Math.min(Math.max(scale * delta, 0.1), 5) // <- 0.1 и 0.5 - ограничение(10% и 500%)
                ;
                const rect = canvasRef.current?.getBoundingClientRect();
                if (!rect) return;
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const newPosition = {
                    x: mouseX - (mouseX - position.x) * (newScale / scale),
                    y: mouseY - (mouseY - position.y) * (newScale / scale)
                };
                prevScaleRef.current = scale;
                setPosition(newPosition);
                setScale(newScale);
                // Страховка от артефактов
                setTimeout({
                    "Canvas.useCallback[handleWheel]": ()=>{
                        setRenderTrigger({
                            "Canvas.useCallback[handleWheel]": (prev)=>prev + 1
                        }["Canvas.useCallback[handleWheel]"]);
                    }
                }["Canvas.useCallback[handleWheel]"], 50);
            }
        }
    }["Canvas.useCallback[handleWheel]"], [
        scale,
        position
    ]);
    // Запрет на открытие контекстного меню, при перемещении
    const handleContextMenu = (e)=>{
        if (isDragging || spacePressed) {
            e.preventDefault();
        }
    };
    const closeManual = ()=>{
        setManualShow(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `canvasWrapper ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: canvasRef,
            className: "canvasContainer",
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseUp,
            onWheel: handleWheel,
            onContextMenu: handleContextMenu,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: contentRef,
                    className: "canvasContent",
                    style: {
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '0 0',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    },
                    "data-render": renderTrigger,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/main/canvas/index.tsx",
                    lineNumber: 204,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "zoomInfo",
                    children: [
                        Math.round(scale * 100),
                        "%"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/main/canvas/index.tsx",
                    lineNumber: 218,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                manualShow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "canvasManual",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "manualElement",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "manualKey",
                                    children: "CTRL"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/main/canvas/index.tsx",
                                    lineNumber: 223,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "manualText",
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/main/canvas/index.tsx",
                                    lineNumber: 224,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "manualKey",
                                    children: "Wheel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/main/canvas/index.tsx",
                                    lineNumber: 225,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "manualText",
                                    children: "- scaling"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/main/canvas/index.tsx",
                                    lineNumber: 226,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/main/canvas/index.tsx",
                            lineNumber: 222,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "manualElement",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "manualKey",
                                    children: "Space"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/main/canvas/index.tsx",
                                    lineNumber: 230,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "manualText",
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/main/canvas/index.tsx",
                                    lineNumber: 231,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "manualKey",
                                    children: "Drag"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/main/canvas/index.tsx",
                                    lineNumber: 232,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "manualText",
                                    children: "- moving across the canvas"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/main/canvas/index.tsx",
                                    lineNumber: 233,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/main/canvas/index.tsx",
                            lineNumber: 229,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            onClick: closeManual,
                            className: "closeManual",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/main/canvas/index.tsx",
                            lineNumber: 236,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/main/canvas/index.tsx",
                    lineNumber: 221,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/main/canvas/index.tsx",
            lineNumber: 194,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/main/canvas/index.tsx",
        lineNumber: 191,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Canvas, "r1Oz2NENd99BhmfUrG8MMG5OE5g=");
_c = Canvas;
const __TURBOPACK__default__export__ = Canvas;
var _c;
__turbopack_context__.k.register(_c, "Canvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/projectItem/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
const ProjectItem = ({ project, index = 1 })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `shadow-xl projectItem`,
        style: {
            top: '200px',
            left: `${600 * index}px`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: project.img,
                alt: project.name,
                className: 'projectImg radius-12'
            }, void 0, false, {
                fileName: "[project]/src/components/main/projectItem/index.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "whiteText projectCategory glass radius-6",
                children: project.category
            }, void 0, false, {
                fileName: "[project]/src/components/main/projectItem/index.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "projectContentContainer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "projectText",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "projectName whiteText",
                                children: project.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/main/projectItem/index.tsx",
                                lineNumber: 24,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "projectDescription lightText",
                                children: project.shortDescrition
                            }, void 0, false, {
                                fileName: "[project]/src/components/main/projectItem/index.tsx",
                                lineNumber: 25,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/main/projectItem/index.tsx",
                        lineNumber: 23,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "projectStack",
                        children: project.stack.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "projectStackItem whiteText",
                                children: item
                            }, item, false, {
                                fileName: "[project]/src/components/main/projectItem/index.tsx",
                                lineNumber: 31,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/projectItem/index.tsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/main/projectItem/index.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/projectItem/index.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ProjectItem;
const __TURBOPACK__default__export__ = ProjectItem;
var _c;
__turbopack_context__.k.register(_c, "ProjectItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/slider/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swiper$40$12$2e$1$2e$3$2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swiper@12.1.3/node_modules/swiper/swiper-react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swiper$40$12$2e$1$2e$3$2f$node_modules$2f$swiper$2f$modules$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swiper@12.1.3/node_modules/swiper/modules/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swiper$40$12$2e$1$2e$3$2f$node_modules$2f$swiper$2f$modules$2f$effect$2d$coverflow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EffectCoverflow$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swiper@12.1.3/node_modules/swiper/modules/effect-coverflow.mjs [app-client] (ecmascript) <export default as EffectCoverflow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swiper$40$12$2e$1$2e$3$2f$node_modules$2f$swiper$2f$modules$2f$pagination$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swiper@12.1.3/node_modules/swiper/modules/pagination.mjs [app-client] (ecmascript) <export default as Pagination>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$projectItem$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/projectItem/index.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const Slider = ({ projects })=>{
    _s();
    const [curIndex, setCurIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const totalCountItems = projects.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swiper$40$12$2e$1$2e$3$2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Swiper"], {
        spaceBetween: -20,
        slidesPerView: 1.5,
        centeredSlides: true,
        className: "slider",
        effect: 'coverflow',
        grabCursor: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        speed: 700,
        onRealIndexChange: (swiper)=>setCurIndex(swiper.activeIndex + 1),
        pagination: true,
        modules: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swiper$40$12$2e$1$2e$3$2f$node_modules$2f$swiper$2f$modules$2f$effect$2d$coverflow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EffectCoverflow$3e$__["EffectCoverflow"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swiper$40$12$2e$1$2e$3$2f$node_modules$2f$swiper$2f$modules$2f$pagination$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__["Pagination"]
        ],
        children: [
            projects.map((project)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swiper$40$12$2e$1$2e$3$2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwiperSlide"], {
                    className: `sliderItem radius-12`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$projectItem$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        project: project
                    }, void 0, false, {
                        fileName: "[project]/src/components/main/slider/index.tsx",
                        lineNumber: 51,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, project.id, false, {
                    fileName: "[project]/src/components/main/slider/index.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sliderPgnWrapper",
                children: Array.from({
                    length: totalCountItems
                }).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `
                                sliderPgnItem 
                                radius-full 
                                ${index + 1 === curIndex ? 'sliderPgnItem-current' : ''} 
                            `
                    }, index, false, {
                        fileName: "[project]/src/components/main/slider/index.tsx",
                        lineNumber: 58,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/main/slider/index.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/slider/index.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Slider, "gFX3SwKeJ3Jm+JIJgoUOowEKJe8=");
_c = Slider;
const __TURBOPACK__default__export__ = Slider;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mockData/projects.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "projects",
    ()=>projects
]);
const specTechno = '/images/mockImages/specTecno.png';
const projects = [
    {
        id: 1,
        category: 'Site',
        img: specTechno,
        name: 'SpecTechnologia',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            'MongoDB',
            'TypeScript',
            'React',
            'Next.JS',
            'Redux',
            'SASS'
        ]
    },
    {
        id: 2,
        category: 'Site',
        img: specTechno,
        name: 'SpecTechnologia',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            'MongoDB',
            'TypeScript',
            'React',
            'Next.JS',
            'Redux',
            'SASS'
        ]
    },
    {
        id: 3,
        category: 'Site',
        img: specTechno,
        name: 'SpecTechnologia',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            'MongoDB',
            'TypeScript',
            'React',
            'Next.JS',
            'Redux',
            'SASS'
        ]
    },
    {
        id: 4,
        category: 'Site',
        img: specTechno,
        name: 'SpecTechnologia',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            'MongoDB',
            'TypeScript',
            'React',
            'Next.JS',
            'Redux',
            'SASS'
        ]
    },
    {
        id: 5,
        category: 'Site',
        img: specTechno,
        name: 'SpecTechnologia',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            'MongoDB',
            'TypeScript',
            'React',
            'Next.JS',
            'Redux',
            'SASS'
        ]
    },
    {
        id: 6,
        category: 'Site',
        img: specTechno,
        name: 'SpecTechnologia',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            'MongoDB',
            'TypeScript',
            'React',
            'Next.JS',
            'Redux',
            'SASS'
        ]
    },
    {
        id: 7,
        category: 'Site',
        img: specTechno,
        name: 'SpecTechnologia',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            'MongoDB',
            'TypeScript',
            'React',
            'Next.JS',
            'Redux',
            'SASS'
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/portfolio/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$canvas$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/canvas/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$slider$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/slider/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$projectItem$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/projectItem/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockData/projects.ts [app-client] (ecmascript)");
;
;
;
;
;
;
const Portfolio = ({ breakpoint })=>{
    const portfolioContent = breakpoint === 'mobile' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$slider$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        projects: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projects"]
    }, void 0, false, {
        fileName: "[project]/src/components/main/portfolio/index.tsx",
        lineNumber: 22,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$canvas$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projects"].map((project, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$projectItem$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                project: project,
                index: index
            }, project.id, false, {
                fileName: "[project]/src/components/main/portfolio/index.tsx",
                lineNumber: 27,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/main/portfolio/index.tsx",
        lineNumber: 24,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "portfolio",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "heading-32-magra-bold whiteText sectionTitle",
                children: "PORTFOLIO"
            }, void 0, false, {
                fileName: "[project]/src/components/main/portfolio/index.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            portfolioContent
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/portfolio/index.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Portfolio;
const __TURBOPACK__default__export__ = Portfolio;
var _c;
__turbopack_context__.k.register(_c, "Portfolio");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/general/input/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/__variables.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const Input = ({ placeholder, name, value, type = 'text', additionalClass = '', icon, iconPosition, breakpoint, maxLen, error, onChange })=>{
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const textAreaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Input.useEffect": ()=>{
            if (type === 'textarea' && textAreaRef.current) {
                textAreaRef.current.style.height = 'auto';
                textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
            }
        }
    }["Input.useEffect"], [
        value
    ]);
    const iconColor = {
        strokeColor: isHovered ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].neutral_400 : value?.length === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].neutral_600 : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].white,
        fillColor: 'none'
    };
    const iconFirst = (iconPosition === 'iconLeft' || iconPosition === 'iconBoth') && icon?.first ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        name: icon.first,
        iconClass: `inputIcon inputIconLeft`,
        strokeColor: iconColor.strokeColor,
        fillColor: iconColor.fillColor,
        size: breakpoint === 'desktop' ? 24 : 20
    }, void 0, false, {
        fileName: "[project]/src/components/general/input/index.tsx",
        lineNumber: 69,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)) : null;
    const errorEl = error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "inputErrorText",
        children: error
    }, void 0, false, {
        fileName: "[project]/src/components/general/input/index.tsx",
        lineNumber: 81,
        columnNumber: 29
    }, ("TURBOPACK compile-time value", void 0)) : null;
    const iconBoth = iconPosition === 'iconBoth' && icon?.second ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        name: icon.second,
        strokeColor: iconColor.strokeColor,
        fillColor: iconColor.fillColor,
        "aria-label": placeholder || name,
        iconClass: "inputIcon inputIconRight",
        size: breakpoint === 'desktop' ? 24 : 20
    }, void 0, false, {
        fileName: "[project]/src/components/general/input/index.tsx",
        lineNumber: 85,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)) : null;
    const iconRight = iconPosition === 'iconRight' && icon?.first ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        name: icon.first,
        strokeColor: iconColor.strokeColor,
        fillColor: iconColor.fillColor,
        iconClass: "inputIcon inputIconRight",
        size: breakpoint === 'desktop' ? 24 : 20
    }, void 0, false, {
        fileName: "[project]/src/components/general/input/index.tsx",
        lineNumber: 100,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0)) : null;
    const inputClass = `input 
        ${additionalClass} 
        ${iconPosition !== 'noIcon' ? 'inputWithIcon' : ''}  
        ${error ? 'inputError' : ''} 
        ${type === 'textarea' ? 'input-textarea' : ''} 
        `;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `inputWrapper inputWrapper-${type}`,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        children: [
            iconFirst,
            type !== 'textarea' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                className: inputClass,
                placeholder: placeholder,
                value: value,
                "aria-label": placeholder || name,
                name: name,
                onChange: onChange
            }, void 0, false, {
                fileName: "[project]/src/components/general/input/index.tsx",
                lineNumber: 132,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                className: inputClass,
                placeholder: placeholder,
                value: value,
                name: name,
                "aria-label": placeholder || name,
                onChange: onChange,
                ref: textAreaRef,
                maxLength: maxLen
            }, void 0, false, {
                fileName: "[project]/src/components/general/input/index.tsx",
                lineNumber: 142,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            errorEl,
            iconBoth,
            iconRight
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/general/input/index.tsx",
        lineNumber: 123,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Input, "RlYiuNl4j74bdU0KxtZLO/RM1ec=");
_c = Input;
const __TURBOPACK__default__export__ = Input;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/general/statusMessage/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
const StatusMessage = ({ type, text, isShow })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: `statusMessage statusMessage-${isShow ? 'show' : ''} statusMessage-${type}`,
        children: text
    }, void 0, false, {
        fileName: "[project]/src/components/general/statusMessage/index.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c = StatusMessage;
const __TURBOPACK__default__export__ = StatusMessage;
var _c;
__turbopack_context__.k.register(_c, "StatusMessage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/main/contacts/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$input$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/general/input/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$button$2f$DecorButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/general/button/DecorButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$statusMessage$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/general/statusMessage/index.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const Contacts = ({ breakpoint })=>{
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [btnBehavior, setBtnBehavior] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('disabled');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        message: ''
    });
    const isFirstRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    const [statusMessageShow, setStatusMessageShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [statusMessageType, setStatusMessageType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('info');
    const [statusMessageText, setStatusMessageText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Sent');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Contacts.useEffect": ()=>{
            // Пропуск валидации при первом рендере
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }
            if (btnBehavior === 'loading') {
                return;
            }
            validateForm();
        }
    }["Contacts.useEffect"], [
        name,
        email,
        message
    ]);
    const validateForm = ()=>{
        let isValid = true;
        const newErrors = {
            name: '',
            email: '',
            message: ''
        };
        // Проверка имени
        if (name.length < 5 || name.length >= 10) {
            newErrors.name = 'Имя должно быть от 5 до 10 символов';
            isValid = false;
        }
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Некорректный email';
            isValid = false;
        }
        // Проверка сообщения
        if (message.length < 100 || message.length > 300) {
            newErrors.message = 'Сообщение должно быть от 100 до 300 символов';
            isValid = false;
        }
        if (isValid) {
            setBtnBehavior('default');
        } else {
            setBtnBehavior('disabled');
        }
        setError(newErrors);
    };
    const handleNameChange = (e)=>{
        setName(e.target.value);
    };
    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    };
    const handleMessageChange = (e)=>{
        setMessage(e.target.value);
    };
    const submitForm = (e)=>{
        // Временная заглушка
        setName('');
        setEmail('');
        setMessage('');
        setStatusMessageText('Error on sending message');
        setStatusMessageType('error');
        setBtnBehavior('loading');
        setTimeout(()=>{
            setBtnBehavior('disabled');
            setStatusMessageShow(true);
            setTimeout(()=>{
                setStatusMessageShow(false);
            }, 3000);
        }, 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "container contacts",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "body-24-magra-bold sectionTitle whiteText",
                children: "CONTACTS"
            }, void 0, false, {
                fileName: "[project]/src/components/main/contacts/index.tsx",
                lineNumber: 133,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$statusMessage$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                text: statusMessageText,
                type: statusMessageType,
                isShow: statusMessageShow
            }, void 0, false, {
                fileName: "[project]/src/components/main/contacts/index.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "contactForm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "formContent",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$input$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            name: "name",
                            placeholder: "Name...",
                            value: name,
                            iconPosition: "noIcon",
                            error: error.name,
                            onChange: handleNameChange,
                            breakpoint: breakpoint
                        }, void 0, false, {
                            fileName: "[project]/src/components/main/contacts/index.tsx",
                            lineNumber: 144,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$input$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            name: "email",
                            placeholder: "Email...",
                            type: "email",
                            value: email,
                            iconPosition: "noIcon",
                            error: error.email,
                            onChange: handleEmailChange,
                            breakpoint: breakpoint
                        }, void 0, false, {
                            fileName: "[project]/src/components/main/contacts/index.tsx",
                            lineNumber: 154,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$input$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            name: "message",
                            placeholder: "Message...",
                            value: message,
                            type: "textarea",
                            iconPosition: "noIcon",
                            error: error.message,
                            onChange: handleMessageChange,
                            breakpoint: breakpoint,
                            maxLen: 300
                        }, void 0, false, {
                            fileName: "[project]/src/components/main/contacts/index.tsx",
                            lineNumber: 165,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$button$2f$DecorButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            behavior: btnBehavior,
                            variant: "medium",
                            text: {
                                default: 'Send',
                                alter: 'Send'
                            },
                            additionalClass: "contactFormBtn",
                            breakpoint: breakpoint,
                            onClick: submitForm
                        }, void 0, false, {
                            fileName: "[project]/src/components/main/contacts/index.tsx",
                            lineNumber: 177,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/main/contacts/index.tsx",
                    lineNumber: 143,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/main/contacts/index.tsx",
                lineNumber: 142,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/main/contacts/index.tsx",
        lineNumber: 131,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Contacts, "9LgWKAgvNSiNY0CjPvNUspEYaUk=");
_c = Contacts;
const __TURBOPACK__default__export__ = Contacts;
var _c;
__turbopack_context__.k.register(_c, "Contacts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/general/footer/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/__variables.module.scss [app-client] (css module)");
;
;
;
;
const Footer = ({ breakpoint })=>{
    const iconSize = ()=>{
        return breakpoint === 'mobile' ? 20 : 32;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "footer",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container footerWrapper",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "#",
                    className: "footerItemWrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "footerIconWrapper",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                iconClass: "footerIcon",
                                name: "email",
                                strokeColor: 'none',
                                size: iconSize(),
                                fillColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].neutral_300
                            }, void 0, false, {
                                fileName: "[project]/src/components/general/footer/index.tsx",
                                lineNumber: 30,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/footer/index.tsx",
                            lineNumber: 29,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "footerText",
                            children: "vlad.sad28@yandex.ru"
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/footer/index.tsx",
                            lineNumber: 39,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/general/footer/index.tsx",
                    lineNumber: 28,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "#",
                    className: "footerItemWrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "footerIconWrapper",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                iconClass: "footerIcon",
                                name: "phone",
                                fillColor: "none",
                                size: iconSize(),
                                strokeColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].neutral_300
                            }, void 0, false, {
                                fileName: "[project]/src/components/general/footer/index.tsx",
                                lineNumber: 44,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/footer/index.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "footerText",
                            children: "+7 (900) 015-81-16"
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/footer/index.tsx",
                            lineNumber: 52,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/general/footer/index.tsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "#",
                    className: "footerItemWrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "footerIconWrapper",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                iconClass: "footerIcon",
                                name: "telegram",
                                strokeColor: 'none',
                                size: iconSize(),
                                fillColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$_$5f$variables$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].neutral_300
                            }, void 0, false, {
                                fileName: "[project]/src/components/general/footer/index.tsx",
                                lineNumber: 57,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/footer/index.tsx",
                            lineNumber: 56,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "footerText",
                            children: "@VlassaDassa"
                        }, void 0, false, {
                            fileName: "[project]/src/components/general/footer/index.tsx",
                            lineNumber: 65,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/general/footer/index.tsx",
                    lineNumber: 55,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/general/footer/index.tsx",
            lineNumber: 27,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/general/footer/index.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/Main/Main.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBreakpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useBreakpoint.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/general/header/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$preview$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/preview/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$skills$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/skills/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$myStack$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/myStack/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$aboutMe$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/aboutMe/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$portfolio$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/portfolio/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$contacts$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/main/contacts/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$footer$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/general/footer/index.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const Main = ()=>{
    _s();
    const breakpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBreakpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBreakpoint"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$header$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                breakpoint: breakpoint
            }, void 0, false, {
                fileName: "[project]/src/pages/Main/Main.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$preview$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/Main/Main.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$skills$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/Main/Main.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$myStack$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/Main/Main.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$aboutMe$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                breakpoint: breakpoint
            }, void 0, false, {
                fileName: "[project]/src/pages/Main/Main.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$portfolio$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                breakpoint: breakpoint
            }, void 0, false, {
                fileName: "[project]/src/pages/Main/Main.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$main$2f$contacts$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                breakpoint: breakpoint
            }, void 0, false, {
                fileName: "[project]/src/pages/Main/Main.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$general$2f$footer$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                breakpoint: breakpoint
            }, void 0, false, {
                fileName: "[project]/src/pages/Main/Main.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Main, "vDry4zHS/I48mvcyOApBMXDDBRo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBreakpoint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBreakpoint"]
    ];
});
_c = Main;
const __TURBOPACK__default__export__ = Main;
var _c;
__turbopack_context__.k.register(_c, "Main");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/App.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.4_@babel+core@7.2_80168f4bda9c632ef590b374e479ce21/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Main$2f$Main$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Main/Main.tsx [app-client] (ecmascript)");
;
;
const App = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$4_$40$babel$2b$core$40$7$2e$2_80168f4bda9c632ef590b374e479ce21$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Main$2f$Main$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/App.tsx",
            lineNumber: 9,
            columnNumber: 4
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
};
_c = App;
const __TURBOPACK__default__export__ = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/App.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/App.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_0m6~s6w._.js.map