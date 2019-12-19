const config = {
  "*.{js,ts,tsx}": ["eslint --fix", "prettier --write", "git add"],
  "*.{md,json,js,ts,tsx}": ["prettier --write", "git add"]
};

module.exports = config;
