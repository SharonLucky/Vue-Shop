var vm = new Vue({
  el: ".container",
  data: {
    limitNum:3,//limit showNumbers
    addressIndex: 0,
    addressList: [],
    //isNextFlag: false,
    loadMoreFlag: false,
    shippingMethod:1//选择配送方式
  },
  mounted: function () {
    this.$nextTick(function () {
      //this.loadingState = true;
      this.queryAddress();
    })
  },
  computed:{
    filteAddress:function(){
      return this.addressList.slice(0,this.limitNum)
    }
  },
  methods: {
    queryAddress: function () {
      var _this = this;
      var a = 3;
      this.$http.get('data/address.json').then(function (response) {
        var res = response.data;
        if (res.status == '0') {
          _this.addressList = res.result;
        }
      })
    },
    setDefaultAddress: function (addrId) {
      var _this = this;
      _this.addressList.forEach(function (item) {
        if (item.addressId == addrId) {
          item.isDefault = true;
        } else {
          item.isDefault = false;
        }
      });
    },
    loadMoreData:function () {
      this.loadMoreFlag=!this.loadMoreFlag;
      this.limitNum =this.loadMoreFlag? this.addressList.length:3;
    },
    delUserAddress:function (index) {
      var _this=this;
      this.addressList.splice(index,1)
    }
  }
})