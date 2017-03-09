var vm = new Vue({
  el: ".container",
  data: {
    limitNum:3,//limit showNumbers
    addressIndex: 0,
    addressList: [],
    showModal:false,
    showNewAddress:false,
    loadMoreFlag: false,
    shippingMethod:1,//选择配送方式
    province: [],
    name:'',
    tel:'',
    selected:'',
    selCity:'',
    addrFlag:false,
    telFlag:false,
    nameFlag:false
  },
  mounted: function () {
    this.$nextTick(function () {
      this.queryAddress();
    })
  },
  computed:{
    filteAddress:function(){
      return this.addressList.slice(0,this.limitNum)
    },
    selection:function () {
      var selected_tow2 = [];
        var that = this;
        that.province.forEach(function (val) {
          if(val.text == that.selected){
            selected_tow2 =val.city;
          }
        });
      return selected_tow2
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
      this.showModal=true;
      this.delIndex=index;
      console.log(index)

    },
    saveConfirm:function () {
      var _this=this;
      if(!_this.name){
        _this.nameFlag=true;
        return
      }
      if(!_this.tel){
        _this.telFlag=true;
        return
      }
      if(!_this.selected||!_this.selCity){
        _this.addrFlag=true;
        return
      }

      _this.addressList.push({
        "addressId":Number(_this.addressList[_this.addressList.length-1].addressId)+1,
        "userName":_this.name,
        "streetName":_this.selected+"省"+_this.selCity+"市",
        "postCode":"100001",
        "tel":_this.tel,
        "isDefault":false
      })
      this.showNewAddress=false;
    },
    delConfirm:function () {
      var _this=this;
      this.showModal=false;
      setTimeout(function () {
        _this.addressList.splice(this.delIndex,1)
      },300)
      console.log( _this.addressList)
    },
    getAddressInfo:function () {
      this.$http.get('data/province.json').then(function (response) {
        var res = response.data;
        if (res.status == '1') {
          this.province = res.province;
        }
      })
    },
    addNewAddress:function () {
      this.showNewAddress=true;
      this.getAddressInfo();
    }
  }
})