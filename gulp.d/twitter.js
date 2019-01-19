const Twitter = require("twitter");

module.exports = ({ gulp, fs }) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: "",
    access_token_secret: ""
  });
  const params = { screen_name: process.env.TWITTER_USERNAME, count: 20 };
  const fetchTweets = async () => {
    client
      .get("statuses/user_timeline", params)
      .then((response) =>
        response
          .filter((it) => !it.text.match(/^(@|RT\ @).*/g))
          .map((it) => ({
            name: it.user.name,
            username: it.user.screen_name,
            text: it.text,
            url: `https://twitter.com/${it.user.screen_name}/status/${
              it.id_str
            }`,
            date: it.created_at
          }))
      )
      .then((tweets) => JSON.stringify(tweets))
      .then((tweets) => fs.writeFileSync("./manifest/twitter.json", tweets))
      .catch((err) => console.error(err));
  };
  gulp.task("twitter", fetchTweets);
};
