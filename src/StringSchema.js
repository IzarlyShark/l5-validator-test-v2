export default class StringSchema {
    constructor(validator) {
        this.validators = [...validator];
    }

    isValid(value) {
     return this.validators.every((validator) => validator(value) === true);  
    }

    startsFromUpperCase() {
        const forbidden = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', ' ', ''];
        const validator = (value) => (value.length > 0 
            ? value[0].toUpperCase() === value[0] && !forbidden.includes(value[0]) 
            : false);         
        return new StringSchema([...this.validators, validator]);
        }

        length(count) {
            const validator = (value) => value.length === count;
            return new StringSchema([...this.validators, validator]);

        }
        
        hasExclamation() {
            const validator = (value) => value.includes('!');
            return new StringSchema([...this.validators, validator]);

        }
    }
