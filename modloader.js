class ModLoader {
  constructor() {
    this.readdirSync = require("fs").readdirSync;
    this.pjoin = require("path").join;
  }

  load(dir, dependencies = {}) {
    this.readdirSync(dir).forEach((file) => {
      require(`./${this.pjoin(dir, file)}`)(dependencies);
    });
  }
}

module.exports = ModLoader;
