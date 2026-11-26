import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Houseplant Out-of-Office — one out-of-office auto-reply, as sent
// by a houseplant that has been ignored since March. The joke is the
// escalation: the plant is out of water, so it delegates to the cactus,
// who has seen things and will not help either.
const entry =
  "Out of office and out of water since March. For urgent matters, ask the cactus. He's seen things. He won't help either.";

// The gate allows 1 to 120 characters: refuse to write an entry that
// would be judged invalid, instead of failing silently on the server.
if (entry.length < 1 || entry.length > 120 || entry.trim().length === 0) {
  throw new Error(`Entry is ${entry.length} characters; the gate allows 1 to 120.`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
console.log(`Wrote entry.txt (${entry.length} characters) to ${outputDir}`);
