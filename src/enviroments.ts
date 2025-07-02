import { DesignVersion } from "./enums";

export const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL as string;

export const REACT_APP_DEFAULT_DESIGN = Number(
  process.env.REACT_APP_DEFAULT_DESIGN
) as DesignVersion;

export const REACT_APP_DEFAULT_USER = process.env.REACT_APP_DEFAULT_USER || "";
export const REACT_APP_DEFAULT_PASS = process.env.REACT_APP_DEFAULT_PASS || "";
