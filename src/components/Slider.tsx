import { Slider as TamaguiSlider } from "tamagui";

interface SliderProps {
  name: string;
  value: number[];
  min: number;
  max: number;
  step: number;
  defaultValue: number[];

  onValueChange: (value: number[]) => void;
}

const Slider = (props: SliderProps) => (
  <TamaguiSlider {...props}>
    <TamaguiSlider.Track>
      <TamaguiSlider.TrackActive />
    </TamaguiSlider.Track>

    <TamaguiSlider.Thumb circular index={0} />
  </TamaguiSlider>
);

export default Slider;
