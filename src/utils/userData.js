import Cookies from "js-cookie"

export const getUser =  () => {
    return Cookies.get("token")
}

export const setUser = (value) => {
    return Cookies.set("token",(value))
}
export const removeUser =  () => {
    return Cookies.remove("token")
}