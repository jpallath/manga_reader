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
  width,
  height,
  magnifierHeight = 200,
  magnifierWidth = 200,
  zoomLevel = 1.5,
}) => {
  const [[x, y], setXY] = useState<[number, number]>([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState<[number, number]>([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  useEffect(() => {
    const handleTouchMove = (event: any) => {
      event.preventDefault(); // Prevent default behavior (drag to reload)
    };

    // Add touchmove event listener to document
    document.addEventListener("touchmove", handleTouchMove);

    // Cleanup function to remove event listener on unmount
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default context menu
  };

  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width,
      }}
    >
      <img
        className="preview-window overflow-y-hidden"
        onContextMenu={handleContextMenu}
        src={src}
        style={{ height: height, width: width }}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget as HTMLImageElement;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onTouchStart={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget as HTMLImageElement;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget as HTMLImageElement;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onTouchMove={(e) => {
          // update cursor position
          const elem = e.currentTarget as HTMLImageElement;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image using touch coordinates
          const touchX = e.changedTouches[0].pageX;
          const touchY = e.changedTouches[0].pageY;

          const x = touchX - left - window.pageXOffset;
          const y = touchY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false);
        }}
        onTouchEnd={() => {
          // close magnifier
          setShowMagnifier(false);
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

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
};
