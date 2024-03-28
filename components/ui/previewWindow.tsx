"use client";
import React, { useState, useEffect } from "react";

export const PreviewWindow: React.FC<{
  src: string;
  width?: string;
  height?: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}> = ({
  src,
  magnifierHeight = 200,
  magnifierWidth = 200,
  zoomLevel = 1.5,
}) => {
  const [[x, y], setXY] = useState<[number, number]>([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState<[number, number]>([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleTouchMove = (event: any) => {
      event.preventDefault();
    };
    document.addEventListener("touchmove", handleTouchMove);
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, []);

  const handleContextMenu = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <picture
        className={`w-[98dvw] px-[2dvw] h-auto max-h-[98dvh] ${
          isDragging ? "overscroll-x-none" : ""
        }`}
      >
        <img
          className="preview-window"
          onContextMenu={handleContextMenu}
          src={src}
          onMouseEnter={(e) => {
            setIsDragging(true);
            const elem = e.currentTarget as HTMLImageElement;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
            setIsDragging(true);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            const elem = e.currentTarget as HTMLImageElement;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
            const elem = e.currentTarget as HTMLImageElement;
            const { top, left } = elem.getBoundingClientRect();

            const x = e.pageX - left - window.scrollX;
            const y = e.pageY - top - window.scrollY;
            setXY([x, y]);
          }}
          onTouchMove={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
            const elem = e.currentTarget as HTMLImageElement;
            const { top, left } = elem.getBoundingClientRect();

            const touchX = e.changedTouches[0].pageX;
            const touchY = e.changedTouches[0].pageY;

            const x = touchX - left - window.scrollX;
            const y = touchY - top - window.scrollY;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
            setIsDragging(false);
          }}
          onTouchEnd={() => {
            setShowMagnifier(false);
            setIsDragging(false);
          }}
          alt={"img"}
        />
        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",

            // prevent magnifier blocks the mousemove event of img
            pointerEvents: "none",
            // set size of magnifier
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            // move element center to cursor pos
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1", // reduce opacity so you can verify position
            border: "1px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            borderRadius: "50%",

            //calculate zoomed image size
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,

            //calculate position of zoomed image.
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </picture>
    </>
  );
};
