// Pure functions
// Функции, которые можно использовать, где угодно.
export function capitalize(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export function storage(key, data = null) {
    // Если данных нет, работает как getter
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
        .join(';')
}
// Нужен для того, чтобы не спамить событиями на каждый ввод.
// А отправлял одно, когда ты условно прекратил ввод.
export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            // eslint-disable-next-line
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function preventDefault(event) {
    event.preventDefault()
}
