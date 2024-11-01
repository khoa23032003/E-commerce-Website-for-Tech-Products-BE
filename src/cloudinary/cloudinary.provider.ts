import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryProvider {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      // Kiểm tra xem file có hợp lệ không
      if (!file || !file.buffer) {
        return reject(new Error('File is not valid or missing.')); // Nếu file không hợp lệ thì reject
      }

      cloudinary.uploader
        .upload_stream({ folder: 'posts' }, (error, result) => {
          if (error) {
            return reject(error); // Nếu có lỗi xảy ra trong quá trình upload
          }
          resolve(result); // Nếu upload thành công
        })
        .end(file.buffer); // Gửi dữ liệu file
    });
  }
}
