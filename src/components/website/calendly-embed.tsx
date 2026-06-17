"use client";

import { useEffect } from "react";

type CalendlyEmbedProps = {
  url: string;
  className?: string;
};

export function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <div
        className={`calendly-inline-widget ${className ?? ""}`}
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </>
  );
}
