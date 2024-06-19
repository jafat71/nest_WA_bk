import { Logger } from '@nestjs/common';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';

@WebSocketGateway(4000)
export class ChatGateway {
    @WebSocketServer()
    server;

    private logger: Logger = new Logger('ChatGateway');

    afterInit(server: Server) {
        this.logger.log('Init Socket Server');
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`New Client connected: ${client}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client}`);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('message', message);
    }
}
