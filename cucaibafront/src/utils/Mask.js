
//Escribe el CUIL en formato xx-xxxxxxxx-x
export function MaskCuil(value){
    return value.replace(/^(\d{2})(\d{8})(\d{1}).*/, '$1-$2-$3');
}