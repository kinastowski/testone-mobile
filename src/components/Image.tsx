import { Card } from "tamagui"; // or '@tamagui/card'
import { SolitoImage } from "solito/image";
import { useMedia } from "tamagui";
import { tokens } from "@tamagui/themes";

interface ImageProps {
  fill: boolean;
  width: number;
  height: number;
  resizeMode: string;
  sizes: string;
  alt: string;
  priority: boolean;
  src: string;
}

const logoMediaQuery = (size: keyof typeof tokens.size) => ({
  width: tokens.size[size].val,
  height: tokens.size[size].val,
});

export default (props: ImageProps) => {
  const media = useMedia();

  return (
    <SolitoImage
      {...props}
      placeholder="blur"
      blurDataURL="|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
    />
  );
};
