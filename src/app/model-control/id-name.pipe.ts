import { Pipe, PipeTransform } from '@angular/core';
import { DatabaseService } from '../database.service';

@Pipe({
  name: 'idName'
})
export class IdNamePipe implements PipeTransform {
  constructor(private dbs: DatabaseService) {}
  async transform(
    value: string,
    idName: string,
    columnIndex: number,
    ...args: any[]
  ): Promise<string> {
    if (!idName || !value || !idName.includes('ID', 0) || columnIndex === 0) {
      return value;
    }
    try {
      const tableName = idName
        .replace('ID', '')
        .replace('Headman', 'Student')
        .replace('DeputyHeadman', 'Student')
        .replace(/\d*/g, '');
      const currentItem = await this.dbs.getItemByIDFromTable(
        tableName,
        +value
      );
      if (!currentItem) {
        return value;
      }
      return this.dbs.getOptionData(tableName, currentItem).text;
    } catch (err) {
      console.error(err);
      return value;
    }
  }
}
