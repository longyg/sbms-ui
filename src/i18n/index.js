import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh_CN',
    messages: {
        'zh_CN': require('@/assets/languages/zh_CN.json'),
        'en_US': require('@/assets/languages/en_US.json')
    }
})

export default i18n