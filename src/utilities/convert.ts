import imgfs from 'fs';
import path from 'path';
import sharp from 'sharp';
const imgFolder = 'images/';
const ext = '.jpg';
export default async function (
    imgName: string,
    imgWidth: number,
    imgHieght: number
): Promise<string> {
    const sourceImg = path.resolve(imgFolder, imgName + ext);
    const resizedImg: string = imgName + '_' + imgWidth + 'x' + imgHieght + ext;
    let fullPath = path.resolve(imgFolder + 'thumb/' + resizedImg);
    try {
        if (!imgfs.existsSync(fullPath)) {
            await sharp(sourceImg).resize(imgWidth, imgHieght).toFile(fullPath);
        }
    } catch (err) {
        fullPath = '';
    }

    return fullPath;
}
