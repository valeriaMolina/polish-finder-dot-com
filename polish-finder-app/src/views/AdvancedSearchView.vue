<template>
  <div class="" id="background-gradient-div">
    <div class="container py-5">
      <h3>Advanced Search</h3>
      <div class="px-4 py-4 white-bg shadow rounded container">
        <div class="row align-items-start">
          <div class="col-md-auto">
            <p class="fw-bold">Select Fields</p>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-md-auto">
            <div class="input-group">
              <span class="input-group-text">Brand</span>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="col-md-auto">
            <div class="input-group">
              <span class="input-group-text">Name</span>
              <input type="text" class="form-control" />
            </div>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-auto">
            <div class="form-check">
              <input type="radio" name="polishType" class="form-check-input" checked />
              <label class="form-check-label" for="">Lacquer</label>
            </div>
          </div>
          <div class="col-md-auto">
            <div class="align-self-center">
              <span class="fw-bold">or</span>
            </div>
          </div>
          <div class="col-md-auto">
            <div class="form-check">
              <input type="radio" name="polishType" class="form-check-input" />
              <label class="form-check-label" for="">Gel</label>
            </div>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-auto">
            <span>Primary Color</span>
            <p><small>Choose only one primary color</small></p>
            <select name="" class="form-select" id="">
              <option selected value="">Choose a primary color</option>
              <option value="">Red</option>
              <option value="">Blue</option>
            </select>
          </div>
          <div class="col-md-auto">
            <span>Effect Colors</span>
            <p>
              <small>You can select multiple</small>
            </p>
            <select name="" class="form-select" id="">
              <option value="" selected>Choose effect colors</option>
              <option value="">Green</option>
              <option value="">Yellow</option>
            </select>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-auto">
            <span>Formulas</span>
            <p><small>You can select multiple formulas</small></p>
            <select name="" id="" class="form-select">
              <option value="" selected>Choose the formulas</option>
              <option value="">Holographic</option>
              <option value="">Shimmer</option>
            </select>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-auto">
            <button class="btn-style501">Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#background-gradient-div {
  background: linear-gradient(-20deg, #d558c8 0%, #24d292 100%);
}

.white-bg {
  background-color: white;
}
</style>
