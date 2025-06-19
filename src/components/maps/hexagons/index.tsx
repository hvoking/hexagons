// Context imports
import { useHexagonsApi } from 'context/api/hexagons';
import { useLinesLimits } from 'context/limits/lines';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Hexagons = () => {
    const { hexagonsData, hexagonAvg, opacityScale } = useHexagonsApi();
    const { bottomLimit, topLimit } = useLinesLimits();

    if (!hexagonsData) return <></>;

    // Convert hexagons data into GeoJSON format
    const geoJsonData: any = {
        type: 'FeatureCollection',
        features: hexagonsData.map((item: any) => ({
            type: 'Feature',
            geometry: item.hex_geom, // Assuming hex_geom is a valid GeoJSON geometry
            properties: {
                avg: hexagonAvg(item.properties),
                length: opacityScale(item.properties.length),
            }
        })),
    };

    // Define layer styles
    const layerStyle: any = {
        id: 'hexagons-layer',
        type: 'fill',
        paint: {
            'fill-color': [
                'case',
                    ['>', ['get', 'avg'], topLimit], 'rgba(42, 43, 96, 1)',
                    ['<', ['get', 'avg'], bottomLimit], 'rgba(255, 0, 0, 0.7)',
                    [
                        'all', 
                        ['>', ['get', 'avg'], bottomLimit], 
                        ['<', ['get', 'avg'], topLimit],
                    ], 'rgba(0, 255, 0, 0.7)',
                    'rgba(0, 0, 0, 0)'
            ],
            'fill-opacity': [
                'case',
                ['<', ['get', 'avg'], bottomLimit], 0.5,
                ['get', 'length']
            ],
        },
    };

    const strokeLayerStyle: any = {
        id: 'hexagons-stroke-layer',
        type: 'line',
        paint: {
            'line-color': 'rgba(255, 255, 255, 0.2)', // White outline
            'line-width': 1.5, // Subtle stroke width
        },
    };

    return (
        <Source id="hexagons-source" type="geojson" data={geoJsonData}>
            <Layer {...layerStyle} />
            <Layer {...strokeLayerStyle} />
        </Source>
    );
};

Hexagons.displayName = "Hexagons";