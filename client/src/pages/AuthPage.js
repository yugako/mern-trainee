import React, {useState} from 'react';

export default () => {

	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}




	return (
		<div className='row'>
			<div className='col-6 s6 offset-s3'>
				<h1>Short links</h1>
				<div className="row">
				   <div className="col s12 m6">
				     <div className="card blue darken-1">
				       <div className="card-content white-text">
				         <span className="card-title">Authorization</span>
				         <div>
				         	
				         	<div className="input-field">
		         	          <input 
		         	          	placeholder="Enter email" 
		         	          	id="email"
		         	          	name='email'
		         	          	className='yellow-input'
		         	          	onChange={changeHandler}  
		         	          	type="email" />
		         	          <label htmlFor="email">Email</label>
		         	        </div>
		         	        <div className="input-field">
		         	          <input 
		         	          	placeholder="Enter password" 
		         	          	id="password" 
		         	          	type="password"
		         	          	className='yellow-input' 
		         	          	name='password'
		         	          	onChange={changeHandler} />
		         	          <label htmlFor="password">Password</label>
		         	        </div>

				         </div>
				       </div>
				       <div className="card-action">
				         <button className='btn yellow darken-4' style={{marginRight: 10}}>LogIn</button>
				         <button className='btn grey lighten-1 black-text'>SignIn</button>
				       </div>
				     </div>
				   </div>
				 </div>
			</div>
		</div>
	);
}