
import { Simulator } from "@flight-sim/simulator";

const simulator = new Simulator({ tickRate: 120 });

let numberOfSteps = 0;

simulator.onBeforePhysicsStep(() => {
  console.log("before step");
});

simulator.onAfterPhysicsStep((dt) => {
  numberOfSteps++;
  console.log("after step", numberOfSteps);
});

simulator.start();

setTimeout(() => {
  simulator.stop();
}, 2000);

console.log("numberOfSteps", numberOfSteps);