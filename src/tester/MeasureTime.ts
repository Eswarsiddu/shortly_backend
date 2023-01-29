let time = 0;
let count = 0;
let minTime = 100000;
let maxTime = 0;
export async function measureTime(fn: any, msg: string) {
  let start = performance.now();
  const data = await fn();
  const curTime = performance.now() - start;
  time += curTime;
  minTime = Math.min(minTime, curTime);
  maxTime = Math.max(maxTime, curTime);
  count++;
  console.log(
    "time taken for",
    msg,
    curTime,
    ", average of",
    count,
    "=",
    time / count,
    ", min =",
    minTime,
    ", max =",
    maxTime
  );
  return data;
}
