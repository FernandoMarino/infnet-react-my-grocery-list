/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1", // Mapeia imports de ".js" para os arquivos locais ".ts"
    },
    extensionsToTreatAsEsm: ['.ts']
};
