export default function fakeApiLatency(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}