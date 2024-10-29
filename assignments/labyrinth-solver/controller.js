import * as view from "./view.js";
import * as model from "./model.js";

start();

async function start() {
  await model.init();

  view.displayLabyrinth();

  //await model.visitCell(model.labyrinth.start.row, model.labyrinth.start.col);

  const route = model.getRoute();
  console.log(route);

  view.displayLabRoute(route);
}
