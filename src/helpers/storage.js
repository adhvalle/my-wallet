export const get = key => JSON.parse(window.sessionStorage.getItem(key))

export const set = (key, value) => window.sessionStorage.setItem(key, JSON.stringify(value))

export const remove = key => window.sessionStorage.removeItem(key)
