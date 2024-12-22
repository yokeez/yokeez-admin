declare module 'enquire-js' {
  interface Enquire {
    enquireScreen: (callback: (match: boolean) => void) => void
    unenquireScreen: (callback: (match: boolean) => void) => void
  }
  const enquire: Enquire
  export default enquire
}
