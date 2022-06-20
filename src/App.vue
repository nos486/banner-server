<template>
  <v-app>
    <div class="d-flex flex-column pa-10 lighten-2" :class="server.isListening ? 'green' : 'red'" style="height: 100%;" >
      <div class="display-3">Banner Server</div>
      <div class="mt-5">
        <v-textarea v-model="data.text" label="Text" filled color="black"> </v-textarea>
      </div>
      <v-btn elevation="0" dark class="mt-1" @click="updateClients">Update</v-btn>
      <div class="mt-5 pa-2">
        <div v-for="(client,index) in server.clients" :key="index">
          {{client.ip}}
        </div>
      </div>

<!--      <div class="d-flex justify-space-between">-->
<!--        <div>Server Address</div>-->
<!--        <div>{{server}}</div>-->
<!--      </div>-->
    </div>
  </v-app>

</template>

<script>

import Settings from "@/components/Settings";
import storage from 'electron-json-storage'
import net from "net";
const { ipcRenderer } = require('electron')

export default {
  name: 'App',
  data : ()=>{
    return {
      electronStore : null,
      settingsData : {},
      data : {}
    }
  },
  components: {
    Settings,
  },
  mounted() {
    this.server.start()
  },
  beforeDestroy() {
    this.server.stop()
  },
  methods :{

    updateClients(){
      this.server.sendToAll(this.data)
    }
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
