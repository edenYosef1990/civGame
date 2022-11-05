import { Engine, Scene, SceneActivationContext } from "excalibur";
import { WorldMap } from './world-map';

export class Level extends Scene {
  saveState() {}

  onInitialize(_engine: Engine): void {

      const worldMap = new WorldMap(1,1);
      this.add(worldMap);
  }

  public onActivate(_context: SceneActivationContext<unknown>): void {}
  public onDeactivate(_context: SceneActivationContext<undefined>): void {
    this.saveState();
  }
}
