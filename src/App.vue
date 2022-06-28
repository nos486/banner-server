<template>
  <v-app>
    <div class="d-flex flex-column pa-10 lighten-2" :class="server.isListening ? 'green' : 'red'" style="height: 100%;" >
      <div class="display-3">Banner Server</div>
      <div>
        Server IP: {{ips}}
      </div>


      <Controller class="mt-5"></Controller>

<!--      <div class="d-flex justify-space-between">-->
<!--        <div>Server Address</div>-->
<!--        <div>{{server}}</div>-->
<!--      </div>-->
    </div>
  </v-app>

</template>

<script>

import Settings from "@/components/Controller";
import storage from 'electron-json-storage'
import ip from "ip"
import Controller from "@/components/Controller";
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
    Controller,
    Settings,
  },
  computed : {
    ips : function () {
      return ip.address()
    }
  },
  mounted() {
    this.server.start()
  },
  beforeDestroy() {
    this.server.stop()
  },
  methods :{


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
