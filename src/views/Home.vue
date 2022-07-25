<template>
    <div class="Home" style="margin-left:0" >
        <div class="container" style="margin-left:0">
          <div class="row">
            <div class="col bg">
              <div class="box">
                <img src="../../public/logo.png" style="width: 270px;height: 270px;">
                <div>
                  <strong style="font-family:montserratbold;font-size: 70px;color: #ffffff;margin-left: 20px;border-color: #ffffff;">What</strong>
                </div>
                <div>
                  <strong style="font-family:montserratbold;font-size: 70px;color: #ffffff;margin-left: 90px;border-color: #ffffff;">To</strong>
                </div>
                <div>
                  <strong style="font-family:montserratbold;font-size: 70px;color: #ffffff;margin-left: 15px;border-color: #ffffff;">Watch</strong>
                </div>
              </div>
            </div>
            <div class="col">
              <Login />
            </div>
          </div>
        </div>
    </div>
    <!-- <Footer style="margin-top: 50px;"/> -->
</template>
<script>
//import Footer from './Footer.vue'
import Login from './Login.vue'

export default {
  components: {
    //Footer,
    Login
  }
}
</script>
<style scoped>
.box{
  background: linear-gradient(120deg, #78D5F5 0%, #787FF6 24%, #4ADEDE 49%, #1CA7EC 75%, #1F2F98 100%);
  height: 100%;
  width: 100%;
  padding-top:2%;
  padding-left:25%;
}

</style>