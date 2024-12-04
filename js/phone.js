const loadPhone = async (searchPhone = 13, isShowAll) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
    const showAllContainer = document.getElementById("show-all-container");
    if (phones.length > 5) {
        showAllContainer.classList.remove("hidden");
    } else {
        showAllContainer.classList.add("hidden");
    }

    if (!isShowAll) {
        phones = phones.slice(0, 5);
    } else {
        showAllContainer.classList.add("hidden");
    }

    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";
    phones.forEach((phone) => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList = "card bg-base-100 w-96 shadow-xl";
        phoneDiv.innerHTML = `
            <figure>
                <img
                    src="${phone.image}" />
            </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });

    toggleLoadingSpinner(false);
};

const showDetails = async (id) => {
    // console.log("showDetails", id);
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    console.log(data.data);
    showPhoneDetails(data);
};

const showPhoneDetails = (phone) => {
    show_details_modal.showModal();
};

// search functionality

const searchHandler = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-field").value;
    loadPhone(searchField, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
};

const handleShowAll = () => {
    searchHandler(true);
};

loadPhone();

// <button onclick="showDetails('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Buy Now</button>
