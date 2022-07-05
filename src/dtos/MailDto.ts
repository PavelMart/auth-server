import moment from "moment";

class MailDto {
    id: string;
    from: string;
    html: string;
    theme: string;
    time?: string;
    date?: string;

    constructor(mail: { id: string; from: string; html: string; theme: string; createdAt?: string }) {
        this.id = mail.id;
        this.from = mail.from;
        this.html = mail.html;
        this.theme = mail.theme;

        if (mail.createdAt) {
            const date = new Date(mail.createdAt);
            moment.locale("ru");
            this.time = moment(date).format("LT");
            this.date = moment(date).format("MMMM, DD");
        }
    }
}

export default MailDto;
