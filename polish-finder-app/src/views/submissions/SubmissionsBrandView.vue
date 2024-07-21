<template>
  <div id="main-div-brand-submit" class="d-flex flex-column align-items-center px-3 py-5">
    <div class="header-area">
      <h1>Submit a New Brand</h1>
    </div>
    <div id="form-register" class="border shadow rounded px-4 py-4">
      <div class="submission-guidelines">
        <h4>Submission Guidelines</h4>
        <p>Before submiting a new brand, please make sure:</p>
        <ul>
          <li>
            The brand is not already in our database. You can search for existing brands
            <a href="/brands">here</a>.
          </li>
          <li>You provide as much information as possible to help us accurately add the brand.</li>
        </ul>
      </div>
      <div class="submit-brand-form">
        <h2>Submit a New Brand Form</h2>
        <form action="">
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="brand-name">Brand Name</label>
            <small>Enter the full name of the brand</small>
            <input type="text" placeholder="Brand Name" id="brand-name" required />
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="website">Brand Website URL</label>
            <small>Provide the official website URL of the brand (if available)</small>
            <input type="url" id="website" placeholder="example.com" class="icon-left" required />
          </div>
          <button id="override-btn" class="mx-2 btn-style501 btn" type="submit">
            Submit Brand
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../node_modules/nice-forms.css/dist/nice-forms.css');
#main-div-brand-submit {
  background: linear-gradient(
    76.5deg,
    rgb(129, 252, 255) 0.4%,
    rgb(255, 175, 207) 49.8%,
    rgb(255, 208, 153) 98.6%
  );
}

#form-register {
  background-color: #ececec;
  color: black;
}

#override-btn:active {
  border-color: #a145ed;
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
}
</style>
