
export interface Validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

export function validate(validatableObj: Validatable) {
    let isValid = true;
    let value = validatableObj.value;
    if (validatableObj.required) {
        isValid = isValid && value.toString().trim().length !== 0;
    }
    if (validatableObj.minLength != null && typeof value === "string") {
        isValid = isValid && value.trim().length > validatableObj.minLength;
    }
    if (validatableObj.maxLength != null && typeof value === "string") {
        isValid = isValid && value.trim().length < validatableObj.maxLength;
    }
    if (validatableObj.min != null && typeof value === 'number') {
        isValid = isValid && value >= validatableObj.min;
    }
    if (validatableObj.max != null && typeof value === 'number') {
        isValid = isValid && value <= validatableObj.max;
    }
    return isValid;
}
