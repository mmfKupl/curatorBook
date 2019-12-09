import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private dbs: DatabaseService) {}

  private set(data: any) {
    localStorage.setItem('auth', JSON.stringify(data));
  }

  private remove() {
    localStorage.removeItem('auth');
  }

  private get() {
    return JSON.parse(localStorage.getItem('auth'));
  }

  async validateGroup(number: number) {
    const list = await this.dbs.getStudyGroupList();
    return Boolean(list.find(item => item.IDStudyGroup === number));
  }

  async logIn(data: { group: number; type: number }) {
    if ((await this.validateGroup(data.group)) || data.group === -1) {
      this.set(data);
      return true;
    }
    return false;
  }

  isLogin() {
    return Boolean(this.get());
  }

  logOut() {
    this.remove();
  }

  getGroupNumber() {
    return this.get().group;
  }
}
