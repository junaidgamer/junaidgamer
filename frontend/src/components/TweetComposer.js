import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ToggleDiv from "./Togglediv"; // Import the ToggleDiv component

const TweetComposer = () => {
  const [tweetContent, setTweetContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [likes, setLikes] = useState([0]);
  const [dislikes, setDislikes] = useState([0]);
  const [commentSectionVisible, setCommentSectionVisible] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/tweets/");
      const tweetsWithDefaults = response.data.map((tweet) => ({
        ...tweet,
        likes: tweet.likes || 0,
        dislikes: tweet.dislikes || 0,
        comments: [],
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
        id: 2,
        user: 2,
      });
      console.log("Tweet created:", response.data);
      setTweets([...tweets, { ...response.data, comments: [] }]);
    } catch (error) {
      console.error("Error creating tweet:", error);
      setError("An error occurred while creating the tweet.");
    } finally {
      setLoading(false);
      setTweetContent("");
      setLikes([]);
      setDislikes([]);
    }
  };
  const handleInputChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handleLikeButtonClick = (tweetId) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        const isLiked = !tweet.isLiked; // Toggle the like status
        const likes = isLiked ? (tweet.likes || 0) + 1 : (tweet.likes || 0) - 1; // Adjust likes count accordingly
        return { ...tweet, isLiked, likes };
      }
      return tweet;
    });
    setTweets(updatedTweets);
  };

  const handleDislikeButtonClick = (tweetId) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        // Increment dislikes by 1 when the dislike button is clicked
        return {
          ...tweet,
          isDisliked: !tweet.isDisliked,
          dislikes: (tweet.dislikes || 0) + 1,
        };
      }
      return tweet;
    });
    setTweets(updatedTweets);
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/tweets/${tweetId}/`
      );
      console.log(response.data);
      console.log(`Deleted tweet with ID ${tweetId}`);
      await fetchTweets();
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };
  const handleSend = async (tweetId, commentContent) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/comments/`, {
        content: commentContent,
        parent_comment: null,
        user: 5,
      });
      console.log("Comment added:", response.data);
      const updatedTweets = tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const updatedComments = Array.isArray(tweet.comments)
            ? tweet.comments
            : [];
          return { ...tweet, comments: [...updatedComments, response.data] };
        }
        return tweet;
      });
      setTweets(updatedTweets);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const toggleCommentSection = (tweetId) => {
    setCommentSectionVisible((prevState) => ({
      ...prevState,
      [tweetId]: !prevState[tweetId],
    }));
  };
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/tweets/");
        setTweets(response.data);
        const initialCommentVisibility = {};
        response.data.forEach((tweet) => {
          initialCommentVisibility[tweet.id] = false;
        });
        setCommentSectionVisible(initialCommentVisibility);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };
    fetchTweets();
  }, []);

  return (
    <div className="tweet">
      <h2>Tweets</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={tweetContent}
          onChange={handleInputChange}
          placeholder="What's happening?"
          rows={3}
          cols={30}
          disabled={loading}
        />
        <button className="post" type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
      {error && <p>{error}</p>}
      <h2>Tweets</h2>
      <div className="_2ndform">
        <ol>
          {tweets.map((tweet) => (
            <li key={tweet.id}>
              <div>
                <span>{tweet.content}</span>
                <button
                  value={likes}
                  id="likes"
                  onClick={() => handleLikeButtonClick(tweet.id)}
                >
                  <i className="fa fa-thumbs-up">{tweet.likes}</i>
                </button>
                <button
                  value={dislikes}
                  id="dislikes"
                  onClick={() => handleDislikeButtonClick(tweet.id)}
                >
                  <i className="fa fa-thumbs-down">{tweet.dislikes} </i>
                </button>
                <button onClick={() => handleDeleteTweet(tweet.id)}>
                  <i className="fa fa-trash"></i>
                </button>
                {/* Tweet comment section */}
                <button
                  className="post"
                  onClick={() => toggleCommentSection(tweet.id)}
                >
                  Comment
                </button>

                {/* Comment section */}
                {commentSectionVisible[tweet.id] && (
                  <div>
                    <input
                      type="text"
                      value={commentInputs[tweet.id] || ""}
                      onChange={(e) =>
                        setCommentInputs({
                          ...commentInputs,
                          [tweet.id]: e.target.value,
                        })
                      }
                      placeholder="Write your comment"
                    />
                    <button
                      className="post"
                      onClick={() =>
                        handleSend(tweet.id, commentInputs[tweet.id])
                      }
                    >
                      Reply
                    </button>
                    <ul>
                      {tweet.comments &&
                        tweet.comments.map((comment) => (
                          <li key={comment.id}>
                            <div>{comment.content}</div>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TweetComposer;
