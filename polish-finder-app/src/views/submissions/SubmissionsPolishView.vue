<template>
  <div id="main-div-polish-submit" class="d-flex flex-column align-items-center px-3 py-5">
    <div class="header-area">
      <h1>Submit a Nail Polish</h1>
    </div>
    <div id="form-register" class="border shadow rounded px-4 py-4">
      <div class="submission-guidelines">
        <h4>Submission Guidelines</h4>
        <p>Before submitting a new nail polish, please make sure:</p>
        <ul>
          <li>
            The polish is not already in our database. You can search for existing polishes
            <a href="">here</a>
          </li>
          <li>You provide as much information as possible to help us accurately add the polish</li>
        </ul>
      </div>
      <div class="submit-polish-form">
        <form action="">
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="">Polish Name</label>
            <small>Enter the full name of the nail polish</small>
            <input type="text" placeholder="name" required />
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="">Brand</label>
            <small
              >Select the brand from our list or <a href="">submit a new brand</a> if it's not
              listed</small
            >
            <select>
              <option>Please select a brand</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="">Type</label>
            <small>Select the type of polish (lacquer or gel)</small>
            <select name="" id="">
              <option value="">Select a type</option>
              <option value="">Lacquer</option>
              <option value="">Gel</option>
            </select>
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="Primary Color">Primary Color</label>
            <small>Select the main color of the polish. <a href="">What does this mean?</a></small>
            <select name="" id="">
              <option value="">Choose a primary color</option>
              <option value="">Red</option>
            </select>
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="">Effect Colors</label>
            <small>List any secondary colors (optional)</small>
            <select name="" id="">
              <option value="">Choose secondary colors</option>
            </select>
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="">Formulas</label>
            <small>List the formulas (e.g. glitter, creme, holographic).</small>
            <select name="" id="">
              Choose a formula
            </select>
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="">Description</label>
            <small>Tell us a little bit about the polish. What makes it unique?</small>
            <input type="text" placeholder="description" />
          </div>
          <div class="nice-form-group d-flex flex-column mb-3 mx-2 form-group">
            <label for="">Upload a picture</label>
            <small>Upload a clear picture of the polish</small>
            <input type="file" />
          </div>
          <div>
            <button id="override-btn" class="mx-2 btn-style501 btn" type="submit">
              Submit Polish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../node_modules/nice-forms.css/dist/nice-forms.css');
#main-div-polish-submit {
  background: linear-gradient(
    113.5deg,
    rgb(234, 234, 234) 22.3%,
    rgb(201, 234, 211) 56.6%,
    rgb(255, 180, 189) 90.9%
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
