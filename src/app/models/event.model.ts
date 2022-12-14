export class Event { 
    constructor(
        public _id: string,
        public id: string,
        public name: string,
        public dates: [],
        public place: string,
        public scheduler: string
    ) {
        this._id = _id;
        this.id = id;
        this.name = name;
        this.dates = dates;
        this.place = place;
        this.scheduler = scheduler;
    }
}