// Are we on the server / client?
export const isClient = typeof window !== 'undefined';

export const getRandomArbitrary = (from: number, to: number) =>
  Math.floor(Math.random() * to) + from;
