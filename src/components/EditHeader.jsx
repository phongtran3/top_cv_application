import React, {useState} from 'react'

const EditHeader = ({data, onSave, onCancel}) => {
 const [formData, setFormData] = useState({...data});


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className='edit-header-container'>
      <div className='edit-header-form'>
        <label>
          Name:   
          <input type='text' name='name' value={formData.name} onChange={handleChange}/>
        </label>

        <label>
          Phone Number:   
          <input type='tel' size='20' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}/>
        </label>

        <label>
          Email:   
          <input type='email' name='email' value={formData.email} onChange={handleChange}/>
        </label>

        <label>
          LinkedIn:   
          <input type='text' name='linkedIn' value={formData.linkedIn} onChange={handleChange}/>
        </label>

        <label>
          Github:   
          <input type='text' name='github' value={formData.github} onChange={handleChange}/>
        </label>
      </div>
      <div className="form-btn">
        <button onClick={() => onSave(formData)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default EditHeader
