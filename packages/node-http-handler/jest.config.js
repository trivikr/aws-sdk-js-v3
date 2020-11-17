const base = require("../../jest.config.base.js");

module.exports = {
  ...base,
  testMatch: [...base.testMatch, "**/dist/cjs/**/?(*.)ispec.js?(x)"],
};
