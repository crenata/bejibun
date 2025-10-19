import Router from "@bejibun/core/facades/Router";
import Logger from "@bejibun/logger";
import ExceptionHandler from "@/app/exceptions/handler";
import index from "@/public/index.html";
import api from "@/routes/api";
import "@/bootstrap";

const server = Bun.serve({
    development: process.env.NODE_ENV !== "production" && {
        // Enable browser hot reloading in development
        hmr: true,

        // Echo console logs from the browser to the server
        console: true
    },

    error: new ExceptionHandler().handle,

    port: process.env.APP_PORT,

    routes: {
        ...Router.namespace("app/exceptions").any("/*", "handler@route"),

        "/": index,

        ...api
    }
});

Logger.setContext("APP").info(`🚀 Server running at ${server.url.origin}`);