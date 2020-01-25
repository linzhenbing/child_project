<template>
  <body class="grey lighten-3 user">

  <!--Main Navigation-->
  <header>

    <!-- Navbar -->
    <nav class="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
      <div class="container-fluid">
        <h4 class="mb-2 mb-sm-0 pt-1">
          <span style="color: #108fff;">多媒体管理系统</span>
          <span>/</span>
          <span>{{ $route.name }}</span>
        </h4>

        <span>您好，<span>{{ this.$store.getters.username }}</span>！ <a style="color: #0d47a1;" @click="logout">退出</a></span>
      </div>
    </nav>
    <!-- Navbar -->

    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed">

      <a class="logo-wrapper waves-effect" href="Javascript:void(0)" style="cursor: default;">
        <img src="../../assets/img/mdb-email.png" class="img-fluid" alt="">
      </a>

      <div class="list-group list-group-flush">
        <router-link to="/mdb/user" class="list-group-item active waves-effect" v-if="ifSuper">
          <i class="fas fa-user mr-3" ></i>用户管理
        </router-link>
        <!--<a href="#" class="list-group-item list-group-item-action waves-effect">
          <i class="fas fa-user mr-3"></i>Profile</a>
        <a href="#" class="list-group-item list-group-item-action waves-effect">
          <i class="fas fa-table mr-3"></i>Tables</a>
        <a href="#" class="list-group-item list-group-item-action waves-effect">
          <i class="fas fa-map mr-3"></i>Maps</a>
        <a href="#" class="list-group-item list-group-item-action waves-effect">
          <i class="fas fa-money-bill-alt mr-3"></i>Orders</a>-->
      </div>

    </div>
    <!-- Sidebar -->

  </header>
  <!--Main Navigation-->

  <!--Main layout-->
  <router-view></router-view>
  <!--Main layout-->

  </body>
</template>

<script>
  export default {
    name: "MDB",
    data(){
      return{
        ifSuper: ''
      }
    },
    created(){
      //根据用户类型判断是否显示用户管理
      let type = this.$store.getters.type
      if(type===1){ this.ifSuper = false }else { this.ifSuper = true }
    },
    methods:{
      logout(){
        //销毁登陆状态
        this.$store.commit("setIsLogin",'false')
        this.$store.commit("setUser",{})
        //跳转回登陆页
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  body{
    font-size: 14px;
  }
  .map-container{
    overflow:hidden;
    padding-bottom:56.25%;
    position:relative;
    height:0;
  }
  .map-container iframe{
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
  }

</style>

<!--Style.css-->
<style scoped>
  .sidebar-fixed {
    height: 100vh;
    width: 270px;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    z-index: 1050;
    background-color: #fff;
    padding: 1.5rem;
    padding-top: 0; }
  .sidebar-fixed .list-group .active {
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    -webkit-border-radius: 5px;
    border-radius: 5px; }
  .sidebar-fixed .logo-wrapper {
    padding: 2.5rem; }
  .sidebar-fixed .logo-wrapper img {
    max-height: 50px; }

  @media (min-width: 1200px) {
    .navbar,
    .page-footer,
    main {
      padding-left: 270px; } }

  @media (max-width: 1199.98px) {
    .sidebar-fixed {
      display: none; } }
</style>
