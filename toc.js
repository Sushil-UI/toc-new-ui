

    var parent = [];
	var newArray = [];
	var list3 = []
	var newObj = {}
	Vue.component('tree-menu', {
		
		template: '#tree-menu',
		props: ['childlinks', 'title', 'depth', 'nodelink', 'toc', 'parent', 'pathhash', 'pagename'],
     // props: ['path','title','level','pageName','nodeLink','toc','pathHash','parentId' ],
		data: function() {
			return {
				showChildren: false
			}
		},
		computed: {
			iconClasses() {
        		if (this.showChildren) 
                    return 'https://madison-qa.pwc.com/etc.clientlibs/pwc-madison/clientlibs/clientlib-site-vp/resources/images/collapse.svg';
        		else 
                    return 'https://madison-qa.pwc.com/etc.clientlibs/pwc-madison/clientlibs/clientlib-site-vp/resources/images/expand.svg';
			},
			labelClasses() {
				return {
					'has-children': this.childlinks
				}
			},
			indent() {
				return {
                    display: `block`
				}
			}
		},
		methods: {
			// toggleChildren(event,getNodeLink) {
			// 	console.log("target",event.currentTarget)
			// 	console.log("node link ",getNodeLink)
			// 	this.showChildren = !this.showChildren;
    		// 	if(this.showChildren) {				
            //         axios.get("microToc1.json").then(response => {
			// 			console.log("data toggle 1 , ", response.data.childlinks);					
			// 			const childlinks = response.data.childlinks
			// 			newObj = {...parent,childlinks }						
			// 			console.log("old obj", parent)
			// 			console.log("new obj", newObj)
			// 			main.addingJson(newObj)
			// 		});
				
			// }
			// },
			getChildernData(event,getNodeLink){
				var currEvent = event.currentTarget;
				//console.log("current links" ,currEvent)
				this.showChildren = !this.showChildren;
			//	console.log("get link",getNodeLink);
				if(this.showChildren) {
					axios.get("microToc1.json").then(response => {
						//getLinkRel = 
						//console.log("response", response.data.childlinks)
						for(i in response.data.childlinks){
							if(response.data.childlinks[i].nodelink == getNodeLink){
							//	alert("get")
								//getCurrChildlinks = response.data.childlinks[i].childlinks;	
								const childlinks = response.data.childlinks[i].childlinks								
								newObj = {...parent.childlinks[i],childlinks }
								parent.childlinks[i] = newObj
								newObj = parent													
								console.log("abc", newObj)										
								main.addingJson(newObj)
							}
						}
					
					});
				}
				
			}
		}
	});
	
	var main = new Vue({
		el: '#app',
		data: {
            tree: parent
		},
        mounted: function () {
			axios.get("microToc.json").then(response => {
				this.tree = response.data;
				console.log("data", response.data)
			//	debugger;
                parent = this.tree;
				
            });
        },
        methods: {

			addingJson(updatechildLink){			
				console.log("adding",updatechildLink)
				this.tree = updatechildLink;
				
			},
            // stichtJson(nodelink, parent, childlinks) {
            // 	// console.log("Nodelink: "+nodelink);
            //     // var originalTOCChildlinks = parent.childlinks[2];
            //     // originalTOCChildlinks["childlinks"] = childlinks;
            //     // parent.childlinks[2] = originalTOCChildlinks;
			// 	this.tree = parent;
        	// 	console.log("final tree ", this.tree);
        	// }
        },
		computed: {
        }
	})
