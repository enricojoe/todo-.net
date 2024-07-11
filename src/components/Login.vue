<template>
  <div class="login-page flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div class="w-full flex justify-center">
         <div class="w-1/2 rounded-lg flex justify-center">
            <div class="w-1/2 w-full bg-white rounded-lg shadow dark:border max-w-md p-10">
               <div v-if="!registerActive" class="card login flex flex-col space-y-4" v-bind:class="{ error: emptyFields }">
                <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-black">
                    Sign in to your account
                </h1>
                  <form class="form-group flex flex-col" @submit.prevent="login">
                    <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="text" name="username" id="username" v-model="this.username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                    </div>
                     <!-- <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required> -->
                     <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" v-model="this.password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                    </div>
                     <!-- <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required> -->
                     <!-- <input type="submit" class="btn btn-primary" @click="doLogin">
                     <p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
                     </p>
                     <p><a href="#">Forgot your password?</a></p> -->
                     <div class="flex items-center justify-between">
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
                  </form>
               </div>

               <div v-else class="card register" v-bind:class="{ error: emptyFields }">
                  <h1>Sign Up</h1>
                  <form class="form-group">
                     <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                     <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                     <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>
                     <input type="submit" class="btn btn-primary" @click="doRegister">
                     <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                     </p>
                  </form>
               </div>
            </div>
         </div>

      </div>
   </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username:"",
      password:"",
      BASE_URL: process.env.VUE_APP_BASE_API_URL
    }
  },
  methods: {
    async login() {
      try {
        const url = this.BASE_URL+'/auth/User/Login';
        const response = await fetch(url, {
          method: 'POST', // Change to 'POST', 'PUT', etc. based on your needs
          headers: {
            'Content-Type': 'application/json', // Optional, depending on your API
          },
          body: JSON.stringify({
            username: this.username,
            passwordHash: this.password
          })
        });
        if (!response.ok) {
          console.log(response);
          throw new Error(response);
        }
        const data = await response.text();
        this.setCookie("token", data);
        this.$router.push('/');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    setCookie(key, value) {
      document.cookie = key + '=' + value;
    }
  }
}
</script>