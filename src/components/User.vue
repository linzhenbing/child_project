<template>
  <main class="pt-5 mx-lg-5">
    <!--用户表格-->
    <div class="row wow fadeIn">

      <div class="col-md-12 mb-4 col-lg-12 col-sm-12">

        <!--Card-->
        <div class="card">

          <!--Card content-->
          <div class="card-body">

            <!--搜索框-->
            <div class="search_box">
              <span>姓名：<input type="text" placeholder="请输入用户姓名"></span>
              <span>歌曲名：<input type="text" placeholder="请输入歌曲名"></span>
              <span>注册日期：<el-date-picker
                v-model="dates"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker></span>
              <button class="button_search">搜索</button>
            </div>

            <!-- Table  -->
            <table class="table table-hover">
              <!-- Table head -->
              <thead class="blue lighten-4">
              <tr>
                <th>用户ID</th>
                <th>用户名</th>
                <th>用户类型</th>
                <th>注册时间</th>
                <th>操作</th>
              </tr>
              </thead>
              <!-- Table head -->

              <!-- Table body -->
              <tbody>
              <tr>
                <td colspan="5" class="noUser">暂无数据</td>
              </tr>
              <tr v-for="user in userList" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.username }}</td>
                <td>{{ user.type === 1?"普通管理员":"超级管理员" }}</td>
                <td>{{ user.createtime }}</td>
                <td>
                  <a id="operate_state" @click="setState(user.username,user.state)">{{ user.state === 0?"启用":"禁用" }}</a>
                  <a id="operate_delete" @click="deleteUser(user.username)">删除</a>
                </td>
              </tr>
              </tbody>
              <!-- Table body -->
            </table>
            <!-- Table  -->

          </div>

        </div>
        <!--/.Card-->

      </div>

    </div>

</main>
</template>

<script>
  export default {
    name: "User",
    data(){
      return{
        userList:[],
        dates:['','']
      }
    },
    created() {
      this.getUsers()
    },
    methods:{
      getUsers(){
        this.$http.get('/user/getUser').then(res=>{
          this.userList = res.data.data
        })
      },
      setState(username,state){
        if(confirm("管理员，您确定要修改该用户的状态吗？")){
          if(state===1){
            //调用禁用用户接口
            this.$http.post('/user/forbidUser',this.qs.stringify({ userName: username })).then(res=>{
              alert("修改成功！")
              if(username === this.$store.getters.username){
                alert("本账号信息已被修改，请重新登录！")
                this.$store.commit("setUser",{})
                this.$store.commit("setIsLogin",'false')
                this.$router.push('/')
              }
              this.getUsers()
            })
            state = 0
          }else {
            //调用启用用户接口
            this.$http.post('/user/enableUser',this.qs.stringify({ userName: username })).then(res=>{
              alert("修改成功！")
              if(username === this.$store.getters.username){
                alert("本账号信息已被修改，请重新登录！")
                this.$store.commit("setUser",{})
                this.$store.commit("setIsLogin",'false')
                this.$router.push('/')
              }
              this.getUsers()
            })
          }
        }
      },
      deleteUser(username){
        if(confirm("管理员，您确定要删除该用户吗？")){
          //调用删除用户接口
          this.$http.delete('/user/deleteUser',{ params:{ userName: username } }).then(res=>{
            alert("删除成功！")
            if(username === this.$store.getters.username){
              alert("本账号信息已被修改，请重新登录！")
              this.$store.commit("setUser",{})
              this.$store.commit("setIsLogin",'false')
              this.$router.push('/')
            }
            this.getUsers()
          })
        }
      }
    }
  }
</script>

<style scoped>
  .search_box{ width: 90%;font-size: 16px;font-weight: lighter;display: flex;justify-content: space-around;margin: 0 auto 30px auto;}
  .search_box input{ height: 30px;border: none;border-bottom: 1px solid #999;width: 220px;outline: none;padding: 0 6px;font-weight: lighter; }
  .search_box button{ border: none;outline: none;cursor: pointer;font-weight: lighter;padding: 0 40px; }

  .noUser{ color: #999;font-size: 18px;display: none;}
  table{ text-align: center; }
  #operate_state{ color: #0b51c5;margin-right: 20px; }
  #operate_delete{ color: #d60000; }
</style>

<!--覆盖ElementUI默认样式-->
<style>
  .user .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{ width: 260px;border: none;border-bottom: 1px solid #999;
  }
  .user .el-date-editor .el-range-input, .el-date-editor .el-range-separator{ font-size: 16px;font-family: "微软雅黑";font-weight: 100; }
  .user .el-date-editor input::-webkit-input-placeholder { color: #999; }
  .user .el-date-editor input::-moz-placeholder { color: #999; }
  .user .el-date-editor input::-ms-input-placeholder { color: #999; }
  .user .el-input__inner{ height: 30px; }
  .user .el-date-editor .el-range__icon{ line-height: 25px; }
</style>
