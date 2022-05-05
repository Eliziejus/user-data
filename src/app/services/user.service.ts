import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {Router} from "@angular/router";
import {ModalService} from "../modal/service/modal.service";

@Injectable({
  providedIn: 'root',
})

export class UserService {

  constructor(private router: Router) {}
  public userList = new BehaviorSubject<any>([]);
  public isLogged = new BehaviorSubject<boolean>(false)

  public createUser(data: any): void {
    this.updateUserList();
    const userList = this.userList.getValue();
  const findUser = userList.find((user: any) => user.email === data.email)
    if (!findUser) {
      userList.push(data)
      this.userList.next(userList);
      localStorage.setItem('users', JSON.stringify(userList));
    }
  }

  public login(data: any): void {
    this.updateUserList();
    const userList = this.userList.getValue();
    const findUser = userList.find((user: any) => user.email === data.email && user.password === data.password);
    if (findUser) {
      this.isLogged.next(true);
      localStorage.setItem('token', 'login');
      this.router.navigate(['/form']);
    }
  }
  //
  // public showModal(id: string): void {
  //   this.modalService.open(id)
  // }

  public updateUserList(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.userList.next(users);
  }

  public logout(): void {
    this.isLogged.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
