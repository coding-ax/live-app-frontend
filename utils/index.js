export function convert(data) {
    if (typeof data !== 'object' || !data) return data
    if (Array.isArray(data)) {
        return data.map(item => convert(item))
    }

    let newObj = {}
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            let newKey = key.replace(/_([a-z])/g, res => res[1].toUpperCase())
            newObj[newKey] = convert(data[key])
        }
    }
    return newObj
}

export function convertCamelCase(data) {
    if (typeof data !== 'object' || !data) return data
    if (Array.isArray(data)) {
        return data.map((item) => underline1(item))
    }

    let newObj = {}
    for (let key in data) {
        let newKey = key.replace(/([A-Z])/g, (res) => {
            return '_' + res.toLowerCase()
        })
        newObj[newKey] = underline1(data[key])
    }
    return newObj
}