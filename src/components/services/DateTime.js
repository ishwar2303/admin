class DateTime {

    constructor(timestamp) {
        this.timestamp = timestamp;
    }

    convert() {
        let parts = this.timestamp.split(' ');
        let date = parts[0];
        let time = parts[1];

        let dateParts = date.split('-');
        let yyyy = dateParts[0];
        let mm = dateParts[1];
        let dd = dateParts[2];

        date = yyyy + '-' + mm + '-' + dd;
        this.timestamp = date + 'T' + time;
        let input = document.createElement('input');
        input.type = 'datetime-local';
        input.value = this.timestamp;
        return input.value;

    }
}

export default DateTime;