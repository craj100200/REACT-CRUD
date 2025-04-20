import {useQuery} from '@tanstack/react-query';
import {useState, useEffect } from "react";
import {generateDummyData } from './DummyDataGenerator.js';

const StudentList = () => {
	const [students, setStudents] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [currentStudent, setCurrentStudent] = useState();
	const [maxStudentId, setMaxStudentId] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const studentsPerPage = 10;
	const [formMode, setFormMode] = useState("");
	
//	useEffect(() => {
//		setStudents(generateDummyData());
//	}, []);

	//http://localhost:10000/students
	const { data: studentList, isLoading, error } = useQuery({
	queryFn: () =>
	//fetch('http://localhost:10000/students')
	fetch('https://15-apr-2025.vercel.app/students')
		.then((res) =>  res.json())
		.then((res)=>{console.log(res); setStudents(res); return res;  }),
    		queryKey: ['studentList'],
	});

  	// Show a loading message while data is fetching
  	if (isLoading) {
    	return <h2>Loading...</h2>;
  	}

  	// to handle error
	if (error) {
    		return <div className="error">Error: error fetching { error } </div>
  	}	



	const onEditBegin = (student) => {
		setCurrentStudent(student);
		setShowModal(true);
	};

	const onEditComplete = (e) => {
		e.preventDefault();
		setShowModal(false);
		
		if (formMode === "Add") 
		{
			setFormMode("");
			setStudents((prevStudents) => [...prevStudents, currentStudent]);
			//const response = fetch('http://localhost:10000/students/students/', 
			const response = fetch('https://15-apr-2025.vercel.app/students/', 
				{
    				method: 'POST', // or 'PATCH' depending on your API
    				headers: { 'Content-Type': 'application/json' },
    				body: JSON.stringify(currentStudent),
	  			}
				);
		} 
		else
		{
			const newStudents = students.map(
			(student) =>
			student.id === currentStudent.id ? currentStudent : student
			);
			setStudents(newStudents);
			//const response = fetch('http://localhost:10000/students/students/'+ currentStudent.id, 
			const response = fetch('https://15-apr-2025.vercel.app/students/'+ currentStudent.id, 
				{
    				method: 'PUT', // or 'PATCH' depending on your API
    				headers: { 'Content-Type': 'application/json' },
    				body: JSON.stringify(currentStudent),
	  			}
				);
		}
		
	};

	const onControlValueChange = (e) => {
		const { name, value } = e.target;
		setCurrentStudent((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const onAddBegin = () => {
		setFormMode("Add");
		setMaxStudentId((prevId) => prevId + 1);
		setCurrentStudent({ id: maxStudentId + 1, firstName: "", lastName: "", rollNo: "" , email: "", dateOfBirth: "" });
		setShowModal(true);
	};

	const onDelete = (studentToBeDeleted) => {
		setStudents(
			students.filter((student) => student.id !== studentToBeDeleted.id)
		);

		//const response = fetch('http://localhost:10000/students/students/'+ studentToBeDeleted.id, {
		const response = fetch('https://15-apr-2025.vercel.app/students/'+ studentToBeDeleted.id, {			
    			method: 'DELETE', // or 'PATCH' depending on your API
			headers: {"Content-Type":"application/json"}
		});
	};
	
	// Pagination logic
	const indexOfLastStudent = currentPage * studentsPerPage;
	const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
	const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
	const totalPages = Math.ceil(students.length / studentsPerPage);

	return (
	<>
	<div className="card shadow p-3 m-4 bg-white rounded" style={{border:"none"}}>
	<div className="card-body">



	<div className="d-flex justify-content-between mb-3">
        	<h5>Student List</h5>

		<button
			type="button"
			className="btn btn-primary"
			data-bs-toggle="modal"
			data-bs-target="#staticBackdrop"
			onClick={onAddBegin}
		>
		Add Student
		</button>
	</div>


	<table className="table table-bordered p-1" >
		<thead>
         		<tr>
		         	<th>First Name</th>
         			<th>Last Name</th>
         			<th>Roll No</th>
         			<th>Email</th>
         			<th>Date OF Birth</th>
		        	<th>Actions</th>
        		</tr>
        	</thead>
	
		<tbody>
			{currentStudents.map((student) => {
			return (
				<tr key={student.id}>
					<td>{student.firstName}</td>
					<td>{student.lastName}</td>
					<td>{student.rollNo}</td>
					<td>{student.email}</td>
					<td>{student.dateOfBirth}</td>
					<td>
						<button
							type="button"
							className="btn btn-warning me-2 p-1"
							data-bs-toggle="modal"
							data-bs-target="#staticBackdrop"
							onClick={() => onEditBegin(student)}
						>
						Edit
						</button>
						<button
							onClick={() => onDelete(student)}
							className="btn btn-danger p-1"
						>
						Delete
						</button>
					</td>
				</tr>
				);
			})}
		</tbody>
	</table>


	{/* Pagination */}
      	<div className="d-flex justify-content-end">
        	<ul className="pagination">
          		<li className="page-item">
            			<button
              				className="page-link"
              				onClick={() => setCurrentPage(currentPage - 1)}
              				disabled={currentPage === 1}
            			>
              				<span aria-hidden="true">&laquo;</span> {/* Previous icon */}
            			</button>
          		</li>

          	{/* Page Number Buttons */}
          		{[...Array(totalPages)].map((_, index) => (
            			<li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              				<button
                				className="page-link"
                				onClick={() => setCurrentPage(index + 1)}
              				>
                			{index + 1}
              				</button>
            			</li>
          		))}

          		<li className="page-item">
            			<button
              				className="page-link"
              				onClick={() => setCurrentPage(currentPage + 1)}
              				disabled={currentPage === totalPages}
            			>
              				<span aria-hidden="true">&raquo;</span> {/* Next icon */}
            			</button>
          		</li>
        	</ul>
      	</div>
	{/* Pagination */}



	<div
		className="modal fade"
		id="staticBackdrop"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabIndex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		{
			<form onSubmit={(e) =>onEditComplete(e)}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								{formMode === "Add" ? "Add New" : "Edit"}
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={()=>setFormMode("")}
							>
							</button>
						</div>
						<div className="modal-body">
							<table className="table" >
								<tbody>
									<tr>
										<td><label>First Name</label></td>
										<td>
											<input
												type="text"
												name="firstName"
												value={currentStudent ? currentStudent.firstName : ""}
												onChange={onControlValueChange}
											/>
								
										</td>
									</tr>
									<tr>
										<td><label>Last Name</label></td>
										<td>
											<input
												type="text"
												name="lastName"
												value={currentStudent ? currentStudent.lastName : ""}
												onChange={onControlValueChange}
											/>
										</td>
									</tr>
									<tr>
										<td><label>Roll No</label></td>
										<td>
											<input
												type="text"
												name="rollNo"
												value={currentStudent ? currentStudent.rollNo : ""}
												onChange={onControlValueChange}
											/>
										</td>
									</tr>
									<tr>
										<td><label>Email</label></td>
										<td>
											<input
												type="text"
												name="email"
												value={currentStudent ? currentStudent.email : ""}
												onChange={onControlValueChange}
											/>
										</td>
									</tr>
									<tr>
										<td><label>Date Of Birth</label></td>
										<td>
											<input
												type="text"
												name="dateOfBirth"
												value={currentStudent ? currentStudent.dateOfBirth : ""}
												onChange={onControlValueChange}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={()=>setFormMode("")}
							>
							Close
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								data-bs-dismiss="modal"
							>
							Save
							</button>
						</div>
					</div>
				</div>
			</form>
	}
</div>



</div>
</div>
</>
);
};
export default StudentList;

