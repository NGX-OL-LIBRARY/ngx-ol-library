import {
  Rule,
  Tree,
  apply,
  url,
  applyTemplates,
  move,
  chain,
  mergeWith,
  filter,
  noop,
  strings
} from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { validateClassName } from '@schematics/angular/utility/validation';
import { createDefaultPath } from '@schematics/angular/utility/workspace';

import { Schema as InitializeSchema } from './schema';

export default function(options: InitializeSchema): Rule {
  return async (host: Tree) => {
    if (options.path === undefined) {
      options.path = await createDefaultPath(host, options.project as string);
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    validateClassName(strings.classify(options.name));

    return chain([
      mergeWith(
        apply(
          url('./files'),
          [
            !options.docs ? filter((path: string) => !/\/docs\/(en|zh)-(us|cn).md.template$/.test(path)) : noop(),
            applyTemplates({
              ...strings,
              ...options
            }),
            move(parsedPath.path)
          ]
        )
      )
    ]);
  };
}