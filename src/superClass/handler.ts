export default class Handler {
  protected async TryCatch<T>(serviceFunction: () => Promise<T>) {
    try {
      return await serviceFunction();
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }
}
