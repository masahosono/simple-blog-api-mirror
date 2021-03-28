import express from "express";
import next from "next";
import apiRoutes from './api'

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();
 
app.prepare()
    .then(() => {
        server.use("/api", apiRoutes, (req, res) => {
            req.url = req.originalUrl;
            return handler(req, res);
        });

        server.all("*", (req, res) => {
            return handler(req, res);
        });

        server.listen(8080, () => {
            console.debug("> Ready on http://localhost:8080");
        });
    })
    .catch(() => {
        console.error();
        process.exit(1);
    });