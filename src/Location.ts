const DELIMETER = ",";

export default class Location {
  readonly x: number;
  readonly y: number;

  private constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static of(x: number, y: number): Location {
    return new Location(x, y);
  }

  static fromString(locationString: string): Location {
    const [x, y] = locationString.split(DELIMETER).map((i) => parseInt(i));
    return new Location(x, y);
  }

  static origin(): Location {
    return Location.of(0, 0);
  }

  static equals(a: Location, b: Location): boolean {
    return a.x === b.x && a.y === b.y;
  }

  static areAdjacent(a: Location, b: Location): boolean {
    const xDif = Math.abs(a.x - b.x);
    const yDif = Math.abs(a.y - b.y);
    if (xDif > 1 || yDif > 1) {
      return false;
    }
    return (xDif === 0 && yDif === 1) || (xDif === 1 && yDif === 0);
  }

  add(other: Location): Location {
    return new Location(this.x + other.x, this.y + other.y);
  }

  sub(other: Location): Location {
    return new Location(this.x - other.x, this.y - other.y);
  }

  floor(): Location {
    return new Location(Math.floor(this.x), Math.floor(this.y));
  }

  ceil(): Location {
    return new Location(Math.ceil(this.x), Math.ceil(this.y));
  }

  getAdjacent(): Location[] {
    return [
      new Location(this.x - 1, this.y),
      new Location(this.x + 1, this.y),
      new Location(this.x, this.y - 1),
      new Location(this.x, this.y + 1),
    ];
  }

  toString(): string {
    return [this.x, this.y].join(DELIMETER);
  }
}
