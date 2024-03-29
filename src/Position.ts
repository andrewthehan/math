const DELIMETER = ",";

export default class Position {
  readonly x: number;
  readonly y: number;

  private constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static of(x: number, y: number): Position {
    return new Position(x, y);
  }

  static fromString(positionString: string): Position {
    const [x, y] = positionString.split(DELIMETER).map((i) => parseInt(i));
    return new Position(x, y);
  }

  static origin(): Position {
    return Position.of(0, 0);
  }

  static equals(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
  }

  static areAdjacent(a: Position, b: Position): boolean {
    const xDif = Math.abs(a.x - b.x);
    const yDif = Math.abs(a.y - b.y);
    if (xDif > 1 || yDif > 1) {
      return false;
    }
    return (xDif === 0 && yDif === 1) || (xDif === 1 && yDif === 0);
  }

  add(other: Position): Position {
    return new Position(this.x + other.x, this.y + other.y);
  }

  subtract(other: Position): Position {
    return new Position(this.x - other.x, this.y - other.y);
  }

  multiply(n: number): Position {
    return new Position(this.x * n, this.y * n);
  }

  divide(n: number): Position {
    return new Position(this.x / n, this.y / n);
  }

  up(n: number): Position {
    return new Position(this.x, this.y + n);
  }

  down(n: number): Position {
    return new Position(this.x, this.y - n);
  }

  left(n: number): Position {
    return new Position(this.x - n, this.y);
  }

  right(n: number): Position {
    return new Position(this.x + n, this.y);
  }

  floor(): Position {
    return new Position(Math.floor(this.x), Math.floor(this.y));
  }

  ceil(): Position {
    return new Position(Math.ceil(this.x), Math.ceil(this.y));
  }

  getAdjacent(): Position[] {
    return [this.up(1), this.down(1), this.left(1), this.right(1)];
  }

  toString(): string {
    return [this.x, this.y].join(DELIMETER);
  }
}
