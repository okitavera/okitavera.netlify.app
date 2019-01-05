const spawn = require("child_process").spawn;
const eleventy = require.resolve(".bin/eleventy");

module.exports = (options = "") => {
  let cmd = (callback) => {
    spawn(eleventy, options.split(), {
      stdio: "inherit"
    }).on("close", function(code) {
      callback(code);
    });
  };
  cmd.displayName = ("eleventy" + options).replace("--", ":");
  return cmd;
};
