export interface LogLabel {
  purpose:string,
  project:string,
  scope:string
}

export interface DiagnosticLog {
  label: LogLabel
  duration:number,
  extra:string,
  time:number
}

export interface IndividualMetric {
  max:number
  min:number
  recent:number
  extra?:any
}

export interface Metrics {
  [key:string]:{
    [key:string]:IndividualMetric 
  }
}