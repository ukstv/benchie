import { createCeramic } from "./create-ceramic.js";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { CeramicApi } from "@ceramicnetwork/common";
import { scenario } from "./benchie/benchmark.js";

scenario("Update stream that is pinned", (perform) => {
  let ceramic: CeramicApi;
  let tile: TileDocument;

  perform.beforeAll(async () => {
    ceramic = await createCeramic();
  });

  perform.beforeEach(async () => {
    const content0 = {
      foo: `hello-${Math.random()}`,
    };
    tile = await TileDocument.create(ceramic, content0, null, {
      pin: true,
    });
  });

  perform.times(10).run(async () => {
    const content1 = { foo: `world-${Math.random()}` };
    await tile.update(content1);
  });
});
