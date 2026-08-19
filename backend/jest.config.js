const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exorts = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  preset: 'ts-jest'
};