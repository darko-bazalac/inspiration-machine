import React, { useState, useEffect } from "react";

export default function InspirationQuote() {
  const [data, setData] = useState(null);

  async function updateQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
    }
  }
  useEffect(() => {
    updateQuote();
  }, []);

  if (!data) return null;

  return (
    <div id="quote-box">
      <p id="text">{data.content}</p>
      {data.author && (
        <footer>
          <cite id="author">{data.author}</cite>
        </footer>
      )}
      <button id="new-quote" onClick={updateQuote}>
        Inspire me
      </button>
      <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">
        <button>Share Inspiration on Twitter</button>
      </a>
    </div>
  );
}
