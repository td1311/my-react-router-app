import React, { useState, useRef } from "react";

export function Welcome() {
  const [isOpen, setIsOpen] = useState(false);
  const tapTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    // ✅ Prevent rapid double toggle
    if (tapTimeout.current) return;

    setIsOpen((prev) => !prev);

    tapTimeout.current = setTimeout(() => {
      tapTimeout.current = null;
    }, 400); // slightly more than the animation duration
  };

  return (
    <main>
      <div className="container">
        <div className="mobile-layout">
          <div className="notification-header">
            <div className="necessities">
              <i className="fas fa-signal"></i>
              <i className="fas fa-wifi"></i>
              <i className="fas fa-battery-full"></i>
            </div>
          </div>
          <div className="actions">
            <i className="fas fa-chevron-left"></i>
            <i className="fas fa-bookmark"></i>
          </div>

          {/* ✅ Unified event handler using pointerdown */}
          <div
            className="book-interactive"
            onPointerDown={handleTap}
          >
            <div className={`book-cover ${isOpen ? "open" : ""}`}>
              <img
                className="book-top"
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHV4ZjE1NmJpdmwwZGlycjZ1cG9jeTk2MzNieWoxNHZsbTljYXVtZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XdwYIsIZC4ebXmRPIE/giphy.gif"
                alt="book-top"
              />
            </div>

            <div className={`preface ${isOpen ? "open" : ""}`}>
              <div className="content">
                <div className="header">
                  <div className="title">The Diary of a Young Girl</div>
                  <div className="icon">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div className="author">by Anne Frank</div>
                <div className="body">
                  <p>
                    also known as The Diary of Anne Frank, is a book of the writings from the Dutch-language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands
                  </p>
                  <p>
                    Anne calls her diary "Kitty", so almost all of the letters are written to Kitty.
                  </p>
                </div>
              </div>
            </div>
          </div> {/* End book-interactive */}
        </div>
      </div>
    </main>
  );
}
