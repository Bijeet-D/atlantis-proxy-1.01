let shortcutJson = [
                {
                    ttl: "CrazyGames",
                    href: "https://crazygames.com",
                }
            ]

            

            let currentEditingShortcut = null;

            document.querySelector("#sj-input").addEventListener("keydown", function (e) {

                if (e.key == "Enter") {
                    alert("qq")
                    parent.postMessage({
                        search: this.value
                    })
                }
                alert("")
            })

            let allTreeDots = document.querySelectorAll(".tree-dots-shortcuts");
            allTreeDots.forEach(el => {
                console.log("el: ", el)
                el.addEventListener("click", () => {
                    console.log("clicked")  
                    console.log(el.parentElement)
                    let menu = el.parentElement.parentElement.querySelector(".edit-popup-shortcut")
                    menu.classList.toggle("showF")
                })
            })

            let allShortcuts = document.querySelectorAll(".outerShortcut")
            allShortcuts.forEach(el => {
                el.addEventListener("click", ()=> {
                    parent.postMessage({
                        search: el.getAttribute("data-href")
                    })
                })
            })

            let allMenus = document.querySelectorAll(".edit-popup-shortcut") 

            allMenus.forEach(el => {
                let editBtn = el.querySelector(".edit-shortcut")
                let trashBtn = el.querySelector(".trash-shortcut")

                editBtn.addEventListener("click", () => {
                    showEditShortcutMenu(el.closest(".outerShortcut"))
                })

                trashBtn.addEventListener("click", () => {
                    trashBtn.closest(".outerShortcut").remove();
                    updateBookmarkJson()
                })


            })

            document.querySelector(".new-shortcut").addEventListener("click", () => {
                showEditShortcutMenu()
            })

           let ShortcutMenu = document.querySelector(".editShortcutPopup")

           ShortcutMenu.querySelector(".cancel").addEventListener("click", () => {
                unShowEditShortcutMenu()
                currentEditingShortcut = null;
                unShow3DotMenu()
           });

           ShortcutMenu.querySelector(".save").addEventListener("click", () => {
                let nameInput = ShortcutMenu.querySelector(".shortcut-name")
                let urlInput = ShortcutMenu.querySelector(".shortcut-url")

                if (currentEditingShortcut) {
                    currentEditingShortcut.querySelector("p").textContent = nameInput.value
                    currentEditingShortcut.setAttribute("data-href", urlInput.value)
                    currentEditingShortcut.querySelector(".shortcut").querySelector("img").src = `https://www.google.com/s2/favicons?domain=${addHttps(urlInput.value)}&sz=128`
                    currentEditingShortcut = null
                } else {
                    createShortcut(nameInput.value, urlInput.value)
                }
                unShowEditShortcutMenu()
                updateBookmarkJson()
                unShow3DotMenu()
           });

            function unShow3DotMenu() {
                document.querySelectorAll(".outerShortcut .tree-dots-shortcuts").forEach(el => {
                    let menu = el.parentElement.parentElement.querySelector(".edit-popup-shortcut")
                    menu.classList.remove("showF")
                    console.log(menu)
                })
            }
            
            function showEditShortcutMenu(shortcutEl) {
                /** @type {HTMLDivElement} */
                let shortcut = shortcutEl

                let menu = document.querySelector(".editShortcutPopup")
                menu.style.display = "block"

                let nameInput = menu.querySelector(".shortcut-name")
                let urlInput = menu.querySelector(".shortcut-url")

                let curName = shortcut.querySelector("p").textContent;
                let curHref = shortcut.getAttribute("data-href")

                nameInput.value = curName
                urlInput.value = curHref

                currentEditingShortcut = shortcut;
            }

            function unShowEditShortcutMenu() {
                let menu = document.querySelector(".editShortcutPopup")
                menu.style.display = 'none'

                let nameInput = menu.querySelector(".shortcut-name")
                let urlInput = menu.querySelector(".shortcut-url")

                nameInput.value = ''
                urlInput.value = ''
            }
            function createShortcutsFromJson(arr) {
                arr.forEach(ob => {
                    createShortcut(ob.ttl, ob.href)
                })
            }

            function createShortcut(name, href) {
                //.shortcuts

                let outerDiv = document.createElement("div")
                outerDiv.classList.add("outerShortcut")
                outerDiv.setAttribute("data-href", href)
                //https://www.google.com/s2/favicons?domain=https://crazygames.com&sz=128
                outerDiv.innerHTML = `
            <div class="edit-popup-shortcut" style="display: none;">
                    <button class="edit-shortcut">Edit</button>
                    <button class="trash-shortcut">Delete</button>
                </div>

                <div class="shortcut">
                    <img src="" alt="" srcset="">    
                    <img src="icons/treeDot.svg" alt="" class="tree-dots-shortcuts">

                    <p></p>
                </div>
                `

                outerDiv.querySelector("p").textContent = name;
                outerDiv.querySelector(".shortcut").querySelector("img").src = `https://www.google.com/s2/favicons?domain=${addHttps(href)}&sz=128`

                outerDiv.querySelector(".tree-dots-shortcuts").addEventListener("click", function () {
                    let menu = this.parentElement.parentElement.querySelector(".edit-popup-shortcut")
                    menu.classList.toggle("showF")
                })

                let editBtn = outerDiv.querySelector(".edit-shortcut")
                let trashBtn = outerDiv.querySelector(".trash-shortcut")

                editBtn.addEventListener("click", () => {
                    showEditShortcutMenu(outerDiv)
                })

                trashBtn.addEventListener("click", () => {
                    trashBtn.closest(".outerShortcut").remove();
                    updateBookmarkJson()
                })



                /*
                el.addEventListener("click", () => {
                    console.log("clicked")  
                    console.log(el.parentElement)
                    let menu = el.parentElement.parentElement.querySelector(".edit-popup-shortcut")
                    menu.classList.toggle("showF")
                })*/


                let shorrrtcuuuttststst = outerDiv
                document.querySelector(".new-shortcut").before(shorrrtcuuuttststst)
                /*
            <div class="outerShortcut" data-href="crazygames.com">

                <div class="edit-popup-shortcut" style="display: none;">
                    <button class="edit-shortcut">Edit</button>
                    <button class="trash-shortcut">Delete</button>
                </div>

                <div class="shortcut">
                <img src="https://www.google.com/s2/favicons?domain=https://crazygames.com&sz=128" alt="" srcset="">    
                <img src="icons/treeDot.svg" alt="" class="tree-dots-shortcuts">

                <p>CrazyGames</p>
            </div>
            </div>
                */
            }

            function updateBookmarkJson() {
                let shortcuts = document.querySelectorAll(".shortcut:not(.new-shortcut)")
                shortcutJson = []

                shortcuts.forEach(el => {
                    let name = el.querySelector("p").textContent
                    let href = el.parentElement.getAttribute("data-href")

                    shortcutJson.push({
                        ttl: name,
                        href: href
                    })
                })
            }

            window.addEventListener("click", (e)=> {
                console.log("clicked window")
                if (e.target.closest(".tree-dots-shortcuts")) {
                    return
                    console.log("no unshow")
                }
                unShow3DotMenu()
            })

            function addHttps(url) {
  // Checks if the URL starts with http:// or https:// (case-insensitive)
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
}