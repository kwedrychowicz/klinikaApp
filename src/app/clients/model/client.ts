export class Client {


    constructor(
        public $key: string,
        public lname: string,
        public fname: string,
        public sname: string,
        public street: string,
        public city: string,
        public postalcode: string,
        public sex: string,
        public birthdate: Date,
        public pesel: string,
        public phone: string
        ) {

    }
    
    static fromJsonList(array): Client[] {
        return array.map(Client.fromJson);
    }

    static fromJson({$key,
        lname,
        fname,
        sname,
        street,
        city,
        postalcode,
        sex, 
        birthdate,
        pesel,
        phone
    
    }): Client {
        return new Client(
            $key,
            lname,
            fname,
            sname,
            street,
            city,
            postalcode,
            sex,
            birthdate,
            pesel,
            phone
            );
        }

            static fromJsonArray(json: any[]): Client[] {
                return json.map(Client.fromJson);
    }


}












