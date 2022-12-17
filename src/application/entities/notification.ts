//define quais atributos uma notificação terá
export interface NotificationProps {
    content: string;
    category: string;
    readAt?: Date | null;
}


export class Notification {
    private props: NotificationProps;

    //recebe por parâmetro todos os dados para criar a notificação
    constructor(props: NotificationProps) {
        this.props = props;
    }

    public set content(content: string) {
        this.props.content = content;
    }

    public get content(): string {
        return this.props.content;
    }
}


