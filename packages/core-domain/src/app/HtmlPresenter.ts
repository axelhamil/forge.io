export abstract class HtmlPresenter<T, R> {
  protected compile: R;

  protected constructor(compile: R) {
    this.compile = compile;
  }

  public abstract render(data: T): Promise<void>;
}
