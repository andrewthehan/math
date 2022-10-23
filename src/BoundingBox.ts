import Position from "./Position";
import Size from "./Size";

export default class BoundingBox {
  private static DEFAULT_BOUNDING_BOX = new BoundingBox(
    Position.origin(),
    Size.of(0, 0)
  );

  constructor(readonly origin: Position, readonly size: Size) {}

  static of(positions: Position[]): BoundingBox {
    if (positions.length === 0) {
      return BoundingBox.DEFAULT_BOUNDING_BOX;
    }

    const xs = positions.map((position) => position.x);
    const ys = positions.map((position) => position.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const width = Math.max(...xs) - minX + 1;
    const height = Math.max(...ys) - minY + 1;

    return new BoundingBox(Position.of(minX, minY), Size.of(width, height));
  }

  get center(): Position {
    return Position.of(
      this.origin.x + this.size.width / 2,
      this.origin.y + this.size.height / 2
    );
  }

  get x(): number {
    return this.origin.x;
  }

  get y(): number {
    return this.origin.y;
  }

  get width(): number {
    return this.size.width;
  }

  get height(): number {
    return this.size.height;
  }

  get top(): number {
    return this.origin.y;
  }

  get left(): number {
    return this.origin.x;
  }

  get right(): number {
    return this.origin.x + this.size.width;
  }

  get bottom(): number {
    return this.origin.y + this.size.height;
  }

  static equals(a: BoundingBox, b: BoundingBox): boolean {
    return Position.equals(a.center, b.center) && Size.equals(a.size, b.size);
  }
}
