import { toolRegistry } from '../../src/tools';
import { GeoGebraInstance } from '../../src/utils/geogebra-instance';

jest.mock('../../src/utils/geogebra-instance');
jest.mock('../../src/utils/logger', () => ({
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

describe('GGB Export Label Visibility', () => {
  let mockGeoGebraInstance: jest.Mocked<GeoGebraInstance>;

  beforeAll(() => {
    mockGeoGebraInstance = {
      initialize: jest.fn(),
      isReady: jest.fn(),
      cleanup: jest.fn(),
      getState: jest.fn(),
      getAllObjectNames: jest.fn(),
      getObjectInfo: jest.fn(),
      evalCommand: jest.fn(),
      exportGGB: jest.fn(),
    } as any;

    (GeoGebraInstance as jest.MockedClass<typeof GeoGebraInstance>).mockImplementation(() => mockGeoGebraInstance);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGeoGebraInstance.initialize.mockResolvedValue(undefined);
    mockGeoGebraInstance.evalCommand.mockResolvedValue({ success: true, result: 'ok' } as any);
    mockGeoGebraInstance.exportGGB.mockResolvedValue('Z2di');
    mockGeoGebraInstance.getAllObjectNames.mockResolvedValue(['A', 'c1', 'sAB']);
    mockGeoGebraInstance.getObjectInfo.mockImplementation(async (name: string) => {
      if (name === 'A') {
        return { name: 'A', type: 'point', visible: true, defined: true } as any;
      }
      if (name === 'c1') {
        return { name: 'c1', type: 'circle', visible: true, defined: true } as any;
      }
      if (name === 'sAB') {
        return { name: 'sAB', type: 'segment', visible: true, defined: true } as any;
      }
      return null;
    });
  });

  it('defaults to points-only labels on ggb export', async () => {
    const result = await toolRegistry.executeTool('geogebra_export_ggb', {});
    const response = JSON.parse(result.content[0]?.text || '{}');

    expect(response.success).toBe(true);
    expect(response.format).toBe('GGB');
    expect(response.labelMode).toBe('points_only');
    expect(mockGeoGebraInstance.evalCommand).toHaveBeenCalledWith('SetLabelVisible(A, true)');
    expect(mockGeoGebraInstance.evalCommand).toHaveBeenCalledWith('SetLabelVisible(c1, false)');
    expect(mockGeoGebraInstance.evalCommand).toHaveBeenCalledWith('SetLabelVisible(sAB, false)');
  });

  it('uses visibleLabels as strict whitelist', async () => {
    const result = await toolRegistry.executeTool('geogebra_export_ggb', {
      visibleLabels: ['A', 'sAB']
    });
    const response = JSON.parse(result.content[0]?.text || '{}');

    expect(response.success).toBe(true);
    expect(response.labelMode).toBe('specified');
    expect(response.visibleLabels).toEqual(['A', 'sAB']);
    expect(mockGeoGebraInstance.evalCommand).toHaveBeenCalledWith('SetLabelVisible(A, true)');
    expect(mockGeoGebraInstance.evalCommand).toHaveBeenCalledWith('SetLabelVisible(c1, false)');
    expect(mockGeoGebraInstance.evalCommand).toHaveBeenCalledWith('SetLabelVisible(sAB, true)');
    expect(mockGeoGebraInstance.getObjectInfo).not.toHaveBeenCalled();
  });
});
