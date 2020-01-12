type Size = {
  width: number | string;
  height: number | string;
};

interface BoxDefinition {
  id: string;
  left: number;
  width: number;
  height: number;
}

export interface ResizeHandler {
  (id: string, width: number, height: number): void;
}

export interface RelocateHandler {
  (id: string, left: number): void;
}

export { BoxDefinition, Size };
