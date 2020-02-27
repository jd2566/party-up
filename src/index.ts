import Koa from "koa";
import koaBody from "koa-body";
import helmet from "koa-helmet";
import views from "koa-views";
import winston from "winston";

import "reflect-metadata";
import { createConnection } from "typeorm";

import { unprotectedRouter } from "./configs/unprotectedRoutes";
import { logger } from "./configs/logging";

createConnection()
  .then(async connection => {
    const app = new Koa();
    app.use(helmet());

    app.use(logger(winston));

    app.use(
      koaBody({
        multipart: true,
        formLimit: 15,
        formidable: {
          uploadDir: __dirname + "/uploads"
        }
      })
    );

    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
          message: err.message
        };
      }
    });

    app.use(
      views(__dirname + "/views", {
        extension: "ejs"
      })
    );

    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    app.listen(3000);

    console.log(`Server running on port ${3000}`);
  })
  .catch(error => console.log(error));
