import React, {useState, useEffect} from 'react'
import EditButton from './EditButton'
import EditTechSkills from './EditTechSkills'

const TechSkills = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [techSkillData, setTechSkillData] = useState(() => {
    const storedData = localStorage.getItem("techSkillData");
    return storedData ? JSON.parse(storedData) : [
      {
        category: 'Languages',
        skills: ['Javascript', 'HTML', 'CSS', 'Python'],
      },
      {
        category: 'Frameworks',
        skills: ['React', 'Node.js', 'Material-UI'],
      },
      {
        category: 'Category',
        skills: ['Skills'],
      }
    ]
  })

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    console.log("Canceling");
    setIsEditing(false);
  }

  const handleSave = (updatedData) => {
    console.log("Saving");
    setTechSkillData(updatedData);
    setIsEditing(false);
  }

  useEffect(() => {
      localStorage.setItem("techSkillData", JSON.stringify(techSkillData));
  }, [techSkillData]);

  return (
    <section className='resume-section'>
      <div className="section-header">
        {!isEditing ? <EditButton onClick={handleEditClick}/> : null}
        <h1 className='section-title'>Technical Skills</h1>
      </div>
      {isEditing ? <p>Please seperate skills by comma.</p>: null}
      
      {!isEditing ? 
      <>
        <hr></hr>
        <div className="section-body">
          {techSkillData.map((group) => (
            <p className="skill" key={group.category}><strong>{group.category}: </strong>{group.skills.join(', ')}</p>

          ))}
        </div>
      </>
      :
      <EditTechSkills data={techSkillData} onSave={handleSave} onCancel={handleCancelClick} />  
      }
    </section>
  )
}

export default TechSkills
