export type ClientChanges = {
  version: number;
  updates: {
    updateJSON: SerializedJSON;
    clientID: string;
  }[];
};

export type SerializedJSON = (number | (string | number)[])[];
