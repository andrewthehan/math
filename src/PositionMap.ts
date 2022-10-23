import BoundingBox from "./BoundingBox";
import Position from "./Position";

export default class PositionMap<T> {
  readonly objects: Map<string, T>;

  private constructor() {
    this.objects = new Map();
  }

  static newInstance<T>(): PositionMap<T> {
    return new PositionMap();
  }

  set(position: Position, object: T): PositionMap<T> {
    this.objects.set(position.toString(), object);
    return this;
  }

  has(position: Position): boolean {
    return this.objects.has(position.toString());
  }

  get(position: Position): T | undefined {
    return this.objects.get(position.toString());
  }

  delete(position: Position): boolean {
    return this.objects.delete(position.toString());
  }

  clear() {
    this.objects.clear();
  }

  getAdjacent(position: Position): T[] {
    return position
      .getAdjacent()
      .filter((l) => this.has(l))
      .map((l) => this.get(l)!!);
  }

  getAdjacentpositions(): Position[] {
    return this.keys()
      .flatMap((position) => position.getAdjacent())
      .reduce((positions, position) => {
        if (this.has(position)) {
          return positions;
        }
        return positions.set(position, {});
      }, new PositionMap<{}>())
      .keys();
  }

  rotateClockwise() {
    const positions = this.keys();

    const box = BoundingBox.of(positions);

    const rotatedEntries = this.entries().map(([position, value]) => ({
      position: Position.of(position.y, box.width - 1 - position.x),
      value,
    }));

    const rotatedBox = BoundingBox.of(
      rotatedEntries.map(({ position, value }) => position)
    );

    let offset = box.center.sub(rotatedBox.center).floor();
    if (box.width % 2 !== box.height % 2) {
      offset = offset.add(Position.of(box.width % 2, box.height % 2));
    }

    const shiftedRotatedEntries = rotatedEntries.map(({ position, value }) => ({
      position: position.add(offset),
      value,
    }));

    this.clear();
    shiftedRotatedEntries.map(({ position, value }) =>
      this.set(position, value)
    );
  }

  rotateCounterClockwise() {
    const positions = this.keys();

    const box = BoundingBox.of(positions);

    const rotatedEntries = this.entries().map(([position, value]) => ({
      position: Position.of(box.height - 1 - position.y, position.x),
      value,
    }));

    const rotatedBox = BoundingBox.of(
      rotatedEntries.map(({ position, value }) => position)
    );

    let offset = box.center.sub(rotatedBox.center).floor();
    if (box.width % 2 !== box.height % 2) {
      offset = offset.add(Position.of(box.width % 2, box.height % 2));
    }

    const shiftedRotatedEntries = rotatedEntries.map(({ position, value }) => ({
      position: position.add(offset),
      value,
    }));

    this.clear();
    shiftedRotatedEntries.map(({ position, value }) =>
      this.set(position, value)
    );
  }

  keys(): Position[] {
    return Array.from(this.objects.keys()).map((positionString) =>
      Position.fromString(positionString)
    );
  }

  values(): T[] {
    return Array.from(this.objects.values());
  }

  entries(): [Position, T][] {
    return Array.from(this.objects.entries()).map(
      ([positionString, object]) => [
        Position.fromString(positionString),
        object,
      ]
    );
  }

  static merge<T>(mapA: PositionMap<T>, mapB: PositionMap<T>): PositionMap<T> {
    const merged = new PositionMap<T>();
    mapA.entries().forEach(([position, t]) => merged.set(position, t));
    mapB.entries().forEach(([position, t]) => merged.set(position, t));
    return merged;
  }

  clone(): PositionMap<T> {
    const copy = new PositionMap<T>();
    this.entries().forEach(([position, t]) => copy.set(position, t));
    return copy;
  }
}
