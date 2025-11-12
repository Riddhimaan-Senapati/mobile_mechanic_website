import * as React from "react";
import { Slider } from "radix-ui";
import "./styles.css";

const SliderDemo = () => (
	<form>
		<Slider.Root className="SliderRoot" defaultValue={[0]} max={50} step={1} onValueChange={(value) => {
			
		}}>
			<Slider.Track className="SliderTrack">
				<Slider.Range className="SliderRange" />
			</Slider.Track>
			<Slider.Thumb className="SliderThumb" aria-label="Radius" />
		</Slider.Root>
	</form>
);

export default SliderDemo;
