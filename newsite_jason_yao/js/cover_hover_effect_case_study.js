const cover_data = [
	{
		id: "eccover",
		defaultColor:"#EBEFFF",
		hoverColor:"#1B3CC2",
		href: "emergencycall.html",
		img:"../img/ec_cover.png"
	},
	{
		id: "ccmcover",
		defaultColor:"#EDECEF",
		hoverColor:"#200E32",
		href: "creativitylab.html",
		img:"../img/2.png"
	},
	{
		id: "cfcover",
		defaultColor:"#E1E9F0",
		hoverColor:"#E05A32",
		href: "coalfire.html",
		img:"../img/coalfire_cover.png"
	},
	{
		id: "coffeechatcover",
		defaultColor: "#FFF2DE",
		hoverColor: "#FFA014",
		href: "coffeechat.html",
		img:"../img/1.png"
	},
	{
		id:"kitchencover",
		defaultColor:"#FFE5DD",
		hoverColor:"#FA5316",
		href: "cookwith.html",
		img:"../img/3.png"
	}
]

const vr_cover_data = {
	defaultImg:"../img/5i.png",
	hoverImg:"../img/5.png"
}


const  covers = document.getElementsByClassName("project-wrapper-small");
console.log(covers);
console.log("!!!!");
if(window.innerWidth >= 1024){
	for(let i = 0; i < covers.length; ++i){
		for(let j = 0; j < covers[i].children.length; ++j){
			let child = covers[i].children[j];
			if(child.getAttribute('id') !== null){
				// console.log(child.id);
				if(child.id === "vrsmallcover"){
					covers[i].addEventListener("mouseover", event => {
						child.style.background = "url(\'" + vr_cover_data.hoverImg + "')";
						child.style.backgroundPosition = "center";
						child.style.backgroundRepeat = "no-repeat";
						child.style.backgroundSize="cover";
						// console.log(child.style.background)
					})
					covers[i].addEventListener("mouseout", event => {
						child.style.background = "url(\'" + vr_cover_data.defaultImg + "')";
						child.style.backgroundPosition = "center";
						child.style.backgroundRepeat = "no-repeat";
						child.style.backgroundSize="cover";
						// console.log(child.style.background)
					})
				}else{
					for(let k = 0; k < cover_data.length; ++k){
						if(cover_data[k].id === child.id){
							covers[i].addEventListener("mouseover", event => {
								child.style.background = cover_data[k].hoverColor;
							})
							covers[i].addEventListener("mouseout", event => {
								child.style.background = cover_data[k].defaultColor;
							})
						}
					}
				}
			}
		}
	}
}











