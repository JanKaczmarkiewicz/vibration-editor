export type BoxDefinition = {
  id: string;
  left: number;
  width: number;
  height: number;
};

export type UpdateBoxData = {
  left?: number;
  width?: number;
  height?: number;
};

export interface UpdateBox {
  (id: string, updateBox: UpdateBoxData): void;
}

export interface BindedUpdateBox {
  (updateBox: UpdateBoxData): void;
}
