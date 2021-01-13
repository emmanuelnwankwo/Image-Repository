import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Cloudinary } from 'src/model/cloudinary';
import { Env } from 'src/util/env';
let streamifier = require('streamifier');


cloudinary.config({
    cloud_name: Env.CloudinaryCloudName,
    api_key: Env.CloudinaryApiKey,
    api_secret: Env.CloudinaryApiSecret
  });

@Injectable()
export class CloudinaryService {

    async upload(username: string, file: any): Promise<Cloudinary> {
        return await new Promise((resolve, reject) => {
            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                    folder: `ImageRepository/${username}/${this.currentDateToLocalISO}`,
                    resource_type: 'auto',
                    public_id: `${file.originalname.split('.')[0]}`,
                    overwrite: false
                },
                async (error: any, result: any) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
        });
    }

    private get currentDateToLocalISO(): string {
        const date = new Date();
        const off = date.getTimezoneOffset()
        const absoff = Math.abs(off)
        return (new Date(date.getTime() - off * 60 * 1000).toISOString().substr(0, 23) +
            (off > 0 ? '-' : '+') +
            (absoff / 60).toFixed(0).padStart(2, '0') + ':' +
            (absoff % 60).toString().padStart(2, '0')).split('T')[0];
    }
}
