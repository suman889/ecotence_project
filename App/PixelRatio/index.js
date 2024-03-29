import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 1) => size + ( scale(size) - size ) * factor;
const verticalModerateScale = (size, factor = 1) => size + ( verticalScale(size) - size ) * factor;
const mdscale = (size, factor = 1) => size + ( scale(size) - size ) * factor;
const vrscale = (size, factor = 1) => size + ( verticalScale(size) - size ) * factor;

export {scale, verticalScale, moderateScale, verticalModerateScale, mdscale, vrscale};
