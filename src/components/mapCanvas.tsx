import React from "react";
import { findPath } from "../scripts/pathPlanning";

declare interface mapCanvasProp {
  airport: Airport;
  classes: any;
  debug: boolean;
  fromId: string;
  toName: string;
  scaleFactor: number;
}

const MapCanvas: React.FC<mapCanvasProp> = ({
  airport,
  classes,
  debug,
  fromId,
  toName,
  scaleFactor
}) => {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const imgRef = React.createRef<HTMLImageElement>();

  const drawImg = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (img) {
          console.log("setImage");
          ctx.drawImage(
            img,
            0,
            0,
            airport.scale1width * scaleFactor,
            airport.scale1height * scaleFactor
          );
          loadMap();
        } else {
          setTimeout(() => {
            drawImg();
          }, 10);
        }
      }
    }
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      for (const poiIndex in airport.points) {
        const poiData = airport.points[poiIndex];
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.beginPath();
          ctx.arc(
            poiData.x * scaleFactor,
            poiData.y * scaleFactor,
            5,
            0,
            2 * Math.PI
          );
          ctx.fill();
          for (const poiIndex2 of poiData.connected) {
            const poiData2 = airport.points[poiIndex2];
            ctx.moveTo(poiData.x * scaleFactor, poiData.y * scaleFactor);
            ctx.lineTo(poiData2.x * scaleFactor, poiData2.y * scaleFactor);
            ctx.stroke();
          }
        } else {
          console.log("canvas 2D does not exist");
        }
      }
    } else {
      console.log("canvas does not exist");
    }
  };

  const drawPoint = (pointId: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(
          airport.points[pointId].x * scaleFactor,
          airport.points[pointId].y * scaleFactor,
          7,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#00FF00";
        ctx.fill();
      }
    }
  };

  const drawPath = () => {
    const path = findPath(airport, fromId, toName);
    const canvas = canvasRef.current;
    if (canvas && path.length > 0) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(
          airport.points[fromId].x * scaleFactor,
          airport.points[fromId].y * scaleFactor
        );
        for (const nextPoint of path) {
          ctx.lineTo(
            airport.points[nextPoint].x * scaleFactor,
            airport.points[nextPoint].y * scaleFactor
          );
        }
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 5;
        ctx.stroke();
      }
      drawPoint(path[path.length - 1]);
    }
  };

  const loadMap = () => {
    if (airport && debug) {
      drawGraph();
    }
    if (toName) {
      drawPath();
    }
    if (fromId) {
      drawPoint(fromId);
    }
  };

  return (
    <div>
      <div className={classes.hidden}>
        <img
          alt={`${airport.name} map`}
          ref={imgRef}
          src={`../images/${airport.imageName}`}
          onLoad={() => {
            drawImg();
          }}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={airport.scale1width * scaleFactor}
        height={airport.scale1height * scaleFactor}
      ></canvas>
    </div>
  );
};

export default MapCanvas;
