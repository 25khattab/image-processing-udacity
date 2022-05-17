import express from 'express';
import imgfs from 'fs';
import path from 'path';
import convert from '../../utilities/convert';
const imgFolder = 'images/';
const ext = '.jpg';
const image = express.Router();
image.get(
    '/',

    async (req, res) => {
        //res.send("main image route")
        const imgName: string = req.query.filename as string;
        const imgWidth: number = parseInt(req.query.width as string);
        const imgHieght: number = parseInt(req.query.hieght as string);
        const sourceImg = path.resolve(imgFolder, imgName + ext);

        if (imgName == undefined || isNaN(imgWidth) || isNaN(imgHieght)) {
            res.status(200)
                .send(`please check again make sure the to follow the right parameters it should look like this\n
            ex:  /api/image?filename=example&&width=200&&hieght=200`);
            return;
        } else {
            if (!imgfs.existsSync(sourceImg)) {
                res.status(405).send(
                    'there is no Image with name : ' + imgName
                );
                return;
            }

            if (imgWidth < 1) {
                res.status(400).send(
                    `the width value is equal to 0 or is negative`
                );
                return;
            }
            if (imgHieght < 1) {
                res.status(400).send(
                    `the hieght value is or is  equal to 0 or is negative`
                );
                return;
            }
        }

        const fullPath = await convert(imgName, imgWidth, imgHieght);
        res.sendFile(fullPath);
    }
);

export default image;
