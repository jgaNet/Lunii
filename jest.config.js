module.exports = {
	preset: "ts-jest",
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts", "!**/*.d.ts"],
	testEnvironment: "node",
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
	moduleNameMapper: {
		"application/(.*)": "<rootDir>/src/application/$1",
		"domains/(.*)": "<rootDir>/src/domains/$1",
		"primitives/(.*)": "<rootDir>/src/primitives/$1",
		"infrastructure/(.*)": "<rootDir>/src/infrastructure/$1",
	},
};
