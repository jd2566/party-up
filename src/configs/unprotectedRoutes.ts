import Router from "koa-router";
import * as controller from "../controller";

const unprotectedRouter = new Router();

unprotectedRouter.get("/", controller.web.index);

export { unprotectedRouter };
