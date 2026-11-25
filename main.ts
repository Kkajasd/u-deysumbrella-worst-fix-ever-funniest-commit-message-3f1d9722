// Worst Fix Ever: Funniest Commit Message (make.fun).
// Writes one commit-message line to /output/entry.txt.
// Deterministic: the same bytes on every run, no randomness, no timestamps.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "fix: closed the bug by deleting the code, the tests, and the reporter";

// Gate: UTF-8 text, 1-100 characters, not only whitespace, single line.
if (
  LINE.length < 1 ||
  LINE.length > 100 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error(`entry line fails the gate (${LINE.length} chars)`);
}

// Never delete /output; create it if missing, overwrite entry.txt in place.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${join(outDir, "entry.txt")} (${LINE.length} chars)`);
