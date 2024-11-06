export type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export const toString = (rgba: RGBA): string => {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
};

const initialOpacity = 1.0;

/**
 * NOTE: alpha部は無視され1.0でセットされます。
 * @param rgbHex 例) #FF0000
 * @returns RGBA 例) { r: 255, g: 0, b: 0, a: 1.0 }
 */
export const rgbHexToRGBA = (rgbHex: string): RGBA => {
  const tmp = rgbHex.replace('#', '');
  const r = parseInt(tmp.substring(0, 2), 16);
  const g = parseInt(tmp.substring(2, 4), 16);
  const b = parseInt(tmp.substring(4, 6), 16);
  return { r, g, b, a: initialOpacity };
};

export type ColorPalette = {
  [key: string]: RGBA;
};

export const toStrings = (palette: ColorPalette): { [key: string]: string } => {
  const result: { [key: string]: string } = {};
  Object.keys(palette).forEach((key) => {
    result[key] = toString(palette[key]);
  });
  return result;
};

const initialColor = rgbHexToRGBA('#FFFFFF');
const initialPalette: ColorPalette = {
  50: initialColor,
  100: initialColor,
  200: initialColor,
  300: initialColor,
  400: initialColor,
  500: initialColor,
  600: initialColor,
  700: initialColor,
  800: initialColor,
  900: initialColor,
} as const;

export const generateColorPalette = (baseColorHex: string): ColorPalette => {
  const palette = { ...initialPalette };

  // 500がbase color
  const baseRGBA = rgbHexToRGBA(baseColorHex);
  palette[500] = baseRGBA;

  // 50に向かっては足していく
  const beforeRange = ['400', '300', '200', '100', '50'];
  beforeRange.forEach((key, i) => {
    const diff = (i + 1) * 10;
    const rgb = {
      r: safeAddAsColor(baseRGBA.r, diff),
      g: safeAddAsColor(baseRGBA.g, diff),
      b: safeAddAsColor(baseRGBA.b, diff),
      a: initialOpacity,
    };
    palette[key] = rgb;
  });

  // 900に向かっては引いていく
  const afterRange = ['600', '700', '800', '900'];
  afterRange.forEach((key, i) => {
    const diff = (i + 1) * 10;
    const rgb = {
      r: safeAddAsColor(baseRGBA.r, -diff),
      g: safeAddAsColor(baseRGBA.g, -diff),
      b: safeAddAsColor(baseRGBA.b, -diff),
      a: initialOpacity,
    };
    palette[key] = rgb;
  });

  return palette;
};

const safeAddAsColor = (a: number, b: number): number => {
  const ret = a + b;
  if (ret > 255) {
    return 255;
  }
  if (ret < 0) {
    return 0;
  }
  return ret;
};