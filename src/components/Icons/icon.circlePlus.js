import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const CirclePlusIcon = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={16} cy={16} r={16} fill="#757575" />
    <Path
      d="M10 16C10 16.1989 10.079 16.3897 10.2197 16.5303C10.3603 16.671 10.5511 16.75 10.75 16.75H15.125C15.1582 16.75 15.1899 16.7632 15.2134 16.7866C15.2368 16.8101 15.25 16.8418 15.25 16.875V21.25C15.25 21.4489 15.329 21.6397 15.4697 21.7803C15.6103 21.921 15.8011 22 16 22C16.1989 22 16.3897 21.921 16.5303 21.7803C16.671 21.6397 16.75 21.4489 16.75 21.25V16.875C16.75 16.8418 16.7632 16.8101 16.7866 16.7866C16.8101 16.7632 16.8418 16.75 16.875 16.75H21.25C21.4489 16.75 21.6397 16.671 21.7803 16.5303C21.921 16.3897 22 16.1989 22 16C22 15.8011 21.921 15.6103 21.7803 15.4697C21.6397 15.329 21.4489 15.25 21.25 15.25H16.875C16.8418 15.25 16.8101 15.2368 16.7866 15.2134C16.7632 15.1899 16.75 15.1582 16.75 15.125V10.75C16.75 10.5511 16.671 10.3603 16.5303 10.2197C16.3897 10.079 16.1989 10 16 10C15.8011 10 15.6103 10.079 15.4697 10.2197C15.329 10.3603 15.25 10.5511 15.25 10.75V15.125C15.25 15.1582 15.2368 15.1899 15.2134 15.2134C15.1899 15.2368 15.1582 15.25 15.125 15.25H10.75C10.5511 15.25 10.3603 15.329 10.2197 15.4697C10.079 15.6103 10 15.8011 10 16V16Z"
      fill="white"
    />
  </Svg>
);

export default CirclePlusIcon;