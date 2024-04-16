import { Label, RadioGroup, SizeTokens, XStack, YStack } from "tamagui";

export function RadiItem(props: {
  size: SizeTokens;
  value: string;
  label: string;
}) {
  return (
    <XStack width={300} alignItems="center" space="$4">
      <RadioGroup.Item value={props.value} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size}>{props.label}</Label>
    </XStack>
  );
}

function Radio({ items, value, onValueChange, name }) {
  return (
    <RadioGroup
      aria-labelledby="Select one item"
      value={value}
      onValueChange={onValueChange}
      name={name}
    >
      <YStack width={300} alignItems="center" space="$2">
        {items.map((item) => (
          <RadiItem
            key={item.label}
            size="$3"
            value={item.value}
            label={item.label}
          />
        ))}
      </YStack>
    </RadioGroup>
  );
}

export default Radio;
