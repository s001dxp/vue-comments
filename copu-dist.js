let fsExtra = require("fs-extra");

try {
  fsExtra.removeSync("../comments-web-server/dist");
  fsExtra.copySync("dist", "../comments-web-server/dist");
  console.log(`Copy "dist" to "../comments-web-server/dist"`);
} catch (error) {
  console.log(`${error} Error copy "dist"`);
}
