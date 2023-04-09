const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text");

/*
toggle는 className이 존재하는지 확인하고 만약 존재한다면  className을 제거한다. 존재하지 않으면
추가한다.
*/
modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark")

    console.log("isDark:", isDark)
    if(body.classList.contains("dark")){
        modeText.innerText = "Light Mode"
    }else{
        modeText.innerText = "Dark Mode"
    }
})


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () =>{
    sidebar.classList.remove("close") //검색 엘리먼트 클릭시 sidebar 열림
})