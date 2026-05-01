// Do not add `paths` here + CLI paths — Cucumber merges them and duplicates runs.
module.exports = {
  default: {
    require: ["support/world.js", "support/hooks.js", "step-definitions/**/*.js"],
    format: ["progress-bar"],
    publishQuiet: true,
  },
};
