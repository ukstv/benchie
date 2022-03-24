import { IScenarioResult } from "./scenario-result";

export class ResultsOutputText {
  constructor(readonly results: IScenarioResult[], readonly dir: URL) {}

  print() {
    const grouped = new Map<string, IScenarioResult[]>();
    for (let r of this.results) {
      const found = grouped.get(r.filepath.href) || [];
      grouped.set(r.filepath.href, found.concat(r));
    }
    for (let [href, results] of grouped.entries()) {
      const filepath = new URL(href);
      const filename = filepath.href.replace(this.dir.href, "");
      console.log(filename);
      for (let r of results) {
        console.log(`  ${r.title}`);
        console.log(`    mean: ${r.stats.mean.toFixed(0)}ms`);
        console.log(`    min: ${r.stats.min.toFixed(0)}ms`);
        console.log(`    max: ${r.stats.max.toFixed(0)}ms`);
        // console.log(`    error: ${r.stats.error.toString(3)}`);
      }
    }
  }
}
