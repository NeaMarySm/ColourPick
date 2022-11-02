const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() == 'space') {
        setRandomColors();
    }
})
document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    if (type === 'lock') {
        let node =
            event.target.tagName.toLowerCase() == 'i'
                ? event.target
                : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClipboard(event.target.textContent);
    }
})

// function generateColor() {
//     const hexCodes = '0123456789ABCDEF';
//     let color = '';
//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//     }
//     return '#' + color;
// }

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];
    columns.forEach((element, index) => {
        let title = element.querySelector('.color-code');
        let button = element.querySelector('.lock');
        let isLocked = element.querySelector('i').classList.contains('fa-lock');
        if (isLocked) {
            colors.push(title.textContent);
            return;
        }
        const hex = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();
        
        if (!isInitial) {
            colors.push(hex);
        }

        element.style.background = hex;
        title.textContent = hex;
        setTextColor(title, hex);
        setTextColor(button, hex);
    });
    updateColorHash(colors);
}

function setTextColor(text, bgColor) {
    let luminance = chroma(bgColor).luminance();
    let textColor = luminance > 0.5 ? chroma(bgColor).darken(3) : chroma(bgColor).brighten(3);
    text.style.color = textColor;
}

function updateColorHash(colors = []) {
    document.location.hash = colors
        .map(col => {
            return col.toString().substring(1);
        })
        .join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(col => '#' + col);
    } else
        return [];
}

setRandomColors(true);