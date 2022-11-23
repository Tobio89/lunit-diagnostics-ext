import { DiagnosticLog } from "../types";

export function stringLabel(label:DiagnosticLog['label']){
  return `${label.purpose}: ${label.project}: ${label.scope}`; 
}