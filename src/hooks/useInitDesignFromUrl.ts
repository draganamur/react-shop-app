import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DesignVersion } from "../enums";
import { setDesignVersion } from "../store/slices/config-slice";
import { DESIGN } from "../utils/constants";

export function useInitDesignFromUrl() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const param = searchParams.get(DESIGN);

    if (param) {
      const version = parseInt(param, 10);

      const enumValues = Object.values(DesignVersion).filter(
        (v) => typeof v === "number"
      );

      if (enumValues.includes(version)) {
        dispatch(setDesignVersion(version));
      }
    }
  }, [searchParams, dispatch]);
}
