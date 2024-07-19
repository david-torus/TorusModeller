import React, { useState, useEffect, useRef } from "react";

const ScrollTracker = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null); // 'up' or 'down'
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const position = scrollRef.current.scrollTop;
    setScrollDirection(position > scrollPosition ? "down" : "up");
    setScrollPosition(position);
  };

  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    currentScrollRef.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      currentScrollRef.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div  className="w-full flex justify-center items-center">
      <div style={{ height: "200px", overflowY: "scroll" }} ref={scrollRef}>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
          <li>Item 6</li>
          <li>Item 7</li>
          <li>Item 8</li>
          <li>Item 9</li>
          <li>Item 10</li>
          <li>Item 11</li>
          <li>Item 12</li>
          <li>Item 13</li>
          <li>Item 14</li>
          <li>Item 15</li>
          <li>Item 16</li>
          <li>Item 17</li>
          <li>Item 18</li>
          <li>Item 19</li>
          <li>Item 20</li>
        </ul>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p>Scroll Position: {scrollPosition}</p>
        <p>Scroll Direction: {scrollDirection}</p>
      </div>
    </div>
  );
};

export default ScrollTracker;
