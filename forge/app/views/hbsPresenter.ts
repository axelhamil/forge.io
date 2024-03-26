import { HtmlView, IHtmlPresenter } from "@repo/core-domain";
import path from "path";

class HbsPresenter implements IHtmlPresenter {
  public async render(
    template: string,
    data: Record<string, unknown>,
  ): Promise<HtmlView> {
    const templatePath = path.resolve(__dirname, template);

    return {
      data,
      path: templatePath,
      template,
    };
  }
}

export default HbsPresenter;
