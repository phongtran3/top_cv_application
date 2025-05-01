import React, {useState} from 'react'

const EditTechSkills = ({data, onSave, onCancel}) => {
  const [formData, setFormData] = useState([...data]);

  const handleAddSkill = () => {
    setFormData(prevData => {
      const updated = [
        ...prevData, 
        {
          category: '',
          skills: []
        }
      ]
      return updated;
    })
  }

  const handleCategoryChange = (e, index) => {
    const {name, value} = e.target;
    setFormData(prevData => {
      const updated = [...prevData];
      updated[index] = {
        ...updated[index],
        [name]: value,
      }
      return updated;
    })
  }   

  const handleSkillChange = (e, index) => {
    const {name, value} = e.target;
    setFormData(prevData => {
      const updated = [...prevData];
      updated[index] = {
        ...updated[index],
        [name]: value.split(',').map(str => str.trim()),
      }
      return updated;
    })
  }

  const deleteSkill = (index) => {
    console.log(index);
    setFormData(prevData => {
      return prevData.filter((_,i) => i !== index);
    })
  }

  return (
    <div className='edit-exp-container'>
      <p>Please seperate skills by comma.</p>
        {formData.map((group, index) => (
        <div className="edit-skill-form" key={index}>
          <button className='delete-form-btn' onClick={(e) => deleteSkill(index)}>X</button>

            <React.Fragment >
              <label>
                <input 
                  type='text' 
                  name='category' 
                  value={group.category} onChange={(e) => handleCategoryChange(e, index)}
                  placeholder='E.g. Programming Langauges, Soft Skills, Frameworks'
                /> 
              </label>

              <label>
                <textarea  
                  type='text' 
                  name='skills' 
                  value={group.skills.join(', ')} onChange={(e) => handleSkillChange(e,index)}
                  placeholder='E.g. Javascript, React, Node.js'
                /> 
              </label>
            </React.Fragment>
        </div>

        ))}

      <div className="form-btn">
        <button className='add-btn' onClick={handleAddSkill}>+ Add Skill</button>
        <button className='save-btn' onClick={() => onSave(formData)}>Save</button>
        <button className='cancel-btn' onClick={onCancel}>Cancel</button>
      </div>

    </div>
  )
}

export default EditTechSkills
