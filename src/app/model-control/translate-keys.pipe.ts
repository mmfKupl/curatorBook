import { Pipe, PipeTransform } from '@angular/core';

const dictionary = {
  IDStudent: 'Учащийся',
  IDTown: 'Город',
  IDParent1: 'Родитель 1',
  IDParent2: 'Родитель 2',
  Citizenship: 'Гражданство',
  Surname: 'Фамилия ',
  Name: 'Имя',
  AddresOfResidence: 'Адрес Прописки',
  PhoneNumber: 'Номер Телефона',
  IDStudyGroup: 'Группа',
  IDEmployee: 'Работник',
  GroupNumber: '№ Группы',
  Specialty: 'Специальность',
  DateOfFormation: 'Дата образования',
  IDEmployeeStatus: 'Статуса Работника',
  Type: 'Тип',
  IDInfoCategory: 'Категории Информации',
  IDTypeInfoCategory: 'Тип Категории Информации',
  Course: 'Курс',
  IDInfo: 'Информация',
  Semester: 'Семестр',
  TextData: 'Текстовые Данные',
  BoolData: 'Булевы Данные',
  IDParent: 'Родитель',
  WorkPlace: 'Место работы',
  WorkPosition: 'Должность',
  PhoneNumber1: '1й Номер Телефона',
  PhoneNumber2: '2й Номер Телефона',
  IDTransfer: 'Перевод',
  Date: 'Дата',
  Patronymic: 'Отчество',
  Sex: 'Пол',
  DateOfBirth: 'Дата Рождения',
  PlaceOfResidence: 'Место жительства',
  IDHeadman: 'Староста',
  IDDeputyHeadman: 'Зам старосты'
};

@Pipe({
  name: 'translateKeys'
})
export class TranslateKeysPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return dictionary[value] || value;
  }
}
