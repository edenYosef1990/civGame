import { Engine, Loader } from "excalibur";
import { Resources } from "./resources";
import { Grid } from "./map-tiles";
import { Player } from "./player";
import {WorldMap} from "./world-map";
import {Level} from "./scene";

class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600 });
  }
  initialize() {
    const loader = new Loader([
      Resources.sheet,
      Resources.Sword,
      Resources.grass,
    ]);
    this.start(loader).then(() => {
      const player = new Player();
      const level = new Level();
      level.add(player);
      this.add('level1', level);
      this.goToScene("level1");
    });
  }
}

export const game = new Game();
game.initialize();
