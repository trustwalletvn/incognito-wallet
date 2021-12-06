import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

const VectorSetting = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.6177 8.12045L17.5721 7.74703C17.4207 7.69518 17.2823 7.61124 17.1663 7.50097C17.0503 7.39069 16.9594 7.25667 16.9 7.10807C16.8362 6.9629 16.8033 6.80607 16.8033 6.64751C16.8033 6.48896 16.8362 6.33213 16.9 6.18696L17.4394 5.17458C17.6146 4.80759 17.6718 4.39528 17.603 3.99444C17.5343 3.5936 17.3429 3.22394 17.0553 2.93636C16.7678 2.64878 16.3981 2.45743 15.9973 2.38865C15.5964 2.31988 15.1841 2.37706 14.8171 2.55234L13.8047 3.03364C13.659 3.09503 13.5024 3.12665 13.3442 3.12665C13.186 3.12665 13.0294 3.09503 12.8836 3.03364C12.7367 2.97148 12.6041 2.87972 12.4942 2.76408C12.3842 2.64844 12.2993 2.51139 12.2447 2.36148L11.8713 1.3076C11.7338 0.924756 11.4815 0.59369 11.1488 0.359647C10.8161 0.125604 10.4192 0 10.0124 0C9.60567 0 9.20882 0.125604 8.87612 0.359647C8.54342 0.59369 8.2911 0.924756 8.15364 1.3076L7.73873 2.38637C7.68409 2.53628 7.59916 2.67333 7.48923 2.78897C7.3793 2.90462 7.24672 2.99638 7.09977 3.05853C6.95399 3.11992 6.7974 3.15155 6.63922 3.15155C6.48103 3.15155 6.32445 3.11992 6.17866 3.05853L5.16628 2.55234C4.79929 2.37706 4.38698 2.31988 3.98614 2.38865C3.5853 2.45743 3.21564 2.64878 2.92806 2.93636C2.64048 3.22394 2.44913 3.5936 2.38035 3.99444C2.31158 4.39528 2.36877 4.80759 2.54404 5.17458L3.02534 6.18696C3.0891 6.33213 3.12203 6.48896 3.12203 6.64751C3.12203 6.80607 3.0891 6.9629 3.02534 7.10807C2.96589 7.25667 2.87506 7.39069 2.75905 7.50097C2.64305 7.61124 2.5046 7.69518 2.35318 7.74703L1.3076 8.12045C0.924756 8.25791 0.59369 8.51022 0.359647 8.84293C0.125604 9.17563 0 9.57248 0 9.97925C0 10.386 0.125604 10.7829 0.359647 11.1156C0.59369 11.4483 0.924756 11.7006 1.3076 11.8381L2.35318 12.2115C2.5046 12.2633 2.64305 12.3473 2.75905 12.4575C2.87506 12.5678 2.96589 12.7018 3.02534 12.8504C3.0891 12.9956 3.12203 13.1524 3.12203 13.311C3.12203 13.4695 3.0891 13.6264 3.02534 13.7715L2.54404 14.7839C2.35387 15.1522 2.28492 15.5712 2.34705 15.981C2.40918 16.3908 2.5992 16.7705 2.88999 17.0659C3.18078 17.3613 3.55746 17.5573 3.96625 17.6258C4.37504 17.6944 4.79504 17.632 5.16628 17.4477L6.17866 16.9747C6.32328 16.9089 6.48033 16.8748 6.63922 16.8748C6.7981 16.8748 6.95515 16.9089 7.09977 16.9747C7.24753 17.0355 7.38081 17.1268 7.49091 17.2426C7.601 17.3584 7.68545 17.4962 7.73873 17.6468L8.11215 18.6924C8.24961 19.0752 8.50193 19.4063 8.83463 19.6404C9.16733 19.8744 9.56418 20 9.97096 20C10.3777 20 10.7746 19.8744 11.1073 19.6404C11.44 19.4063 11.6923 19.0752 11.8298 18.6924L12.2032 17.6468C12.2565 17.4962 12.3409 17.3584 12.451 17.2426C12.5611 17.1268 12.6944 17.0355 12.8421 16.9747C12.9868 16.9089 13.1438 16.8748 13.3027 16.8748C13.4616 16.8748 13.6186 16.9089 13.7632 16.9747L14.7756 17.4477C15.148 17.648 15.575 17.723 15.9934 17.6615C16.4117 17.6 16.7991 17.4054 17.0981 17.1064C17.3971 16.8074 17.5917 16.42 17.6532 16.0017C17.7147 15.5833 17.6397 15.1563 17.4394 14.7839L16.9581 13.7715C16.8943 13.6264 16.8614 13.4695 16.8614 13.311C16.8614 13.1524 16.8943 12.9956 16.9581 12.8504C17.0175 12.7018 17.1083 12.5678 17.2244 12.4575C17.3404 12.3473 17.4788 12.2633 17.6302 12.2115L18.6758 11.8381C19.0586 11.7006 19.3897 11.4483 19.6238 11.1156C19.8578 10.7829 19.9834 10.386 19.9834 9.97925C19.9834 9.57248 19.8578 9.17563 19.6238 8.84293C19.3897 8.51022 19.0586 8.25791 18.6758 8.12045H18.6177ZM9.97096 13.9541C9.18845 13.9352 8.42727 13.6952 7.77531 13.2621C7.12336 12.8289 6.60723 12.2202 6.28654 11.5061C6.08534 11.0224 5.98155 10.5037 5.98112 9.97973C5.98069 9.45579 6.08364 8.93692 6.28406 8.45283C6.48448 7.96874 6.77843 7.52895 7.14908 7.15865C7.51974 6.78834 7.95981 6.4948 8.44408 6.29484C9.42256 5.9042 10.5149 5.91112 11.4884 6.31414C12.4618 6.71716 13.2394 7.48441 13.6554 8.45238C13.8566 8.93614 13.9604 9.45485 13.9608 9.97878C13.9612 10.5027 13.8583 11.0216 13.6579 11.5057C13.4574 11.9898 13.1635 12.4296 12.7928 12.7999C12.4222 13.1702 11.9821 13.4637 11.4978 13.6637C11.0147 13.8658 10.4946 13.9647 9.97096 13.9541Z"
      fill="#000000"
    />
  </Svg>
);

export const VectorSettingColor = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19.8491 15.4787L18.7248 13.5213C18.5747 13.2658 18.3298 13.08 18.0436 13.0042C17.7573 12.9284 17.4527 12.9686 17.1959 13.1163L16.3977 13.5775C15.6286 12.8892 14.7252 12.3683 13.7445 12.0475V11.125C13.7445 10.8266 13.6261 10.5405 13.4152 10.3295C13.2044 10.1185 12.9184 10 12.6203 10H10.3718C10.0737 10 9.7877 10.1185 9.57687 10.3295C9.36603 10.5405 9.24759 10.8266 9.24759 11.125V12.0475C8.26885 12.3651 7.36844 12.8865 6.60565 13.5775L5.80745 13.1163C5.54931 12.9696 5.24367 12.931 4.95724 13.009C4.6708 13.087 4.42681 13.2752 4.2785 13.5325L3.15427 15.4787C3.00676 15.7357 2.96652 16.0405 3.0423 16.327C3.11808 16.6135 3.30376 16.8585 3.55899 17.0087L4.35719 17.47C4.14907 18.4794 4.14907 19.5206 4.35719 20.53L3.55899 20.9913C3.43111 21.0657 3.31916 21.1646 3.22957 21.2825C3.13998 21.4003 3.07451 21.5346 3.03691 21.6778C2.99931 21.821 2.99033 21.9702 3.01046 22.1169C3.0306 22.2635 3.07947 22.4048 3.15427 22.5325L4.2785 24.4788C4.42867 24.7342 4.67349 24.92 4.95977 24.9958C5.24605 25.0716 5.55066 25.0314 5.80745 24.8837L6.60565 24.4225C7.36639 25.1163 8.26744 25.6381 9.24759 25.9525V26.875C9.24759 27.1734 9.36603 27.4595 9.57687 27.6705C9.7877 27.8815 10.0737 28 10.3718 28H12.6203C12.9184 28 13.2044 27.8815 13.4152 27.6705C13.6261 27.4595 13.7445 27.1734 13.7445 26.875V25.9525C14.7271 25.6416 15.6318 25.1237 16.3977 24.4338L17.1959 24.8837C17.3239 24.9578 17.4653 25.0059 17.6119 25.0252C17.7585 25.0445 17.9075 25.0347 18.0503 24.9963C18.3342 24.9187 18.5763 24.7329 18.7248 24.4788L19.8491 22.5325C19.9231 22.4044 19.9711 22.2629 19.9904 22.1162C20.0097 21.9695 19.9999 21.8204 19.9615 21.6775C19.8867 21.3893 19.7007 21.1425 19.4443 20.9913L18.6349 20.53C18.8485 19.5212 18.8485 18.4788 18.6349 17.47L19.4331 17.0087C19.6902 16.8603 19.8783 16.6162 19.9562 16.3295C20.0342 16.0429 19.9956 15.7371 19.8491 15.4787ZM11.496 22.9375C10.7178 22.9375 9.95706 22.7066 9.30999 22.2739C8.66291 21.8413 8.15858 21.2263 7.86076 20.5068C7.56295 19.7873 7.48503 18.9956 7.63685 18.2318C7.78868 17.468 8.16343 16.7664 8.71372 16.2158C9.26401 15.6651 9.96513 15.2901 10.7284 15.1382C11.4917 14.9862 12.2828 15.0642 13.0018 15.3622C13.7208 15.6602 14.3354 16.1649 14.7677 16.8124C15.2001 17.46 15.4308 18.2212 15.4308 19C15.4308 20.0443 15.0163 21.0458 14.2784 21.7842C13.5405 22.5227 12.5396 22.9375 11.496 22.9375Z"
      fill="#1A73E8"
    />
    <Path
      d="M28.6914 9.25556L28.0125 8.9C28.1674 8.31246 28.1674 7.69865 28.0125 7.11111L28.7033 6.74444C28.8393 6.66812 28.9379 6.54516 28.978 6.40188C29.018 6.25859 28.9964 6.10636 28.9176 5.97778L28.3221 5.02222C28.2449 4.89328 28.1167 4.7976 27.9648 4.75556C27.8188 4.70539 27.6583 4.70539 27.5123 4.75556L26.8215 5.13333C26.3565 4.71198 25.7882 4.40301 25.166 4.23333V3.55556C25.166 3.40821 25.1033 3.26691 24.9916 3.16272C24.8799 3.05853 24.7284 3 24.5705 3H23.3795C23.2216 3 23.0701 3.05853 22.9584 3.16272C22.8467 3.26691 22.784 3.40821 22.784 3.55556V4.28889C22.1653 4.46052 21.5984 4.76495 21.1285 5.17778L20.4854 4.81111C20.3393 4.76095 20.1788 4.76095 20.0328 4.81111C19.9567 4.83021 19.8858 4.86375 19.8243 4.90964C19.7628 4.95553 19.7121 5.01277 19.6755 5.07778L19.08 6.03333C19.0485 6.09983 19.0322 6.17174 19.0322 6.24444C19.0322 6.31715 19.0485 6.38906 19.08 6.45556C19.1205 6.59891 19.2186 6.72223 19.3539 6.8L20.0328 7.15556C19.8838 7.74375 19.8838 8.35625 20.0328 8.94444L19.2944 9.25556C19.1583 9.33188 19.0597 9.45484 19.0197 9.59812C18.9796 9.74141 19.0013 9.89364 19.08 10.0222L19.6755 10.9778C19.7121 11.0428 19.7628 11.1 19.8243 11.1459C19.8858 11.1918 19.9567 11.2253 20.0328 11.2444C20.1788 11.2946 20.3393 11.2946 20.4854 11.2444L21.1642 10.8778C21.6342 11.293 22.2008 11.601 22.8197 11.7778V12.4444C22.8197 12.5918 22.8825 12.7331 22.9941 12.8373C23.1058 12.9415 23.2573 13 23.4152 13H24.6062C24.7642 13 24.9156 12.9415 25.0273 12.8373C25.139 12.7331 25.2017 12.5918 25.2017 12.4444V11.7222C25.8238 11.5448 26.3942 11.237 26.8691 10.8222L27.548 11.1889C27.6941 11.2391 27.8545 11.2391 28.0006 11.1889C28.1524 11.1468 28.2806 11.0512 28.3579 10.9222L28.9534 9.96667C29.0104 9.83875 29.0153 9.69575 28.967 9.56472C28.9187 9.43369 28.8207 9.32371 28.6914 9.25556ZM23.9274 9.66667C23.5756 9.6601 23.2338 9.5568 22.9447 9.36972C22.6557 9.18264 22.4323 8.92011 22.3025 8.61505C22.1728 8.30998 22.1425 7.97597 22.2154 7.6549C22.2883 7.33382 22.4612 7.03998 22.7124 6.81021C22.9636 6.58045 23.2819 6.42499 23.6275 6.36334C23.973 6.30168 24.3304 6.33658 24.6547 6.46365C24.9791 6.59071 25.256 6.80429 25.4508 7.07761C25.6456 7.35092 25.7495 7.6718 25.7496 8C25.7496 8.44203 25.5614 8.86595 25.2263 9.17851C24.8913 9.49107 24.4369 9.66667 23.9631 9.66667H23.9274Z"
      fill="#1A73E8"
    />
  </Svg>
);

const SettingIcon = React.memo(({ onPress, style }) => (
  <TouchableOpacity style={style} onPress={() => onPress && onPress()}>
    <VectorSetting />
  </TouchableOpacity>
));

SettingIcon.defaultProps = {
  onPress: undefined,
  style: undefined
};

SettingIcon.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.any
};

export default SettingIcon;
