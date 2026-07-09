function cleanValue(value) {
  if (Array.isArray(value)) {
    return value.map(cleanValue);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((acc, [key, nested]) => {
      if (key.startsWith('$') || key.includes('.')) return acc;
      acc[key] = cleanValue(nested);
      return acc;
    }, {});
  }

  if (typeof value === 'string') {
    return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
  }

  return value;
}

export function sanitizeRequest(req, _res, next) {
  if (req.body) req.body = cleanValue(req.body);
  if (req.params) req.params = cleanValue(req.params);
  next();
}
