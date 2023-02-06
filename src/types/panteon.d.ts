export type EventType = string;

export type Event = {
  title: string;
  type: number; // Link to EventType
  description: string;
};

export as namespace Panteon;
