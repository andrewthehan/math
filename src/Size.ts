export default class Size {
  constructor(readonly width: number, readonly height: number) {}

  static of(width: number, height: number): Size {
    return new Size(width, height);
  }

  static equals(a: Size, b: Size): boolean {
    return a.width === b.width && a.height === b.height;
  }
}
