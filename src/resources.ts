import { ImageSource } from "excalibur";
import sword from "./images/sword.png"; // for parcelv2 this is configured in the .parcelrc
import sheet from "./images/sheet.png";
import grass from "./images/RectangleGrass.png";
import * as ex from "excalibur";

let Resources = {
  Sword: new ImageSource(sword),
  grass: new ImageSource(grass),
  sheet: new ImageSource(sheet),
};

const spriteSheet = ex.SpriteSheet.fromImageSource({
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

export { Resources , spriteSheet };
