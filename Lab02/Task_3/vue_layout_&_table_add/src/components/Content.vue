<template>
    <div class="col main-wrapper">
        <div class="container p-4">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                Add Student
            </button>

            <!-- Modal -->
            <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addModalLabel">Add new student</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body w-50 mx-auto">
                            <div class="mb-3" style="text-align: left;">
                                <label for="student-id" class="form-label">Id</label>
                                <input type="text" class="form-control" name="student-id" id="student-id">
                            </div>
                            <div class="mb-3" style="text-align: left;">
                                <label for="student-name" class="form-label">Name</label>
                                <input type="text" class="form-control" name="student-name" id="student-name">
                            </div>
                            <div class="mb-3" style="text-align: left;">
                                <label for="student-city" class="form-label">City</label>
                                <input type="text" class="form-control" name="student-city" id="student-city">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addStudent"
                                id="addStudentBtn">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Toast -->
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <!-- <img src="..." class="rounded me-2" alt="..."> -->
                        <strong class="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Hello, world! This is a toast message.
                    </div>
                </div>
            </div>

            <!-- Students Table -->
            <div class="table-responsive table-bordered p-3 w-75 mx-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in students" :key="student.id">
                            <td>{{ student.id }}</td>
                            <td>{{ student.name }}</td>
                            <td>{{ student.city }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script>
import toastr from 'toastr'

export default {
    name: 'Content',
    data: () => ({
        students: [
            { id: 1, name: 'Amr', city: 'Mansoura' },
            { id: 2, name: 'Mohamed', city: 'Alex' },
            { id: 3, name: 'Saad', city: 'Cairo' },
            { id: 4, name: 'Abdelaziz', city: 'Ismaillia' },
            { id: 5, name: 'Basiony', city: 'New Capital' },
        ],
        stdId: null,
        stdName: null,
        stdCity: null
    }),
    methods: {
        isUniqueId(id) {
            for (const student of this.students) {
                if (student.id == id) {
                    return false;
                }
            }
            return true;
        },
        addStudent() {
            if (this.stdId.value && this.stdName.value &&
                this.stdCity.value && this.isUniqueId(this.stdId.value)) {
                this.students.push({
                    id: this.stdId.value,
                    name: this.stdName.value,
                    city: this.stdCity.value
                });
                this.stdId.value = '';
                this.stdName.value = '';
                this.stdCity.value = '';
                toastr.success('Student created successfully')
            }
            else if (!this.isUniqueId(this.stdId.value)) {
                toastr.error('Id already exists');
            }
            else {
                toastr.error('Please fill all fields');
            }
        }
    },
    mounted() {
        this.stdId = document.querySelector('#student-id');
        this.stdName = document.querySelector('#student-name');
        this.stdCity = document.querySelector('#student-city');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrapper {
    min-height: 85vh;
}

table td,
table th {
    text-align: left;
    padding: 15px;
}
</style>