import * as model from "./model.js";
import * as view from "./view.js";

start();

async function start() {
  const labyrinth = await model.generateLabyrinth();

  console.log(labyrinth);
  console.log(JSON.stringify(labyrinth));
  view.displayLabyrinth(labyrinth);
}
