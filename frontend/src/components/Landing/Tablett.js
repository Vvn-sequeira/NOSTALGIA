import React from "react";
import "./AnimatedList.css";
import { useRef } from "react";
import VariableProximity from "./VariableProximity";
const Tablett = () => {
  const containerRef = useRef(null);
  return (
    <>
      <div className="tablet">
        <div ref={containerRef} style={{ position: "relative" }}>
          <VariableProximity
            label={"Flowmate!!"}
            className={"variable-proximity-demo"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>
        <div>
          {" "}
          <p className="tablet-p"> NOSTALGIA HIT HOGAYA BHAI NOSTALGIA HIT HOGAYA </p>{" "}
        </div>
      </div>
    </>
  );
};

export default Tablett;
