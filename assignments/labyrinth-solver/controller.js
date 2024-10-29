import * as view from "./view.js";
import * as model from "./model.js";

start();

async function start() {
  await model.init();
  view.init();

  view.displayLabyrinth();
}
