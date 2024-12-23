import fetch from 'unfetch';


const checkStatus = response => {
    if(response.ok){
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllStudents = () => 
    fetch ("api/V1/students")
    .then(checkStatus);

export const addNewStudent = student =>
    fetch ("api/V1/students",{
        headers:{
            'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(student)
    }).then(checkStatus);

export const deleteStudent = id =>
    fetch (`api/V1/students/${id}`,{
        method:'DELETE'
    })
    .then(checkStatus);
