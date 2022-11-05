import * as ex from "excalibur";
import { Actor} from "excalibur";
import { Resources , spriteSheet } from "./Resources";

type TileType = 'grass' | 'darkGrass' | 'grey' | 'darkGrey' | 'sand' | 'darkSand';

export class MapSheetUtils {
  static mapTypeToIndexes(tileType: TileType): { row: number; col: number } {
    switch (tileType) {
      case "grass":
        return { row: 0, col: 0 };
      case "darkGrass":
        return { row: 0, col: 1 };
      case "grey":
        return { row: 0, col: 2 };
      case "darkGrey":
        return { row: 0, col: 3 };
      case "sand":
        return { row: 1, col: 0 };
      case "darkSand":
        return { row: 1, col: 1 };
      default:
        return { row: 0, col: 4 };
    }
  }
}

export class Tile extends Actor {
  constructor(args: ex.ActorArgs, private tileType: TileType) {
    super(args);
  }

  onInitialize() {
    const rougeLikeSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.sheet,
      grid: {
        rows: 5,
        columns: 5,
        spriteHeight: 200,
        spriteWidth: 200,
      },
      spacing: {
        margin: {
          x: 0,
          y: 0,
        },
      },
    });
    const indexes = MapSheetUtils.mapTypeToIndexes(this.tileType);
    const sprite = spriteSheet.getSprite(indexes.row, indexes.col);
    if (sprite) this.graphics.add(sprite);
  }
}

export class Grid extends Actor {
  mapTiles: Tile[][] = [];

  onInitialize() {
    this.mapTiles = [];
    for (let i = 0; i < this.rows; i++) {
      let tilesInRow: Tile[] = [];
      for (let j = 0; j < this.cols; j++) {
        let tile = new Tile(
          {
            name: `tile ${i},${j} `,
            pos: ex.vec(i * 50, j * 50),
            width: 50,
            height: 50,
          },
          "grass"
        );
        this.addChild(tile);
        tilesInRow.push(tile);
      }
      this.mapTiles.push(tilesInRow);
    }
  }

  constructor(private cols: number, private rows: number) {
    super({ pos: ex.vec(0, 0), width: 1000, height: 1000 });
  }
}
