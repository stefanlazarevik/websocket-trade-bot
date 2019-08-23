import {EventEmitter} from "events";
import {ICommand, IConnection} from "../types/IConnection";

export default class Local extends EventEmitter implements IConnection {

    constructor() {
        super();
    }

    send(command: object) {
        // ignore
    }

    connect(): void {
        // ignore
    }

    addRestorable(command: ICommand): void {
        // ignore
    }
}