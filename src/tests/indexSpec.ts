import path from 'path';
import request from 'supertest';
import app from '../app';
import convert from '../utilities/convert';
const imgFolder = 'images/';
const ext = '.jpg';
describe('Testing endpoint', () => {
    it('Result code should be 200 ', async () => {
        const result = await request(app).get('/api/image');
        expect(result.status).toBe(200);
    });
});

describe('Testing if user entered wrong filename', () => {
    it('Result code should be 404', async () => {
        const result = await request(app).get(
            '/api/image?filename=azxcg&&width=200&&hieght=200'
        );
        expect(result.status).toBe(405);
    });
});
describe('Testing if user entered wrong Hieght or Width', () => {
    it('Result code should be 400', async () => {
        const result = await request(app).get(
            '/api/image?filename=fjord&&width=0&&hieght=200'
        );
        expect(result.status).toBe(400);
    });
});

describe('Testing if image is being resized', () => {
    it('the paths should be the same', async () => {
        const imgName = 'fjord';
        const imgWidth = 200;
        const imgHieght = 200;
        const resizedImg: string =
            imgName + '_' + imgWidth + 'x' + imgHieght + ext;
        const fullPath = path.resolve(imgFolder + 'thumb/' + resizedImg);
        const res = await convert(imgName, imgWidth, imgHieght);
        expect(res).toBe(fullPath);
    });
});
