import React, { useEffect, useRef, useState } from "react";
import "./ProgressCircleStyle.css";
import PropTypes from "prop-types";

export default function ProgressCircle({
  size,
  progress,
  strokeWidth,
  circleOneStroke,
  circleTwoStroke,
  minutes,
  seconds,
  milliSeconds
}) {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
    circleRef.current.style =
      "transition: stroke-dashoffset 100ms ease-in-out;";
  }, [setOffset, circumference, progress, offset]);

  return (
    <>
      <svg className="svg" width={size} height={size}>
        <circle
          className="svg-circle-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="svg-circle"
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text x={`${center}`} y={`${center}`} className="svg-circle-text">
        {("0" + seconds).slice(-2) +
            ":" +
            ("0" + milliSeconds).slice(-2)}
        </text>
      </svg>
    </>
  );
}
ProgressCircle.propTypes = {
  size: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  circleOneStroke: PropTypes.string.isRequired,
  circleTwoStroke: PropTypes.string.isRequired
};
