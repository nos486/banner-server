<template>
  <v-dialog v-model="dialog" width="500">

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Settings
      </v-card-title>

      <v-card-text>
        <v-radio-group v-model="settingsData.mode" row>
          <v-radio label="Server" value="server"></v-radio>
          <v-radio label="Client" value="client"></v-radio>
        </v-radio-group>
        {{ settingsData }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="save"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import storage from "electron-json-storage";

export default {
  name: "Settings",
  props: {},
  data: () => {
    return {
      dialog: false,
      settingsData: {}
    }
  },
  watch: {
    dialog: function () {
      storage.get('settings', (error, data) => {
        if (error) throw error;
        this.settingsData = data;
      });
    }
  },
  mounted() {
    this.$mousetrap.bind("shift+s", () => {
      this.dialog = true
    }, 'keyup')

    storage.get('settings', (error, data) => {
      if (error) throw error;

      if (data.mode === undefined) {
        this.setDefaultSettings()
        this.dialog = true
      }
    });

  },
  methods: {
    setDefaultSettings() {
      let defaultSettings = {
        "mode": "client"
      }
      storage.set("settings", defaultSettings, (error) => {
        if (error) throw error;
      })
    },
    save() {
      storage.set("settings", this.settingsData, (error) => {
        if (error) throw error;
        this.$emit("updated")
        this.dialog = false
      })
    }
  }
}
</script>

<style scoped>

</style>
