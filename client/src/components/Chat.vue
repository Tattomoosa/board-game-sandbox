<template>
	<div class="chat-window" v-if="active" :style="{ width: activeWidth }">
    <h4>Chat</h4>
		<input
		type="button"
		class="show-chat-button"
		value="Hide"
		v-on:click="active=!active"
		></input>
    <div class="chat-scroll">
      <div class="message" v-for="(msg, index) in messages" :key="index">
        <div v-if="users[msg.socketId]" class="username">
          {{ users[msg.socketId].name }}
        </div>
        <div v-else class="username">
          Server Message
        </div>
        <pre class="contents">{{ msg.message }}</pre>
      </div>
    </div>
    <div class="chat-form">
      <form @submit.prevent="sendMessage">
        <p class="username">name: {{ username }}</p>
        <input type="text" v-model="message"></input>
        <input type="submit" value="Send"></button>
    </form>
  </div>
</div>
<input v-else type="button" class="show-chat-button" value="Chat" v-on:click="active=!active"></input>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      active: true
    }
  },
	props: {
		activeWidth: String
	},
  mounted() {
    this.$io.on('message', data => {
      this.$store.commit('addMessage', data)
    })
  },
  computed: {
    messages() {
      return this.$store.state.messages
    },
    users() {
      return this.$store.state.users
    },
    username() {
      let id = this.$store.state.client.id
      if (this.$store.state.users[id])
        return this.$store.state.users[id].name
      else return id
    }
  },
  methods: {
    sendMessage(e) {
      this.$io.emit('send message', {
        socketId: this.$store.state.client.id,
        message: this.message
      })
      this.message = ''
    }
  }
}
</script>

<style lang="scss">
$padding: 4px;
$width: 300px;

.chat-window {
  position: absolute;
  width: $width;
  right: 0;
  background: slategrey;
  top: 0;
  bottom: 0;
  padding: $padding;

  h4 {
    background: white;
    color: slategray;
    text-align: center;
    padding: 10px 0;
    border-bottom: 4px solid slategrey;
  }
}
.chat-form {
  .username {
    color: white;
    padding-bottom: 4px;
    margin: 0;
  }
  input[type=text] {
    width: $width - $padding*2;
    padding: 10px;
    border: none;
    border-radius: 0;
  }
  input[type=submit] {
    width: $width - $padding*2;
    background: #4433ff;
    padding: 8px;
    border-radius: none;
    border: none;
    color: white;
  }
  .username {
    font-style: bold;
  }
  position: absolute;
  left: 0;
  margin: 0;
  padding: 4px;
  padding-top: 0;
  bottom: $padding;
  bottom: 0;
  background: slategrey;
}
.chat-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 132px);
  padding-bottom: 4px;
  .message {
    padding: 4px;
    background: #efefef;
    font-size: 14px;

    .username {
      font-weight: bold;
      color: slategrey;
      font-size: 10px;
      padding-bottom: 8px;
    }
    .contents {
      font-size: 12px;
      // margin-left: 20px;
      padding-left: 0;
      padding-bottom: 4px;
      font-family: inherit;
      line-height: 16px;
      white-space: pre-wrap;
    }
  }
  .message:nth-child(2n) {
    background: lightgrey;
  }
}
.show-chat-button {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 50px;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: none;
  background: lightgrey;
  padding: 4px 0 ;
}

</style>
