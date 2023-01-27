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

export function makeHashtagBlue(content) {
    let hashtags = [];
    let isHashtag = false;
    let hashtag = '';
    let result = content;

    [...content].forEach((word, idx) => {
        if(word === '#') {
            isHashtag = true;
        }
        if((word === ' ' || /\r|\n/.exec(word)) && isHashtag) {
            hashtags.push(hashtag);
            hashtag = '';
            isHashtag = false;
        }
        
        if(isHashtag && word !== '#') {
            hashtag += word;
            if(idx+1 === content.length) {
                hashtags.push(hashtag);
            }
        }
    });

    hashtags.forEach(hashtag => {
        result = result.replace(`#${hashtag}`, `<span class="cursor-pointer text-primary-twitter">#${hashtag}</span>`)
    });

    return result;
}