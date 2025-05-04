import React, {useState} from 'react'

const EditProject = ({data, onSave, onCancel}) => {
  const [formData, setFormData] = useState([...data]);

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

  const handleAddBullet = (projectId) => {
    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[projectId].bullets]
      updatedBullets.push('');

      updated[projectId] = {
        ...updated[projectId],
        bullets: updatedBullets,
      }

      return updated;
    })
  }

  const handleAddProject = () => {
    setFormData(prevData => {
      const lastExp = prevData[prevData.length - 1];
      const nextId = lastExp ? lastExp.id + 1 : 1;
      
      const newProject = {
        id: nextId,
        title: '',
        projectLink: '',
        projectCode: '',
        dateRange: '',
        bullets: [], 
      }

      return [...prevData, newProject];
    })
  }


  const handleBulletChange = (e, index, projectId) => {
    const {value} = e.target;
    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[projectId].bullets];
      updatedBullets[index] = value;

      updated[projectId] = {
        ...updated[projectId],
        bullets: updatedBullets,
      }
      return updated;
    })
  }


  const deleteProject = (index) => {
    setFormData((prevData) => {
      const updated = prevData.filter((_,i) => i !== index);
      return updated.map((project, index) => ({
        ...project,
        id: index,
      }))

    })
  }

  const deleteBullet = (index, projectId) => {
    setFormData(prevData => {
      const updated = [...prevData];
      const updatedBullets = [...updated[projectId].bullets].filter((_,i)=> i !== index);

      updated[projectId] = {
        ...updated[projectId],
        bullets: updatedBullets,
      }
      return updated;
    })
  }

  return (
    <div className='edit-exp-container'>
      {formData.map((project, index) => (
        <div className="edit-project-form" key={project.id}>
         <button className='delete-form-btn' onClick={(e) => deleteProject(index)}>X</button>
         <label>
              Title:
              <input type='text' value={project.title} name='title' onChange={(e) => handleChange(e, index)} />
          </label>

          <label>
              Project Link:
              <input type='text' value={project.projectLink} name='projectLink' onChange={(e) => handleChange(e, index)} />
          </label>

          <label>
              Code Link:
              <input type='text' value={project.projectCode} name='projectCode' onChange={(e) => handleChange(e, index)} />
          </label>

          <label>
              Date Range:
              <input type='text' value={project.dateRange} name='dateRange' onChange={(e) => handleChange(e, index)} />
          </label>

          <div className="bullets-container">
            {project.bullets.map((bullet, index) => (
              <React.Fragment key={index}>
              <label>
                <textarea 
                  value={bullet} 
                  name={`bullet-${index + 1}`} 
                  onChange={(e) => handleBulletChange(e, index, project.id)}
                  placeholder='Add bullet points'
                  wrap='soft'
                />
                <button className='delete-bullet-btn' onClick={(e) => deleteBullet(index, project.id)}>X</button>
              </label>
              </React.Fragment>
            ))}
            <button className="add-bullet" onClick={(e) => handleAddBullet(project.id)}>+ Add Bullet</button>
          </div>
        </div>
      ))}


       <div className="form-btn">
        <button className='add-btn' onClick={handleAddProject}>+ Add Project</button>
        <button className='save-btn' onClick={() => onSave(formData)}>Save</button>
        <button className='cancel-btn' onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default EditProject
