<template>
  <h1 class="text-light text-center bg-primary p-2 mb-5">Form Binding</h1>
  <div class="container">
    <div class="row">
      <form class="col-12 col-md-9 col-lg-6 mx-auto mb-4 needs-validation" v-if="isFormVisible && !isSentVisible" novalidate>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" v-model="post.name" class="form-control" id="name" required>
          <div class="valid-feedback">
            Looks good!
          </div>
          <div class="invalid-feedback">
            Please provide a valid name.
          </div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" v-model="post.email" class="form-control" id="email" aria-describedby="emailHelp" required>
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          <div class="invalid-feedback">
            Please provide a valid email address.
          </div>
        </div>
        <fieldset class="category mb-3">
          <legend class="category">Category</legend>
          <div class="form-check" v-for="category in postData.categories">
            <input class="form-check-input" v-model="post.category" type="radio" name="category" :id="category"
              :value="category" required>
            <label class="form-check-label" :for="category">
              {{ category }}
            </label>
            <div class="invalid-feedback">
              Please select a category.
            </div>
          </div>
        </fieldset>
        <fieldset class="shareOn mb-3">
          <legend class="shareOn">Share On</legend>
          <div class="form-check" v-for="media in postData.shareOn">
            <input class="form-check-input" v-model="post.shareOn" type="checkbox" name="shareOn" :value="media"
              :id="media">
            <label class="form-check-label" :for="media">
              {{ media }}
            </label>
          </div>
          <div class="form-check mt-3">
            <input class="form-check-input" v-model="post.immediateShare" type="checkbox" name="immediateShare"
              value="immediateShare" id="immediateShare" true-value="Immediately" false-value="Later">
            <label class="form-check-label" for="immediateShare">
              Share Immediately
            </label>
          </div>
        </fieldset>
        <div class="mb-3">
          <label for="city" class="form-label">City</label>
          <select class="form-select form-select" v-model="post.city" name="city" id="city" required>
            <option v-for="city in postData.cities" :value="city">{{ city }}</option>
          </select>
          <div class="invalid-feedback">
            Please select a city.
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3" @click="reviewData">Next</button>
      </form>

      <div v-if="!isFormVisible && !isSentVisible" class="col-12 col-md-9 col-lg-6 mx-auto">
        <h2 class="text-primary text-center">Confirm Data</h2>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{{ post.name }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ post.email }}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{{ post.category }}</td>
              </tr>
              <tr>
                <th>Share On</th>
                <td><span v-for="media in post.shareOn" class="badge" :class="media">{{ media }}</span></td>
              </tr>
              <tr>
                <th>Share timing</th>
                <td>{{ post.immediateShare }}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{{ post.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>Are you sure to send data?</h5>
        <button class="btn btn-secondary w-100 mt-3" @click.prevent="returnToForm">Previous</button>
        <button class="btn btn-primary w-100 mt-3" @click.prevent="sendData">Confirm</button>
      </div>
      <div v-if="isSentVisible">
        <div class="text-center">
          <img src="../assets/done.png"
            alt="tick" width="100">
        </div>
        <h2 class="text-success text-center mt-3">Data Sent Successfully</h2>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'FormBinding',
  data: () => ({
    post: {
      name: '',
      email: '',
      category: '',
      shareOn: [],
      immediateShare: false,
      city: 'Cairo'
    },
    postData: {
      categories: ['Programming', 'Design', 'Marketing', 'SEO'],
      shareOn: ['Facebook', 'Twitter', 'Youtube', 'Reddit', 'Whatsapp'],
      cities: ['Cairo', 'Mansoura', 'Alex', 'New Capital', 'Nasr City']
    },
    isFormVisible: true,
    isSentVisible: false
  }),
  methods: {
    reviewData() {
      let form = document.querySelector('.needs-validation')        
      form.addEventListener('submit', event => {
        event.preventDefault()
        event.stopPropagation()
        
        if (form.checkValidity()) {
          this.isFormVisible = false;
        }
        form.classList.add('was-validated')
      }, false)
    },
    returnToForm() {
      this.isFormVisible = true;
    },
    sendData() {
      this.isSentVisible = true;
    }
  }
}
</script>

<style scoped>
span {
  margin-right: 10px;
}

span.Facebook {
  background-color: #3b5998;
}

span.Twitter {
  background-color: #00acee;
}

span.Youtube {
  background-color: #e62117;
}

span.Reddit {
  background-color: #ff4500;
}

span.Whatsapp {
  background-color: #4fce5d;
}
</style>
