import {Subject} from 'rxjs';
import { Message } from '../interfaces/message.interface';


export class MessagesService {
  private messages$ = new Subject<Message>();
  private submit$ = new Subject<boolean>();

  constructor() {
  }

  getMessages() {
    return this.messages$.asObservable();
  }

  setMessage(msg: Message) {
    this.messages$.next(msg);
  }

  getSubmit() {
    return this.submit$.asObservable();
  }

  submit(confirmation = true) {
    this.submit$.next(confirmation);
  }

}