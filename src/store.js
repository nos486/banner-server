import Vue from 'vue';
import Vuex from 'vuex';
import storage from "electron-json-storage";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        settings: {},
    },
    getters :{
        settings : state => {
            if (Object.keys(state.settings).length === 0){
                storage.get('settings', (error, settings) => {
                    if (error) throw error;
                    if(settings.time.length > 0) settings.time = parseInt(settings.time)
                    state.settings = settings
                    return settings
                });
            }else {
                return state.settings
            }
        }
    },
    mutations: {
        setText (state, text) {
            let settings = state.settings
            settings["text"] = text
            storage.set("settings", {...settings}, (error) => {
                if (error) throw error;
            })
            state.settings = settings
        },
        setTime (state, time) {
            let settings = state.settings
            settings["time"] = time
            storage.set("settings", {...settings}, (error) => {
                if (error) throw error;
            })
            state.settings = settings
        }
    }
})

export default store
