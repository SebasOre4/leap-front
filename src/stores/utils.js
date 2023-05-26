import { defineStore } from "pinia";
import { ref } from "vue";

export const useUtilsStore = defineStore("utils", () => {
  const crumbDetail = ref("");
  const notif = ref({
    title: "Tìtulo",
    message: "This is the message",
    type: "info",
    isVisible: false,
    timeVisible: 3,
    position: "top-center",
    showTimeout: null,
    closeTimeout: null
  });

  function setCrumbDetail(label) {
    crumbDetail.value = label;
  }

  function showNotif() {
    if (!notif.value.isVisible) {
      notif.value.isVisible = true;
    }
  }

  function closeNotif() {
    if (notif.value.isVisible) {
      notif.value.isVisible = false;
      clearTimeout(notif.value.closeTimeout);
      notif.value.closeTimeout = null;
    }
  }

  function setNotif({
    title = "Tìtulo",
    message = "This is the message",
    type = "info",
    timeVisible = 3,
    position = "top-center",
  }) {
    if (notif.value.isVisible) {
      closeNotif();
    }else{
      clearTimeout(notif.value.showTimeout);
      notif.value.showTimeout = null;
    }

    notif.value = {
      title: title,
      message: message,
      type: type,
      timeVisible: timeVisible,
      position: position,
      showTimeout: setTimeout(showNotif, 100),
      closeTimeout: setTimeout(closeNotif, timeVisible * 1000)
    };    
  }

  return { crumbDetail, notif, setCrumbDetail, setNotif, closeNotif };
});
