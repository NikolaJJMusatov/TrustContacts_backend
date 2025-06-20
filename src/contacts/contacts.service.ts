import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from '../schema/contact.schema';
import { CreateContactDto } from '../contacts/dto/contacts.dto';
import { UpdateContactDto } from '../contacts/dto/contacts.dto';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) {}

  async create(dto: CreateContactDto) {
    const existing = await this.contactModel.findOne({
      $or: [{ email: dto.email }, { phone: dto.phone }],
    });

    if (existing) {
      throw new ConflictException(
        'Контакт с таким email или телефоном уже существует'
      );
    }

    const newContact = new this.contactModel(dto);
    return newContact.save();
  }

  findAll() {
    return this.contactModel.find().exec();
  }

  findOne(id: string) {
    return this.contactModel.findById(id).exec();
  }

  update(id: string, dto: UpdateContactDto) {
    return this.contactModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.contactModel.findByIdAndDelete(id).exec();
  }
}
