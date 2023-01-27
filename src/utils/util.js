export function scrollTopElement(element, to = 0) {
    try {
        element.scrollTop = to;
    } catch (error) {
        return;
    }
}

export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}