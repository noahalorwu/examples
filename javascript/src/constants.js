const {
  TRANSCEND_API_KEY,
  ENRICHMENT_SIGNING_KEY,
  ORGANIZATION_URI,
  SOMBRA_API_KEY,
  SOMBRA_URL,
  PORT,
} = process.env;

module.exports = {
  TRANSCEND_API_KEY,
  ENRICHMENT_SIGNING_KEY,
  ORGANIZATION_URI,
  SOMBRA_API_KEY,
  SOMBRA_URL: SOMBRA_URL || 'https://multi-tenant.sombra.transcend.io',
  PORT: PORT || 8081,
};
