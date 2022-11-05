// debounce는 클로저를 활용한 기능이다.
export function debounce(callback, delay=1000){
    let timer = null
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=> {
            console.log("debounce....")
            callback(...args)
            clearTimeout(timer)
        }, delay)
    }
}