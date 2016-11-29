import {DynamicCube} from './DynamicCube';

export class App {
  heading = '';
  theRouter;
  constructor() {
    this.heading = "Nlythe Aurila/Typescript/Three";
  }

  addDynamicRoute() {
    alert('hello');
    this.theRouter.addRoute({ route: "DynamicCube", moduleId: "DynamicCube", nav: true, title: "Dynamic Textured Cube" });
    this.theRouter.refreshNavigation();
  }
}
