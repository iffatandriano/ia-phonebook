import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://wpe-hiring.tokopedia.net/graphql",
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "./src/graphql/types.generated.ts": { plugins: ["typescript"] },
    "./src/graphql/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "types.generated.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
