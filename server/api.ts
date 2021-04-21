import express from "express";

import multer from "multer";
import fs from "fs";
import moment from "moment";
import auth from "./auth";

const apiRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'public/image/article/' + moment().format('YYYYMMDD');
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, () => {
                cb(null, dir)
            });
        } else {
            cb(null, dir)
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage }).single('file');

apiRouter.use((req, res, next) => {
    console.debug(`[${req.url}]`, `[${req.method}]`, 'Request Received');
    next();
});

apiRouter.get("/auth", auth, (req, res, next) => {
    res.json({ success: true });
})

apiRouter.post("/image", auth, (req, res) => {
    upload(req, res, () => {
        const url = process.env.FE_URL + '/' + req.file.path.replace('public/', '');
        res.json({ imageUrl: url });
    })
})

apiRouter.post("/article", auth, (req, res, next) => {
    next();
})

apiRouter.get("/article/category", auth, (req, res, next) => {
    next();
})

apiRouter.post("/article/category", auth, (req, res, next) => {
    next();
})

apiRouter.put("/article/:id", auth, (req, res, next) => {
    next();
})

apiRouter.delete("/article/:id", auth, (req, res, next) => {
    next();
})

apiRouter.get("/article", (req, res, next) => {
    next();
});
apiRouter.post("/login", (req, res, next) => {
    next();
});

apiRouter.use((err: any, req: any, res: any, next: any) => {
    res.json({ success: false });
});

export default apiRouter;