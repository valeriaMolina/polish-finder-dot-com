const sinon = require('sinon');
const Sequelize = require('sequelize');
const db = require('../../src/config/database');
const Color = require('../../src/models/colorModel');

describe('Color Model', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should have correct model name', () => {
        expect(Color.name).toEqual('colors');
    });

    it('should have correct fields', () => {
        const color = Color.build();
        expect(color).toHaveProperty('color_id');
        expect(color).toHaveProperty('name');
    });

    it('should have correct validation', () => {
        const color = Color.build({ name: '' });
        color.validate().then((msg) => {
            expect(msg).toBeDefined();
        });
    });
});
