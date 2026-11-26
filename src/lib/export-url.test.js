import {
  COVAX,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  POOLED_GRANTS,
  SEARCH_REPORTS,
  THEMATIC_GRANTS
} from 'lib/constants';
import { buildExportUrl } from './export-url';

const sourceIds = {
  internal: 'internal-id',
  external: 'external-id',
  pool_internal: 'pool-internal-id',
  pool_external: 'pool-external-id',
  thematic_internal: 'thematic-internal-id',
  thematic_external: 'thematic-external-id',
  gavi: 'gavi-id',
  gavi_soa: 'gavi-soa-id'
};

function paramsFor(search) {
  return new URLSearchParams(search.replace(/^.*\?/, ''));
}

const base = {
  sourceIds,
  gaviDonorCode: 'GAVI-CODE',
  donorCode: 'DONOR-CODE'
};

describe('buildExportUrl', () => {
  it('uses the internal reports source for UNICEF users and keeps UI filters', () => {
    const url = buildExportUrl({
      ...base,
      pageName: SEARCH_REPORTS,
      isUnicefUser: true,
      search: '?report_year=2025&donor_code=IGNORED'
    });
    const params = paramsFor(url);

    expect(params.get('source_id')).toBe('internal-id');
    expect(params.get('donor_code')).toBe('DONOR-CODE');
    expect(params.get('report_year')).toBe('2025');
    expect(params.has('serializer')).toBe(false);
  });

  it('uses the external reports source for donor users', () => {
    const url = buildExportUrl({
      ...base,
      pageName: SEARCH_REPORTS,
      isUnicefUser: false
    });

    expect(paramsFor(url).get('source_id')).toBe('external-id');
  });

  it('maps pooled grants to the pooled source', () => {
    const url = buildExportUrl({
      ...base,
      pageName: POOLED_GRANTS,
      isUnicefUser: true
    });

    expect(paramsFor(url).get('source_id')).toBe('pool-internal-id');
  });

  it('maps thematic grants to the thematic source and omits the donor code', () => {
    const url = buildExportUrl({
      ...base,
      pageName: THEMATIC_GRANTS,
      isUnicefUser: false
    });

    expect(paramsFor(url).get('source_id')).toBe('thematic-external-id');
    expect(paramsFor(url).has('donor_code')).toBe(false);
  });

  it('adds the GAVI serializer and excludes adjusting CTNs from GAVI reports', () => {
    const url = buildExportUrl({
      ...base,
      pageName: GAVI_REPORTS,
      isUnicefUser: true
    });
    const params = paramsFor(url);

    expect(params.get('source_id')).toBe('gavi-id');
    expect(params.get('donor_code')).toBe('GAVI-CODE');
    expect(params.get('serializer')).toBe('gavi');
    expect(params.get('m_o_u_r_eference__not')).toBe('ADJUSTING CTNS');
  });

  it('only returns adjusting CTNs on the adjusting CTN page', () => {
    const url = buildExportUrl({
      ...base,
      pageName: GAVI_REPORTS_CTN,
      isUnicefUser: true
    });
    const params = paramsFor(url);

    expect(params.get('serializer')).toBe('gavi');
    expect(params.get('m_o_u_r_eference')).toBe('ADJUSTING CTNS');
    expect(params.has('m_o_u_r_eference__not')).toBe(false);
  });

  it('returns the COVAX CTN subset', () => {
    const url = buildExportUrl({
      ...base,
      pageName: COVAX,
      isUnicefUser: true
    });

    expect(paramsFor(url).get('m_o_u_r_eference')).toBe(
      'MOU 11 CTN - DEVICES,MOU 11 CTN - VACCINES'
    );
  });

  it('uses the statements serializer and source', () => {
    const url = buildExportUrl({
      ...base,
      pageName: GAVI_STATEMENTS_ACC,
      isUnicefUser: true
    });
    const params = paramsFor(url);

    expect(params.get('serializer')).toBe('soa');
    expect(params.get('source_id')).toBe('gavi-soa-id');
    expect(params.get('donor_code')).toBe('GAVI-CODE');
  });

  it('replaces a stale serializer from the current URL', () => {
    const url = buildExportUrl({
      ...base,
      pageName: SEARCH_REPORTS,
      isUnicefUser: true,
      search: '?serializer=gavi&report_year=2024'
    });

    expect(paramsFor(url).has('serializer')).toBe(false);
    expect(paramsFor(url).get('report_year')).toBe('2024');
  });

  it('returns null when the source id is missing', () => {
    const url = buildExportUrl({
      ...base,
      pageName: SEARCH_REPORTS,
      isUnicefUser: true,
      sourceIds: {}
    });

    expect(url).toBeNull();
  });
});
