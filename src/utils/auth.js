import Cookies from 'js-cookie'

const TokenKey = 'rop-Token'
const NameKey = 'rop-Name'
const UserKey = 'rop-User'
const OrganizingKey = 'rop-Organizing'
const UIdKey = 'rop-SaaS-UId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  return Cookies.set(NameKey, name)
}

export function getUser() {
  return Cookies.get(UserKey)
}

export function setUser(user) {
  return Cookies.set(UserKey, user)
}

export function getOrganizing() {
  return Cookies.get(OrganizingKey)
}

export function setOrganizing(organizing) {
  return Cookies.set(OrganizingKey, organizing)
}

export function getUId() {
  return Cookies.get(UIdKey)
}

export function setUId(uid) {
  return Cookies.set(UIdKey, uid)
}

