export default {
  "*.{ts,tsx}": () => [
    "tsc --pretty",
    "eslint --fix",
    "prettier --write --ignore-unknown",
  ],
  "*.{js,jsx}": ["eslint --fix", "prettier --write --ignore-unknown"],
  "!*.{js,jsx,ts,tsx}": "prettier --write --ignore-unknown",
};
