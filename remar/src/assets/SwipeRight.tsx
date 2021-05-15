import React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

export const SwipeRight = (props: SvgProps) => {
  return (
    <Svg width={55} height={55} viewBox="0 0 55 55" fill="none" {...props}>
      <Circle cx={27.5} cy={27.5} r={27.5} fill="#445AE3" />
      <Path
        fill="#fff"
        d="M32.996 30.178a1.5 1.5 0 00.123-2.117l-8.976-10.084a1.5 1.5 0 00-2.24 1.994l7.978 8.964-8.964 7.978a1.5 1.5 0 001.995 2.241l10.084-8.976zm-2.083.32l.998.057.174-2.994-.998-.058-.174 2.994z"
      />
    </Svg>
  );
};
