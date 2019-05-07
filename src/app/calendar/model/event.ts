export class Event {

    constructor(
        public $key: string,
        public title: string,
        public start: string,
        public end: string) { }

   
    static fromJsonList(array): Event[] {
        return array.map(Event.fromJson);
    }

    static fromJson({$id, title, start, end}):Event {
        return new Event(
            $id,
            title,
            start,
            end);
    }
    static fromJsonArray(json: any[]): Event[] {
        return json.map(Event.fromJson);
}

}












