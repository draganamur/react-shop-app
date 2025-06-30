import { DesignVersion } from "../enums";

export const getDesign = (designVersion: number, classes: any): string => {
  switch (designVersion) {
    case DesignVersion.RED:
      return classes.red;
    case DesignVersion.LIGHT_GRAY:
      return classes.light_gray;
    case DesignVersion.DARK_BLUE:
      return classes.dark_blue;
    default:
      return "";
  }
};
