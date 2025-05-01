import React, {useState} from 'react'

const EditExperience = ({data, onSave, onCancel}) => {
  const [formData, setFormData] = useState([...data]);
  

  const handleAddExp = () => {
    console.log('Adding Experience')

    setFormData(prevData => {
      const lastExp = prevData[prevData.length - 1];
      const nextId = lastExp ? lastExp.id + 1 : 1;
      const newExp = {
        id: nextId,
        title: '',
        company: '',
        datePange:'',
        bullets: []
      }
      return [...prevData, newExp];
    });
  }

  const handleChange = (e, index) => {
    const {name, value} = e.target;
    setFormData(prevData => {
      const updated = [...prevData];
      updated[index] = {
        ...updated[index],
        [name]: value,
      }
      return updated;
    });
  }

  const handleBulletChange = (e, index, id) => {
    const {value} = e.target;
    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[id].bullets]
      updatedBullets[index] = value;

      updated[id] = {
        ...updated[id],
        bullets: updatedBullets
      }

      return updated;
    })
  }

  const handleAddBullet = (id) => {
    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[id].bullets]
      updatedBullets.push("");
      updated[id] = {
        ...updated[id],
        bullets: updatedBullets
      }

      return updated;
    })
  }

  const deleteBullet = (index, id) => {
    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[id].bullets].filter((_,i)=> i !== index);

      updated[id] = {
        ...updated[id],
        bullets: updatedBullets
      }

      return updated;
    })
  }


  const deleteExp = (index) => {
    setFormData(prevData => {
      const updated = prevData.filter((_,i) => i !== index);

      return updated.map((exp, index) => ({
        ...exp,
        id: index
      }))
    })
  }

  console.log(formData)
  return (
    <div className='edit-exp-container'>
      {formData.map(((expData, index) => (
        <div className="edit-exp-form" key={expData.id}>
         <button className='delete-form-btn' onClick={(e) => deleteExp(index)}>X</button>
          <label>
              Company:
              <input type='text' value={expData.company} name='company' onChange={(e) => handleChange(e, index)} />
          </label>

          <label>
              Title:
              <input type='text' value={expData.title} name='title' onChange={(e) => handleChange(e, index)} />
          </label>

          <label>
              Location:
              <input type='text' value={expData.location} name='location' onChange={(e) => handleChange(e, index)} />
          </label>

          <label>
              Date Range:
              <input type='text' value={expData.dateRange} name='dateRange' onChange={(e) => handleChange(e, index)} />
          </label>

          <div className="bullets-container">
            Bullets: 
            {expData.bullets.map((bullet, index) => (
              <React.Fragment key={index}>
              <label>
                <input 
                  type='text' 
                  value={bullet} 
                  name={`bullet-${index + 1}`} 
                  onChange={(e) => handleBulletChange(e, index, expData.id)}
                  placeholder='Add responsibility'
                />
              </label>
              <button className='delete-bullet-btn' onClick={(e) => deleteBullet(index, expData.id)}>X</button>
              </React.Fragment>
            ))}
            <button className="add-bullet" onClick={(e) => handleAddBullet(expData.id)} >+ Add Bullet</button>
          </div>
          
      </div>

      )))}
      
       <div className="form-btn">
        <button className='add-btn' onClick={handleAddExp}>+ Add Experience</button>
        <button className='save-btn' onClick={() => onSave(formData)}>Save</button>
        <button className='cancel-btn' onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default EditExperience
