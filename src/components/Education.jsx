import React, {useState, useEffect} from 'react'
import EditButton from './editButton'
import EditEducation from './EditEducation';


const Education = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [eduData, setEduData] = useState(() => {
    const storedData = localStorage.getItem("eduData");
    return storedData ? JSON.parse(storedData) : 
    {
      institution: "University of North Texas",
      dateRange: "Aug 2020 - Dec 2022",
      degree: "Bachelor of Science in Computer Science",
      location: "Denton, TX",
    }
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
    setEduData(updatedData);
    setIsEditing(false);
  }
  
  useEffect(() => {
      localStorage.setItem("eduData", JSON.stringify(eduData));
    }, [eduData]);
  

  return (
    <section className='resume-section'>
      <div className="section-header">
        <h1 className='section-title'>Education</h1>
        <EditButton onClick={handleEditClick}/>
      </div>
      {!isEditing ? 
      <>
        <hr></hr>
        <div className="section-body">
          <div className="section-entry">
            <div className="entry-header">
              <h2 className='entry-title'>{eduData.institution}</h2>
              <span className='entry-date-range'>{eduData.dateRange}</span>
            </div>
            <h3 className='entry-subtitle'>{eduData.degree}</h3>
            <p className='entry-location'>{eduData.location}</p>
          </div>
        </div>
      </> :
      <EditEducation data={eduData} onSave={handleSave} onCancel={handleCancelClick}/>
    }
      

    </section>
  )
}

export default Education
