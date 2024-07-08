const request = require('supertest');
const submissionRoute = require('../../../../../src/components/submissions/api/routes/user-submissions-router');
const submissionService = require('../../../../../src/components/submissions/service/submission-service');
const brandService = require('../../../../../src/components/brands/service/brand-service');
const typeService = require('../../../../../src/components/polish/service/type-service');
const colorService = require('../../../../../src/components/polish/service/color-service');
const formulaService = require('../../../../../src/components/polish/service/formula-service');
const polishService = require('../../../../../src/components/polish/service/polish-service');
jest.mock(
    '../../../../../src/components/rbac/api/middleware/rbac-middeware',
    () => {
        const originalModule = jest.requireActual(
            '../../../../../src/components/rbac/api/middleware/rbac-middeware'
        );

        // Mock only 'authenticateToken' and 'authorize' functions
        return {
            ...originalModule, // spread the original module to retain non-mocked functions
            authenticateToken: jest.fn((req, res, next) => next()),
            authorize: jest.fn((permission) => (req, res, next) => next()),
        };
    }
);
jest.mock(
    '../../../../../src/components/submissions/service/submission-service'
);
jest.mock('../../../../../src/components/brands/service/brand-service');
jest.mock('../../../../../src/components/polish/service/type-service');
jest.mock('../../../../../src/components/polish/service/color-service');
jest.mock('../../../../../src/components/polish/service/formula-service');
jest.mock('../../../../../src/components/polish/service/polish-service');

const app = require('../../../../../index');
app.use(submissionRoute);

describe('Submissions validator test', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('Should succesfully validate a polish submission', async () => {
        submissionService.submitPolish.mockResolvedValue({ submission_id: 4 });
        brandService.findBrandNameInTable.mockResolvedValue({ brand_id: 1 });
        typeService.findTypeByName.mockResolvedValue({ type_id: 1 });
        colorService.findColorByName.mockResolvedValue({ color_id: 1 });
        formulaService.findFormulaByName.mockResolvedValue({ formula_id: 1 });
        polishService.polishExists.mockResolvedValue(null);

        const res = await request(app)
            .post('/polish')
            .send({
                brandName: 'Cuticula',
                type: 'Lacquer',
                primaryColor: 'Black',
                effectColors: [],
                formulas: ['Flake'],
                name: 'Unicorn Realm',
                description:
                    'a black jelly base with orange/gold, purple/red, blue/purple, green/blue, blue/purple/green glass like flakes',
            });
        expect(res.status).toBe(201);
    });
});
