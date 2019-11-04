import { Pipe, PipeTransform } from '@angular/core';

const dictionary = {
  IDStudent: 'ID Учащегося',
  IDTown: 'ID Города',
  IDParent1: 'ID Родителя 1',
  IDParent2: 'ID Родителя 2',
  Citizenship: 'Гражданство',
  Surname: 'Фамилия ',
  Name: 'Имя',
  AddresOfResidence: 'Адрес Прописки',
  PhoneNumber: 'Номер Телефона',
  IDStudyGroup: 'ID Группы',
  IDEmployee: 'ID Работника',
  GroupNumber: '№ Группы',
  Specialty: 'Специальность',
  DateOfFormation: 'Дата образования',
  IDEmployeeStatus: 'ID Статуса Работника',
  Type: 'Тип',
  IDInfoCategory: 'ID Категории Информации',
  IDTypeInfoCategory: 'ID Типа Категории Информации',
  Course: 'Курс',
  IDInfo: 'ID Информации',
  Semester: 'Семестр',
  TextData: 'Текстовые Данные',
  BoolData: 'Булевы Данные',
  IDParent: 'ID Родителя',
  WorkPlace: 'Место работы',
  WorkPosition: 'Должность',
  PhoneNumber1: '1й Номер Телефона',
  PhoneNumber2: '2й Номер Телефона',
  IDTransfer: 'ID Перевода',
  Date: 'Дата',
  Patronymic: 'Отчество',
  Sex: 'Пол',
  DateOfBirth: 'Дата Рождения',
  PlaceOfResidence: 'Место жительства'
};

@Pipe({
  name: 'translateKeys'
})
export class TranslateKeysPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return dictionary[value] || value;
  }
}
