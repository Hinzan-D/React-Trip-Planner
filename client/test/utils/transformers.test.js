import { describe, expect, it } from "@jest/globals";
import { latLngToText, placeToLatLng, latLngToPlace } from '../../src/utils/transformers';

describe('transformers', () => {
    const latLng = { lat: 40.12345312, lng: 50.12532245 };
    const place = { latitude: '40.12345312', longitude: '50.12532245' };

    it('latLngToText converts correctly with default', () => {
        const text = latLngToText(latLng);
        const expectedText = '40.12°N, 50.13°E';
        expect(text).toEqual(expectedText);
    });

    it('latLngToText converts correctly with different size precisions', () => {
        let text = latLngToText(latLng, 1);
        let expectedText = '40.1°N, 50.1°E';
        expect(text).toEqual(expectedText);

        text = latLngToText(latLng, 10);
        expectedText = '40.1234531200°N, 50.1253224500°E';
        expect(text).toEqual(expectedText);

        text = latLngToText(latLng, 8);
        expectedText = '40.12345312°N, 50.12532245°E';
        expect(text).toEqual(expectedText);
    });

    it('latLngToText handles null/undefined', () => {
        let text = latLngToText(null);
        let expectedText = '';
        expect(text).toEqual(expectedText);

        text = latLngToText(undefined);
        expectedText = '';
        expect(text).toEqual(expectedText);
    });

    it('placeToLatLng converts correctly', () => {
        const convertedLatLng = placeToLatLng(place);
        expect(convertedLatLng).toEqual(latLng);

        const shouldBeNull = placeToLatLng(null);
        expect(shouldBeNull).toBeNull();

        const shouldBeUndefined = placeToLatLng(undefined);
        expect(shouldBeUndefined).toBeUndefined();
    });

    it('latLngToPlace converts correctly', () => {
        const convertedPlace = latLngToPlace(latLng);
        expect(convertedPlace).toEqual(place);

        const shouldBeNull = latLngToPlace(null);
        expect(shouldBeNull).toBeNull();

        const shouldBeUndefined = latLngToPlace(undefined);
        expect(shouldBeUndefined).toBeUndefined();
    });
});