import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { 
  Canvas,
  Skia,
  Path,
  Circle,
  useValue,
  runTiming,
  BlurMask,
  Easing,
} from '@shopify/react-native-skia';

import { styles } from './styles';
import { THEME } from '../../styles/theme';
import { useEffect } from 'react';

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
}

const CHECK_SIZE = 28;
const CHECK_STOKE = 2;

export function Option({ checked, title, ...rest }: Props) {
  const percentage = useValue(0);
  const circle = useValue(0);

  const RADIUS = (CHECK_SIZE - CHECK_STOKE) / 2;
  const INNER_RADIUS = RADIUS / 2;

  const path = Skia.Path.Make();
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS);

  useEffect(() => {
    if (checked) {
      runTiming(percentage, 1, { duration: 400 });
      runTiming(circle, INNER_RADIUS, { easing: Easing.bounce });
    } else {
      runTiming(percentage, 0, { duration: 400 });
      runTiming(circle, 0, { duration: 200 });
    }
  }, [checked]);

  return (
    <TouchableOpacity
      style={
        [
          styles.container,
          checked && styles.checked
        ]
      }
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path 
          path={path}
          color={THEME.COLORS.GREY_500}
          style='stroke'
          strokeWidth={CHECK_STOKE}
        />

        <Path 
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style='stroke'
          strokeWidth={CHECK_STOKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={1} style='solid' />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circle}
          color={THEME.COLORS.BRAND_LIGHT}
        >
          <BlurMask blur={5} style='solid' />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  );
}