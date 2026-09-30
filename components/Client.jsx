"use client";
import { useState } from "react";

export function ThemeToggle() {
  return (
    <button
      className="t"
      aria-label="Toggle theme"
      onClick={() => {
        const r = document.documentElement;
        const dark =
          r.getAttribute("data-theme") === "dark" ||
          (!r.getAttribute("data-theme") && matchMedia("(prefers-color-scheme:dark)").matches);
        r.setAttribute("data-theme", dark ? "light" : "dark");
      }}
    >
      ◐
    </button>
  );
}

export function Portrait({ alt, src = "/photo.jpg" }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="ph" style={{ cursor: "default" }}>
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} onError={() => setOk(false)} />
      ) : (
        <span>
          Photo
          <br />
          (add it in /admin)
        </span>
      )}
    </div>
  );
}
