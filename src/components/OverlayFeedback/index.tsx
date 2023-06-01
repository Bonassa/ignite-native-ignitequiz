import { useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Canvas, Rect, BlurMask } from "@shopify/react-native-skia";

import { THEME } from "../../styles/theme";
import { useEffect } from "react";

export enum StatusEnum {
  default = 'default',
  correct = 'correct',
  wrong = 'wrong',
}

const OverlayColor: Record<StatusEnum, string> = {
  default: 'transparent',
  correct: THEME.COLORS.BRAND_LIGHT,
  wrong: THEME.COLORS.DANGER_LIGHT,
}

type Props = {
  status: StatusEnum;
}

export function OverlayFeedback({ status }: Props) {
  const { height, width } = useWindowDimensions();

  const opacityAnimation = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation.value,
    }
  })
  
  useEffect(() => {
    opacityAnimation.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0)
    );
  }, [status]);

  return (
    <Animated.View style={[{ height, width, position: 'absolute' }, containerAnimatedStyle]}>
      <Canvas style={{ flex: 1 }} >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          color={OverlayColor[status]}
        >
          <BlurMask blur={50} style='inner' />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}