export default {
    install(Vue) {
        Vue.prototype.$formatSrcset = (req, path='@/assets/images/brand/512w/pfp.png', sizes) => {
            let result = []
            for(let size of sizes) {
                result.push(`${req(path.replace('[[size]]', size))}.webp ${size}w`)
            }
            console.log(result.join(', '))
            return result.join(', ')
        }
    }
}