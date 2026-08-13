// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不要自動產生 AGENTS.md / CLAUDE.md
  agentRules: false,
};

module.exports = withNextIntl(nextConfig);
