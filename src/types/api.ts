export interface DecodeVINItem {
  VariableId: number;
  Variable: string;
  Value: string | null;
}

export interface DecodeVINResponse {
  Message?: string;
  Results?: DecodeVINItem[];
}


export interface VehicleVariable {
  ID: number;
  Name: string;
  Description: string;
  DataType: string;
  GroupName: string;
}

export interface VehicleVariablesResponse {
  Results?: VehicleVariable[];
}