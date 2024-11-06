import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';

@Controller('accessory')
export class AccessoryController {
  constructor(
    private readonly accessoryService: AccessoryService,
    private readonly cloudinaryProvider: CloudinaryProvider, // Provider dùng để upload ảnh lên Cloudinary
  ) {}

  // API thêm mới một phụ kiện (accessory)
  @Post()
  @UseInterceptors(FileInterceptor('imageUrl')) // Sử dụng FileInterceptor để chặn và xử lý file tải lên từ trường 'imageUrl'
  async create(
    @Body() createAccessoryDto: CreateAccessoryDto, // Nhận thông tin từ body của request
    @UploadedFile() file: Express.Multer.File, // Nhận file tải lên, sử dụng Multer để quản lý file
  ) {
    // Kiểm tra xem file có được tải lên hay không
    if (!file) {
      throw new BadRequestException('File hình ảnh là bắt buộc'); // Nếu không có file, báo lỗi
    }

    // Tải file lên Cloudinary và nhận kết quả trả về (uploadResult chứa thông tin ảnh)
    const uploadResult = await this.cloudinaryProvider.uploadImage(file);

    // Sau khi tải lên thành công, đường dẫn URL của ảnh sẽ được lưu vào CSDL thông qua service
    return this.accessoryService.create(
      createAccessoryDto, // Dữ liệu phụ kiện nhận từ body (name, description, price, v.v.)
      uploadResult.secure_url, // Đường dẫn URL của ảnh sau khi đã được upload thành công
    );
  }

  @Get()
  findAll() {
    return this.accessoryService.findAll(); // Trả về tất cả các phụ kiện
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoryService.findOne(id); // Trả về phụ kiện dựa trên ID
  }

  // API cập nhật thông tin phụ kiện (accessory)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageUrl')) // Tương tự, sử dụng FileInterceptor để xử lý file tải lên
  async update(
    @Param('id') id: string, // Lấy ID của phụ kiện cần cập nhật
    @Body() updateAccessoryDto: UpdateAccessoryDto, // Nhận dữ liệu cập nhật từ body của request
    @UploadedFile() file?: Express.Multer.File, // File tải lên không bắt buộc
  ) {
    let imageUrl: string | undefined;

    // Nếu có file ảnh được tải lên
    if (file) {
      const uploadResult = await this.cloudinaryProvider.uploadImage(file); // Tải ảnh mới lên Cloudinary
      imageUrl = uploadResult.secure_url; // Lưu URL của ảnh mới
    }

    // Cập nhật thông tin phụ kiện, bao gồm URL ảnh mới nếu có
    return this.accessoryService.update(id, updateAccessoryDto, imageUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessoryService.remove(id); // Xóa phụ kiện dựa trên ID
  }
}
