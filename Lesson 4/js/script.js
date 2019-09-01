function change(value) {

    let text = value.replace(/[\s|;]'\b/gm, ' \"');
    let text2 = text.replace(/\b'(?=[\s|;])|^'|'$|\b'(?=[\.|\,])/gm,'\"');

    return text2;
}

let btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    let text = document.querySelector('#text').textContent;
    //console.log(text);
    let changedText = change(text);
    document.querySelector('#text').textContent = changedText;
});
