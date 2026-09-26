import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const rulesDir = "C:/Users/danie/.agents/skills/hyperframes-animation/rules";
const bpDir = "C:/Users/danie/.agents/skills/hyperframes-animation/blueprints";
const sb = readFileSync("STORYBOARD.md", "utf8");
const m = [...sb.matchAll(/^## Frame\s+([^\n]+)$/gm)];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ids = readdirSync(rulesDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));

for (let i = 0; i < m.length; i++) {
  const start = m[i].index;
  const end = m[i + 1]?.index ?? sb.length;
  const block = sb.slice(start, end);
  const cited = ids.filter((id) => new RegExp(`(?<![\\w-])${esc(id)}(?![\\w-])`, "i").test(block));
  const bpMatch = block.match(/^-?\s*blueprint:\s*(.+)$/im);
  const bpId = bpMatch?.[1]?.replace(/\s*\([^)]*\)\s*$/, "").trim();
  console.log(`\n${m[i][1]}: block=${Buffer.byteLength(block)} blueprint=${bpId}`);
  let total = Buffer.byteLength(block);
  if (bpId) {
    const s = statSync(join(bpDir, `${bpId}.md`)).size;
    total += s;
    console.log(`  blueprint bytes: ${s}`);
  }
  for (const id of cited) {
    const s = statSync(join(rulesDir, `${id}.md`)).size;
    total += s;
    console.log(`  rule ${id}: ${s}`);
  }
  console.log(`  TOTAL (approx): ${total}`);
}
