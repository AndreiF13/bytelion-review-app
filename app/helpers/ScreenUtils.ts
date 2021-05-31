import { Dimensions, PixelRatio } from 'react-native';

export function getElementLayoutDimensions(elementLayout: any): any {
  const obj = { x: 0, y: 0, w: 0, h: 0};
  const { x, y, width, height }: any = elementLayout;
  obj.x = x;
  obj.y = y;
  obj.w = width;
  obj.h = height;
  return obj;
}

export function widthPercentToDP(widthPercent: string, customWidth: string = ""): any {
  let screenWidth: any;
  if (customWidth && customWidth.length > 0) {
    screenWidth = customWidth;
  } else {
    screenWidth = Dimensions.get('window').width;
  }
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
}

export function heightPercentToDP(heightPercent: string, customHeight: string = ""): any {
  let screenHeight: any;
  if (customHeight && customHeight.length > 0) {
    screenHeight = customHeight;
  } else {
    screenHeight = Dimensions.get('window').height;
  }
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
}
