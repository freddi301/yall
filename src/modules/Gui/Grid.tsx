import styled from "styled-components";

function* generateGridTemplate({ size }: { size: number }) {
  const limit = 4000;
  const horizonatlRepeat = Math.ceil(limit / size);
  for (let iteration = 0; iteration * size < limit; iteration++) {
    const min = iteration * size;
    const max = min + size;
    const perc = 100 / iteration;
    const safePerc = Number.isFinite(perc) ? perc : 100;
    const columns = `@media (min-width: ${min}px) and (max-width: ${max}px) {
      grid-template-columns: repeat(${iteration || 1}, ${safePerc}%);
    }`;
    const rows = `@media (min-height: ${min}px) and (max-height: ${max}px) {
      grid-template-rows: repeat(${horizonatlRepeat}, ${safePerc}%);
    }`;
    yield `${columns} ${rows}`;
  }
}

export const Grid = styled.div`
  display: grid;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%
  height: 100%
  ${Array.from(generateGridTemplate({ size: 198 })).join("\n")};
`;
