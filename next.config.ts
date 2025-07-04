// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    // agora sim, silencia o aviso de usar <img> em vez de <Image>
    "@next/next/no-img-element": "off",

    // opcional: silencia import não usado para a variável Image
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "varsIgnorePattern": "^Image$" }
    ]
  }
};
