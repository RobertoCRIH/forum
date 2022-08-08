function addElementTo(type,class_,textToAppend,whereToAppend) {
		let element=document.createElement(type);
		element.classList.add(class_);
		let titleText=document.createTextNode(textToAppend);
		element.appendChild(titleText);
		whereToAppend.appendChild(element); 
	}

async function getDataPost() {



	let url="https://jsonplaceholder.typicode.com/posts";
	let response=await fetch(url);
	let post=await response.json();


	let urlUser="https://jsonplaceholder.typicode.com/users";
	let responseUser=await fetch(urlUser);
	let users=await responseUser.json()

	let urlComment="https://jsonplaceholder.typicode.com/comments";
	let responseComment=await fetch(urlComment);
	let comments=await responseComment.json()

	console.log(comments)
	console.log(users);
	console.log(post);
	let container=document.getElementById("container");

	// let template=document.getElementById("template").innerHTML;
	// let html=Mustache.render(template,post);
	// container.innerHTML=html;


	
	for(i in post){
		let userId=post[i].userId;
		console.log(userId);

		let thisPost=document.createElement("DIV");
		thisPost.classList.add("post");
		container.appendChild(thisPost);

		// Header
		let thisPostHeader=document.createElement("DIV");
		thisPostHeader.classList.add("postHeader");
		thisPost.appendChild(thisPostHeader);

		let thisPostHeaderProfilePic=document.createElement("DIV");
		thisPostHeaderProfilePic.classList.add("profilePic");
		thisPostHeader.appendChild(thisPostHeaderProfilePic);

		let profileImg=document.createElement("IMG");
		profileImg.classList.add("profilePicImg");
		profileImg.setAttribute("src", "img/avatar/"+userId+".jpg")
		profileImg.setAttribute("alt", "Profile Pic")
		thisPostHeaderProfilePic.appendChild(profileImg);

		let thisPostHeaderWritten=document.createElement("DIV");
		thisPostHeaderWritten.classList.add("written");
		thisPostHeader.appendChild(thisPostHeaderWritten);

		for(x in users){
			if(userId == users[x].id){
				addElementTo("P","userName",users[x].name,thisPostHeaderWritten);
				addElementTo("P","company",users[x].company.name,thisPostHeaderWritten);
				addElementTo("P","userEmail",users[x].email,thisPostHeaderWritten);
				break;
			}
		}

		//postMain
		let thisPostMain=document.createElement("DIV");
		thisPostMain.classList.add("postMain");
		thisPost.appendChild(thisPostMain);


		addElementTo("P","title",post[i].title,thisPostMain);
		addElementTo("P","postContent",post[i].body,thisPostMain);

		for(n in users){
			if(userId == users[n].id){
				let website=document.createElement("A");
				website.classList.add("website");
				website.setAttribute("href",users[n].website);
				website.setAttribute("target","_blank");

				let wb_text=document.createTextNode("My Website");
				website.appendChild(wb_text);

				thisPostMain.appendChild(website);

				addElementTo("P","location","Posted from: "+users[n].address.suite+" "+users[n].address.street+", "+users[n].address.city,thisPostMain);
			}
		}

		

		let postId=post[i].id;

		for(z in comments){
			if(postId == comments[z].postId){
				let thisPostComment=document.createElement("DIV");
				thisPostComment.classList.add("comment");
				thisPost.appendChild(thisPostComment);

				addElementTo("P","commentEmail",comments[z].email,thisPostComment);
				addElementTo("P","titleComment",comments[z].name,thisPostComment);
				addElementTo("P","contentComment",comments[z].body,thisPostComment);
			}
		}

	}
	let loading=document.querySelector(".loading");
	loading.setAttribute("hidden","true");

}


async function getDataUser () {
	let urlUser="https://jsonplaceholder.typicode.com/users";
	let responseUser=await fetch(urlUser);
	let users=await responseUser.json()

	let container= document.getElementById("container");

	for(i in users){
		let user= document.createElement("DIV");
		user.classList.add("user");
		container.appendChild(user);

		let imgHolder= document.createElement("DIV");
		imgHolder.classList.add("userImage");
		user.appendChild(imgHolder);

		let userId= users[i].id;
		let userImg= document.createElement("IMG");
		userImg.setAttribute("src","img/avatar/"+userId+".jpg");
		imgHolder.appendChild(userImg);

		addElementTo("DIV","username",users[i].username,user);
		addElementTo("DIV","phone","("+users[i].phone+")",user);
		addElementTo("DIV","realName","'"+users[i].name+"'",user);
		addElementTo("DIV","email",users[i].email,user);

		let workInfo= document.createElement("DIV");
		workInfo.classList.add("workInfo");
		user.appendChild(workInfo);

		addElementTo("P","any","Work Info",workInfo);
		addElementTo("DIV","workCompany","--Working at "+users[i].company.name+"--",workInfo);
		addElementTo("DIV","catchPhrase","'"+users[i].company.catchPhrase+"'",workInfo);

	}
	let loading=document.querySelector(".loading");
	loading.setAttribute("hidden","true");
}
