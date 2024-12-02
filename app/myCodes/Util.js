


export const isDev = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return true
    } else {
        return false
    }
}

export const filterNullFromArray = (array) => {
    return array.filter(x => !!x)
}






export function handleInput5(key, value, stateSetter) {
    //const key = target.name
    // const value = target.value


    try {
        stateSetter((old) => {
            return { ...old, [key]: value }
        })
    } catch {
        if (!stateSetter) {
            console.log('need stateSetter')
        }
    }

}

export function disableScroll(enable = true, name = "scroll-able") {
    if (enable) document.querySelector(`.${name}`).classList.add('disablScroll');
    if (!enable) document.querySelector(`.${name}`).classList.remove('disablScroll');
    console.log(enable)
}

export const getRand = (max = 99999) => { return Math.floor(Math.random() * max) + 1; }

export function getRandTN(size = 7) {
    const result = Math.random().toString(36).substring(2, size < 7 ? 7 : size);
    return result;

}

export const filterObject = (obj, filterFunc) => {
    Object.filter = (obj, predicate) =>
        Object.keys(obj)
            .filter(key => predicate(obj[key]))
            .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

    var filtered = Object.filter(obj, filterFunc);
    return (filtered);

}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const createArray = (length) => {
    const newArray = Array.from({ length: length }, (value, index) => index)

    return newArray
}