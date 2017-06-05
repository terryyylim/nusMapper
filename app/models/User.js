export default class User {
  constructor($http, $q) {
    'ngInject';
    this.Q = $q;
    this.HTTP = $http;
    this.init();
  }
  init(){
  	this.HTTP.get("orbital.json").then(
  		(res)=>{
  			this.modules = res.data;
  		}).catch(
  		(error)=>{
  			console.log(error);
  		});
  }
}