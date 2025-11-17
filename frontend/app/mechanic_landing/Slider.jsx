import * as React from "react";
import { Slider } from "radix-ui";
import "./styles.css";

const SliderDemo = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 50,
  step = 1,
  onChange,
}) => {
  const controlled = value !== undefined && value !== null;
  return (
    <form>
      <Slider.Root
        className="SliderRoot"
        defaultValue={!controlled ? [defaultValue] : undefined}
        min={min}
        max={max}
        step={step}
        value={controlled ? [value] : undefined}
        onValueChange={onChange ? (v) => onChange(v[0]) : undefined}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Radius" />
      </Slider.Root>
    </form>
  );
};

export default SliderDemo;
