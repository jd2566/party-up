import { Context } from "koa";

export default class WebController {
  public static async index(ctx: Context) {
    ctx.status = 200;
  }
}
