export default {
  "*.{ts,tsx}": (files) => [
    "tsc --pretty",
    `eslint --fix ${files.join(" ")}`,
    `prettier --write ${files.join(" ")}`,
  ],
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "!*.{js,jsx,ts,tsx}": "prettier --write --ignore-unknown",
};
