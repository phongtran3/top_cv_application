import React, {useState} from 'react'

const EditEducation = ({data, onSave, onCancel}) => {
 const [formData, setFormData] = useState({...data});




 const handleChange = (e) => {
  const {name, value} = e.target;
  setFormData({ ...formData, [name]: value });
}

  return (
    <div className='edit-edu-container'>
      <div className="edit-edu-form">
        <label>
          Institution:
          <input type='text' value={formData.institution} name='institution' onChange={handleChange} />
        </label>

        <label>
          Location:
          <input type='text' value={formData.location} name='location' onChange={handleChange} />
        </label>

        <label>
          Degree:
          <input type='text' value={formData.degree} name='degree' onChange={handleChange} />
        </label>

        <label>
          Date Range:
          <input type='text' value={formData.dateRange} name='dateRange' onChange={handleChange} />
        </label>

      </div>
      <div className="form-btn">
        <button onClick={() => onSave(formData)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default EditEducation
