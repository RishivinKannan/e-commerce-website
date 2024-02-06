export function removeDuplicates(arr){
    return [...new Set(arr.toReversed())].toReversed();
}