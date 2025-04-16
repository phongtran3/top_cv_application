import React, {useState} from 'react'

const EditExperience = ({data, onSave, onCancel}) => {
  const [formData, setFormData] = useState([...data]);
  

  const handleAdd = () => {
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
    const entryId = id - 1;
    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[entryId].bullets]
      updatedBullets[index] = value;

      updated[entryId] = {
        ...updated[entryId],
        bullets: updatedBullets
      }

      return updated;
    })
  }

  const handleAddBullet = (e, id) => {
    const entryId = id - 1;
    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[entryId].bullets]
      updatedBullets.push("");
      updated[entryId] = {
        ...updated[entryId],
        bullets: updatedBullets
      }

      return updated;
    })
  }

  const deleteBullet = (index, id) => {
    const entryId = id - 1;

    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[entryId].bullets].filter((_,i)=> i !== index);

      updated[entryId] = {
        ...updated[entryId],
        bullets: updatedBullets
      }

      return updated;
    })
  }


  const deleteExp = (index) => {
    setFormData(prevData => {
      return prevData.filter((_,i) => i !== index);
    })
  }

  console.log(formData)
  return (
    <div className='edit-exp-container'>
      {formData.map(((expData, index) => (
        <div className="edit-exp-form" key={expData.id}>
         <button onClick={(e) => deleteExp(index)}>X</button>
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
              <button onClick={(e) => deleteBullet(index, expData.id)}>X</button>
              </React.Fragment>
            ))}
            <button onClick={(e) => handleAddBullet(e, expData.id)} >Add Responsibility</button>
          </div>
          
      </div>

      )))}
      
       <div className="form-btn">
        <button onClick={handleAdd}>Add Experience</button>
        <button onClick={() => onSave(formData)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default EditExperience
