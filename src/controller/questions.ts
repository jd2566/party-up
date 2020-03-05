import { Context } from "koa";
import { getManager, Repository } from "typeorm";
import { Questions } from "../entity/Questions";

export default class QuestionsController {
  public static async list(ctx: Context) {
    const QuestionsRepo: Repository<Questions> = getManager().getRepository(
      Questions
    );

    const currentQs = await QuestionsRepo.find({ select: ["title"] });
    const questions: String[] = currentQs.map(q => q.title);

    ctx.status = 200;
    ctx.body = { questions };
  }

  public static async bulk(ctx: Context) {
    const questionsArray: String[] = ctx.request.body["questions"].split(",");
    const QuestionsRepo: Repository<Questions> = getManager().getRepository(
      Questions
    );

    const currentQs = await QuestionsRepo.find({ select: ["title"] });
    const currentArray: String[] = currentQs.map(q => q.title);

    const newQs = questionsArray.filter(x => !currentArray.includes(x));
    let message = "No new entry present.";
    if (newQs.length > 0) {
      const questions = newQs.map(q => {
        return QuestionsRepo.create({ title: q });
      });

      const returned = await QuestionsRepo.save(questions);

      ctx.status = 201;
      message = `inserted ${returned.length} questions`;
    } else {
      ctx.status = 200;
    }

    ctx.body = { message };
  }
}
