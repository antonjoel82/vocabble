import React, { FC } from "react";
import {
  Slider,
  SliderProps,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

export interface NumberSliderProps extends SliderProps {
  handleChange: (val: number) => void;
}

export const NumberSlider: FC<NumberSliderProps> = ({
  handleChange,
  ...inputProps
}) => {
  return (
    <Slider {...inputProps} onChange={handleChange}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb fontSize="sm" boxSize="32px" children={inputProps.value} />
    </Slider>
  );
};
