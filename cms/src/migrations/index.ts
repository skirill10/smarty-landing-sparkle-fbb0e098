import * as migration_20260819_120405_init from "./20260819_120405_init";
import * as migration_20260823_172459_add_forms_articles from "./20260823_172459_add_forms_articles";

export const migrations = [
  {
    up: migration_20260819_120405_init.up,
    down: migration_20260819_120405_init.down,
    name: "20260819_120405_init",
  },
  {
    up: migration_20260823_172459_add_forms_articles.up,
    down: migration_20260823_172459_add_forms_articles.down,
    name: "20260823_172459_add_forms_articles",
  },
];
