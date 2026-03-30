
import { logger } from "@flight-sim/logging";
import { Simulator } from "@flight-sim/simulator";
import { Seconds } from "@flight-sim/units";

const simulator = new Simulator({ tickRate: 60 });
let duration = new Seconds(1).toMilliseconds().value;

simulator.onStart(() => {
  logger.info("simulation started");
});

simulator.onStop(() => {
  logger.info("simulation stopped");
});

// simulator.onBeforeTick((dt) => {
//   logger.info("before tick", { dt: dt.toFixed(2) });
// });

// simulator.onFrame((alpha) => {
//   logger.info("frame", { alpha: alpha.toFixed(2) });
// });

// simulator.onAfterTick((dt) => {
//   logger.info("after tick", { dt: dt.toFixed(2) });
// });

setTimeout(() => {
  simulator.stop();
}, duration);

simulator.start();