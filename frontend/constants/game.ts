export const GAME_STATUS = {
  WAITING: "waiting",
  STARTED: "started",
  ABANDONED: "abandoned",
  CHECKMATE: "checkmate",
  DRAW: "draw",
} as const;

// This helper type extracts the values for use in your TypeScript interfaces
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export const CHESS_COLORS = {
  WHITE: "w",
  BLACK: "b",
} as const;