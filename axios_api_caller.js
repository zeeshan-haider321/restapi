function printArrayTable(arr) {
    const output_table = document.getElementById('tableBodyOutPut');
    for (let index = 0; index < arr.length; index++) {
        let row = `
                <tr>
                    <td>${arr[index].id}</td>
                    <td>${arr[index].name}</td>
                    <td>${arr[index].email}</td>
                    <td>${arr[index].address}</td>
                </tr>
                `
        output_table.innerHTML += row;

    }
}

const getUsers = () => {
    const axios_get_call = axios.get
        ('https://user-api-aunsyedshah.herokuapp.com/api/users');
    axios_get_call.then
        (
            response => {
                if (response.data.length === 0) {
                    const output_table = document.getElementById('tableBodyOutPut');
                    const no_user_message = `
                    <tr>
                        <td colspan="4">No User Found</td>
                    </tr>
                    `
                    output_table.innerHTML = no_user_message;
                }
                else {
                    const users_array = response.data;
                    printArrayTable(users_array);
                }
            }).catch(error => {
                return error;
            });
}

const getUser = () => {
    const userId = document.getElementById('update_user_id').value;
    axios.get(`https://user-api-aunsyedshah.herokuapp.com/api/users/${userId}`).then
        (
            response => {
                if (response.data.length != 0) {
                    document.getElementById('update_name').value = response.data.name;
                    document.getElementById('update_email').value = response.data.email;
                    document.getElementById('update_address').value = response.data.address;
                }
                else {
                    document.getElementById('update_name').value = "No User Found With The Provided ID";
                }
            }
        ).catch(error => {
            alert(error);
            return error;
        }
        );
}


const sendUser = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    if (name === '' || email === '' || address === '') {
        alert('Please fill all the fields');
    } else {
        const axios_post_call = axios.post('https://user-api-aunsyedshah.herokuapp.com/api/adduser', {
            name: name,
            email: email,
            address: address,
        });
        axios_post_call.then
            (
                response => {
                    console.log(response);
                    location.reload();
                }).catch(error => {
                    return error;
                });
    }
}

const deleteUser = () => {
    const user_id = document.getElementById('delete_user_id').value;
    const axios_delete_call = axios.delete(`https://user-api-aunsyedshah.herokuapp.com/api/deleteuser/${user_id}`);
    axios_delete_call.then
        (
            response => {
                alert(response.data);
                location.reload();
            }).catch(error => {
                alert(error);
            });
}

const updateUser = () => {
    const user_id = document.getElementById('update_user_id').value;
    const name = document.getElementById('update_name').value;
    const email = document.getElementById('update_email').value;
    const address = document.getElementById('update_address').value;
    const axios_put_call = axios.put(`https://user-api-aunsyedshah.herokuapp.com/api/updateuser/${user_id}`, {
        name: name,
        email: email,
        address: address,
    });
    axios_put_call.then
        (
            response => {
                alert(response.data);
                location.reload();
            }).catch(error => {
                alert(error);
            });
}