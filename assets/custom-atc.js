document.addEventListener("DOMContentLoaded", (event) => {
  const modals = document.querySelectorAll(".feature__product-popup");
  const modalTriggers = document.querySelectorAll(".feature__product");
  const overflow = document.querySelector(".feature__product-popup-overflow");
  const body = document.body;

  if (!modals) return;

  //Close Modal
  function closeModal() {
    modals.forEach((modal) => {
      modal.classList.add("hidden");
    });
    body.classList.remove("overflow-hidden");
    overflow.classList.remove("active");
  }

  // Open modals on trigger click
  modalTriggers.forEach((modalTrigger) => {
    modalTrigger.addEventListener("click", () => {
      const modal = modalTrigger.querySelector(".feature__product-popup");
      modal.classList.remove("hidden");
      body.classList.add("overflow-hidden");
      overflow.classList.add("active");

      // Close modal on cross button click
      const closeModalButton = modal.querySelector(".feature__product-popup-cross button");
      closeModalButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeModal();
      });

      // Close modal when clicking outside
      modal.addEventListener("click", (event) => {
        if (!event.target.closest(".feature__product-popup")) {
          closeModal();
        }
      });
    });
  });

  //Add to cart
  const addToCartForms = document.querySelectorAll(".popup-form-atc");

  if (!addToCartForms) return;
  addToCartForms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      await fetch("/cart/add", {
        method: "POST",
        body: new FormData(form),
      });

      //Get Cart
      const res = await fetch("/cart.json");
      const cartData = await res.json();

      console.log(cartData);

      //Update Cart Count
      document.querySelector(".cart-count-bubble span[aria-hidden]").textContent = cartData.item_count;

      // Added to cart message
      const html = `<p class="added-to-cart">Added to cart</p>`;

      form.closest(".feature__product-popup").insertAdjacentHTML("beforeend", html);

      setTimeout(() => {
        closeModal();
      }, 1000);
    });
  });
});
