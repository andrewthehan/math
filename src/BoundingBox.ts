import Location from "./Location";
import Size from "./Size";

export default class BoundingBox {
  private static DEFAULT_BOUNDING_BOX = new BoundingBox(
    Location.origin(),
    Size.of(0, 0)
  );

  constructor(readonly origin: Location, readonly size: Size) {}

  static of(locations: Location[]): BoundingBox {
    if (locations.length === 0) {
      return BoundingBox.DEFAULT_BOUNDING_BOX;
    }

    const xs = locations.map((location) => location.x);
    const ys = locations.map((location) => location.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const width = Math.max(...xs) - minX + 1;
    const height = Math.max(...ys) - minY + 1;

    return new BoundingBox(Location.of(minX, minY), Size.of(width, height));
  }

  get center(): Location {
    return Location.of(
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
    return Location.equals(a.center, b.center) && Size.equals(a.size, b.size);
  }
}
