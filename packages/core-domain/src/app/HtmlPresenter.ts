interface IHtmlPresenter<T = Record<string, unknown>> {
  render(template: string, data: T): Promise<HtmlView>;
}

type HtmlView = {
  template: string;
  data: Record<string, unknown>;
  path: string;
};

export type { HtmlView, IHtmlPresenter };
