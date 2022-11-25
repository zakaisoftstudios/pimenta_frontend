export const limitStringLength = (content, size) => {
    if(window.innerWidth < 350) {
        return content.length > size ? content.substring(0, size) + '...' : content;
    } else {
        return content;
    }
}