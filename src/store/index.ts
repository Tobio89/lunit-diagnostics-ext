import { atom } from "recoil";
import { DiagnosticLog } from "../types";

const logState= atom<DiagnosticLog[]>({
  key: 'logState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default logState