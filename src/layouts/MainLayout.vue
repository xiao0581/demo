<template>
  <q-layout view="lHh Lpr lFf">
    

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer style="border-radius: 200px;background-color: #f7f7f9;">
        <q-tabs class="text-grey-8"
         indicator-color="transparent"
        
         >
        <q-route-tab 
        to="/"
        name="home"
        icon="sym_o_home" 
         />

        <q-route-tab 
        to="/calendar"
        name="alarms"
        icon="sym_o_calendar_month" 
        />

        <q-route-tab 
        to="/message"
        name="message" 
        icon="sym_o_forum"
       />

       <q-route-tab 
       to="/notification"
        name="notification" 
        icon="sym_o_notifications"
       />

       <q-route-tab 
       to="/login"
        name="login" 
        icon="sym_o_person"
       />

      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<style>

.q-router-link--exact-active {
  background-color: #6366f1 ; /* 只对完全匹配的链接高亮 */
  border-radius: 100px; 
  color: white;
    
}


</style>
<script setup lang="ts">

</script>
