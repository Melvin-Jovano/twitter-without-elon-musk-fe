export function scrollTopElement(element, to = 0) {
    try {
        element.scrollTop = to;
    } catch (error) {
        console.error(error);
        return;
    }
}