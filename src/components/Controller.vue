<template>
  <div class="d-flex flex-column">
    <div class="mt-5">
      <v-textarea v-model="text" label="Text" filled color="black"> </v-textarea>
      <v-text-field v-model="time" type="number" label="Time" filled color="black"> </v-text-field>
    </div>
    <div v-for="(client,index) in clients" :key="index">
      {{client.ip}}, {{client.width}}, {{client.id}}
    </div>
    <v-btn elevation="0" dark class="mt-auto" @click="updateClients">Update</v-btn>
  </div>
</template>

<script>

import storage from "electron-json-storage";
import Response from "@/assets/Response";

export default {
  name: "Controller",
  props: {},
  data: () => {
    return {
      text : "",
      time : 0
    }
  },
  computed : {
    clients : function () {
      return this.server.clients
    },
    settings : function () {
      return this.$store.getters.settings
    }
  },
  watch: {
    clients: {
      deep: true,
      handler : function () {
        console.log("Change")
      }
    },
    settings: {
      deep: true,
      handler : function () {
        this.text = this.settings.text
        this.time = this.settings.time
      }
    },
  },
  mounted() {


  },
  methods: {
    updateClients(){
      this.$store.commit("setText",this.text)
      this.$store.commit("setTime",this.time)
      this.server.updateClients()
    }
  }
}
</script>

<style scoped>

</style>
