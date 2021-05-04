/**
 * Verifies if the value is null or undefined.
 * @param {any} value - Value to be evaluated
 * @returns {bool} - true if the value is null or undefined, else false
 */
export function isNil(value:any){
    if( value === undefined || value === null ){
        return true;
    }
    return false
}