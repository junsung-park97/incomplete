const btn = document.querySelector('.tombstone_estimate .tombstone_list .tombstone_infor .btn_list button')

console.log(btn)

btn.addEventListener("click",function(){
    this.classList.toggle('active')
})