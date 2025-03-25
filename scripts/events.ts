"use strict";

/**
 * class for a volunteer opportunity.
 */
class Events {

    /**
     * Constructor for a volunteer opportunity.
     * @param title
     * @param description
     * @param date
     */
    constructor(title = "", description = "", date = new Date()) {
        this.title = title;
        this.description = description;
        this.date = date;
    }

    /**
     * Gets the value of the title
     * @returns {string}
     */
    get title() {
        return this.title;
    }

    /**
     * sets the title value
     * @param value
     */
    set title(value) {
        this.title = value;
    }

    /**
     * gets the description
     * @returns {string}
     */
    get description() {
        return this.description;
    }

    /**
     * sets the description
     * @param value
     */
    set description(value) {
        this.description = value;
    }

    /**
     * gets the date.
     * @returns {Date}
     */
    get date() {
        return this.date;
    }

    /**
     * sets the date.
     * @param value
     */
    set date(value) {
        this.date = value;
    }



}
