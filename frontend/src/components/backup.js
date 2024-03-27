import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

  const TweetComposer = () => {
  const [tweetContent, setTweetContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [likes,setLikes] = useState([0]);
  const [dislikes,setDislikes] = useState([0]);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/tweets/");
      const tweetsWithDefaults = response.data.map(tweet => ({
        ...tweet,
        likes: tweet.likes || 0,
        dislikes: tweet.dislikes || 0
      }));
      setTweets(tweetsWithDefaults);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
    
      try {
        const response = await axios.post("http://127.0.0.1:8000/tweets/", {
          content: tweetContent,
          id : 1,
          user: 1,
        });
        console.log("Tweet created:", response.data);
        setTweets([...tweets, { ...response.data }]);
      } catch (error) {
        console.error("Error creating tweet:", error);
        setError("An error occurred while creating the tweet.");
      } finally {
        setLoading(false);
        setTweetContent("");
        setLikes(0);
        setDislikes(0);
      }
    };
  const handleInputChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handleLikeButtonClick = (tweetId) => {
    const updatedTweets = tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return { ...tweet, isLiked: !tweet.isLiked, likes: tweet.likes + 1 };}
      return tweet;
    });
    setTweets(updatedTweets);
  };

  const handleDislikeButtonClick = (tweetId) => {
    const updatedTweets = tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return { ...tweet, isDisliked: !tweet.isDisliked, dislikes: tweet.dislikes + 1 };
      }
      return tweet;
    });
    setTweets(updatedTweets);
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/tweets/${tweetId}/`);
      console.log(response.data);
      console.log(`Deleted tweet with ID ${tweetId}`);
      await fetchTweets();
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }
  };


  return (
    <div className="tweet">
      <h2>Compose a Tweet</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={tweetContent}
          onChange={handleInputChange}
          placeholder="What's happening?"
          rows={4}
          cols={50}
          disabled={loading}
        />
        <button className="post" type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
      {error && <p>{error}</p>}
      <h2>Tweets</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <div>
              <span>{tweet.content}</span>
              <button value={likes} id="likes" onClick={() => handleLikeButtonClick(tweet.id)}>
                <i className="fa fa-thumbs-up">{tweet.likes} </i>
              </button>
              <button value={dislikes} id="dislikes" onClick={() => handleDislikeButtonClick(tweet.id)}>
                <i className="fa fa-thumbs-down">{tweet.dislikes} </i>
              </button>
              <button onClick={() => handleDeleteTweet(tweet.id)}>
                <i className="fa fa-trash"></i>
              </button>
              <button onClick={() => handleComment(tweet.id,commentInput)}>
                add comment
                <i className="fa fa-comment"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetComposer;
