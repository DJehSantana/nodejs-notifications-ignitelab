import { Replace } from "@helpers/Replace";
import { Content } from "./content";
//gerador de id unico e universal do node
import { randomUUID } from "crypto";

//define quais atributos uma notificação terá
export interface NotificationProps {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    createdAt: Date;
}


export class Notification {
    private _id: string;
    private props: NotificationProps;

    //recebe por parâmetro todos os dados para criar a notificação
    constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
        //recebe todas as propriedades por parâmetro
        this._id = randomUUID();
        this.props = {
            ...props,
            //caso a propriedade createdAt não for preenchida, usará a data atual
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public get id() {
        return this._id;
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }

    public get recipientId(): string {
        return this.props.recipientId;
    }

    public set content(content: Content) {
        this.props.content = content;
    }

    public get content(): Content {
        return this.props.content;
    }


    public set category(category: string) {
        this.props.category = category;
    }

    public get category(): string {
        return this.props.category;
    }


    public set readAt(readAt: Date | null | undefined) {
        this.props.readAt = readAt;
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

}


