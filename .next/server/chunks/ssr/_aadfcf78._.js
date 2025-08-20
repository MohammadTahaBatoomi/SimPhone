module.exports = [
"[project]/src/components/Simulator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PhoneWithCustomScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function PhoneWithCustomScroll({ src }) {
    const frameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [canControl, setCanControl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        scrollTop: 0,
        scrollHeight: 1,
        clientHeight: 1
    });
    const [drag, setDrag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        active: false,
        startY: 0,
        startTop: 0
    });
    // تلاش برای دسترسی به داخل iframe (فقط اگر هم‌دامنه باشد موفق می‌شود)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = setInterval(()=>{
            try {
                const doc = frameRef.current?.contentDocument || frameRef.current?.contentWindow?.document;
                if (!doc) return;
                // اگر دسترسی داشتیم، متریک‌ها را بخوانیم
                const el = doc.scrollingElement || doc.documentElement || doc.body;
                setCanControl(true);
                setMetrics({
                    scrollTop: el.scrollTop,
                    scrollHeight: el.scrollHeight,
                    clientHeight: el.clientHeight
                });
            } catch  {
                setCanControl(false);
            }
        }, 200);
        return ()=>clearInterval(id);
    }, []);
    // sync در اسکرول (برای هم‌دامنه)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canControl) return;
        const w = frameRef.current.contentWindow;
        const handler = ()=>{
            try {
                const doc = frameRef.current.contentDocument || w.document;
                const el = doc.scrollingElement || doc.documentElement || doc.body;
                setMetrics({
                    scrollTop: el.scrollTop,
                    scrollHeight: el.scrollHeight,
                    clientHeight: el.clientHeight
                });
            } catch  {}
        };
        w.addEventListener("scroll", handler, {
            passive: true
        });
        return ()=>w.removeEventListener("scroll", handler);
    }, [
        canControl
    ]);
    const ratio = Math.min(1, metrics.clientHeight / metrics.scrollHeight);
    const trackHeight = 300; // px — می‌تونی دلخواه کنی
    const thumbHeight = Math.max(30, trackHeight * ratio);
    const maxThumbTop = trackHeight - thumbHeight;
    const maxScrollTop = Math.max(1, metrics.scrollHeight - metrics.clientHeight);
    const thumbTop = maxThumbTop * (metrics.scrollTop / maxScrollTop);
    const scrollToThumbTop = (newThumbTop)=>{
        if (!canControl) return;
        const clamped = Math.max(0, Math.min(maxThumbTop, newThumbTop));
        const perc = clamped / maxThumbTop;
        const newScrollTop = perc * maxScrollTop;
        try {
            frameRef.current.contentWindow.scrollTo({
                top: newScrollTop,
                behavior: "auto"
            });
        } catch  {}
    };
    const onTrackClick = (e)=>{
        const track = e.currentTarget.getBoundingClientRect();
        const clickY = e.clientY - track.top;
        scrollToThumbTop(clickY - thumbHeight / 2);
    };
    const onThumbMouseDown = (e)=>{
        setDrag({
            active: true,
            startY: e.clientY,
            startTop: thumbTop
        });
        e.preventDefault();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onMove = (e)=>{
            if (!drag.active) return;
            const delta = e.clientY - drag.startY;
            scrollToThumbTop(drag.startTop + delta);
        };
        const onUp = ()=>setDrag((d)=>({
                    ...d,
                    active: false
                }));
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
        return ()=>{
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
    }, [
        drag.active,
        drag.startY,
        drag.startTop
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex items-center justify-center p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-[420px] h-[890px] rounded-[60px] border-[14px] border-black bg-black shadow-[0_0_20px_rgba(0,0,0,0.2)] overflow-visible",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[35px] bg-black rounded-b-[22px] z-10"
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-[-17px] top-[180px] w-[10px] h-[100px] bg-[#424242] rounded-[4px] border border-[#424242] cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-[-17px] top-[120px] w-[10px] h-[40px] bg-[#424242] rounded-[4px] border border-[#424242] cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-[-17px] top-[180px] w-[10px] h-[60px] bg-[#424242] rounded-[4px] border border-[#424242] cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-[-17px] top-[250px] w-[10px] h-[60px] bg-[#424242] rounded-[4px] border border-[#424242] cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                    ref: frameRef,
                    src: src,
                    className: "w-full h-full border-0 rounded-[48px] overflow-hidden"
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-3 left-1/2 -translate-x-1/2 w-[120px] h-[6px] bg-[#525253] rounded-[3px] opacity-80"
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this),
                canControl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-2 top-1/2 -translate-y-1/2 h-[300px] w-[6px] bg-white/10 rounded-full cursor-pointer",
                    onMouseDown: onTrackClick,
                    onClick: onTrackClick,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 w-[6px] bg-white/70 rounded-full",
                        style: {
                            height: `${thumbHeight}px`,
                            top: `${thumbTop}px`,
                            cursor: "grab"
                        },
                        onMouseDown: onThumbMouseDown
                    }, void 0, false, {
                        fileName: "[project]/src/components/Simulator.tsx",
                        lineNumber: 120,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 118,
                    columnNumber: 11
                }, this) : // پیام کوچک برای کراس اوریجین
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-2 top-2 text-[10px] text-white/60 px-2 py-1 bg-black/40 rounded",
                    children: "Custom scroll فقط برای هم‌دامنه عمل می‌کنه"
                }, void 0, false, {
                    fileName: "[project]/src/components/Simulator.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Simulator.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Simulator.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_aadfcf78._.js.map