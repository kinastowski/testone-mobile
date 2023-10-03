import { Slider as TamaguiSlider, XStack } from "tamagui";

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

//## $util.qr($ctx.stash.defaultValues.put("id", $util.autoId()))
//$util.qr($ctx.stash.put("defaultValues", $util.defaultIfNull($ctx.stash.defaultValues, {})))
