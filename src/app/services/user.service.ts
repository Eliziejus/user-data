import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class UserService {

  constructor(private router: Router) {}
  public userList = new BehaviorSubject<any>([]);

  public createUser(data: any): void {
  const userList = this.userList.getValue();
  const findUser = userList.find((user: any) => user.email === data.email)
    if (!findUser) {
      userList.push(data)
      this.userList.next(userList);
      localStorage.setItem('users', JSON.stringify(userList));
    }
  }

  public login(data: any): void {
    const userList = this.userList.getValue();
    const findUser = userList.find((user: any) => user.email === data.email && user.password === data.password);
    if (findUser) {
      localStorage.setItem('token', 'login');
      userList.push(data)
      this.userList.next(userList);
      this.router.navigate(['/form']);
    }

  }

  public updateUserList(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.userList.next(users);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
