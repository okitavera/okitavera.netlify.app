const Twitter = require("twitter");

module.exports = ({ gulp, fs, metadata }) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: "",
    access_token_secret: ""
  });
  const params = { screen_name: metadata.author.twitter, count: 20 };
  const fetchTweets = async () => {
    client
      .get("statuses/user_timeline", params)
      .then((response) =>
        response
          .filter((it) => !it.text.match(/^@.*/g) && !it.in_reply_to_user_id)
          .map((it) => ({
            id: it.id_str,
            name: it.user.name,
            username: it.user.screen_name,
            text: it.text,
            date: it.created_at
          }))
      )
      .then((data) => JSON.stringify(data))
      .then((data) => fs.writeFileSync("./manifest/twitter.json", data))
      .catch((err) => console.error(err));
  };
  gulp.task("twitter", fetchTweets);
};
