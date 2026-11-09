/**
 * Reproducible-build clock. Compiler output must be byte-identical for identical spec
 * input, or every compile drifts the manifest. Honour SOURCE_DATE_EPOCH (the standard
 * reproducible-builds variable) when set; otherwise emit a fixed marker, never wall time.
 */
export const GENERATED_AT = process.env.SOURCE_DATE_EPOCH
  ? new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000).toISOString()
  : 'reproducible (set SOURCE_DATE_EPOCH to stamp)';
