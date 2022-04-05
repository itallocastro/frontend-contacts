export class Email {
  id?: string;
  personId?: string;
  name: string;
}

export class Phone {
  id?: string;
  personId?: string;
  phoneNumber: string;
  isWhatsapp: boolean;
}

export class Contact {
  id?: string;
  name: string;
  emails?: Email[];
  phones?: Phone[];
}
