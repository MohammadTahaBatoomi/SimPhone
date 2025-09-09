module.exports = [
"[project]/.next-internal/server/app/api/proxy/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/proxy/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const target = searchParams.get("url");
        if (!target) {
            return new Response("Missing url param", {
                status: 400
            });
        }
        let url;
        try {
            url = new URL(target);
        } catch  {
            return new Response("Invalid url", {
                status: 400
            });
        }
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return new Response("Unsupported protocol", {
                status: 400
            });
        }
        const upstream = await fetch(url.toString(), {
            headers: {
                "user-agent": req.headers.get("user-agent") || "Mozilla/5.0",
                accept: req.headers.get("accept") || "*/*"
            },
            redirect: "follow",
            cache: "no-store"
        });
        const contentType = upstream.headers.get("content-type") || "";
        const corsHeaders = {
            "access-control-allow-origin": "*",
            "access-control-allow-headers": "*",
            "access-control-allow-methods": "GET,HEAD,OPTIONS"
        };
        const rewriteAbsoluteToProxy = (input, base)=>{
            const targetOrigin = base.origin.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
            // Replace references so resources route back through our proxy
            return input// HTML attributes with absolute URL
            .replace(new RegExp(`(src|href|action)=["'](https?:\\/\\/[^"']+)["']`, "gi"), (_m, attr, abs)=>{
                try {
                    const u = new URL(abs, base);
                    // Skip truly cross-origin references
                    if (u.origin !== base.origin) return `${attr}="${abs}"`;
                    return `${attr}="/api/proxy?url=${encodeURIComponent(u.href)}"`;
                } catch  {
                    return _m;
                }
            })// HTML attributes with root-relative path e.g. "/_next/..." or "/fonts/..."
            .replace(/(src|href|action)=["'](\/[^"']*)["']/gi, (_m, attr, rel)=>{
                try {
                    const u = new URL(rel, base.origin);
                    return `${attr}="/api/proxy?url=${encodeURIComponent(u.href)}"`;
                } catch  {
                    return _m;
                }
            })// CSS url(absolute)
            .replace(/url\((['"]?)(https?:[^)"']+)\1\)/gi, (_m, q, abs)=>{
                try {
                    const u = new URL(abs, base);
                    if (u.origin !== base.origin) return _m;
                    return `url(/api/proxy?url=${encodeURIComponent(u.href)})`;
                } catch  {
                    return _m;
                }
            })// CSS url(/root-relative)
            .replace(/url\((['"]?)(\/[^)"']+)\1\)/gi, (_m, q, rel)=>{
                try {
                    const u = new URL(rel, base.origin);
                    return `url(/api/proxy?url=${encodeURIComponent(u.href)})`;
                } catch  {
                    return _m;
                }
            })// Protocol-relative //host/... -> make absolute to base then proxy
            .replace(/(["'\(])\/\/([^\s"'\)]+)/g, (_m, pre, rest)=>{
                try {
                    const u = new URL(`${base.protocol}//${rest}`);
                    return `${pre}/api/proxy?url=${encodeURIComponent(u.href)}`;
                } catch  {
                    return _m;
                }
            })// Absolute to specific origin fast path
            .replace(new RegExp(`${targetOrigin}`, "g"), (m)=>`/api/proxy?url=${encodeURIComponent(m)}`);
        };
        if (contentType.includes("text/html")) {
            const html = await upstream.text();
            const baseHref = `${url.origin}${url.pathname.endsWith("/") ? url.pathname : url.pathname.substring(0, url.pathname.lastIndexOf("/") + 1)}`;
            const baseTag = `<base href="${baseHref}">`;
            const guardHistoryScript = `
        <script>(function(){
          try{
            var BASE_ORIGIN = ${JSON.stringify(url.origin)};
            function toProxy(u){
              try{
                var base = (document && document.baseURI) ? document.baseURI : (BASE_ORIGIN + '/');
                var abs = new URL(u, base);
                return '/api/proxy?url=' + encodeURIComponent(abs.href);
              }catch(e){ return u; }
            }
            // History guard within iframe
            var origPush = history.pushState; var origReplace = history.replaceState;
            history.pushState = function(s,t,u){ try{ if(u){ var p=toProxy(u); return window.location.assign(p); } return origPush.call(history, s, t); }catch(e){} };
            history.replaceState = function(s,t,u){ try{ if(u){ var p=toProxy(u); return window.location.replace(p); } return origReplace.call(history, s, t); }catch(e){} };

            // Rewrite anchors and forms to go through proxy
            function rewriteElement(el){
              if(!el) return;
              if(el.tagName==='A' && el.hasAttribute('href')){
                var href = el.getAttribute('href'); if(!href) return;
                if(/^javascript:/i.test(href)) return;
                el.setAttribute('href', toProxy(href));
              }
              if(el.tagName==='FORM'){
                var act = el.getAttribute('action') || '/';
                el.setAttribute('action', toProxy(act));
              }
            }
            document.addEventListener('click', function(e){
              var a = e.target && (e.target.closest ? e.target.closest('a[href]') : null);
              if(a){
                var href = a.getAttribute('href'); if(!href) return;
                if(/^javascript:/i.test(href)) return;
                var proxied = toProxy(href);
                a.setAttribute('href', proxied);
                // Prevent SPA router; force full navigation within iframe
                e.preventDefault();
                try{ window.location.assign(proxied); }catch(err){ window.location.href = proxied; }
              }
            }, true);
            Array.prototype.forEach.call(document.querySelectorAll('a[href],form'), rewriteElement);
            new MutationObserver(function(muts){
              muts.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes||[], function(n){ if(n.nodeType===1){
                if(n.matches) { if(n.matches('a[href],form')) rewriteElement(n); Array.prototype.forEach.call(n.querySelectorAll('a[href],form'), rewriteElement); }
              }}); });
            }).observe(document.documentElement, { childList:true, subtree:true });

            // Patch window.open
            var _open = window.open; window.open = function(u, name, spec){ try{ return _open.call(window, toProxy(u), name, spec); }catch(e){ return _open.apply(window, arguments); } };
            // Patch fetch
            var _fetch = window.fetch; window.fetch = function(input, init){ try{
              var u = (typeof input==='string') ? input : (input && input.url);
              if(u) { var p = toProxy(u); if(typeof input==='string') return _fetch(p, init); var req = new Request(p, input); return _fetch(req, init); }
            }catch(e){} return _fetch(input, init); };
            // Patch XHR
            var _openX = XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open = function(method, u){ try{ var p = toProxy(u); return _openX.apply(this, [method, p].concat([].slice.call(arguments,2))); }catch(e){ return _openX.apply(this, arguments); } };
          }catch(e){}
        })();</script>`;
            const bodyEarlyScript = `<script>(function(){try{var s=document.currentScript;var d=document;var h=d.querySelector('head');if(s&&h){h.insertBefore(s.cloneNode(true),h.firstChild);}}catch(e){}})();</script>`;
            const rewritten = rewriteAbsoluteToProxy(html, url);
            const injectedHead = rewritten.replace(/<head(\s[^>]*)?>/i, (m)=>`${m}\n${baseTag}\n${guardHistoryScript}`);
            const injected = injectedHead.replace(/<body(\s[^>]*)?>/i, (m)=>`${m}\n${bodyEarlyScript}`);
            return new Response(injected, {
                status: upstream.status,
                headers: {
                    "content-type": "text/html; charset=utf-8",
                    ...corsHeaders
                }
            });
        }
        if (contentType.includes("text/css")) {
            const css = await upstream.text();
            const rewritten = rewriteAbsoluteToProxy(css, url);
            return new Response(rewritten, {
                status: upstream.status,
                headers: {
                    "content-type": "text/css; charset=utf-8",
                    ...corsHeaders
                }
            });
        }
        // Stream other types as-is but add permissive CORS so browser can load fonts/images
        return new Response(upstream.body, {
            status: upstream.status,
            headers: {
                "content-type": contentType,
                ...corsHeaders
            }
        });
    } catch (err) {
        return new Response("Proxy error", {
            status: 502
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__22b938a9._.js.map