<template>
  <div>
    socket
  </div>
</template>

<script>

import net from "net"
export default {
  name: "Socket",
  data : ()=>{
    return {
      server : null
    }
  },
  mounted() {
    this.$socket = new net.Socket();

    console.log(this.$socket)
    console.log(this.$socket.readyState)
    this.$socket.connect(1337, '0.0.0.0', ()=>{
      console.log('Connected');
      this.$socket.write('Hello, server! Love, Client.');
    });

    this.$socket.on('data', (data)=> {
      console.log('Received: ' + data);
    });

    this.$socket.on('close', ()=> {
      console.log('Connection closed');
    });
  },
  beforeDestroy() {
    this.server.close()
  }
}
</script>

<style scoped>

</style>
