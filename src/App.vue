<template>
  <v-app>
    <div class="d-flex blue titleBar" style="height: 100%">
      <v-btn class="noTitleBar" color="red" @click="setTitle" dark>Test</v-btn>
      <Socket v-if="settingsData.mode === 'client'"></Socket>
      <Settings @updated="settingsUpdate"></Settings>

    </div>
  </v-app>

</template>

<script>

import Socket from "@/components/Socket";
import Settings from "@/components/Settings";
import storage from 'electron-json-storage'
import net from "net";
const { ipcRenderer } = require('electron')

export default {
  name: 'App',
  data : ()=>{
    return {
      electronStore : null,
      settingsData : {}
    }
  },
  components: {
    Settings,
    Socket
  },
  beforeMount() {
    this.settingsUpdate()
  },
  mounted() {

    storage.getAll(function (error, data){
      console.log(data)
    })

    // electronStore.set('unicorn', '🦄');
    // console.log(store.get('unicorn'));
  },
  methods :{
    setTitle(){
      ipcRenderer.send('set-title',"test")
    },
    settingsUpdate(){
      storage.get("settings", (error, data)=>{
        this.settingsData = data
        if(data.mode === 'server'){
          this.setServer()
        }else {
          this.$socket.destroy()
          console.log(this.$socket.readyState)
        }
      })
    },
    setServer(){
      this.$server = net.createServer(function(socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
      });

      this.$server.listen(1337, '127.0.0.1');
      console.log("server is up")
    },
  }
}
</script>

<style>
.titleBar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.noTitleBar {
  -webkit-app-region: no-drag;
}
</style>
