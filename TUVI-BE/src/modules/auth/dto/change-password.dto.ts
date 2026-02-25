import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu hiện tại không được để trống' })
    currentPassword: string;

    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
    @MinLength(8, { message: 'Mật khẩu mới phải có ít nhất 8 ký tự' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/, {
        message:
            'Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa và 1 số hoặc ký tự đặc biệt',
    })
    newPassword: string;
}
