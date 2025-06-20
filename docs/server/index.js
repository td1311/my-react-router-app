import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useRef } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Welcome() {
  const [isOpen, setIsOpen] = useState(false);
  const tapTimeout = useRef(null);
  const handleTap = () => {
    if (tapTimeout.current) return;
    setIsOpen((prev) => !prev);
    tapTimeout.current = setTimeout(() => {
      tapTimeout.current = null;
    }, 400);
  };
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "mobile-layout", children: [
    /* @__PURE__ */ jsx("div", { className: "notification-header", children: /* @__PURE__ */ jsxs("div", { className: "necessities", children: [
      /* @__PURE__ */ jsx("i", { className: "fas fa-signal" }),
      /* @__PURE__ */ jsx("i", { className: "fas fa-wifi" }),
      /* @__PURE__ */ jsx("i", { className: "fas fa-battery-full" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "actions", children: [
      /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-left" }),
      /* @__PURE__ */ jsx("i", { className: "fas fa-bookmark" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "book-interactive",
        onPointerDown: handleTap,
        children: [
          /* @__PURE__ */ jsx("div", { className: `book-cover ${isOpen ? "open" : ""}`, children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "book-top",
              src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHV4ZjE1NmJpdmwwZGlycjZ1cG9jeTk2MzNieWoxNHZsbTljYXVtZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XdwYIsIZC4ebXmRPIE/giphy.gif",
              alt: "book-top"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: `preface ${isOpen ? "open" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "content", children: [
            /* @__PURE__ */ jsxs("div", { className: "header", children: [
              /* @__PURE__ */ jsx("div", { className: "title", children: "The Diary of a Young Girl" }),
              /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-down" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "author", children: "by Anne Frank" }),
            /* @__PURE__ */ jsxs("div", { className: "body", children: [
              /* @__PURE__ */ jsx("p", { children: "also known as The Diary of Anne Frank, is a book of the writings from the Dutch-language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands" }),
              /* @__PURE__ */ jsx("p", { children: 'Anne calls her diary "Kitty", so almost all of the letters are written to Kitty.' })
            ] })
          ] }) })
        ]
      }
    ),
    " "
  ] }) }) });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DZAi_oRo.js", "imports": ["/assets/chunk-NL6KNZEE-CfxFt-pq.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DtfH7ySp.js", "imports": ["/assets/chunk-NL6KNZEE-CfxFt-pq.js"], "css": ["/assets/root-Dm75cSEz.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BolADGpf.js", "imports": ["/assets/chunk-NL6KNZEE-CfxFt-pq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-2f8de927.js", "version": "2f8de927", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
