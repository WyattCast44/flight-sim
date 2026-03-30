
import { logger } from "@flight-sim/logging";
import { Simulator } from "@flight-sim/simulator";
import { Seconds } from "@flight-sim/units";

const simulator = new Simulator({ tickRate: 60 });
let duration = new Seconds(1).toMilliseconds().value;

simulator.onBeforePhysicsStep((dt) => {
  console.log("before step");
});

simulator.onAfterPhysicsStep((dt) => {
  console.log("after step");
});

setTimeout(() => {
  simulator.stop();
}, duration);

simulator.start();

logger.error("Simulation stopped");