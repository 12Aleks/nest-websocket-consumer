import {Injectable, OnModuleInit} from "@nestjs/common";
import {io, Socket} from 'socket.io-client'

@Injectable()

export class SocketController implements OnModuleInit{
  public socketClient: Socket;

  constructor() {
      this.socketClient = io('http://localhost:3000');

  }

  onModuleInit(): any {
      this.registerConsumerEvents()
  }

  private registerConsumerEvents(){
      this.socketClient.emit('newMessage', {msg: 'Hello'} )

      this.socketClient.on('connect', () => {
          console.log('Connected to Gateway')
      })

      this.socketClient.on('onMessage', (payload: any) => {
          console.log(payload)
      })
  }
}