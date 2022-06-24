/* eslint-env node */

const requireSvgs = () => {
  const requireAll = requireContext => requireContext.keys().map(requireContext);
  const req = require.context('./../img/icons', true, /\.svg$/);
  requireAll(req);
};

requireSvgs();