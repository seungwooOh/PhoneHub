
const listContentElem = document.querySelector('.tab_content')
const rowCnt = 15;
const pagingContentElem = document.querySelector('#pagingContent')

const categoryElem = document.getElementById("tab_menus")
var x = categoryElem.getElementsByTagName("li")[0].getAttribute("class"); 
var y = categoryElem.getElementsByTagName("li")[1].getAttribute("class"); 
var z = categoryElem.getElementsByTagName("li")[2].getAttribute("class"); 
	

const myTabs = document.querySelectorAll(".tab_menus > li");
function myTabClicks(tabClickEvent) {

	for (var i = 0; i < myTabs.length; i++) {
		myTabs[i].classList.remove("active");
	}
	const clickedTab = tabClickEvent.currentTarget;
	clickedTab.classList.add("active");
	tabClickEvent.preventDefault();
	const tabContent = document.querySelectorAll(".tab_content");
	for (i = 0; i < tabContent.length; i++) {
		tabContent[i].classList.remove("active");
	}
	/*const anchorReference = tabClickEvent.target;
	const activePaneId = anchorReference.getAttribute("href");
	const activePane = document.querySelector(activePaneId);
	activePane.classList.add("active");*/

	console.log(x)
	console.log(y)
	console.log(z)
	
}
for (var i = 0; i < myTabs.length; i++) {
	myTabs[i].addEventListener("click", myTabClicks)
}

function goToDetail(boardPk) {
	location.href = `/detail?boardPk=${boardPk}`
}

getBoardList()
function getBoardList(page) {

	if (!page) {
		page = 1
	}
	if(x === "board1 active") {
	console.log("board1")
		fetch(`/boardListData?page=${page}&rowCnt=${rowCnt}&category=${1}`)
		.then(res => res.json())
		.then(myJson => {
			boardProc(myJson)
			console.log(myJson)
		})
	} else if(y === "board2 active") {
	console.log("board2")
		fetch(`/boardListData?page=${page}&rowCnt=${rowCnt}&category=${2}`)
		.then(res => res.json())
		.then(myJson => {
			boardProc(myJson)
			console.log(myJson)
		})
	} else if(z === "board3 active") {
	console.log("board3")
		fetch(`/boardListData?page=${page}&rowCnt=${rowCnt}&category=${3}`)
		.then(res => res.json())
		.then(myJson => {
			boardProc(myJson)
			console.log(myJson)
		})
	}
}

function boardProc(myJson) {
	if (myJson.length === 0) {
		listContentElem.innerHTML = '<div>글이 없습니다.<div>'
		return
	}


	//table
	const table = document.createElement('table');
	table.classList.add('tab_table');
	//colgroup
	const colgroup = document.createElement('colgroup');
	const col_1 = document.createElement('col');
	col_1.classList.add('num');
	const col_2 = document.createElement('col');
	col_2.classList.add('title');
	const col_3 = document.createElement('col');
	col_3.classList.add('writer');
	const col_4 = document.createElement('col');
	col_4.classList.add('hits');
	const col_5 = document.createElement('col');
	col_5.classList.add('date');
	colgroup.append(col_1);
	colgroup.append(col_2);
	colgroup.append(col_3);
	colgroup.append(col_4);
	colgroup.append(col_5);
	table.append(colgroup);
	// 테이블 tr th
	const htr = document.createElement('tr');
	const th_1 = document.createElement('th');
	const th_2 = document.createElement('th');
	const th_3 = document.createElement('th');
	const th_4 = document.createElement('th');
	const th_5 = document.createElement('th');
	htr.append(th_1);
	htr.append(th_2);
	htr.append(th_3);
	htr.append(th_4);
	htr.append(th_5);
	th_1.innerText = '번호';
	th_2.innerText = '제목';
	th_3.innerText = '글쓴이';
	th_4.innerText = '조회수';
	th_5.innerText = '날짜';
	table.append(htr);
	//리스트 반복
	myJson.forEach(function(item) {
		const a = document.createElement('a');
		const tr = document.createElement('tr');
		tr.classList.add('gall_tr');
		const td_1 = document.createElement('td');
		td_1.classList.add('gall_num');
		const td_2 = document.createElement('td');
		td_2.classList.add('gall_title');
		td_2.append(a);
		const td_3 = document.createElement('td');
		td_3.classList.add('gall_nick');
		const td_4 = document.createElement('td');
		td_4.classList.add('gall_hits');
		const td_5 = document.createElement('td');
		td_5.classList.add('gall_date');
		td_1.innerText = item.seq;
		a.innerText = item.title;
		td_3.innerText = item.writerNm;
		td_4.innerText = item.hits;
		td_5.innerText = item.regDt;
		tr.append(td_1);
		tr.append(td_2);
		tr.append(td_3);
		tr.append(td_4);
		tr.append(td_5);
		table.append(tr);
		a.addEventListener('click', function() {
			goToDetail(item.boardPk);
		});
	});
	listContentElem.innerHTML = '';
	listContentElem.append(table);
}

getMaxPageNum()
function getMaxPageNum() {
	fetch(`/boardGetMaxPageNum?rowCnt=${rowCnt}`)
		.then(res => res.json())
		.then(myJson => {
			pageProc(myJson)
		})
}

function pageProc(myJson) {

	// rowCnt(15) 만큼 리스트
	const pagingContentElem = document.querySelector('#pagingContent')
	const paging = document.createElement('div')
	const bluebar = document.createElement('ul')
	paging.classList.add('paging_control')
	bluebar.classList.add('blue_bar')
	const laquo = document.createElement('li')
	const raquo = document.createElement('li')
	laquo.classList.add('prev')
	raquo.classList.add('next')
	laquo.innerText = '<';
	raquo.innerText = '>';
	console.log(myJson)
	for (let i = 1; i <= myJson; i++) {
		const li = document.createElement('li')
		li.classList.add('active')
		li.innerText = i
		li.addEventListener('click', function() {
			getBoardList(i)
		})
	}
		bluebar.append(laquo)
		bluebar.append(li)
		bluebar.append(raquo)
		console.log(paging)
		console.log(bluebar)
		paging.append(bluebar)
		pagingContentElem.append(paging)

}
