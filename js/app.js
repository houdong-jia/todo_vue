(function (window,Vue) {
	new Vue({
		el: "#app",
		data:{
			list: JSON.parse(localStorage.list || "[]"),
			addText : "",
			allChecked: false,
			hash: location.hash
		},
		methods: {
			add(){
				if(this.addText == "") return;

				this.list.unshift({
					id: this.list.length>0 ? this.list[0].id+1 : 0,
					content: this.addText,
					isFinish: false
				});

				this.addText = "";
			},
			del(index){
				this.list.splice(index,1);
			},
			clear(){
				this.list = this.list.filter((item) => {return !item.isFinish})
			},
			showClear(){
				return this.list.filter((item)=>{
					return item.isFinish == true;
				}).length
			}
		},
		directives: {
			focus:{
				inserted(el){
					el.focus();
				}
			}
		},
		computed: {
			listNum() {
				return this.list.filter((item,index) => {
					return !item.isFinish
				}).length
			},
		},
		watch: {
			list:{
				handler(newVal){
					localStorage.setItem("list",JSON.stringify(newVal));
				},
				deep:true
			},
			allChecked(newVal){
				this.list.forEach((item)=>{
					item.isFinish = newVal;
				});
			},
			hash(newVal){

				switch(newVal){
					case "" :
					case "#/":
						break;
					case "#/active":
						this.list = this.list.filter((item)=>{return item.isFinish });
						break;
					case "#/completed":
						break;
				}
			}
		}
	})

})(window,Vue);
