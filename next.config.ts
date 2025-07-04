import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rules: {
    // desliga o aviso sobre <img>
    '@next/next/no-img-element': 'off',
    // opcional: também silencia import não usado, se quiser
    // '@typescript-eslint/no-unused-vars': ['warn', { 'varsIgnorePattern': '^Image$' }]
  },
};

export default nextConfig;
