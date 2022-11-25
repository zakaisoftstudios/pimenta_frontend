export const breakWordBiggerThan = (text, max) => {
    if(window.innerWidth < 310) {
        const newText = text.split(' ').map((word) => {
            return word.length > max ? `${word.substring(0, max)}\n${word.substring(max, word.length)}` : word
        })
        return newText.join(' ')
    } else {
        return text;
    }
}