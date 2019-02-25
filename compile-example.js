import compile, {
  EVENT_DATA_COMPILE_PROGRESS
} from "./src/lib/compiler/compileData";
import ejectBuild from "./src/lib/compiler/ejectBuild";
import fs from "fs-extra";
import path from "path";
import EventEmitter from "events";
import makeBuild from "./src/lib/compiler/makeBuild";
import buildProject from "./src/lib/compiler/buildProject";

const myEmitter = new EventEmitter();

myEmitter.on(EVENT_DATA_COMPILE_PROGRESS, msg => {
  console.log("Progress: " + msg);
});

/*
babel-node --presets env --plugins transform-object-rest-spread compile-example.js
*/

const projectPath =
  "/Users/chris/Library/Mobile Documents/com~apple~CloudDocs/GBJam/Untitled GB Game Test/project.json";
const projectRoot = path.dirname(projectPath);
const outputRoot = "/Users/chris/Desktop/out2";

const build = async () => {
  const data = await fs.readJson(projectPath);
  await buildProject(data, {
    projectRoot,
    buildType: "web",
    outputRoot,
    progress: message => {
      // console.log(message);
    },
    warnings: message => {
      // console.warn("WARNING: " + message);
    }
  });
};

build();
