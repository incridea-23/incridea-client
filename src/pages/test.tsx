import React, { useEffect } from "react";
import BookModal from "../components/explore/BookModal";

function Test() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        console.log(window.innerHeight, window.innerWidth);
      });
    }
  }, []);
  return (
    <div>
      <BookModal />
    </div>
  );
}

export default Test;
