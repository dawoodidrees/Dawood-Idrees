document.addEventListener("DOMContentLoaded", (event) => {
  const navbarTrigger = document.querySelector(".navbar__trigger");
  const navbarShow = document.querySelectorAll(".navbar__mobile-hide");

  let isActive = false;

  if (navbarTrigger && navbarShow) {
    navbarTrigger.addEventListener("click", function () {
      this.classList.toggle("active");
      isActive = !isActive;

      navbarShow.forEach((element) => {
        const elementHeight = element.scrollHeight;
        isActive ? (element.style.height = `${elementHeight}px`) : (element.style.height = `0px`);
        isActive ? (element.style.marginTop = `15px`) : (element.style.marginTop = `0`);
      });
    });
  }
});
