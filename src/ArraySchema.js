export default class ArraySchema {
    constructor(validator) {
        this.validators = [...validator];
    }


    isValid(value) {
        return this.validators.every((validator) => validator(value) === true);  
       }

       
    maxDepth(max) {
        const validator = (value) => {
            const iter = (element, depth = -1) => {
                if (!Array.isArray(element)) {
                    return depth;
                }
                const result = element.map((arr) => iter(arr, depth + 1));
                return Math.max(...result);
            }
            return iter(value) <= max;
        }
        return new ArraySchema([...this.validators, validator]);
    }
}