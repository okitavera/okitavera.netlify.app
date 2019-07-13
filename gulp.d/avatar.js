
const NetworkAvatarPicker = require('network-avatar-picker');

module.exports = ({ gulp, fs, metadata }) => {
    const avatarPicker = new NetworkAvatarPicker();
    const fetchAvatar = async () => {
        const res = await avatarPicker.twitter.getAvatar(metadata.author.twitter);
        fs.writeFileSync("./assets/img/me.png", res);
    };
    gulp.task("fetch-avatar", fetchAvatar);
};
