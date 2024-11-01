export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock?: number; // Không bắt buộc, có thể cung cấp mặc định nếu không truyền
}
