export const timer = (time: any) => {
    let min = "0" + Math.floor(time / 60)
    let sec:any = Math.floor(time % 60)
    if (sec < 10) {
        sec = "0" + sec
    }
    return `${min}: ${sec}`
}