import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useUserStore = defineStore("user", () => {
  const stored = localStorage.getItem('leapAppUser');

  const apiUser = ref(stored ? JSON.parse(stored) : null);
  const token = computed(() => apiUser.value?.token);
  const name = computed(() => (apiUser.value?.name));

  function saveState(){
    const user = apiUser.value;
    if(user){
      localStorage.setItem("leapAppUser", JSON.stringify(user));
    }else{
      localStorage.removeItem("leapAppUser");
    }
  }

  function setApiUser(user){
    apiUser.value = user;
    saveState();
  }

  function setTokens(tokens){
    apiUser.value.token = tokens.token;
    saveState();
  }

  return { apiUser, token, name, setApiUser, setTokens };
});
