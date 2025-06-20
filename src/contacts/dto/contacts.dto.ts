import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsEmail, IsArray, IsDateString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsDateString()
  lastInteraction?: Date;
}

export class UpdateContactDto extends PartialType(CreateContactDto) {}