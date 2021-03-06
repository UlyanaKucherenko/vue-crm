import firebase from 'firebase/app'

export default {
    state: {

    },
    mutations: {

    },
    actions: {
        async fetchCategories({dispatch, commit},){
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {}
          
             /* const cats = []
                Object.keys(categories).forEach( key =>{
                    cats.push({
                        title: categories[key].title,
                        limit: categories[key].limit,
                        id: key
                    })
                })
                return cats*/

                return Object.keys(categories).map(key => ({...categories[key], id: key}))
                
            } catch(e){
                console.log(e)
                commit('setError', e)
            }
        },

       async createCategory({dispatch, commit}, {title, limit}) {
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`users/${uid}/categories`).push({title, limit})
                return {title, limit, id: category.key}

            } catch(e){
                console.log(e)
                commit('setError', e)
            }
        },
        async updateCategory({dispatch, commit}, {title, limit, id}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`users/${uid}/categories`).child(id).update({title, limit})

            } catch(e){
                console.log(e)
                commit('setError', e)
            }
        }
    }
}